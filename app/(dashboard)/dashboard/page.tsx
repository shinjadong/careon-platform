'use client';

import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  ShoppingCartIcon, 
  DocumentTextIcon, 
  ClipboardDocumentListIcon,
  CreditCardIcon,
  ChartBarIcon,
  Cog6ToothIcon 
} from '@heroicons/react/24/outline';

export default function DashboardPage() {
  const { currentUser, isUserLoading } = useAuth();

  if (isUserLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const quickActions = [
    {
      title: '상품 둘러보기',
      description: '렌탈 가능한 상품들을 확인해보세요',
      href: '/products',
      icon: ShoppingCartIcon,
      color: 'bg-blue-500',
    },
    {
      title: '견적 요청',
      description: '새로운 견적을 요청하세요',
      href: '/dashboard/quotes/new',
      icon: DocumentTextIcon,
      color: 'bg-green-500',
    },
    {
      title: '계약 관리',
      description: '현재 계약 현황을 확인하세요',
      href: '/dashboard/contracts',
      icon: ClipboardDocumentListIcon,
      color: 'bg-purple-500',
    },
    {
      title: '결제 관리',
      description: '결제 내역과 청구서를 확인하세요',
      href: '/dashboard/billing',
      icon: CreditCardIcon,
      color: 'bg-orange-500',
    },
  ];

  const stats = [
    {
      title: '활성 계약',
      value: '3',
      description: '현재 렌탈 중인 장비',
      change: '+1',
      changeType: 'positive' as const,
    },
    {
      title: '월 렌탈료',
      value: '₩245,000',
      description: '이번 달 총 렌탈료',
      change: '+12%',
      changeType: 'positive' as const,
    },
    {
      title: '대기 중인 견적',
      value: '2',
      description: '검토 중인 견적 요청',
      change: '0',
      changeType: 'neutral' as const,
    },
    {
      title: '다음 결제일',
      value: '7일',
      description: '다음 자동 결제까지',
      change: '',
      changeType: 'neutral' as const,
    },
  ];

  return (
    <div className="space-y-8">
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">대시보드</h1>
          <p className="mt-2 text-gray-600">
            안녕하세요, {currentUser?.businessName || currentUser?.contactName}님! 
            오늘도 성공적인 하루 되세요.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button asChild>
            <Link href="/dashboard/quotes/new">
              새 견적 요청
            </Link>
          </Button>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="pb-2">
              <CardDescription>{stat.title}</CardDescription>
              <CardTitle className="text-3xl">{stat.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{stat.description}</p>
              {stat.change && (
                <p className={`text-sm mt-1 ${
                  stat.changeType === 'positive' 
                    ? 'text-green-600' 
                    : stat.changeType === 'negative' 
                    ? 'text-red-600' 
                    : 'text-gray-600'
                }`}>
                  {stat.change}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 빠른 작업 */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">빠른 작업</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <Card key={action.title} className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link href={action.href}>
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-4`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                  <CardDescription>{action.description}</CardDescription>
                </CardHeader>
              </Link>
            </Card>
          ))}
        </div>
      </div>

      {/* 최근 활동 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>최근 견적</CardTitle>
            <CardDescription>최근 요청한 견적 목록입니다</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: 'Q-001', title: '카페 패키지', status: '검토중', date: '2024-12-28' },
                { id: 'Q-002', title: 'POS 시스템', status: '승인됨', date: '2024-12-25' },
                { id: 'Q-003', title: 'CCTV 설치', status: '대기중', date: '2024-12-22' },
              ].map((quote) => (
                <div key={quote.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{quote.title}</p>
                    <p className="text-sm text-gray-600">{quote.id} • {quote.date}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    quote.status === '승인됨' 
                      ? 'bg-green-100 text-green-800'
                      : quote.status === '검토중'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {quote.status}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/dashboard/quotes">모든 견적 보기</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>이번 달 사용량</CardTitle>
            <CardDescription>렌탈 장비 사용 현황</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: '스마트 키오스크', usage: '95%', color: 'bg-blue-500' },
                { name: 'POS 시스템', usage: '87%', color: 'bg-green-500' },
                { name: 'CCTV 시스템', usage: '92%', color: 'bg-purple-500' },
              ].map((item) => (
                <div key={item.name} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{item.name}</span>
                    <span>{item.usage}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${item.color} h-2 rounded-full`}
                      style={{ width: item.usage }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/dashboard/analytics">상세 분석 보기</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 