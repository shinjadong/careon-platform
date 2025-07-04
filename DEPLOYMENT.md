# 배포 가이드

## Vercel 환경변수 설정

Vercel 대시보드에서 다음 환경변수들을 설정해야 합니다:

### 필수 환경변수

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://scophizorpxzzvsqjame.supabase.co

# Supabase Access Token (Priority 1 - Admin privileges for all operations)
NEXT_PUBLIC_SUPABASE_ACCESS_TOKEN=sbp_068bf1e6099c7457b7bab9aa12b2e776f2cc4a60

# Supabase Anon Key (Fallback - get from Supabase Dashboard)
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key_here
```

### Vercel 환경변수 설정 방법

1. Vercel 대시보드에서 프로젝트 선택
2. Settings → Environment Variables로 이동
3. 위의 환경변수들을 하나씩 추가
4. Production, Preview, Development 환경 모두에 적용

## 권한 설정

우선순위:
1. `NEXT_PUBLIC_SUPABASE_ACCESS_TOKEN`: 관리자 권한으로 모든 작업 수행 (권장)
2. `NEXT_PUBLIC_SUPABASE_ANON_KEY`: 일반 클라이언트 작업용 (fallback)

**현재 설정**: Access Token을 primary로 사용하여 Storage 권한 문제를 완전히 해결합니다.

## Supabase Anon Key 가져오는 방법

1. [Supabase Dashboard](https://supabase.com/dashboard) 접속
2. 프로젝트 선택 (scophizorpxzzvsqjame)
3. Settings → API로 이동
4. "anon public" key 복사
5. 환경변수에 추가 (필요시)

## 배포 후 확인사항

1. 페이지 빌더에서 이미지/동영상 업로드 테스트
2. 파일 매니저에서 파일 목록 조회 테스트
3. Supabase Storage의 careon 폴더에 파일이 정상적으로 업로드되는지 확인