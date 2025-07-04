'use client';

import { useState, useEffect, useMemo } from "react";
import { Block } from "@/types/page-builder";
import { BlockRenderer } from "@/components/page-builder/block-renderer";
import Link from "next/link";

// 고객용 동적 랜딩 페이지 (페이지 빌더 연동)
export default function LandingPage() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 기본 블록 데이터 (편집된 데이터가 없을 때 사용)
  const defaultBlocks: Block[] = useMemo(() => [
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
      id: "form-1",
      type: "html",
      content: {
        html: `<div class="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
  <h2 class="text-3xl font-bold text-center text-gray-900 mb-4">지금 바로 무료 견적을 받아보세요</h2>
  <p class="text-center text-gray-600 mb-8">전문 컨설턴트가 최적의 솔루션을 제안해드립니다</p>
  
  <form class="space-y-6">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">업체명</label>
      <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
    </div>
    
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">연락처</label>
      <input type="tel" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
    </div>
    
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">업종 선택</label>
      <select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
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
  ], []);

  // 컴포넌트 마운트 시 저장된 블록 데이터 불러오기
  useEffect(() => {
    try {
      const savedBlocks = localStorage.getItem('landingPageBlocks');
      if (savedBlocks) {
        const parsedBlocks = JSON.parse(savedBlocks);
        console.log('저장된 블록 데이터 불러오기 성공:', parsedBlocks.length, '개 블록');
        setBlocks(parsedBlocks);
      } else {
        console.log('저장된 블록 데이터 없음, 기본 블록 사용');
        setBlocks(defaultBlocks);
      }
    } catch (error) {
      console.error('블록 데이터 불러오기 실패:', error);
      setBlocks(defaultBlocks);
    } finally {
      setIsLoading(false);
    }
  }, [defaultBlocks]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">페이지를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 편집 버튼 (우상단) */}
      <div className="fixed top-4 right-4 z-50">
        <Link
          href="/landing/edit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors flex items-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <span>편집</span>
        </Link>
      </div>

      {/* 동적 블록 렌더링 */}
      <div className="space-y-0">
        {blocks.map((block) => (
          <BlockRenderer
            key={block.id}
            block={block}
            isEditing={false}
          />
        ))}
      </div>

      {/* 푸터 (고정) */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">케어온</h3>
              <p className="text-gray-300">
                사업 성공의 파트너<br />
                믿을 수 있는 B2B 렌탈 서비스
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">서비스</h4>
              <ul className="space-y-2 text-gray-300">
                <li>장비 렌탈</li>
                <li>매장 컨설팅</li>
                <li>A/S 서비스</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">고객지원</h4>
              <ul className="space-y-2 text-gray-300">
                <li>전화: 1588-1234</li>
                <li>이메일: help@careon.co.kr</li>
                <li>운영시간: 09:00~18:00</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">회사정보</h4>
              <ul className="space-y-2 text-gray-300">
                <li>서울시 강남구 테헤란로</li>
                <li>사업자등록번호: 123-45-67890</li>
                <li>대표: 김대표</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 케어온. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}