import { supabase, supabaseAdmin } from '@/lib/supabase';
import { IPage, IPageUpdateRequest } from '@/types';
import { Block } from '@/types/page-builder';

/**
 * 페이지 데이터 조회 (slug 기반)
 */
export async function getPageBySlug(slug: string): Promise<IPage | null> {
  try {
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error) {
      console.error('페이지 조회 에러:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('페이지 조회 중 에러:', error);
    return null;
  }
}

/**
 * 페이지 데이터 저장/업데이트
 * Service Role Key가 있으면 사용하고, 없으면 일반 클라이언트 사용
 */
export async function updatePageBySlug(
  slug: string, 
  updateData: IPageUpdateRequest
): Promise<IPage | null> {
  try {
    // Service Role Key가 있으면 Admin 클라이언트 사용
    const client = process.env.SUPABASE_SERVICE_ROLE_KEY ? supabaseAdmin : supabase;
    
    const { data, error } = await client
      .from('pages')
      .update({
        ...updateData,
        updated_at: new Date().toISOString()
      })
      .eq('slug', slug)
      .select()
      .single();

    if (error) {
      console.error('페이지 업데이트 에러:', error);
      return null;
    }

    console.log('✅ 페이지 업데이트 성공:', data.slug);
    return data;
  } catch (error) {
    console.error('페이지 업데이트 중 에러:', error);
    return null;
  }
}

/**
 * 페이지가 존재하지 않으면 생성
 */
export async function createPageIfNotExists(
  slug: string, 
  title: string, 
  blocks: Block[] = []
): Promise<IPage | null> {
  try {
    const client = process.env.SUPABASE_SERVICE_ROLE_KEY ? supabaseAdmin : supabase;
    
    const { data, error } = await client
      .from('pages')
      .insert({
        slug,
        title,
        blocks,
        status: 'published'
      })
      .select()
      .single();

    if (error) {
      console.error('페이지 생성 에러:', error);
      return null;
    }

    console.log('✅ 페이지 생성 성공:', data.slug);
    return data;
  } catch (error) {
    console.error('페이지 생성 중 에러:', error);
    return null;
  }
}

/**
 * 페이지 데이터 저장 (존재하면 업데이트, 없으면 생성)
 */
export async function savePageData(
  slug: string, 
  title: string, 
  blocks: Block[]
): Promise<IPage | null> {
  try {
    // 먼저 기존 페이지 확인
    const existingPage = await getPageBySlug(slug);
    
    if (existingPage) {
      // 기존 페이지 업데이트
      return await updatePageBySlug(slug, { title, blocks });
    } else {
      // 새 페이지 생성
      return await createPageIfNotExists(slug, title, blocks);
    }
  } catch (error) {
    console.error('페이지 저장 중 에러:', error);
    return null;
  }
}

/**
 * 페이지 테이블 자동 생성 (이미 존재하므로 더미 함수)
 */
export async function ensurePagesTableExists(): Promise<void> {
  // 테이블이 이미 존재하므로 아무것도 하지 않음
  return;
} 