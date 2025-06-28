import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ProductCard } from '@/components/product/product-card';
import { IProduct } from '@/types';

// 임시 데이터 (나중에 API로 대체)
const mockProducts: IProduct[] = [
  {
    id: '1',
    name: '스마트 키오스크 Pro',
    model: 'KS-2024-001',
    description: '터치스크린 기반의 스마트 주문 키오스크로 고객 주문 과정을 간소화하고 매장 운영 효율성을 극대화합니다.',
    manufacturer: '삼성',
    category: 'KIOSK',
    features: ['24인치 터치스크린', '음성인식 지원', 'QR코드 결제', '다국어 지원', '원격 관리'],
    images: [
      {
        id: '1',
        url: '/images/kiosk-1.jpg',
        alt: '스마트 키오스크 Pro 정면',
        isMain: true,
      },
    ],
    rentalPlans: [
      {
        id: '1',
        name: '기본 플랜',
        monthlyFee: 89000,
        installationFee: 150000,
        contractPeriod: 24,
        features: ['기본 설치', '월 1회 점검', '소프트웨어 업데이트'],
      },
      {
        id: '2',
        name: '프리미엄 플랜',
        monthlyFee: 129000,
        installationFee: 100000,
        contractPeriod: 36,
        features: ['프리미엄 설치', '주 1회 점검', '24시간 지원', '맞춤 디자인'],
      },
    ],
    isRecommended: true,
    status: 'ACTIVE',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'POS 시스템 올인원',
    model: 'POS-2024-002',
    description: '매장 운영에 필요한 모든 기능을 하나로 통합한 올인원 POS 시스템입니다.',
    manufacturer: 'LG',
    category: 'POS',
    features: ['15인치 터치스크린', '영수증 프린터', '바코드 스캐너', '카드 리더기', '재고 관리'],
    images: [
      {
        id: '2',
        url: '/images/pos-1.jpg',
        alt: 'POS 시스템 올인원',
        isMain: true,
      },
    ],
    rentalPlans: [
      {
        id: '3',
        name: '스탠다드',
        monthlyFee: 65000,
        installationFee: 80000,
        contractPeriod: 24,
        features: ['기본 설치', '월 1회 점검', '기술 지원'],
      },
    ],
    isRecommended: false,
    status: 'ACTIVE',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'CCTV 보안 시스템',
    model: 'CCTV-2024-003',
    description: '4K 화질의 고성능 CCTV로 매장 보안과 고객 안전을 책임집니다.',
    manufacturer: '하이크비전',
    category: 'CCTV',
    features: ['4K 화질', '야간 촬영', '원격 모니터링', '움직임 감지', '클라우드 저장'],
    images: [
      {
        id: '3',
        url: '/images/cctv-1.jpg',
        alt: 'CCTV 보안 시스템',
        isMain: true,
      },
    ],
    rentalPlans: [
      {
        id: '4',
        name: '베이직',
        monthlyFee: 45000,
        installationFee: 120000,
        contractPeriod: 36,
        features: ['기본 설치', '월 1회 점검', '원격 지원'],
      },
    ],
    isRecommended: true,
    status: 'ACTIVE',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function ProductsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* 헤더 섹션 */}
        <div className="bg-white border-b">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                상품 카탈로그
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                비즈니스 성공을 위한 최고의 장비들을 만나보세요
              </p>
            </div>
          </div>
        </div>

        {/* 필터 및 정렬 섹션 */}
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold text-gray-900">
                전체 상품 ({mockProducts.length})
              </h2>
            </div>
            
            <div className="flex items-center gap-4">
              {/* 카테고리 필터 */}
              <select className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm">
                <option value="">전체 카테고리</option>
                <option value="KIOSK">키오스크</option>
                <option value="POS">POS 시스템</option>
                <option value="CCTV">CCTV</option>
                <option value="KITCHEN">주방기기</option>
              </select>
              
              {/* 정렬 */}
              <select className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm">
                <option value="latest">최신순</option>
                <option value="price-low">가격 낮은순</option>
                <option value="price-high">가격 높은순</option>
                <option value="popular">인기순</option>
              </select>
            </div>
          </div>
        </div>

        {/* 상품 그리드 */}
        <div className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {mockProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* 더 많은 상품 로드 버튼 */}
        <div className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
          <div className="text-center">
            <button className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50">
              더 많은 상품 보기
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 