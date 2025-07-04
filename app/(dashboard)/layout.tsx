'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth, useLogout } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import {
  HomeIcon,
  ShoppingCartIcon,
  DocumentTextIcon,
  ClipboardDocumentListIcon,
  CreditCardIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { currentUser } = useAuth();
  const logout = useLogout();

  const navigation = [
    { name: '대시보드', href: '/dashboard', icon: HomeIcon },
    { name: '상품', href: '/products', icon: ShoppingCartIcon },
    { name: '견적', href: '/dashboard/quotes', icon: DocumentTextIcon },
    { name: '계약', href: '/dashboard/contracts', icon: ClipboardDocumentListIcon },
    { name: '결제', href: '/dashboard/billing', icon: CreditCardIcon },
    { name: '분석', href: '/dashboard/analytics', icon: ChartBarIcon },
    { name: '설정', href: '/dashboard/settings', icon: Cog6ToothIcon },
  ];

  const handleLogout = () => {
    logout.mutate();
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* 모바일 사이드바 */}
      {sidebarOpen && (
        <div className="fixed inset-0 flex z-40 md:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setSidebarOpen(false)}
              >
                <XMarkIcon className="h-6 w-6 text-white" />
              </button>
            </div>
            <SidebarContent navigation={navigation} pathname={pathname} />
          </div>
        </div>
      )}

      {/* 데스크톱 사이드바 */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <SidebarContent navigation={navigation} pathname={pathname} />
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* 헤더 */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          
          <div className="flex-1 px-4 flex justify-between items-center">
            <div className="flex-1 flex">
              {/* 검색바 (추후 구현) */}
            </div>
            
            <div className="ml-4 flex items-center md:ml-6 space-x-4">
              {/* 사용자 정보 */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <UserIcon className="h-8 w-8 text-gray-400" />
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-gray-900">
                      {currentUser?.contactName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {currentUser?.businessName}
                    </p>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  disabled={logout.isPending}
                >
                  <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2" />
                  로그아웃
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* 페이지 콘텐츠 */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// 사이드바 콘텐츠 컴포넌트
function SidebarContent({ 
  navigation, 
  pathname 
}: { 
  navigation: Array<{name: string; href: string; icon: React.ComponentType<{className?: string}>}>; 
  pathname: string; 
}) {
  return (
    <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
      {/* 로고 */}
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-white">C</span>
            </div>
            <span className="text-xl font-bold text-gray-900">케어온</span>
          </Link>
        </div>
        
        {/* 네비게이션 */}
        <nav className="mt-8 flex-1 px-2 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/dashboard' && pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon
                  className={`mr-3 flex-shrink-0 h-6 w-6 ${
                    isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      
      {/* 하단 정보 */}
      <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
        <div className="flex-shrink-0 w-full group block">
          <div className="flex items-center">
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-500">
                케어온 B2B 플랫폼
              </p>
              <p className="text-xs text-gray-400">
                v1.0.0
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 