'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Link from "next/link";

// 고객용 읽기 전용 랜딩 페이지
export default function LandingPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    contact: '',
    businessType: '',
    privacyConsent: false,
    marketingConsent: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 폼 제출 로직
    console.log('견적 요청:', formData);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white">
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            사업 성공의 파트너<br />
            <span className="text-blue-300">케어온</span>이 함께합니다
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            프랜차이즈 창업부터 매장 운영까지, 필요한 모든 장비를 한 번에.<br />
            초기 투자 부담은 줄이고, 매출 성장에만 집중하세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
              <Link href="#contact-form">무료 견적 받기</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900" asChild>
              <Link href="/products">상품 카탈로그 보기</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Announcement Banner */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-semibold">
            🎉 신규 가입 고객 한정! 첫 달 렌탈료 50% 할인 + 설치비 무료
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">15,000+</div>
              <div className="text-gray-600">누적 고객사</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-600">고객 만족도</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">24시간</div>
              <div className="text-gray-600">A/S 대응</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">300억+</div>
              <div className="text-gray-600">연간 거래액</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why CareOn Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">왜 케어온인가?</h2>
            <p className="text-xl text-gray-600">대한민국 1위 B2B 렌탈 플랫폼의 차별화된 가치</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-xl">신뢰할 수 있는 파트너</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-gray-600 space-y-2">
                  <li>• 본사 직계약으로 최저가 보장</li>
                  <li>• 300억 이상 자산 보유</li>
                  <li>• 정직원 300명 이상</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-xl">매출 성장 지원</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-gray-600 space-y-2">
                  <li>• 업종별 맞춤 컨설팅</li>
                  <li>• 마케팅 솔루션 제공</li>
                  <li>• 운영 효율화 시스템</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-xl">완벽한 사후 관리</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-gray-600 space-y-2">
                  <li>• 24시간 긴급 A/S</li>
                  <li>• 정기 점검 서비스</li>
                  <li>• 평생 무상 업그레이드</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">지금 바로 무료 견적을 받아보세요</h2>
            <p className="text-xl text-gray-600">전문 컨설턴트가 최적의 솔루션을 제안해드립니다</p>
          </div>

          <Card>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="companyName">업체명</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="contact">연락처</Label>
                  <Input
                    id="contact"
                    value={formData.contact}
                    onChange={(e) => setFormData({...formData, contact: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="businessType">업종 선택</Label>
                  <select
                    id="businessType"
                    value={formData.businessType}
                    onChange={(e) => setFormData({...formData, businessType: e.target.value})}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
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

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="privacy"
                      checked={formData.privacyConsent}
                      onChange={(e) => setFormData({...formData, privacyConsent: e.target.checked})}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      required
                    />
                    <Label htmlFor="privacy" className="text-sm">
                      (필수) 개인정보 수집 및 이용에 동의합니다
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="marketing"
                      checked={formData.marketingConsent}
                      onChange={(e) => setFormData({...formData, marketingConsent: e.target.checked})}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <Label htmlFor="marketing" className="text-sm">
                      (선택) 마케팅 정보 수신에 동의합니다
                    </Label>
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={!formData.privacyConsent}>
                  무료 견적 받기
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg" className="bg-yellow-400 text-black border-yellow-400 hover:bg-yellow-500">
              카카오톡으로 상담하기
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}