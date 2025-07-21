import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CCTV 렌탈 서비스 - 케어온',
  description: '사업장 보안을 위한 CCTV 렌탈 서비스. 초기 투자 부담 없이 월 렌탈료로 시작하세요. 설치부터 관리까지 원스톱 서비스 제공.',
  openGraph: {
    title: 'CCTV 렌탈 서비스 - 케어온',
    description: '사업장 보안을 위한 CCTV 렌탈 서비스. 초기 투자 부담 없이 월 렌탈료로 시작하세요.',
    images: [
      {
        url: '/images/og-cctv-rental.png',
        width: 1200,
        height: 630,
        alt: 'CCTV 렌탈 서비스',
      },
    ],
  },
};

const CCTVRentalPage = () => {
  return (
    <>
      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 pb-24">
        <header className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-white">C</span>
            </div>
            <span className="text-xl font-bold text-gray-900">케어온</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">사업장 보안, 이제 렌탈로 시작하세요</h1>
          <p className="text-lg text-gray-600">
            초기 투자 부담 없이 월 렌탈료로 시작하는 CCTV 보안 솔루션. 설치부터 관리까지 케어온이 함께합니다.
          </p>
        </header>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">CCTV 렌탈, 왜 케어온일까요?</h2>
          <p className="mb-4">
            케어온 CCTV 렌탈은 단순한 장비 대여가 아닙니다. 사업장 보안 강화를 통해 고객 신뢰도를 높이고, 
            운영 효율성을 개선하여 매출 증대에 기여하는 비즈니스 파트너 역할을 합니다.
          </p>
          
          <div className="flex flex-col md:flex-row justify-between items-center bg-gray-50 p-4 rounded-lg mt-6">
            <div className="text-center mb-4 md:mb-0">
              <p className="text-sm text-gray-500">월 렌탈료 (2대 기준)</p>
              <p className="text-2xl font-bold">89,000원</p>
              <p className="text-sm text-primary">설치비 포함</p>
            </div>
            <div className="text-center mb-4 md:mb-0">
              <p className="text-sm text-gray-500">월 렌탈료 (4대 기준)</p>
              <p className="text-2xl font-bold text-primary">156,000원</p>
              <p className="text-sm text-primary">인기 상품</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">월 렌탈료 (8대 기준)</p>
              <p className="text-2xl font-bold">285,000원</p>
              <p className="text-sm text-primary">관리비 포함</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">케어온 CCTV 렌탈의 특별한 점</h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3 text-primary">💰 초기 투자 부담 ZERO</h3>
            <p className="text-gray-700">
              CCTV 구매 시 필요한 수백만원의 초기 투자 대신, 월 렌탈료만으로 최신 보안 시스템을 도입하세요. 
              설치비, 설정비까지 모두 포함된 가격으로 부담 없이 시작할 수 있습니다.
            </p>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3 text-primary">🛠️ 원스톱 관리 서비스</h3>
            <p className="text-gray-700 mb-3">
              설치부터 정기 점검, A/S까지 모든 관리를 케어온에서 책임집니다. 
              장비 고장이나 성능 저하 시 무상 교체 서비스를 제공하여 사업 운영에 차질이 없도록 지원합니다.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-3 text-primary">📱 스마트 모니터링</h3>
            <p className="text-gray-700 mb-3">
              모바일 앱을 통해 언제 어디서나 실시간 모니터링이 가능합니다. 
              야간에도 선명한 풀컬러 화면으로 사업장을 안전하게 보호하세요.
            </p>
            <p className="text-gray-700">
              AI 기반 이상 상황 감지 기능으로 도난, 화재 등의 상황을 즉시 알림으로 받을 수 있습니다.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">업종별 맞춤 CCTV 솔루션</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">🍴 음식점/카페</h3>
              <p className="text-gray-600 text-sm mb-3">주방, 홀, 카운터 통합 관리</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 주방 위생 관리 모니터링</li>
                <li>• 고객 안전 사고 대비</li>
                <li>• 직원 근무 상황 확인</li>
                <li>• 재고 관리 및 도난 방지</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">🛍️ 편의점/소매점</h3>
              <p className="text-gray-600 text-sm mb-3">출입구, 진열대, 계산대 커버</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 도난 및 무단 출입 방지</li>
                <li>• 고객 안전 사고 대응</li>
                <li>• 야간 보안 강화</li>
                <li>• 매출 분석용 고객 동선 파악</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">💼 사무실/오피스</h3>
              <p className="text-gray-600 text-sm mb-3">출입구, 복도, 중요 구역</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 출입 통제 및 보안 관리</li>
                <li>• 기밀 정보 보호</li>
                <li>• 직원 안전 관리</li>
                <li>• 야간/주말 보안</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">🏭 공장/창고</h3>
              <p className="text-gray-600 text-sm mb-3">생산라인, 저장고, 출입구</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 생산 과정 품질 관리</li>
                <li>• 안전사고 예방 및 대응</li>
                <li>• 원자재/완제품 관리</li>
                <li>• 야간 보안 및 출입 관리</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">고객 성공 사례</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 mb-2">
              <strong>분식 프랜차이즈 가맹점주 김○○님</strong>
            </p>
            <p className="text-gray-700 italic">
              "CCTV 설치 후 도난 사고가 완전히 사라졌어요. 특히 야간 폐점 후에도 안심이 되고, 
              직원들의 서비스 품질도 향상되어 고객 만족도가 눈에 띄게 좋아졌습니다. 
              월 렌탈료로 부담 없이 시작했는데 매출 증가 효과가 확실해서 너무 만족합니다!"
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">CCTV 렌탈 시작 가이드</h2>
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-1">무료 상담</h3>
              <p className="text-sm text-gray-600">사업장 규모와 특성에 맞는 최적의 솔루션 제안</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-1">현장 방문</h3>
              <p className="text-sm text-gray-600">전문가 현장 방문으로 정확한 설치 계획 수립</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-1">즉시 설치</h3>
              <p className="text-sm text-gray-600">계약 후 3영업일 내 전문 설치 완료</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold">4</span>
              </div>
              <h3 className="font-semibold mb-1">운영 시작</h3>
              <p className="text-sm text-gray-600">모바일 앱 교육 완료 후 바로 사용 가능</p>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Link href="/quote/cctv" className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
              무료 견적 받기
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">함께 찾는 서비스</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <Link href="/products/kiosk" className="text-center hover:text-primary">
              <div className="bg-gray-100 rounded-lg p-2 mb-2 h-24 flex items-center justify-center">
                <span>키오스크</span>
              </div>
            </Link>
            <Link href="/products/pos" className="text-center hover:text-primary">
              <div className="bg-gray-100 rounded-lg p-2 mb-2 h-24 flex items-center justify-center">
                <span>POS 시스템</span>
              </div>
            </Link>
            <Link href="/products/kitchen" className="text-center hover:text-primary">
              <div className="bg-gray-100 rounded-lg p-2 mb-2 h-24 flex items-center justify-center">
                <span>주방기기</span>
              </div>
            </Link>
            <Link href="/products/interior" className="text-center hover:text-primary">
              <div className="bg-gray-100 rounded-lg p-2 mb-2 h-24 flex items-center justify-center">
                <span>인테리어</span>
              </div>
            </Link>
            <Link href="/products" className="text-center hover:text-primary">
              <div className="bg-gray-100 rounded-lg p-2 mb-2 h-24 flex items-center justify-center">
                <span>전체 상품</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      
      {/* 하단 고정 CTA 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.1)] p-4 z-50">
        <Link 
          href="/quote/cctv" 
          className="block w-full bg-primary hover:bg-primary/90 text-white text-center font-bold py-4 px-6 rounded-lg transition duration-300 text-lg"
        >
          지금 무료 견적 받기
        </Link>
      </div>
    </>
  );
};

export default CCTVRentalPage; 