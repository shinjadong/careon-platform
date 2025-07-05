# 배포 가이드

## 1. Supabase Service Role Key 가져오기

1. [Supabase Dashboard](https://supabase.com/dashboard) 접속
2. 프로젝트 선택 (`bvhfjfpsedkfqvmxwvfr`)
3. Settings → API로 이동
4. 다음 키들을 복사:
   - `anon public` key
   - `service_role` key (⚠️ 보안 주의)

## 2. 로컬 환경변수 설정

`.env.local` 파일 생성:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://bvhfjfpsedkfqvmxwvfr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Service Role Key (서버사이드에서만 사용)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

## 3. Vercel 배포

### 3.1 Vercel CLI 설치 (선택사항)

```bash
npm i -g vercel
```

### 3.2 Vercel 프로젝트 연결

```bash
vercel link
```

### 3.3 환경변수 설정

#### 방법 1: Vercel Dashboard에서 설정 (권장)

1. [Vercel Dashboard](https://vercel.com/dashboard) 접속
2. 프로젝트 선택
3. Settings → Environment Variables로 이동
4. 다음 환경변수 추가:

| 변수명 | 값 | 환경 |
|--------|-----|------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://bvhfjfpsedkfqvmxwvfr.supabase.co` | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key | Production, Preview, Development |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Production, Preview |

#### 방법 2: Vercel CLI 사용

```bash
# Production 환경변수 설정
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production

# Preview 환경변수 설정
vercel env add NEXT_PUBLIC_SUPABASE_URL preview
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY preview
vercel env add SUPABASE_SERVICE_ROLE_KEY preview
```

### 3.4 배포 실행

```bash
# Production 배포
vercel --prod

# Preview 배포 (테스트용)
vercel
```

## 4. 배포 후 확인사항

1. **페이지 빌더 접근**: `https://your-domain.vercel.app/landing/edit`
2. **고객 랜딩 페이지**: `https://your-domain.vercel.app/landing`
3. **이미지 업로드 테스트**
4. **페이지 저장 및 실시간 반영 테스트**

## 5. 보안 설정

### 5.1 페이지 편집 권한 제한

현재는 누구나 페이지를 편집할 수 있습니다. 프로덕션에서는 인증을 추가해야 합니다:

1. **Supabase Auth 설정**
   - Supabase Dashboard → Authentication 설정
   - 관리자 계정 생성

2. **미들웨어 추가** (`middleware.ts`):
   ```typescript
   import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
   import { NextResponse } from 'next/server'
   import type { NextRequest } from 'next/server'

   export async function middleware(req: NextRequest) {
     const res = NextResponse.next()
     const supabase = createMiddlewareClient({ req, res })
     const { data: { session } } = await supabase.auth.getSession()

     // /landing/edit는 인증된 사용자만 접근
     if (req.nextUrl.pathname.startsWith('/landing/edit') && !session) {
       return NextResponse.redirect(new URL('/login', req.url))
     }

     return res
   }

   export const config = {
     matcher: ['/landing/edit/:path*']
   }
   ```

### 5.2 RLS 정책 강화

Supabase SQL Editor에서 실행:

```sql
-- 기존 정책 삭제
DROP POLICY IF EXISTS "Anyone can manage pages" ON public.pages;

-- 새로운 정책 생성
CREATE POLICY "Authenticated users can manage pages" ON public.pages
  FOR ALL USING (auth.role() = 'authenticated');

-- 또는 특정 이메일만 허용
CREATE POLICY "Admin users can manage pages" ON public.pages
  FOR ALL USING (
    auth.email() IN ('admin@careon.com', 'your-email@example.com')
  );
```

## 6. 성능 최적화

### 6.1 이미지 최적화

- Next.js Image 컴포넌트 사용 (이미 적용됨)
- Supabase Storage CDN 활용

### 6.2 캐싱 전략

- ISR (Incremental Static Regeneration) 설정
- Edge 캐싱 활용

### 6.3 번들 크기 최소화

```bash
# 번들 분석
npm run analyze
```

## 7. 모니터링

1. **Vercel Analytics** 활성화
2. **Supabase Dashboard**에서 사용량 모니터링
3. **에러 트래킹** (Sentry 등) 설정 고려

## 8. 백업 전략

1. **Supabase 자동 백업** 확인 (Pro 플랜)
2. **정기적인 데이터 Export**
3. **코드 저장소** 백업 (GitHub)

## 문제 해결

### 환경변수 관련 오류

- Vercel 대시보드에서 환경변수가 올바르게 설정되었는지 확인
- 배포 후 Function 로그 확인: Vercel Dashboard → Functions → Logs

### 이미지 업로드 실패

- Supabase Storage 용량 확인
- CORS 설정 확인
- Service Role Key 권한 확인

### 페이지 업데이트 실패

- RLS 정책 확인
- API Route 로그 확인
- 네트워크 탭에서 응답 확인