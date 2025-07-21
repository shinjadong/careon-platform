'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, Check } from 'lucide-react';
import { nanoid } from 'nanoid';

type FormData = {
  installationPlace?: string;           // 설치장소: 매장/주택/오피스텔/학교/병원
  businessType?: string;                // 업종: 편의점/음식점/무인매장/카페/기타
  businessTypeOther?: string;           // 기타 업종 직접입력
  businessSize?: string;                // 사업장 규모: 10평이하~50평이상  
  installationLocations?: string[];     // 설치위치들: 카운터/입구/실외/홀/주방/창고/화장실/기타 (다중선택)
  installationLocationOther?: string;   // 기타 설치위치
  installationQuantities?: {[location: string]: number}; // ✨ 새로 추가: 각 위치별 설치 수량
  quoteMethod?: string;                 // 견적방법: 다이렉트/출장견적
  businessLocation?: string;            // 사업장 지역
  businessName?: string;                // 사업체명
  contactName?: string;                 // 담당자명  
  phone?: string;                       // 연락처
  agreeTerms?: string[];               // 동의사항들: 개인정보처리방침/마케팅수신
};

// 메시지 타입 정의
type MessageType = 'system' | 'user' | 'option';

type Message = {
  id: string;
  type: MessageType;
  content: string;
  options?: string[];
  field?: string;
};

// ✨ 수량 선택 상태 타입 추가
type QuantitySelectionState = {
  currentLocationIndex: number;
  selectedQuantities: {[location: string]: number};
  locations: string[]; // 선택된 위치 배열 추가
};

// 채팅 단계 정의 - 플로우차트 기반으로 완전 재구성
const FORM_STEPS = [
  {
    question: '안녕하세요! 케어온 CCTV 무료견적을 시작합니다. 🎥<br/>CCTV를 어디에 설치하실 예정인가요?',
    field: 'installationPlace',
    options: ['🏪 매장', '🏠 주택', '🏢 오피스텔', '🎓 학교', '🏥 병원'],
  },
  {
    question: '매장의 업종을 선택해주세요.',
    field: 'businessType',
    options: ['🛒 편의점', '🍕 음식점', '🤖 무인매장', '☕ 카페', '📝 기타 (직접입력)'],
    conditional: (data: FormData) => data.installationPlace === '🏪 매장',
  },
  {
    question: '기타 업종을 직접 입력해주세요.',
    field: 'businessTypeOther',
    options: [],
    inputType: 'text',
    placeholder: '예: 서점, 미용실, 세탁소 등',
    conditional: (data: FormData) => data.businessType === '📝 기타 (직접입력)',
  },
  {
    question: '사업장 규모를 선택해주세요. (평수 기준)',
    field: 'businessSize',
    options: ['📐 10평 이하', '📏 10평~20평', '📋 20평~50평', '🏭 50평 이상'],
  },
  {
    question: 'CCTV 설치가 필요한 위치를 모두 체크해주세요. (중복선택 가능)',
    field: 'installationLocations',
    options: ['💰 카운터/계산대', '🚪 입구/출입구', '🌳 실외/주차장', '🍽️ 홀/고객석', '🍳 주방/작업장', '📦 창고/보관실', '🚻 화장실 앞', '📱 기타위치'],
    multiple: true,
  },
  {
    question: '기타 설치 위치를 직접 입력해주세요.',
    field: 'installationLocationOther',
    options: [],
    inputType: 'text',
    placeholder: '예: 복도, 계단, 사무실 등',
    conditional: (data: FormData) => data.installationLocations?.includes('📱 기타위치'),
  },
  // ✨ 새로 추가: 위치별 수량 선택 단계
  {
    question: '', // 동적으로 설정됨
    field: 'installationQuantities',
    options: ['1대', '2대', '3대', '4대 이상'],
    quantitySelection: true, // 수량 선택 단계임을 표시
    conditional: (data: FormData) => (data.installationLocations?.length || 0) > 0,
  },
  {
    question: '견적 받으실 방법을 선택해주세요.',
    field: 'quoteMethod',
    options: [], // 동적으로 설정됨
    dynamic: true,
  },
  {
    question: '사업체명을 알려주세요.',
    field: 'businessName',
    options: [],
    inputType: 'text',
    placeholder: '예: 케어온 편의점',
  },
  {
    question: '담당자명을 알려주세요.',
    field: 'contactName',
    options: [],
    inputType: 'text',
    placeholder: '홍길동',
  },
  {
    question: '연락처를 알려주세요.',
    field: 'phone',
    options: [],
    inputType: 'tel',
    placeholder: '010-1234-5678',
  },
  {
    question: '사업장 지역을 알려주세요.',
    field: 'businessLocation',
    options: ['서울특별시', '부산광역시', '대구광역시', '인천광역시', '광주광역시', '대전광역시', '울산광역시', '세종특별자치시', '경기도', '강원특별자치도', '충청북도', '충청남도', '전북특별자치도', '전라남도', '경상북도', '경상남도', '제주특별자치도'],
  },
  {
    question: '개인정보 처리방침 및 마케팅 활용에 동의해주세요.',
    field: 'agreeTerms',
    options: ['✅ 개인정보 처리방침 동의 (필수)', '📧 마케팅 정보 수신 동의 (선택)'],
    multiple: true,
  },
];

