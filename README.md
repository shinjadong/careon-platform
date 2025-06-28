# 케어온 (CareOn) - B2B 종합 렌탈 플랫폼

> **렌탈이 아닌, 매출을 만들어드립니다**

프랜차이즈 창업자와 자영업자를 위한 B2B 종합 렌탈 서비스 플랫폼입니다.

## 🚀 프로젝트 개요

케어온은 사업장 운영에 필요한 모든 장비를 통합 렌탈하고, 비즈니스 성장을 지원하는 B2B 플랫폼입니다.

### 핵심 가치
- **원스톱 솔루션**: 키오스크부터 주방기기까지 통합 관리
- **맞춤형 견적**: AI 기반 업종별 최적화 패키지 제안
- **매출 증대 파트너**: 단순 공급이 아닌 비즈니스 성장 지원

### 타겟 고객
- 프랜차이즈 가맹점주 (신규 창업자)
- 요식업, 카페, 미용실, 편의점 등 자영업자
- 소규모(50㎡) ~ 대형(200㎡+) 사업장

## 🛠 기술 스택

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + Shadcn UI
- **State Management**: Zustand
- **Form Handling**: React Hook Form + Zod
- **API Client**: Axios + TanStack Query
- **Animation**: Framer Motion

### Development Tools
- **Package Manager**: npm
- **Code Quality**: ESLint + Prettier
- **Version Control**: Git + GitHub
- **CI/CD**: GitHub Actions (예정)
- **Deployment**: Vercel (예정)

## 📦 설치 및 실행

### 필수 요구사항
- Node.js 18.17.0 이상
- npm 9.0.0 이상

### 로컬 개발 환경 설정

```bash
# 저장소 클론
git clone https://github.com/tlswk/careon-platform.git
cd careon-platform

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

개발 서버가 실행되면 [http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.

### 사용 가능한 스크립트

```bash
npm run dev          # 개발 서버 실행
npm run build        # 프로덕션 빌드
npm run start        # 프로덕션 서버 실행
npm run lint         # ESLint 실행
npm run type-check   # TypeScript 타입 체크
npm run format       # Prettier 포맷팅
```

## 📁 프로젝트 구조

```
careon-platform/
├── app/                    # Next.js App Router 페이지
│   ├── (auth)/            # 인증 관련 페이지
│   ├── (dashboard)/       # 대시보드 페이지
│   ├── products/          # 상품 페이지
│   ├── solutions/         # 솔루션 페이지
│   └── ...
├── components/            # React 컴포넌트
│   ├── ui/               # 기본 UI 컴포넌트
│   ├── layout/           # 레이아웃 컴포넌트
│   ├── business/         # 비즈니스 컴포넌트
│   └── ...
├── lib/                  # 유틸리티 및 설정
├── hooks/                # Custom React Hooks
├── stores/               # Zustand 스토어
├── types/                # TypeScript 타입 정의
└── styles/               # 글로벌 스타일
```

## 🎨 디자인 시스템

### 컬러 팔레트
- **Primary**: Blue (#0066FF) - 신뢰와 전문성
- **Secondary**: Gray (#F1F5F9) - 깔끔한 배경
- **Accent**: 상황별 강조 색상

### 컴포넌트
- Shadcn UI 기반 일관된 디자인 시스템
- 반응형 디자인 (모바일 우선)
- 접근성 고려 (WCAG 2.1 AA 준수)

## 🚧 개발 현황

### ✅ 완료된 기능
- [x] 프로젝트 초기 설정
- [x] 디자인 시스템 구축
- [x] 메인 페이지 구현
- [x] 헤더/푸터 레이아웃
- [x] 상품 목록 페이지
- [x] 로그인 페이지

### 🔄 진행 중
- [ ] 사용자 인증 시스템
- [ ] 상품 상세 페이지
- [ ] 견적 생성 시스템

### 📋 예정된 기능
- [ ] 대시보드
- [ ] 계약 관리
- [ ] 결제 시스템
- [ ] 관리자 페널
- [ ] 모바일 앱 (React Native)

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 📞 문의

- **이메일**: contact@careon.kr
- **프로젝트 링크**: [https://github.com/tlswk/careon-platform](https://github.com/tlswk/careon-platform)

---

**Made with ❤️ by 케어온 팀**