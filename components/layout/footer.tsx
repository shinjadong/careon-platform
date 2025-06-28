import Link from 'next/link';

export function Footer() {
  const navigation = {
    product: [
      { name: '키오스크', href: '/products/kiosk' },
      { name: 'POS 시스템', href: '/products/pos' },
      { name: 'CCTV', href: '/products/cctv' },
      { name: '주방기기', href: '/products/kitchen' },
    ],
    solutions: [
      { name: '카페/디저트', href: '/solutions/cafe' },
      { name: '치킨/피자', href: '/solutions/chicken' },
      { name: '편의점', href: '/solutions/convenience' },
      { name: '미용실', href: '/solutions/beauty' },
    ],
    support: [
      { name: '고객지원', href: '/support' },
      { name: '설치 서비스', href: '/support/installation' },
      { name: 'A/S 신청', href: '/support/service' },
      { name: 'FAQ', href: '/support/faq' },
    ],
    company: [
      { name: '회사소개', href: '/about' },
      { name: '파트너십', href: '/partners' },
      { name: '채용정보', href: '/careers' },
      { name: '공지사항', href: '/news' },
    ],
  };

  return (
    <footer className="bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-white">C</span>
              </div>
              <span className="text-xl font-bold text-white">케어온</span>
            </div>
            <p className="text-sm leading-6 text-gray-300">
              렌탈이 아닌, 매출을 만들어드립니다.<br />
              프랜차이즈 창업자와 자영업자를 위한<br />
              B2B 종합 렌탈 플랫폼입니다.
            </p>
            <div className="flex space-x-6">
              {/* 소셜 미디어 링크 */}
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988s11.987-5.367 11.987-11.988C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.253 14.894 3.762 13.743 3.762 12.446s.491-2.448 1.364-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.873.875 1.297 2.026 1.297 3.323s-.424 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">상품</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.product.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">솔루션</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.solutions.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">고객지원</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">회사</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-800 pt-8 sm:mt-20 lg:mt-24">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
              <Link href="/privacy" className="text-sm leading-6 text-gray-300 hover:text-white">
                개인정보처리방침
              </Link>
              <Link href="/terms" className="text-sm leading-6 text-gray-300 hover:text-white">
                이용약관
              </Link>
            </div>
            <p className="mt-8 text-xs leading-5 text-gray-400 md:order-1 md:mt-0">
              &copy; 2024 케어온. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 