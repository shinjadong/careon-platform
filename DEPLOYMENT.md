# 배포 가이드

## Vercel 환경변수 설정

Vercel 대시보드에서 다음 환경변수들을 설정해야 합니다:

### 필수 환경변수

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://scophizorpxzzvsqjame.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjb3BoaXpvcnB4enp2c3FqYW1lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3MDM2NDEsImV4cCI6MjA0OTI3OTY0MX0.placeholder-replace-with-actual-key

# Supabase Access Token for Storage Operations (Admin privileges)
NEXT_PUBLIC_SUPABASE_ACCESS_TOKEN=sbp_068bf1e6099c7457b7bab9aa12b2e776f2cc4a60
```

### Vercel 환경변수 설정 방법

1. Vercel 대시보드에서 프로젝트 선택
2. Settings → Environment Variables로 이동
3. 위의 환경변수들을 하나씩 추가
4. Production, Preview, Development 환경 모두에 적용

## 권한 설정

- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: 일반적인 클라이언트 작업용
- `NEXT_PUBLIC_SUPABASE_ACCESS_TOKEN`: Storage 업로드/삭제 등 관리자 권한이 필요한 작업용

이 설정으로 Supabase Storage 권한 문제가 해결됩니다.

## 배포 후 확인사항

1. 페이지 빌더에서 이미지/동영상 업로드 테스트
2. 파일 매니저에서 파일 목록 조회 테스트
3. Supabase Storage의 careon 폴더에 파일이 정상적으로 업로드되는지 확인