'use client';

import { useState } from 'react';
import Image from 'next/image';
import { IProduct } from '@/types';
import { Button } from '@/components/ui/button';

// 임시 데이터 (나중에 API로 대체)
const mockProducts: IProduct[] = [
  {
    id: '1',
    categoryId: 1,
    name: '스마트 키오스크 Pro',
    manufacturer: '삼성',
    model: 'KS-2024-001',
    description: '터치스크린 기반의 스마트 주문 키오스크로 고객 주문 과정을 간소화하고 매장 운영 효율성을 극대화합니다.',
    features: ['24인치 터치스크린', '음성인식 지원', 'QR코드 결제', '다국어 지원', '원격 관리'],
    specifications: {
      dimensions: '60cm x 40cm x 180cm',
      weight: '45kg',
      power: '220V',
      connectivity: 'WiFi, Ethernet'
    },
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
        productId: '1',
        duration: 24,
        monthlyFee: 89000,
        installationFee: 150000,
        maintenanceFee: 10000,
        deposit: 100000,
        benefits: ['기본 설치', '월 1회 점검', '소프트웨어 업데이트'],
      },
      {
        id: '2',
        productId: '1',
        duration: 36,
        monthlyFee: 129000,
        installationFee: 100000,
        maintenanceFee: 8000,
        deposit: 80000,
        benefits: ['프리미엄 설치', '주 1회 점검', '24시간 지원', '맞춤 디자인'],
      },
    ],
    partnerId: 'partner-1',
    tags: ['인기', '신제품'],
    isRecommended: true,
    createdAt: new Date(),
  },
  {
    id: '2',
    categoryId: 1,
    name: 'POS 시스템 올인원',
    manufacturer: 'LG',
    model: 'POS-2024-002',
    description: '매장 운영에 필요한 모든 기능을 하나로 통합한 올인원 POS 시스템입니다.',
    features: ['15인치 터치스크린', '영수증 프린터', '바코드 스캐너', '카드 리더기', '재고 관리'],
    specifications: {
      dimensions: '38cm x 32cm x 42cm',
      weight: '8kg',
      power: '220V',
      connectivity: 'WiFi, Ethernet, Bluetooth'
    },
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
        productId: '2',
        duration: 12,
        monthlyFee: 65000,
        installationFee: 100000,
        maintenanceFee: 8000,
        deposit: 80000,
        benefits: ['기본 설치', '교육 제공', '기술지원'],
      },
      {
        id: '4',
        productId: '2',
        duration: 24,
        monthlyFee: 55000,
        installationFee: 80000,
        maintenanceFee: 6000,
        deposit: 60000,
        benefits: ['프리미엄 설치', '고급 교육', '24시간 기술지원', '데이터 분석'],
      },
    ],
    partnerId: 'partner-1',
    tags: ['추천'],
    isRecommended: false,
    createdAt: new Date(),
  },
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = [
    { id: 'ALL', name: '전체' },
    { id: 'KIOSK', name: '키오스크' },
    { id: 'POS', name: 'POS 시스템' },
    { id: 'CCTV', name: 'CCTV' },
    { id: 'KITCHEN', name: '주방기기' },
  ];

  const filteredProducts = selectedCategory === 'ALL' 
    ? mockProducts 
    : mockProducts.filter(product => product.categoryId === 1); // Simplified for demo

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">렌탈 상품</h1>
          <p className="mt-2 text-gray-600">
            비즈니스 성장을 위한 최적의 렌탈 솔루션을 찾아보세요
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 카테고리 필터 */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* 상품 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* 상품 이미지 */}
              <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                {product.images.find(img => img.isMain) && (
                  <Image
                    src={product.images.find(img => img.isMain)?.url || '/images/placeholder.jpg'}
                    alt={product.images.find(img => img.isMain)?.alt || product.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                )}
              </div>

              {/* 상품 정보 */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">{product.manufacturer}</span>
                  {product.isRecommended && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      추천
                    </span>
                  )}
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* 주요 기능 */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {product.features.slice(0, 3).map((feature, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                    {product.features.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{product.features.length - 3}개
                      </span>
                    )}
                  </div>
                </div>

                {/* 가격 정보 */}
                <div className="mb-4">
                  <p className="text-lg font-bold text-primary">
                    월 {(product.rentalPlans[0]?.monthlyFee || 0).toLocaleString()}원부터
                  </p>
                  <p className="text-sm text-gray-500">
                    설치비: {(product.rentalPlans[0]?.installationFee || 0).toLocaleString()}원
                  </p>
                </div>

                {/* 액션 버튼 */}
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    상세보기
                  </Button>
                  <Button variant="default" className="flex-1">
                    견적요청
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 상품이 없는 경우 */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">해당 카테고리에 상품이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}