# Vercel 배포 가이드

## 🚀 빠른 배포 (5분 소요)

### 1단계: Vercel 계정 생성 (이미 있다면 건너뛰기)
- https://vercel.com/signup 에서 GitHub 계정으로 가입

### 2단계: 터미널에서 배포 실행

```bash
# 배포 명령 실행
vercel --prod
```

### 3단계: 프롬프트 응답

1. **"Set up and deploy"** → Enter 키
2. **"Which scope"** → 본인 계정 선택 또는 Enter
3. **"Link to existing project?"** → N (새 프로젝트)
4. **"What's your project's name?"** → careon-platform (또는 원하는 이름)
5. **"In which directory"** → Enter (현재 디렉토리)
6. **"Want to modify settings?"** → N

### 4단계: 환경변수 설정 (중요!)

배포가 완료되면 URL이 표시됩니다. 

1. https://vercel.com/dashboard 접속
2. 방금 배포한 프로젝트 클릭
3. **Settings** → **Environment Variables** 클릭
4. 다음 환경변수 추가:

| Key | Value | Environment |
|-----|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://bvhfjfpsedkfqvmxwvfr.supabase.co` | Production |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2aGZqZnBzZWRrZnF2bXh3dmZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyNzIxMDUsImV4cCI6MjA2Njg0ODEwNX0.CHadOafa5KsVq5LWQ9gqvP4ZSdUQm_ALdJCLvfLHKrk` | Production |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2aGZqZnBzZWRrZnF2bXh3dmZyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MTI3MjEwNSwiZXhwIjoyMDY2ODQ4MTA1fQ.SZWPyhRZINtYEe8d4UQvpVNIaW_f9qs4bDIbr2tCVLo` | Production |

5. **Save** 버튼 클릭

### 5단계: 재배포

환경변수 설정 후 재배포가 필요합니다:

1. Vercel Dashboard에서 프로젝트 페이지로 이동
2. **Deployments** 탭 클릭
3. 최신 배포 옆의 **...** 메뉴 클릭
4. **Redeploy** 선택
5. **Redeploy** 버튼 클릭

## ✅ 배포 확인

1. 배포된 URL 접속 (예: https://careon-platform.vercel.app)
2. `/landing/edit` 페이지에서 페이지 빌더 테스트
3. 이미지 업로드 및 저장 기능 확인

## 🔧 문제 해결

### 500 에러가 발생하는 경우
- 환경변수가 올바르게 설정되었는지 확인
- Vercel Functions 로그 확인

### 이미지 업로드가 안 되는 경우
- Supabase Storage 권한 확인
- CORS 설정 확인

### 페이지 저장이 안 되는 경우
- RLS 정책 확인
- Service Role Key가 올바른지 확인

## 🎯 추가 설정 (선택사항)

### 커스텀 도메인 연결
1. Settings → Domains
2. Add Domain
3. DNS 설정 안내 따르기

### 자동 배포 설정
1. Git 저장소 연결
2. main 브랜치 푸시 시 자동 배포

## 📞 도움이 필요하신가요?

- Vercel 문서: https://vercel.com/docs
- Supabase 문서: https://supabase.com/docs
- 프로젝트 이슈: GitHub Issues에 문의 