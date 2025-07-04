'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuoteStore } from '@/stores/quote.store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import { 
  PlusIcon, 
  MinusIcon, 
  TrashIcon,
  ShoppingCartIcon 
} from '@heroicons/react/24/outline';
import { IProduct } from '@/types';

// 임시 상품 데이터 (실제로는 API에서 가져옴)
const MOCK_PRODUCTS: IProduct[] = [
  {
    id: '1',
    name: '스마트 키오스크',
    model: 'SK-2024',
    category: 'POS/키오스크',
    description: '터치스크린 키오스크로 주문과 결제를 한 번에',
    images: ['/images/products/kiosk.jpg'],
    features: ['24인치 터치스크린', '카드/현금 결제', '다국어 지원'],
    specifications: {
      dimensions: '60cm x 40cm x 180cm',
      weight: '45kg',
      power: '220V',
      connectivity: 'WiFi, Ethernet',
    },
    rentalPlans: [
      {
        id: 'plan-1-1',
        name: '기본 플랜',
        contractPeriod: 12,
        monthlyFee: 89000,
        installationFee: 150000,
        features: ['기본 설치', '월 1회 점검', '기술지원'],
      },
      {
        id: 'plan-1-2',
        name: '프리미엄 플랜',
        contractPeriod: 24,
        monthlyFee: 79000,
        installationFee: 100000,
        features: ['프리미엄 설치', '월 2회 점검', '24시간 기술지원', '무료 업그레이드'],
      },
    ],
    vendor: '케어온테크',
    tags: ['인기', '신제품'],
    rating: 4.8,
    reviewCount: 127,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-12-28'),
  },
  {
    id: '2',
    name: 'POS 시스템',
    model: 'PS-PRO-2024',
    category: 'POS/키오스크',
    description: '올인원 POS 시스템으로 매장 운영을 효율적으로',
    images: ['/images/products/pos.jpg'],
    features: ['15인치 터치스크린', '영수증 프린터', '바코드 스캐너'],
    specifications: {
      dimensions: '38cm x 32cm x 42cm',
      weight: '8kg',
      power: '220V',
      connectivity: 'WiFi, Ethernet, Bluetooth',
    },
    rentalPlans: [
      {
        id: 'plan-2-1',
        name: '스타터 플랜',
        contractPeriod: 12,
        monthlyFee: 65000,
        installationFee: 100000,
        features: ['기본 설치', '교육 제공', '기술지원'],
      },
      {
        id: 'plan-2-2',
        name: '비즈니스 플랜',
        contractPeriod: 24,
        monthlyFee: 55000,
        installationFee: 80000,
        features: ['프리미엄 설치', '고급 교육', '24시간 기술지원', '데이터 분석'],
      },
    ],
    vendor: '케어온테크',
    tags: ['추천'],
    rating: 4.6,
    reviewCount: 89,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-12-28'),
  },
];

export default function NewQuotePage() {
  const router = useRouter();
  const { items, totalAmount, addItem, removeItem, updateItemQuantity, calculateTotal, clearQuote } = useQuoteStore();
  const [selectedProducts] = useState<IProduct[]>(MOCK_PRODUCTS);
  const [quoteName, setQuoteName] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    calculateTotal();
  }, [items, calculateTotal]);

  const handleAddProduct = (product: IProduct, planId: string) => {
    addItem(product, planId);
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    updateItemQuantity(productId, quantity);
  };

  const handleRemoveItem = (productId: string) => {
    removeItem(productId);
  };

  const handleSubmitQuote = () => {
    if (items.length === 0) {
      alert('견적에 포함할 상품을 선택해주세요.');
      return;
    }

    if (!quoteName.trim()) {
      alert('견적명을 입력해주세요.');
      return;
    }

    // 실제로는 API 호출
    console.log('견적 요청:', {
      name: quoteName,
      items,
      totalAmount,
      notes,
    });

    alert('견적이 요청되었습니다. 영업팀에서 검토 후 연락드리겠습니다.');
    clearQuote();
    router.push('/dashboard/quotes');
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">새 견적 요청</h1>
          <p className="mt-2 text-gray-600">
            필요한 장비를 선택하고 견적을 요청하세요.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <Button variant="outline" onClick={() => router.back()}>
            취소
          </Button>
          <Button onClick={handleSubmitQuote} disabled={items.length === 0}>
            견적 요청하기
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 상품 선택 */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>견적 정보</CardTitle>
              <CardDescription>견적 요청에 대한 기본 정보를 입력하세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="quoteName">견적명 *</Label>
                <Input
                  id="quoteName"
                  value={quoteName}
                  onChange={(e) => setQuoteName(e.target.value)}
                  placeholder="예: 카페 오픈 패키지"
                />
              </div>
              <div>
                <Label htmlFor="notes">추가 요청사항</Label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="특별한 요청사항이나 문의사항을 입력하세요"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>상품 선택</CardTitle>
              <CardDescription>렌탈하고 싶은 상품과 플랜을 선택하세요</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {selectedProducts.map((product) => (
                  <div key={product.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{product.name}</h3>
                        <p className="text-gray-600 text-sm">{product.description}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          {product.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">{tag}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {product.rentalPlans.map((plan) => (
                        <div key={plan.id} className="border rounded-md p-3">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium">{plan.name}</h4>
                            <span className="text-sm text-gray-500">
                              {plan.contractPeriod}개월
                            </span>
                          </div>
                          <div className="space-y-1 mb-3">
                            <p className="text-lg font-semibold text-primary">
                              월 {formatCurrency(plan.monthlyFee)}
                            </p>
                            <p className="text-sm text-gray-600">
                              설치비: {formatCurrency(plan.installationFee)}
                            </p>
                          </div>
                          <ul className="text-xs text-gray-600 space-y-1 mb-3">
                            {plan.features.map((feature, index) => (
                              <li key={index}>• {feature}</li>
                            ))}
                          </ul>
                          <Button
                            size="sm"
                            onClick={() => handleAddProduct(product, plan.id)}
                            className="w-full"
                          >
                            <PlusIcon className="h-4 w-4 mr-1" />
                            견적에 추가
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 견적 요약 */}
        <div className="space-y-6">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingCartIcon className="h-5 w-5 mr-2" />
                견적 요약
              </CardTitle>
              <CardDescription>선택한 상품 ({items.length}개)</CardDescription>
            </CardHeader>
            <CardContent>
              {items.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <ShoppingCartIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>선택한 상품이 없습니다</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="border-b pb-4 last:border-b-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.productName}</h4>
                          <p className="text-xs text-gray-600">{item.rentalPlanName}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.productId)}
                          className="text-red-600 hover:text-red-700 p-1"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="h-8 w-8 p-0"
                          >
                            <MinusIcon className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                            className="h-8 w-8 p-0"
                          >
                            <PlusIcon className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            월 {formatCurrency(item.monthlyFee * item.quantity)}
                          </p>
                          <p className="text-xs text-gray-600">
                            설치비 {formatCurrency(item.installationFee * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">월 렌탈료 합계</span>
                      <span className="font-medium">
                        {formatCurrency(items.reduce((sum, item) => sum + (item.monthlyFee * item.quantity), 0))}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">설치비 합계</span>
                      <span className="font-medium">
                        {formatCurrency(items.reduce((sum, item) => sum + (item.installationFee * item.quantity), 0))}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-lg font-semibold text-primary border-t pt-2">
                      <span>총 예상 비용</span>
                      <span>{formatCurrency(totalAmount)}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      * 실제 견적은 현장 조사 후 확정됩니다
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 