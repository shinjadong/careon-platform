import { NextRequest, NextResponse } from 'next/server';
import { getPageBySlug, updatePageBySlug, createPageIfNotExists } from '@/lib/api/pages';
import { IPageUpdateRequest } from '@/types';
import { revalidatePath } from 'next/cache';

interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * GET: 페이지 데이터 조회
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { slug } = await params;
    
    const page = await getPageBySlug(slug);
    
    if (!page) {
      return NextResponse.json(
        { success: false, error: '페이지를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: page
    });
  } catch (error) {
    console.error('API Error - GET /api/pages/[slug]:', error);
    return NextResponse.json(
      { success: false, error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

/**
 * PUT: 페이지 데이터 저장/업데이트 + 즉시 캐시 무효화
 */
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { slug } = await params;
    const updateData: IPageUpdateRequest = await request.json();
    
    // 페이지가 존재하지 않으면 생성
    const existingPage = await getPageBySlug(slug);
    if (!existingPage) {
      await createPageIfNotExists(slug, updateData.title || '케어온 랜딩페이지', updateData.blocks || []);
    }
    
    // 페이지 업데이트
    const updatedPage = await updatePageBySlug(slug, updateData);
    
    if (!updatedPage) {
      return NextResponse.json(
        { success: false, error: '페이지 업데이트에 실패했습니다.' },
        { status: 400 }
      );
    }

    // 🚀 핵심: 즉시 캐시 무효화 (프로덕션 반영)
    try {
      revalidatePath(`/${slug}`);
      revalidatePath('/landing'); // landing 페이지 명시적 무효화
      console.log(`✅ Cache revalidated for /${slug} and /landing`);
    } catch (revalidateError) {
      console.error('Revalidation error:', revalidateError);
      // revalidation 실패해도 응답은 성공으로 처리
    }

    return NextResponse.json({
      success: true,
      data: updatedPage,
      message: '페이지가 성공적으로 업데이트되었습니다. 변경사항이 즉시 반영됩니다.'
    });
  } catch (error) {
    console.error('API Error - PUT /api/pages/[slug]:', error);
    return NextResponse.json(
      { success: false, error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

/**
 * POST: 페이지 생성 (PUT과 동일한 로직)
 */
export async function POST(
  request: NextRequest,
  { params }: RouteParams
) {
  return PUT(request, { params });
} 