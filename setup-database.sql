-- 케어온 플랫폼 - 페이지 빌더 테이블 생성
-- Supabase Dashboard > SQL Editor에서 실행하세요

-- 1. pages 테이블 생성
CREATE TABLE IF NOT EXISTS public.pages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    blocks JSONB NOT NULL DEFAULT '[]'::jsonb,
    status TEXT NOT NULL DEFAULT 'published',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. 인덱스 생성 (성능 최적화)
CREATE INDEX IF NOT EXISTS idx_pages_slug ON public.pages(slug);
CREATE INDEX IF NOT EXISTS idx_pages_status ON public.pages(status);

-- 3. Row Level Security (RLS) 활성화
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

-- 4. 보안 정책 생성
-- 모든 사용자가 published 페이지 조회 가능
CREATE POLICY IF NOT EXISTS "Public pages are viewable by everyone" ON public.pages
    FOR SELECT USING (status = 'published');

-- 인증된 사용자만 페이지 관리 가능
CREATE POLICY IF NOT EXISTS "Authenticated users can manage pages" ON public.pages
    FOR ALL USING (auth.role() = 'authenticated');

-- 5. 기본 랜딩 페이지 데이터 삽입
INSERT INTO public.pages (slug, title, blocks, status) VALUES (
    'landing',
    '케어온 랜딩페이지',
    '[
        {
            "id": "hero-1",
            "type": "hero",
            "content": {
                "title": "사업 성공의 파트너\\n케어온이 함께합니다",
                "subtitle": "프랜차이즈 창업부터 매장 운영까지, 필요한 모든 장비를 한 번에.\\n초기 투자 부담은 줄이고, 매출 성장에만 집중하세요.",
                "backgroundImage": "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1926&q=80",
                "overlay": true,
                "overlayOpacity": 0.6,
                "buttons": [
                    { "text": "무료 견적 받기", "link": "#contact-form", "variant": "default" },
                    { "text": "상담 예약하기", "link": "#consultation", "variant": "outline" }
                ]
            }
        },
        {
            "id": "features-1",
            "type": "text",
            "content": {
                "text": "## 🎯 케어온이 특별한 이유\\n\\n### ✅ 초기 투자 부담 ZERO\\n높은 장비 구매 비용 없이 월 렌탈료만으로 시작\\n\\n### ✅ 매출 증대 솔루션\\n검증된 장비로 고객 만족도와 재방문율 향상\\n\\n### ✅ 원스톱 서비스\\n설치부터 A/S까지 모든 것을 케어온에서 해결\\n\\n### ✅ 맞춤형 패키지\\n업종별, 규모별 최적화된 장비 구성 제안"
            }
        },
        {
            "id": "cta-1",
            "type": "button",
            "content": {
                "text": "지금 무료 상담 받기",
                "link": "https://pf.kakao.com/_xexgLxj",
                "variant": "default",
                "size": "lg"
            }
        }
    ]'::jsonb,
    'published'
) ON CONFLICT (slug) DO NOTHING;

-- 완료 메시지
SELECT 'Pages table created successfully! 🎉' as message; 