const CCTVRentalQuote = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [formData, setFormData] = useState<FormData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // 다중 선택을 위한 임시 상태
  const [selectedMultiples, setSelectedMultiples] = useState<string[]>([]);
  
  // ✨ 수량 선택을 위한 새로운 상태
  const [quantitySelection, setQuantitySelection] = useState<QuantitySelectionState>({
    currentLocationIndex: 0,
    selectedQuantities: {},
    locations: []
  });
  
  // 자동 스크롤 관련 상태
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const [userScrolledUp, setUserScrolledUp] = useState(false);
  
  // 참조 객체
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const prevScrollTopRef = useRef(0);
  const prevMessagesLengthRef = useRef(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // 스크롤 이벤트 처리 - 디바운스 적용
  useEffect(() => {
    const handleScroll = () => {
      if (!chatContainerRef.current) return;
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current!;
        const scrollDelta = scrollTop - prevScrollTopRef.current;
        
        if (scrollDelta < -10) {
          setUserScrolledUp(true);
          setAutoScrollEnabled(false);
        }
        
        const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
        
        if (isAtBottom && userScrolledUp) {
          setAutoScrollEnabled(true);
          setUserScrolledUp(false);
        }
        
        prevScrollTopRef.current = scrollTop;
        scrollTimeoutRef.current = null;
      }, 50);
    };

    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (chatContainer) {
        chatContainer.removeEventListener('scroll', handleScroll);
      }
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [userScrolledUp]);
  
  // 새 메시지 추가 시 스크롤 처리
  useEffect(() => {
    if (messages.length > prevMessagesLengthRef.current) {
      if (autoScrollEnabled && !userScrolledUp) {
        setTimeout(() => {
          if (messagesEndRef.current && autoScrollEnabled) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }, 100);
      }
    }
    
    prevMessagesLengthRef.current = messages.length;
  }, [messages, autoScrollEnabled, userScrolledUp]);
  
  // 컴포넌트 마운트 시 초기화
  useEffect(() => {
    setMessages([]);
    setFormData({});
    setCurrentStep(0);
    setSelectedMultiples([]);
    setQuantitySelection({
      currentLocationIndex: 0,
      selectedQuantities: {},
      locations: []
    });
    
    const firstQuestion = {
      id: nanoid(), // ✅ 고유 ID 생성
      type: 'system' as MessageType,
      content: FORM_STEPS[0].question,
      options: FORM_STEPS[0].options,
      field: FORM_STEPS[0].field
    };
    
    setMessages([firstQuestion]);
    setProgress(Math.min(100, Math.round((0 / FORM_STEPS.length) * 100)));
  }, []);

  // 메시지 추가 함수 - nanoid로 완전 고유 ID 생성
  const addMessage = (type: MessageType, content: string, options: string[] = [], field?: string) => {
    const newMessage: Message = {
      id: nanoid(), // ✅ 매번 고유한 ID 생성
      type,
      content,
      options,
      field,
    };
    setMessages(prev => [...prev, newMessage]);
  };
  
  // 다음 유효한 단계 찾기 (조건부 단계 스킵)
  const findNextValidStep = (currentStep: number, formData: FormData): number => {
    console.log('findNextValidStep 호출:', { currentStep, formData });
  
    for (let i = currentStep + 1; i < FORM_STEPS.length; i++) {
      const step = FORM_STEPS[i];
      
      console.log(`단계 ${i} 확인:`, {
        field: step.field,
        hasConditional: !!step.conditional,
        quantitySelection: step.quantitySelection
      });
      
      // 조건부 단계가 아니거나, 조건을 만족하는 경우
      if (!step.conditional || step.conditional(formData)) {
        const conditionResult = step.conditional ? step.conditional(formData) : true;
        console.log(`단계 ${i} 선택됨:`, {
          field: step.field,
          conditionResult,
          installationLocations: formData.installationLocations
        });
        return i;
      } else {
        console.log(`단계 ${i} 건너뜀:`, {
          field: step.field,
          installationLocations: formData.installationLocations,
          locationsLength: formData.installationLocations?.length
        });
      }
    }
    return FORM_STEPS.length; // 마지막 단계를 넘어선 경우
  };

  // 동적 옵션 생성 (사업장 규모에 따른 견적 방법)
  const generateDynamicOptions = (field: string, formData: FormData): string[] => {
    if (field === 'quoteMethod') {
      const size = formData.businessSize;
      const installationLocations = formData.installationLocations || [];
      const isLargeScale = size === '📋 20평~50평' || size === '🏭 50평 이상';
      const hasOutdoor = installationLocations.includes('🌳 실외/주차장');
      
      if (isLargeScale || hasOutdoor) {
        return [
          '🏠 출장 견적 (전문가 방문) - 정확한 맞춤 견적',
          '💻 온라인 견적 (빠른 견적) - 대략적인 견적'
        ];
      } else {
        return [
          '💻 다이렉트 가입 (최저가) - 바로 가입하고 설치 예약',
          '🏠 출장 견적 (전문가 방문) - 정확한 맞춤 견적'
        ];
      }
    }
    return [];
  };

  // ✨ 수량 선택 단계 처리
  const handleQuantityStep = () => {
    const locations = formData.installationLocations || [];
    const filteredLocations = locations.filter(loc => loc !== '📱 기타위치');
    
    if (quantitySelection.currentLocationIndex < filteredLocations.length) {
      const currentLocation = filteredLocations[quantitySelection.currentLocationIndex];
      const question = `${currentLocation}에 몇 대의 CCTV를 설치하시겠어요?`;
      
      addMessage('system', question, ['1대', '2대', '3대', '4대 이상'], 'installationQuantities');
    } else {
      // 모든 위치의 수량 선택 완료
      const totalQuantity = Object.values(quantitySelection.selectedQuantities).reduce((sum, qty) => sum + qty, 0);
      const summaryText = Object.entries(quantitySelection.selectedQuantities)
        .map(([location, quantity]) => `${location}: ${quantity}대`)
        .join(', ');
      
      addMessage('user', `총 ${totalQuantity}대 (${summaryText})`);
      
      // FormData에 저장
      setFormData(prev => ({ ...prev, installationQuantities: quantitySelection.selectedQuantities }));
      
      // 다음 단계로
      setTimeout(() => {
        goToNextStep();
      }, 500);
    }
  };

  // 다음 단계로 이동
  const goToNextStep = () => {
    const nextStep = findNextValidStep(currentStep, formData);
    if (nextStep < FORM_STEPS.length) {
      const step = FORM_STEPS[nextStep];
      
      // ✨ 수량 선택 단계인 경우 특별 처리
      if (step.quantitySelection) {
        const locations = formData.installationLocations || [];
        const filteredLocations = locations.filter(loc => loc !== '📱 기타위치');
        
        if (filteredLocations.length > 0) {
          setQuantitySelection({
            currentLocationIndex: 0,
            selectedQuantities: {},
            locations: filteredLocations
          });
          
          const firstLocation = filteredLocations[0];
          const question = `${firstLocation}에 몇 대의 CCTV를 설치하시겠어요?`;
          
          addMessage('system', question, step.options || [], step.field);
          setCurrentStep(nextStep);
          setProgress(Math.min(100, Math.round((nextStep / FORM_STEPS.length) * 100)));
          return;
        }
      }
      
      // 동적 옵션 생성
      let options = step.options || [];
      if (step.dynamic && step.field) {
        options = generateDynamicOptions(step.field, formData);
      }
      
      addMessage('system', step.question, options, step.field);
      setCurrentStep(nextStep);
      setProgress(Math.min(100, Math.round((nextStep / FORM_STEPS.length) * 100)));
    } else {
      handleSubmit();
    }
  };
  
  // 다중 선택 처리 함수
  const handleMultipleSelect = (option: string, field: string) => {
    const currentStepObj = FORM_STEPS.find(step => step.field === field);
    if (!currentStepObj?.multiple) return;
    
    let newSelections = [...selectedMultiples];
    
    if (newSelections.includes(option)) {
      newSelections = newSelections.filter(item => item !== option);
    } else {
      newSelections.push(option);
    }
    
    setSelectedMultiples(newSelections);
    
    // 필수 선택 확인 (개인정보 처리방침 동의는 필수)
    if (field === 'agreeTerms') {
      const hasRequired = newSelections.some(item => item.includes('필수'));
      if (hasRequired && newSelections.length >= 1) {
        console.log('🔄 agreeTerms formData 업데이트:', newSelections);
        const updatedFormData = { ...formData, [field]: newSelections };
        setFormData(updatedFormData);
        addMessage('user', newSelections.join(', '));
        setSelectedMultiples([]);
        
        setTimeout(() => {
          console.log('🚀 agreeTerms 다음 단계 이동, 업데이트된 formData:', updatedFormData);
          goToNextStep();
        }, 500);
      }
    } else {
      // 설치 위치 선택의 경우 최소 1개 선택하면 다음으로
      if (newSelections.length >= 1) {
        console.log('🔄 installationLocations formData 업데이트:', newSelections);
        const updatedFormData = { ...formData, [field]: newSelections };
        setFormData(updatedFormData);
        addMessage('user', newSelections.join(', '));
        setSelectedMultiples([]);
        
        setTimeout(() => {
          console.log('🚀 installationLocations 다음 단계 이동, 업데이트된 formData:', updatedFormData);
          // 업데이트된 formData를 직접 전달 (현재 단계 번호 사용)
          const nextStep = findNextValidStep(currentStep, updatedFormData);
          if (nextStep < FORM_STEPS.length) {
            const step = FORM_STEPS[nextStep];
            
            console.log('🎯 다음 단계 확인:', { nextStep, field: step.field, quantitySelection: step.quantitySelection });
            
            // ✨ 수량 선택 단계인 경우 특별 처리
            if (step.quantitySelection) {
              console.log('🔥 수량 선택 단계 진입!');
              const locations = updatedFormData.installationLocations || [];
              const filteredLocations = locations.filter(loc => loc !== '📱 기타위치');
              
              if (filteredLocations.length > 0) {
                setQuantitySelection({
                  currentLocationIndex: 0,
                  selectedQuantities: {},
                  locations: filteredLocations
                });
                
                const firstLocation = filteredLocations[0];
                const question = `${firstLocation}에 몇 대의 CCTV를 설치하시겠어요?`;
                
                addMessage('system', question, step.options || [], step.field);
                setCurrentStep(nextStep);
                setProgress(Math.min(100, Math.round((nextStep / FORM_STEPS.length) * 100)));
                return;
              }
            }
            
            // 일반 단계 처리
            let options = step.options || [];
            if (step.dynamic && step.field) {
              options = generateDynamicOptions(step.field, updatedFormData);
            }
            
            addMessage('system', step.question, options, step.field);
            setCurrentStep(nextStep);
            setProgress(Math.min(100, Math.round((nextStep / FORM_STEPS.length) * 100)));
          } else {
            handleSubmit();
          }
        }, 500);
      }
    }
  };
  
  // ✨ 수량 선택 처리 함수
  const handleQuantitySelect = (quantity: string) => {
    console.log('🔥 handleQuantitySelect 호출됨:', quantity);
    console.log('현재 quantitySelection 상태:', quantitySelection);
    console.log('현재 formData.installationLocations:', formData.installationLocations);
    
    // ✨ quantitySelection.locations 사용으로 상태 동기화 문제 해결
    const filteredLocations = quantitySelection.locations;
    const currentLocation = filteredLocations[quantitySelection.currentLocationIndex];
    
    console.log('filteredLocations:', filteredLocations);
    console.log('currentLocation:', currentLocation);
    console.log('currentLocationIndex:', quantitySelection.currentLocationIndex);
    
    // 수량 문자열을 숫자로 변환
    const quantityNum = quantity === '4대 이상' ? 4 : parseInt(quantity);
    
    // 현재 위치의 수량 저장
    const newSelectedQuantities = {
      ...quantitySelection.selectedQuantities,
      [currentLocation]: quantityNum
    };
    
    console.log('newSelectedQuantities:', newSelectedQuantities);
    
    addMessage('user', `${currentLocation}: ${quantity}`);
    
    // 다음 위치로 이동
    const nextLocationIndex = quantitySelection.currentLocationIndex + 1;
    
    console.log('nextLocationIndex:', nextLocationIndex, 'filteredLocations.length:', filteredLocations.length);
    
    if (nextLocationIndex < filteredLocations.length) {
      // 다음 위치 질문
      console.log('다음 위치로 이동 중...');
      setQuantitySelection({
        currentLocationIndex: nextLocationIndex,
        selectedQuantities: newSelectedQuantities,
        locations: quantitySelection.locations
      });
      
      setTimeout(() => {
        const nextLocation = filteredLocations[nextLocationIndex];
        const question = `${nextLocation}에 몇 대의 CCTV를 설치하시겠어요?`;
        console.log('다음 질문 추가:', question);
        addMessage('system', question, ['1대', '2대', '3대', '4대 이상'], 'installationQuantities');
      }, 500);
    } else {
      // 모든 위치 선택 완료
      console.log('모든 위치 선택 완료!');
      setQuantitySelection({
        currentLocationIndex: nextLocationIndex,
        selectedQuantities: newSelectedQuantities,
        locations: quantitySelection.locations
      });
      
      const totalQuantity = Object.values(newSelectedQuantities).reduce((sum, qty) => sum + qty, 0);
      const summaryText = Object.entries(newSelectedQuantities)
        .map(([location, qty]) => `${location}: ${qty}대`)
        .join(', ');
      
      // FormData에 저장
      setFormData(prev => ({ ...prev, installationQuantities: newSelectedQuantities }));
      
      setTimeout(() => {
        addMessage('user', `✅ 총 ${totalQuantity}대 선택 완료!`);
        setTimeout(() => {
          console.log('다음 단계로 이동');
          goToNextStep();
        }, 500);
      }, 500);
    }
  };
  
  // 옵션 선택 함수
  const handleOptionSelect = (option: string, field?: string) => {
    console.log('🚨 handleOptionSelect 호출됨:', option, 'field:', field);
    if (!field) return;
    
    const currentStep = FORM_STEPS.find(step => step.field === field);
    console.log('currentStep:', currentStep);
    console.log('quantitySelection 플래그:', currentStep?.quantitySelection);
    
    // ✨ 수량 선택 단계인 경우
    if (currentStep?.quantitySelection) {
      console.log('수량 선택 단계로 인식됨 - handleQuantitySelect 호출');
      handleQuantitySelect(option);
      return;
    }
    
    // 다중 선택인 경우
    if (currentStep?.multiple) {
      console.log('다중 선택 단계로 인식됨');
      handleMultipleSelect(option, field);
      return;
    }
    
    // 일반 선택인 경우
    console.log('일반 선택으로 처리됨 - 다음 단계로 이동');
    addMessage('user', option);
    setFormData(prev => ({ ...prev, [field]: option }));
    
    setAutoScrollEnabled(true);
    setUserScrolledUp(false);
    
    setTimeout(() => {
      goToNextStep();
    }, 500);
  };
  
  // 텍스트 입력 처리
  const handleTextInput = (e: React.FormEvent<HTMLFormElement>, field?: string) => {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    const inputElement = formElement.elements[0] as HTMLInputElement;
    const value = inputElement.value.trim();
    
    if (value && field) {
      setFormData(prev => ({ ...prev, [field]: value }));
      addMessage('user', value);
      inputElement.value = '';
      goToNextStep();
    }
  };
  
  // 폼 제출 처리
  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // ✨ 실제 구현에서는 API 호출로 데이터 전송
    console.log('🎯 케어온 CCTV 렌탈 견적 요청 데이터:', formData);
    console.log('📊 설치 수량 상세:', formData.installationQuantities);
    
    setTimeout(() => {
      setIsSubmitted(true);
      setIsSubmitting(false);
    }, 1000);
  };
  
  if (isSubmitted) {
    return (
      <div className="max-w-md mx-auto px-4 py-12 text-center">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center space-x-2 justify-center mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-white">C</span>
            </div>
            <span className="text-xl font-bold text-gray-900">케어온</span>
          </div>
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="text-white w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold mb-6 text-primary">견적 요청이 완료되었습니다!</h1>
          
          {/* ✨ 선택한 수량 정보 표시 */}
          {formData.installationQuantities && (
            <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold text-gray-800 mb-2">📹 선택하신 CCTV 설치 정보</h3>
              <div className="space-y-1 text-sm text-gray-600">
                {Object.entries(formData.installationQuantities).map(([location, quantity]) => (
                  <div key={location} className="flex justify-between">
                    <span>{location}</span>
                    <span className="font-medium text-primary">{quantity}대</span>
                  </div>
                ))}
                <div className="border-t pt-2 mt-2 flex justify-between font-semibold text-primary">
                  <span>총 설치 수량</span>
                  <span>{Object.values(formData.installationQuantities).reduce((sum, qty) => sum + qty, 0)}대</span>
                </div>
              </div>
            </div>
          )}
          
          <p className="text-lg mb-4">
            CCTV 렌탈 전문 상담사가 <strong>24시간 이내</strong>에 연락드립니다.
          </p>
          <p className="text-sm text-gray-600 mb-8">
            • 맞춤형 렌탈 플랜 제안<br/>
            • 현장 방문 상담 일정 조율<br/>
            • 설치 및 관리 서비스 안내
          </p>
          <div className="space-y-3">
            <Link 
              href="/products/cctv" 
              className="block bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-8 rounded-lg transition duration-300"
            >
              CCTV 상품 더보기
            </Link>
            <Link 
              href="/" 
              className="block bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
            >
              홈으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto h-screen flex flex-col bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white p-4 flex items-center border-b">
        <Link href="/products/cctv" className="mr-2">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <div className="flex items-center space-x-2 flex-1 justify-center">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-primary">
            <span className="text-xs font-bold text-white">C</span>
          </div>
          <h1 className="text-lg font-semibold">CCTV 렌탈 견적</h1>
        </div>
        <div className="w-6"></div>
      </header>
      
      {/* 진행 상태 표시 */}
      <div className="bg-white px-4 py-2 border-b">
        <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden">
          <div 
            className="bg-primary h-full rounded-full transition-all duration-500 ease-in-out" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-right text-xs text-primary mt-1">{progress}%</p>
      </div>
      
      {/* 채팅 영역 */}
      <div 
        ref={chatContainerRef} 
        className="flex-1 overflow-y-auto p-4 space-y-4"
        style={{ scrollBehavior: 'smooth' }}
      >
        {messages.map(message => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            {message.type === 'system' && (
              <div className="bg-white rounded-lg p-3 shadow-sm max-w-[80%] break-words">
                <div dangerouslySetInnerHTML={{ __html: message.content }} />
                
                {message.options && message.options.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {/* 수량 선택 단계인지 확인 */}
                    {(() => {
                      const currentStep = FORM_STEPS.find(s => s.field === message.field);
                      const isQuantitySelection = currentStep?.quantitySelection;
                      console.log('🔍 UI 조건문 체크:', {
                        messageField: message.field,
                        currentStep: currentStep,
                        quantitySelection: isQuantitySelection,
                        isQuantitySelectionUI: !!isQuantitySelection
                      });
                      return isQuantitySelection;
                    })() ? (
                      // 수량 선택 UI
                      <div className="space-y-3">
                        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                          <div className="flex items-center gap-2 text-blue-700 font-medium mb-2">
                            <span className="text-lg">📍</span>
                            <span>위치별 CCTV 대수 선택</span>
                          </div>
                          <p className="text-sm text-blue-600">
                            선택하신 각 위치별로 필요한 CCTV 대수를 선택해주세요.
                          </p>
                        </div>
                        
                        {message.options.map((option, index) => (
                          <button
                            key={`${message.id}-qty-${index}-${nanoid()}`}
                            onClick={() => handleQuantitySelect(option)}
                            className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-primary hover:bg-primary/5 transition-all duration-200 bg-white"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-gray-800">{option}</span>
                              <span className="text-primary">→</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      // 일반 옵션 선택 UI
                      message.options.map((option, index) => {
                        const currentStep = FORM_STEPS.find(s => s.field === message.field);
                        const isMultiple = currentStep?.multiple;
                        const isSelected = selectedMultiples.includes(option);
                        
                        return (
                          <button
                            key={`${message.id}-opt-${index}-${nanoid()}`}
                            onClick={() => handleOptionSelect(option, message.field)}
                            className={`block w-full text-left p-2 rounded-lg transition-colors ${
                              isMultiple
                                ? isSelected 
                                  ? 'bg-primary text-white' 
                                  : 'bg-gray-100 hover:bg-gray-200'
                                : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                          >
                            {isMultiple && (
                              <span className="mr-2">
                                {isSelected ? '✅' : '☐'}
                              </span>
                            )}
                            {option}
                          </button>
                        );
                      })
                    )}
                    
                    {/* 다중 선택에서 확인 버튼 */}
                    {FORM_STEPS.find(s => s.field === message.field)?.multiple && selectedMultiples.length > 0 && (
                      <button
                        onClick={() => {
                          const field = message.field!;
                          const currentStep = FORM_STEPS.find(step => step.field === field);
                          
                          // 필수 선택 확인
                          if (field === 'agreeTerms') {
                            const hasRequired = selectedMultiples.some(item => item.includes('필수'));
                            if (!hasRequired) {
                              alert('개인정보 처리방침 동의(필수)를 선택해주세요.');
                              return;
                            }
                          }
                          
                          setFormData(prev => ({ ...prev, [field]: selectedMultiples }));
                          addMessage('user', selectedMultiples.join(', '));
                          setSelectedMultiples([]);
                          
                          setTimeout(() => {
                            goToNextStep();
                          }, 500);
                        }}
                        className="w-full bg-primary text-white p-3 rounded-lg hover:bg-primary/90 font-medium"
                      >
                        선택 완료 ({selectedMultiples.length}개)
                      </button>
                    )}
                  </div>
                )}
                
                {message.field && !message.options?.length && (
                  <form onSubmit={(e) => handleTextInput(e, message.field)} className="mt-3">
                    <input 
                      type={FORM_STEPS.find(s => s.field === message.field)?.inputType || 'text'}
                      className="w-full p-2 border rounded-lg"
                      placeholder={FORM_STEPS.find(s => s.field === message.field)?.placeholder || `${
                        message.field === 'businessName' ? '사업체명을' : 
                        message.field === 'contactName' ? '담당자명을' : 
                        message.field === 'phone' ? '연락처를' :
                        '내용을'
                      } 입력해주세요`}
                      required
                    />
                    <button 
                      type="submit" 
                      className="mt-2 w-full bg-primary text-white p-2 rounded-lg hover:bg-primary/90"
                    >
                      다음
                    </button>
                  </form>
                )}
              </div>
            )}
            
            {message.type === 'user' && (
              <div className="bg-primary text-white rounded-lg p-3 shadow-sm max-w-[80%] break-words">
                <p>{message.content}</p>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* 하단 제출 버튼 */}
      {!isSubmitting && !isSubmitted && (
        <div className="bg-white p-4 border-t sticky bottom-0 z-10">
          <button
            onClick={handleSubmit}
            className="w-full bg-primary text-white p-3 rounded-lg font-medium hover:bg-primary/90 disabled:bg-gray-300"
            disabled={!formData.contactName || !formData.phone}
          >
            {isSubmitting ? '처리 중...' : '무료 견적 요청하기'}
          </button>
        </div>
      )}
    </div>
  );
};

export default CCTVRentalQuote; 