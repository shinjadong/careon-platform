import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import { IProduct } from '@/types';

interface ProductCardProps {
  product: IProduct;
  showQuoteButton?: boolean;
}

export function ProductCard({ product, showQuoteButton = true }: ProductCardProps) {
  const mainImage = product.images.find(img => img.isMain) || product.images[0];
  const lowestPlan = product.rentalPlans.reduce((min, plan) => 
    plan.monthlyFee < min.monthlyFee ? plan : min
  );

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="p-0">
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
          {mainImage ? (
            <Image
              src={mainImage.url}
              alt={mainImage.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-200"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">이미지 없음</span>
            </div>
          )}
          
          {/* 추천 배지 */}
          {product.isRecommended && (
            <div className="absolute top-3 left-3 bg-primary text-white text-xs font-semibold px-2 py-1 rounded">
              추천
            </div>
          )}
          
          {/* 제조사 배지 */}
          <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
            {product.manufacturer}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* 상품명 */}
          <div>
            <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
              <Link href={`/products/${product.id}`}>
                {product.name}
              </Link>
            </h3>
            <p className="text-sm text-gray-600 mt-1">{product.model}</p>
          </div>
          
          {/* 설명 */}
          <p className="text-sm text-gray-600 line-clamp-2">
            {product.description}
          </p>
          
          {/* 주요 특징 */}
          {product.features.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {product.features.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
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
          )}
          
          {/* 가격 정보 */}
          <div className="border-t pt-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">월 렌탈료</p>
                <p className="text-xl font-bold text-primary">
                  {formatCurrency(lowestPlan.monthlyFee)}
                  <span className="text-sm font-normal text-gray-500">/월</span>
                </p>
                {lowestPlan.installationFee > 0 && (
                  <p className="text-xs text-gray-500">
                    설치비: {formatCurrency(lowestPlan.installationFee)}
                  </p>
                )}
              </div>
              
              {showQuoteButton && (
                <div className="flex flex-col gap-2">
                  <Button size="sm" asChild>
                    <Link href={`/products/${product.id}`}>
                      상세보기
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    견적 추가
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          {/* 렌탈 플랜 개수 */}
          {product.rentalPlans.length > 1 && (
            <p className="text-xs text-gray-500 text-center">
              {product.rentalPlans.length}가지 렌탈 플랜 제공
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 