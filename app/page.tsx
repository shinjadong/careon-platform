import Image from "next/image";
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col">
        {/* 히어로 섹션 */}
        <section className="relative bg-gradient-to-b from-gray-50 to-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              렌탈이 아닌, <span className="text-primary">매출을 만들어드립니다</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              프랜차이즈 창업자와 자영업자를 위한 B2B 종합 렌탈 플랫폼.
              케어온과 함께 성공적인 비즈니스를 시작하세요.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/products"
                className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                상품 둘러보기
              </a>
              <a
                href="/auth/register"
                className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700"
              >
                무료 견적 받기 <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>

        {/* 핵심 가치 섹션 */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                케어온이 특별한 이유
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                단순한 렌탈 서비스가 아닌, 비즈니스 성장 파트너입니다
              </p>
            </div>
            
            <div className="mx-auto mt-16 max-w-7xl">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
                <div className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                      <span className="text-white font-bold">1</span>
                    </div>
                    원스톱 솔루션
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    매장 운영에 필요한 모든 장비를 한 곳에서. 
                    키오스크부터 주방기기까지 통합 관리하세요.
                  </dd>
                </div>
                
                <div className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                      <span className="text-white font-bold">2</span>
                    </div>
                    맞춤형 견적
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    업종과 규모에 최적화된 패키지 제안. 
                    AI 기반 견적 시스템으로 최적의 솔루션을 찾아드립니다.
                  </dd>
                </div>
                
                <div className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                      <span className="text-white font-bold">3</span>
                    </div>
                    매출 증대 파트너
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    단순 공급이 아닌 비즈니스 성장 지원. 
                    마케팅부터 운영 컨설팅까지 함께합니다.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* 주요 카테고리 섹션 */}
        <section className="bg-gray-50 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                사업장에 필요한 모든 것
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                업종별 맞춤 렌탈 솔루션을 만나보세요
              </p>
            </div>
            
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {[
                { name: '키오스크', description: '주문부터 결제까지 스마트하게' },
                { name: 'POS 시스템', description: '매장 운영의 핵심 솔루션' },
                { name: 'CCTV', description: '안전한 매장 운영을 위한 필수품' },
                { name: '주방기기', description: '효율적인 주방 운영 시스템' },
                { name: '인테리어', description: '고객을 사로잡는 공간 연출' },
                { name: '기타 장비', description: '성공적인 창업을 위한 모든 것' },
              ].map((category) => (
                <div
                  key={category.name}
                  className="flex flex-col justify-between rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div>
                    <h3 className="text-lg font-semibold leading-8 text-gray-900">
                      {category.name}
                    </h3>
                    <p className="mt-4 text-sm leading-6 text-gray-600">
                      {category.description}
                    </p>
                  </div>
                  <p className="mt-6 text-sm font-semibold leading-6 text-primary">
                    자세히 보기 <span aria-hidden="true">→</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA 섹션 */}
        <section className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                지금 시작하세요
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                케어온과 함께 성공적인 비즈니스를 만들어가세요.
                전문 상담사가 맞춤형 솔루션을 제안해드립니다.
              </p>
            </div>
            <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
                <a href="/auth/register">
                  사업자 회원가입 <span aria-hidden="true">→</span>
                </a>
                <a href="/products">
                  상품 카탈로그 <span aria-hidden="true">→</span>
                </a>
                <a href="/solutions">
                  업종별 솔루션 <span aria-hidden="true">→</span>
                </a>
                <a href="/support">
                  고객지원 <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
