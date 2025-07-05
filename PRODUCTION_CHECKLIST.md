# 프로덕션 배포 체크리스트

## 🔍 배포 전 필수 확인사항

### 1. 환경변수 설정 ✓
- [ ] `.env.local.example`을 참고하여 `.env.local` 파일 생성
- [ ] `NEXT_PUBLIC_SUPABASE_URL` 설정
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` 설정  
- [ ] `SUPABASE_SERVICE_ROLE_KEY` 설정

### 2. Supabase 설정 ✓
- [ ] pages 테이블 생성 확인
- [ ] Storage 버킷 (careon) 생성 확인
- [ ] RLS 정책 설정 확인
- [ ] 인덱스 생성 확인

### 3. 코드 품질 ✓
- [ ] TypeScript 에러 없음
- [ ] ESLint 경고 없음
- [ ] 빌드 성공 (`npm run build`)
- [ ] 불필요한 console.log 제거

### 4. 보안 점검 ✓
- [ ] 하드코딩된 시크릿 키 제거
- [ ] Service Role Key 서버사이드에서만 사용
- [ ] CORS 설정 확인
- [ ] API 엔드포인트 보호

### 5. 성능 최적화 ✓
- [ ] 이미지 최적화 (Next.js Image 사용)
- [ ] 코드 분할 적용
- [ ] 번들 크기 확인 (`npm run analyze`)
- [ ] 불필요한 의존성 제거

### 6. Vercel 설정 ✓
- [ ] vercel.json 파일 확인
- [ ] 환경변수 Vercel Dashboard에 설정
- [ ] 도메인 설정 (옵션)
- [ ] 리전 설정 (icn1 - 서울)

### 7. 기능 테스트 ✓
- [ ] 페이지 빌더 작동 확인
- [ ] 이미지 업로드 테스트
- [ ] 페이지 저장/불러오기 테스트
- [ ] 모바일 반응형 확인

### 8. 문서화 ✓
- [ ] README.md 최신화
- [ ] DEPLOYMENT.md 작성
- [ ] API 문서 작성 (필요시)
- [ ] 환경변수 설명 문서화

## 🚀 배포 절차

### 1단계: 로컬 테스트
```bash
# 프로덕션 빌드
npm run build

# 프로덕션 모드로 실행
npm start
```

### 2단계: Vercel 배포
```bash
# Preview 배포 (테스트)
vercel

# Production 배포 (실제 서비스)
vercel --prod
```

### 3단계: 배포 후 확인
- [ ] 웹사이트 접속 가능
- [ ] 페이지 빌더 정상 작동
- [ ] 이미지 업로드 성공
- [ ] 페이지 저장 성공
- [ ] 콘솔 에러 없음

## 📞 문제 발생 시

### 일반적인 문제 해결
1. **500 에러**: 환경변수 확인
2. **빌드 실패**: TypeScript 에러 확인
3. **이미지 업로드 실패**: Supabase Storage 권한 확인
4. **페이지 저장 실패**: RLS 정책 확인

### 로그 확인
- Vercel Dashboard → Functions → Logs
- Supabase Dashboard → Logs → API logs

### 롤백 방법
```bash
# Vercel에서 이전 배포로 롤백
vercel rollback
```

## ✅ 최종 확인

모든 항목을 체크했다면 프로덕션 배포 준비가 완료되었습니다!

배포일: _______________
담당자: _______________
버전: v1.0.0 