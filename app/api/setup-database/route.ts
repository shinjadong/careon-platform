import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

/**
 * 데이터베이스 테이블 생성을 위한 특별한 엔드포인트
 * 브라우저에서 직접 접속: http://localhost:3000/api/setup-database
 */
export async function GET(request: NextRequest) {
  try {
    console.log('🚀 Starting database setup...');
    
    // 1. 테이블 존재 여부 확인
    const { data: checkData, error: checkError } = await supabase
      .from('pages')
      .select('id')
      .limit(1);

    if (!checkError) {
      return NextResponse.json({
        success: true,
        message: '✅ Pages 테이블이 이미 존재합니다!',
        data: checkData
      });
    }

    // 2. 테이블이 없으면 기본 데이터와 함께 생성 시도
    console.log('Creating pages table with default data...');
    
    // Supabase Edge Function을 통한 테이블 생성 시도
    // 이 방법이 실패하면 수동으로 SQL을 실행해야 함
    const defaultPageData = {
      slug: 'landing',
      title: '케어온 랜딩페이지',
      blocks: [
        {
          id: "hero-1",
          type: "hero",
          content: {
            title: "사업 성공의 파트너\\n케어온이 함께합니다",
            subtitle: "프랜차이즈 창업부터 매장 운영까지, 필요한 모든 장비를 한 번에.\\n초기 투자 부담은 줄이고, 매출 성장에만 집중하세요.",
            backgroundImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1926&q=80",
            overlay: true,
            overlayOpacity: 0.6,
            buttons: [
              { text: "무료 견적 받기", link: "#contact-form", variant: "default" },
              { text: "상담 예약하기", link: "#consultation", variant: "outline" }
            ]
          }
        },
        {
          id: "features-1",
          type: "text",
          content: {
            text: "## 🎯 케어온이 특별한 이유\\n\\n### ✅ 초기 투자 부담 ZERO\\n높은 장비 구매 비용 없이 월 렌탈료만으로 시작\\n\\n### ✅ 매출 증대 솔루션\\n검증된 장비로 고객 만족도와 재방문율 향상\\n\\n### ✅ 원스톱 서비스\\n설치부터 A/S까지 모든 것을 케어온에서 해결\\n\\n### ✅ 맞춤형 패키지\\n업종별, 규모별 최적화된 장비 구성 제안"
          }
        },
        {
          id: "cta-1",
          type: "button",
          content: {
            text: "지금 무료 상담 받기",
            link: "https://pf.kakao.com/_xexgLxj",
            variant: "default",
            size: "lg"
          }
        }
      ],
      status: 'published'
    };

    // 데이터 삽입 시도 (테이블이 없으면 실패할 것임)
    const { data: insertData, error: insertError } = await supabase
      .from('pages')
      .insert([defaultPageData])
      .select();

    if (insertError) {
      // SQL 생성
      const createTableSQL = `
-- 📋 케어온 플랫폼 페이지 빌더 테이블 생성 SQL
-- 이 SQL을 Supabase Dashboard > SQL Editor에서 실행하세요!

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

-- 2. 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_pages_slug ON public.pages(slug);
CREATE INDEX IF NOT EXISTS idx_pages_status ON public.pages(status);

-- 3. RLS 활성화
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

-- 4. 보안 정책
CREATE POLICY IF NOT EXISTS "Public pages are viewable by everyone" 
ON public.pages FOR SELECT USING (status = 'published');

CREATE POLICY IF NOT EXISTS "Authenticated users can manage pages" 
ON public.pages FOR ALL USING (auth.role() = 'authenticated');

-- 5. 기본 데이터 삽입
INSERT INTO public.pages (slug, title, blocks, status) 
VALUES ('landing', '케어온 랜딩페이지', '${JSON.stringify(defaultPageData.blocks)}'::jsonb, 'published')
ON CONFLICT (slug) DO NOTHING;

-- 완료!
SELECT 'Pages table created successfully! 🎉' as message;
`;

      return NextResponse.json({
        success: false,
        error: '테이블이 존재하지 않습니다.',
        message: '❌ 자동 생성 실패 - 수동으로 SQL을 실행해주세요',
        instructions: {
          step1: 'Supabase Dashboard 접속: https://supabase.com/dashboard/project/bvhfjfpsedkfqvmxwvfr',
          step2: 'SQL Editor 메뉴 클릭',
          step3: 'New query 버튼 클릭',
          step4: '아래 SQL 전체를 복사해서 붙여넣기',
          step5: 'Run 버튼 클릭'
        },
        sql: createTableSQL
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: '✅ 테이블과 기본 데이터가 성공적으로 생성되었습니다!',
      data: insertData
    });

  } catch (error) {
    console.error('Setup database error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : '알 수 없는 오류',
      message: '❌ 데이터베이스 설정 중 오류가 발생했습니다'
    }, { status: 500 });
  }
} 