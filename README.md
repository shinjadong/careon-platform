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
- **Drag & Drop**: @dnd-kit

### Backend & Database
- **Backend**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **File Storage**: Supabase Storage

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
```

## 📁 프로젝트 구조

```
careon-platform/
├── app/                    # Next.js App Router 페이지
│   ├── (auth)/            # 인증 관련 페이지
│   ├── (dashboard)/       # 대시보드 페이지
│   ├── products/          # 상품 페이지
│   ├── landing/           # 랜딩 페이지
│   │   └── edit/          # 랜딩 페이지 편집기
│   └── ...
├── components/            # React 컴포넌트
│   ├── ui/               # Shadcn UI 컴포넌트
│   ├── layout/           # 레이아웃 컴포넌트
│   ├── product/          # 상품 관련 컴포넌트
│   └── page-builder/     # 페이지 빌더 컴포넌트
├── lib/                  # 유틸리티 및 설정
│   ├── api/              # API 관련 함수
│   ├── providers/        # 프로바이더
│   └── supabase.ts       # Supabase 설정
├── stores/               # Zustand 스토어
│   ├── auth.store.ts     # 인증 스토어
│   └── quote.store.ts    # 견적 스토어
├── hooks/                # 커스텀 React Hooks
│   └── use-auth.ts       # 인증 훅
├── types/                # TypeScript 타입 정의
│   ├── index.ts          # 메인 타입 정의
│   └── page-builder.ts   # 페이지 빌더 타입
└── supabase/             # Supabase 관련 파일
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

## ✨ 주요 기능

### 🏠 메인 페이지
- 히어로 섹션 (매출 증대 메시지)
- 핵심 가치 소개
- 주요 카테고리 표시
- CTA 섹션

### 🛠 페이지 빌더
- **랜딩 페이지 편집기**: `/landing/edit`
- **드래그 앤 드롭**: 블록 위치 자유롭게 변경
- **위아래 이동 버튼**: 드래그 외 추가적인 이동 방법 제공
- **다양한 블록 타입**: 
  - 제목 (H1-H6)
  - 텍스트 (일반/마크다운)
  - 이미지 (업로드/URL)
  - 동영상 (YouTube/Vimeo)
  - 버튼 (다양한 스타일)
  - 스페이서 (여백 조정)
  - 히어로 섹션
  - 커스텀 HTML
- **실시간 편집**: 변경사항 즉시 반영
- **파일 관리**: 이미지/동영상 업로드 및 관리
- **가져오기/내보내기**: JSON 형태로 페이지 백업/복원

### 🛍 상품 관리
- 카테고리별 상품 분류
- 상품 상세 정보 관리
- 렌탈 플랜 관리
- 이미지 갤러리

### 💰 견적 시스템
- 실시간 견적 생성
- 상품별 수량 및 플랜 선택
- 총액 자동 계산
- 견적서 저장 및 공유

### 👤 사용자 관리
- 사업자 인증
- 프랜차이즈/독립 사업장 구분
- 사업자 정보 관리
- 주소 및 연락처 관리

## 🚧 개발 현황

### ✅ 완료된 기능
- [x] 프로젝트 초기 설정
- [x] 디자인 시스템 구축
- [x] 메인 페이지 구현
- [x] 페이지 빌더 시스템
- [x] 랜딩 페이지 편집기
- [x] 드래그 앤 드롭 기능
- [x] 위아래 이동 버튼
- [x] 다양한 블록 타입 지원
- [x] 파일 관리 시스템
- [x] 견적 관리 스토어
- [x] 인증 시스템 기반 구조
- [x] 타입 정의 완료

### 🔄 진행 중
- [ ] 사용자 인증 완성
- [ ] 상품 상세 페이지
- [ ] 견적 생성 시스템 완성
- [ ] Supabase 통합

### 📋 예정된 기능
- [ ] 대시보드
- [ ] 계약 관리
- [ ] 결제 시스템
- [ ] 관리자 페널
- [ ] 모바일 앱 (React Native)
- [ ] 알림 시스템
- [ ] 분석 대시보드

## 🔧 페이지 빌더 사용법

### 랜딩 페이지 편집
1. `/landing/edit` 페이지 접속
2. 왼쪽 사이드바에서 원하는 블록 선택
3. 드래그 앤 드롭으로 블록 위치 변경
4. 위아래 이동 버튼으로 세밀한 위치 조정
5. 각 블록 클릭하여 내용 편집
6. 상단 '저장' 버튼으로 변경사항 저장

### 지원되는 블록 타입
- **제목**: H1-H6 레벨 제목
- **텍스트**: 일반 텍스트 및 마크다운
- **이미지**: 이미지 업로드 및 URL 링크
- **동영상**: YouTube/Vimeo 임베드
- **버튼**: 다양한 스타일의 CTA 버튼
- **스페이서**: 여백 조정용 공백
- **히어로**: 대형 배너 섹션
- **HTML**: 커스텀 HTML 코드

## 🌍 배포 및 운영

### 환경 변수 설정
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# 기타 설정
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 배포 방법
1. Vercel을 통한 자동 배포
2. GitHub Actions을 통한 CI/CD
3. Docker를 통한 컨테이너 배포

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### 코딩 스타일 가이드
- TypeScript 사용 (strict mode)
- ESLint + Prettier 설정 준수
- 컴포넌트명: PascalCase
- 파일명: kebab-case
- 함수명: camelCase

## 📊 성능 최적화

### 구현된 최적화
- Next.js 15 App Router 사용
- 서버 컴포넌트 활용
- 이미지 최적화 (Next.js Image)
- 코드 분할 (Dynamic import)
- 번들 크기 최적화

### 성능 목표
- First Contentful Paint: < 1.5초
- Largest Contentful Paint: < 2.5초
- Cumulative Layout Shift: < 0.1

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 📞 문의

- **이메일**: contact@careon.kr
- **프로젝트 링크**: [https://github.com/tlswk/careon-platform](https://github.com/tlswk/careon-platform)
- **데모 사이트**: [https://careon-platform.vercel.app](https://careon-platform.vercel.app)

---

**Made with ❤️ by 케어온 팀**

### 🔄 최근 업데이트 (2024.12)
- 페이지 빌더 시스템 구축 완료
- 드래그 앤 드롭 기능 구현
- 위아래 이동 버튼 추가
- 파일 관리 시스템 통합
- 다양한 블록 타입 지원
- 실시간 편집 기능 완성