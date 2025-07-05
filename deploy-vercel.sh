#!/bin/bash

echo "🚀 CareOn 플랫폼 Vercel 배포 시작..."

# 환경변수 확인
if [ ! -f .env.local ]; then
    echo "❌ .env.local 파일이 없습니다!"
    exit 1
fi

echo "✅ 환경변수 파일 확인 완료"

# 빌드 확인
echo "📦 프로덕션 빌드 테스트 중..."
npm run build || {
    echo "❌ 빌드 실패!"
    exit 1
}

echo "✅ 빌드 성공!"

# Vercel 배포
echo "🔄 Vercel 배포 시작..."
echo ""
echo "⚠️  주의사항:"
echo "1. Vercel에 로그인하라는 메시지가 나오면 Enter를 누르세요"
echo "2. 프로젝트를 연결하라는 메시지가 나오면 Y를 입력하세요"
echo "3. 기본 설정을 사용하려면 계속 Enter를 누르세요"
echo ""
echo "환경변수는 배포 후 Vercel Dashboard에서 설정해야 합니다:"
echo "- NEXT_PUBLIC_SUPABASE_URL"
echo "- NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo "- SUPABASE_SERVICE_ROLE_KEY"
echo ""

# 배포 실행
vercel --prod

echo ""
echo "✅ 배포 완료!"
echo ""
echo "📝 다음 단계:"
echo "1. Vercel Dashboard (https://vercel.com/dashboard) 접속"
echo "2. 프로젝트 선택 → Settings → Environment Variables"
echo "3. 위에 나열된 환경변수들을 추가"
echo "4. 배포된 사이트 확인" 