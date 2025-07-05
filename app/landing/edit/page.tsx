'use client';

import { useState, useEffect } from "react";
import { PageBuilder } from "@/components/page-builder/page-builder";
import { Block } from "@/types/page-builder";
import { IPageResponse } from "@/types";

// 관리자용 랜딩 페이지 편집기
export default function LandingEditPage() {
  const [initialBlocks, setInitialBlocks] = useState<Block[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 기본 블록 데이터
  const defaultBlocks: Block[] = [
    {
      id: "hero-1",
      type: "hero",
      content: {
        title: "사업 성공의 파트너\n케어온이 함께합니다",
        subtitle: "프랜차이즈 창업부터 매장 운영까지, 필요한 모든 장비를 한 번에.\n초기 투자 부담은 줄이고, 매출 성장에만 집중하세요.",
        backgroundImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1926&q=80",
        overlay: true,
        overlayOpacity: 0.6,
        buttons: [
          { text: "무료 견적 받기", link: "#contact-form", variant: "default", size: "lg" },
          { text: "상품 카탈로그 보기", link: "#products", variant: "outline", size: "lg" }
        ]
      },
      settings: {
        margin: { bottom: 0 }
      }
    },
    {
      id: "announcement-1",
      type: "html",
      content: {
        html: `<div class="bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 text-center">
          <p class="text-lg font-semibold">🎉 신규 가입 고객 한정! 첫 달 렌탈료 50% 할인 + 설치비 무료</p>
        </div>`
      },
      settings: {
        margin: { top: 0, bottom: 0 }
      }
    },
    {
      id: "stats-1",
      type: "html",
      content: {
        html: `<div class="py-16 bg-gray-50">
          <div class="container mx-auto px-4">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div class="text-4xl font-bold text-primary mb-2">15,000+</div>
                <div class="text-gray-600">누적 고객사</div>
              </div>
              <div>
                <div class="text-4xl font-bold text-primary mb-2">98%</div>
                <div class="text-gray-600">고객 만족도</div>
              </div>
              <div>
                <div class="text-4xl font-bold text-primary mb-2">24시간</div>
                <div class="text-gray-600">A/S 대응</div>
              </div>
              <div>
                <div class="text-4xl font-bold text-primary mb-2">300억+</div>
                <div class="text-gray-600">연간 거래액</div>
              </div>
            </div>
          </div>
        </div>`
      },
      settings: {
        margin: { top: 0, bottom: 0 }
      }
    },
    {
      id: "heading-1",
      type: "heading",
      content: {
        level: 2,
        text: "왜 케어온인가?"
      },
      settings: {
        margin: { top: 80, bottom: 20 }
      }
    },
    {
      id: "text-1",
      type: "text",
      content: {
        text: "대한민국 1위 B2B 렌탈 플랫폼의 차별화된 가치"
      },
      settings: {
        margin: { bottom: 60 }
      }
    },
    {
      id: "features-1",
      type: "html",
      content: {
        html: `<div class="grid md:grid-cols-3 gap-8 container mx-auto px-4">
          <div class="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 class="text-xl font-semibold mb-4">신뢰할 수 있는 파트너</h3>
            <ul class="text-gray-600 space-y-2">
              <li>• 본사 직계약으로 최저가 보장</li>
              <li>• 300억 이상 자산 보유</li>
              <li>• 정직원 300명 이상</li>
            </ul>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 class="text-xl font-semibold mb-4">매출 성장 지원</h3>
            <ul class="text-gray-600 space-y-2">
              <li>• 업종별 맞춤 컨설팅</li>
              <li>• 마케팅 솔루션 제공</li>
              <li>• 운영 효율화 시스템</li>
            </ul>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 class="text-xl font-semibold mb-4">완벽한 사후 관리</h3>
            <ul class="text-gray-600 space-y-2">
              <li>• 24시간 긴급 A/S</li>
              <li>• 정기 점검 서비스</li>
              <li>• 평생 무상 업그레이드</li>
            </ul>
          </div>
        </div>`
      },
      settings: {
        margin: { bottom: 80 }
      }
    },
    {
      id: "spacer-1",
      type: "spacer",
      content: {
        height: 80
      },
      settings: {}
    },
    {
      id: "image-1",
      type: "image",
      content: {
        src: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
        alt: "현대적인 사무실 환경",
        caption: "최신 장비로 완벽하게 구성된 사무 공간",
        width: 600,
        height: 400
      },
      settings: {
        margin: { bottom: 40 }
      }
    },
    {
      id: "video-1",
      type: "video",
      content: {
        src: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        type: "youtube"
      },
      settings: {
        margin: { bottom: 40 }
      }
    },
    {
      id: "html-content-1",
      type: "html",
      content: {
        html: `<div class="bg-gray-50 p-8 rounded-lg max-w-4xl mx-auto">
  <h1 class="text-3xl font-bold text-gray-900 mb-6">🎯 케어온의 차별화된 서비스</h1>
  
  <h2 class="text-2xl font-semibold text-gray-800 mb-4">✨ 주요 특징</h2>
  <ul class="list-disc ml-6 mb-6 space-y-2">
    <li><strong>전문 상담</strong>: 업종별 맞춤 컨설팅</li>
    <li><strong>빠른 설치</strong>: 평균 <strong>3일 이내</strong> 완료</li>
    <li><strong>24/7 지원</strong>: 언제든 문의 가능</li>
  </ul>
  
  <blockquote class="border-l-4 border-blue-500 pl-4 italic text-gray-700 mb-6">
    💡 <strong>팁</strong>: 렌탈 서비스로 초기 비용을 최대 <strong>70%</strong> 절약하세요!
  </blockquote>
  
  <h3 class="text-xl font-semibold text-gray-800 mb-4">📞 지금 바로 상담받기</h3>
  <ol class="list-decimal ml-6 mb-6 space-y-1">
    <li>전화 상담: <strong>1588-1234</strong></li>
    <li>온라인 상담: 카카오톡 채널</li>
    <li>방문 상담: 예약 후 무료 방문</li>
  </ol>
  
  <hr class="my-6">
  
  <p class="text-center text-gray-600 italic">케어온과 함께라면 성공이 보장됩니다 ✨</p>
</div>`
      },
      settings: {
        margin: { bottom: 40 }
      }
    },
    {
      id: "form-1",
      type: "html",
      content: {
        html: `<div class="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
  <h2 class="text-3xl font-bold text-center text-gray-900 mb-4">지금 바로 무료 견적을 받아보세요</h2>
  <p class="text-center text-gray-600 mb-8">전문 컨설턴트가 최적의 솔루션을 제안해드립니다</p>
  
  <form class="space-y-6">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">업체명</label>
      <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
    </div>
    
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">연락처</label>
      <input type="tel" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
    </div>
    
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">업종 선택</label>
      <select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option>업종을 선택하세요</option>
        <option>요식업</option>
        <option>카페</option>
        <option>미용실/네일샵</option>
        <option>편의점</option>
        <option>사무실</option>
        <option>헬스장/필라테스</option>
        <option>기타</option>
      </select>
    </div>
    
    <div class="space-y-2">
      <label class="flex items-center">
        <input type="checkbox" class="mr-2" required>
        <span class="text-sm">(필수) 개인정보 수집 및 이용에 동의합니다</span>
      </label>
      <label class="flex items-center">
        <input type="checkbox" class="mr-2">
        <span class="text-sm">(선택) 마케팅 정보 수신에 동의합니다</span>
      </label>
    </div>
    
    <button type="submit" class="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 font-semibold">
      무료 견적 받기
    </button>
  </form>
</div>`
      },
      settings: {
        margin: { bottom: 40 }
      }
    },
    {
      id: "kakao-button-1",
      type: "button",
      content: {
        text: "카카오톡으로 상담하기",
        link: "#",
        variant: "outline",
        size: "lg"
      },
      settings: {
        margin: { bottom: 40 }
      }
    }
  ];

  // 컴포넌트 마운트 시 기존 페이지 데이터 불러오기
  useEffect(() => {
    const loadPageData = async () => {
      try {
        const response = await fetch('/api/pages/landing');
        if (response.ok) {
          const result: IPageResponse = await response.json();
          if (result.success && result.data && result.data.blocks.length > 0) {
            console.log('서버에서 페이지 데이터 불러오기 성공:', result.data.blocks.length, '개 블록');
            setInitialBlocks(result.data.blocks);
          } else {
            console.log('서버에 페이지 데이터 없음, 기본 블록 사용');
            setInitialBlocks(defaultBlocks);
          }
        } else {
          console.log('페이지 데이터 조회 실패, 기본 블록 사용');
          setInitialBlocks(defaultBlocks);
        }
      } catch (error) {
        console.error('페이지 데이터 불러오기 중 오류:', error);
        setInitialBlocks(defaultBlocks);
      } finally {
        setIsLoading(false);
      }
    };

    loadPageData();
  }, []);

  // 페이지 저장 핸들러
  const handleSave = async (blocks: Block[]) => {
    try {
      console.log('페이지 저장 시작:', blocks.length, '개 블록');
      
      // API 엔드포인트 호출
      const response = await fetch('/api/pages/landing', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: '케어온 랜딩 페이지',
          blocks: blocks,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('서버 응답 에러:', errorText);
        throw new Error(`서버 오류: ${response.status}`);
      }

      const result = await response.json();
      console.log('서버 응답:', result);
      
      // localStorage에도 저장 (백업)
      if (typeof window !== 'undefined') {
        localStorage.setItem('landingPageData', JSON.stringify(blocks));
      }
      
      // 저장 성공 메시지
      console.log('페이지 저장 완료:', blocks.length, '개 블록');
      alert('페이지가 성공적으로 저장되었습니다!');
      
    } catch (error) {
      console.error('페이지 저장 실패:', error);
      alert('페이지 저장에 실패했습니다. 다시 시도해주세요.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">페이지 데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 편집자 헤더 */}
      <div className="bg-white border-b px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <h1 className="text-xl font-semibold text-gray-900">랜딩 페이지 편집기</h1>
          <div className="flex items-center space-x-4">
            <a 
              href="/landing" 
              target="_blank"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              실제 페이지 보기 →
            </a>
            <span className="text-sm text-gray-500">
              편집 후 저장하면 실제 웹사이트에 바로 반영됩니다
            </span>
          </div>
        </div>
      </div>

      {/* 페이지 빌더 */}
      <PageBuilder initialBlocks={initialBlocks} onSave={handleSave} />
    </div>
  );
}