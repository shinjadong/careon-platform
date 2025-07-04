"use client";

import { PageBuilder } from "@/components/page-builder/page-builder";
import { Block } from "@/types/page-builder";

export default function LandingPage() {
  // 기존 랜딩 페이지 내용을 블록 형태로 변환
  const initialBlocks: Block[] = [
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
        html: `
          <div class="bg-blue-600 text-white py-2 px-4 text-center">
            <p class="text-sm font-semibold">
              🎉 신규 가입 고객 한정! 첫 달 렌탈료 50% 할인 + 설치비 무료
            </p>
          </div>
        `
      }
    },
    {
      id: "stats-1",
      type: "html",
      content: {
        html: `
          <div class="grid md:grid-cols-4 gap-6 mt-16">
            <div class="p-6 text-center bg-white/80 backdrop-blur border border-blue-100 rounded-lg">
              <div class="text-3xl font-bold text-blue-600 mb-2">15,000+</div>
              <div class="text-sm text-gray-600">누적 고객사</div>
            </div>
            <div class="p-6 text-center bg-white/80 backdrop-blur border border-blue-100 rounded-lg">
              <div class="text-3xl font-bold text-blue-600 mb-2">98%</div>
              <div class="text-sm text-gray-600">고객 만족도</div>
            </div>
            <div class="p-6 text-center bg-white/80 backdrop-blur border border-blue-100 rounded-lg">
              <div class="text-3xl font-bold text-blue-600 mb-2">24시간</div>
              <div class="text-sm text-gray-600">A/S 대응</div>
            </div>
            <div class="p-6 text-center bg-white/80 backdrop-blur border border-blue-100 rounded-lg">
              <div class="text-3xl font-bold text-blue-600 mb-2">300억+</div>
              <div class="text-sm text-gray-600">연간 거래액</div>
            </div>
          </div>
        `
      },
      settings: {
        backgroundColor: "#f8fafc",
        padding: { top: 80, bottom: 80 }
      }
    },
    {
      id: "heading-1",
      type: "heading",
      content: {
        text: "왜 케어온인가?",
        level: 2
      },
      settings: {
        alignment: "center",
        margin: { top: 40, bottom: 20 }
      }
    },
    {
      id: "text-1",
      type: "text",
      content: {
        text: "대한민국 1위 B2B 렌탈 플랫폼의 차별화된 가치",
        format: "plain"
      },
      settings: {
        alignment: "center",
        margin: { bottom: 60 }
      }
    },
    {
      id: "features-1",
      type: "html",
      content: {
        html: `
          <div class="grid md:grid-cols-3 gap-8">
            <div class="p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4">신뢰할 수 있는 파트너</h3>
              <ul class="space-y-3 text-gray-600">
                <li class="flex items-start">
                  <svg class="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span>본사 직계약으로 최저가 보장</span>
                </li>
                <li class="flex items-start">
                  <svg class="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span>300억 이상 자산 보유</span>
                </li>
                <li class="flex items-start">
                  <svg class="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span>정직원 300명 이상</span>
                </li>
              </ul>
            </div>

            <div class="p-8 bg-blue-50/30 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-blue-200">
              <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4">매출 성장 지원</h3>
              <ul class="space-y-3 text-gray-600">
                <li class="flex items-start">
                  <svg class="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span>업종별 맞춤 컨설팅</span>
                </li>
                <li class="flex items-start">
                  <svg class="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span>마케팅 솔루션 제공</span>
                </li>
                <li class="flex items-start">
                  <svg class="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span>운영 효율화 시스템</span>
                </li>
              </ul>
            </div>

            <div class="p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4">완벽한 사후 관리</h3>
              <ul class="space-y-3 text-gray-600">
                <li class="flex items-start">
                  <svg class="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span>24시간 긴급 A/S</span>
                </li>
                <li class="flex items-start">
                  <svg class="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span>정기 점검 서비스</span>
                </li>
                <li class="flex items-start">
                  <svg class="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span>평생 무상 업그레이드</span>
                </li>
              </ul>
            </div>
          </div>
        `
      },
      settings: {
        backgroundColor: "#f8fafc",
        padding: { top: 80, bottom: 80 }
      }
    },
    {
      id: "spacer-1",
      type: "spacer",
      content: { height: 80 }
    },
    {
      id: "image-demo-1",
      type: "image",
      content: {
        src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
        alt: "현대적인 사무실 환경",
        caption: "최신 장비로 완벽하게 구성된 사무 공간",
        objectFit: "cover"
      },
      settings: {
        alignment: "center",
        margin: { top: 40, bottom: 40 }
      }
    },
    {
      id: "gif-demo-1",
      type: "image",
      content: {
        src: "https://media.giphy.com/media/3oKIPEqDGUULpEU0aQ/giphy.gif",
        alt: "성공적인 비즈니스 성장을 나타내는 애니메이션",
        caption: "케어온과 함께하는 성장의 여정 🚀",
        objectFit: "contain",
        width: 600,
        height: 400
      },
      settings: {
        alignment: "center",
        margin: { top: 40, bottom: 40 }
      }
    },
    {
      id: "markdown-demo-1",
      type: "text",
      content: {
        text: `# 🎯 케어온의 차별화된 서비스

## ✨ 주요 특징

- **전문 상담**: 업종별 맞춤 컨설팅
- **빠른 설치**: 평균 **3일 이내** 완료
- **24/7 지원**: 언제든 문의 가능

> 💡 **팁**: 렌탈 서비스로 초기 비용을 최대 **70%** 절약하세요!

### 📞 지금 바로 상담받기

1. 전화 상담: **1588-1234**
2. 온라인 상담: [카카오톡 채널](https://open.kakao.com/)
3. 방문 상담: 예약 후 무료 방문

---

*케어온과 함께라면 성공이 보장됩니다* ✨`,
        format: "markdown"
      },
      settings: {
        backgroundColor: "#f8fafc",
        padding: { top: 40, bottom: 40, left: 20, right: 20 },
        margin: { top: 40, bottom: 40 }
      }
    },
    {
      id: "video-demo-1",
      type: "video",
      content: {
        src: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        type: "youtube",
        autoplay: false,
        controls: true
      },
      settings: {
        alignment: "center",
        margin: { top: 40, bottom: 40 }
      }
    },
    {
      id: "cta-1",
      type: "html",
      content: {
        html: `
          <div id="contact-form" class="bg-blue-600 text-white py-20 px-4">
            <div class="max-w-4xl mx-auto text-center">
              <h2 class="text-4xl font-bold mb-4">지금 바로 무료 견적을 받아보세요</h2>
              <p class="text-xl opacity-90 mb-8">전문 컨설턴트가 최적의 솔루션을 제안해드립니다</p>
              <div class="bg-white text-gray-900 rounded-lg p-8">
                <form class="space-y-6">
                  <div class="grid md:grid-cols-2 gap-6">
                    <div>
                      <label class="block text-sm font-medium mb-2 text-left">업체명</label>
                      <input type="text" placeholder="업체명을 입력하세요" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-2 text-left">연락처</label>
                      <input type="tel" placeholder="010-1234-5678" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-2 text-left">업종 선택</label>
                    <select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                      <option value="">업종을 선택하세요</option>
                      <option value="restaurant">요식업</option>
                      <option value="cafe">카페</option>
                      <option value="beauty">미용실/네일샵</option>
                      <option value="convenience">편의점</option>
                      <option value="office">사무실</option>
                      <option value="fitness">헬스장/필라테스</option>
                      <option value="other">기타</option>
                    </select>
                  </div>
                  <div class="space-y-3">
                    <label class="flex items-center space-x-3 cursor-pointer">
                      <input type="checkbox" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" required>
                      <span class="text-sm text-gray-700">(필수) 개인정보 수집 및 이용에 동의합니다</span>
                    </label>
                    <label class="flex items-center space-x-3 cursor-pointer">
                      <input type="checkbox" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
                      <span class="text-sm text-gray-700">(선택) 마케팅 정보 수신에 동의합니다</span>
                    </label>
                  </div>
                  <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg text-lg font-semibold transition-colors">
                    무료 견적 받기
                  </button>
                </form>
              </div>
            </div>
          </div>
        `
      }
    },
    {
      id: "button-demo-1",
      type: "button",
      content: {
        text: "카카오톡으로 상담하기",
        link: "https://open.kakao.com/",
        variant: "outline",
        size: "lg"
      },
      settings: {
        alignment: "center",
        margin: { top: 40, bottom: 40 }
      }
    }
  ];

  const handleSave = (blocks: Block[]) => {
    // 여기에 데이터베이스 저장 로직 추가
    console.log('저장된 블록들:', blocks);
    localStorage.setItem('careon-landing-blocks', JSON.stringify(blocks));
  };

  return (
    <div className="min-h-screen">
      <PageBuilder initialBlocks={initialBlocks} onSave={handleSave} />
    </div>
  );
}