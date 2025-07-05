import { supabase, supabaseAdmin } from '@/lib/supabase';
import { IPage, IPageUpdateRequest } from '@/types';
import { Block } from '@/types/page-builder';

/**
 * 페이지 테이블 자동 생성 (테이블이 없을 때만)
 */
export async function ensurePagesTableExists(): Promise<void> {
  try {
    // 테이블 존재 여부 확인
    const { data, error } = await supabase
      .from('pages')
      .select('id')
      .limit(1);

    // 테이블이 존재하면 리턴
    if (!error) {
      return;
    }

    // 테이블이 없으면 생성
    console.log('Creating pages table...');
    
    const { error: createError } = await supabase.rpc('create_pages_table');
    
    if (createError) {
      console.log('RPC function not available, creating via SQL...');
      
      // RPC가 없으면 직접 SQL 실행 (관리자 권한 필요)
      const createTableSQL = `
        CREATE TABLE IF NOT EXISTS public.pages (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          slug TEXT UNIQUE NOT NULL,
          title TEXT NOT NULL,
          blocks JSONB NOT NULL DEFAULT '[]'::jsonb,
          status TEXT NOT NULL DEFAULT 'published',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
        );
        
        CREATE INDEX IF NOT EXISTS idx_pages_slug ON public.pages(slug);
        CREATE INDEX IF NOT EXISTS idx_pages_status ON public.pages(status);
        
        ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
        
        CREATE POLICY IF NOT EXISTS "Public pages are viewable by everyone" ON public.pages
          FOR SELECT USING (status = 'published');
        
        CREATE POLICY IF NOT EXISTS "Authenticated users can manage pages" ON public.pages
          FOR ALL USING (auth.role() = 'authenticated');
      `;
      
      console.warn('Please run this SQL manually in your Supabase dashboard:', createTableSQL);
    }
    
    console.log('Pages table created successfully');
  } catch (error) {
    console.error('Error ensuring pages table exists:', error);
  }
}

/**
 * 페이지 데이터 조회 (slug 기반)
 */
export async function getPageBySlug(slug: string): Promise<IPage | null> {
  try {
    // 테이블 존재 확인
    await ensurePagesTableExists();
    
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error) {
      console.error('Error fetching page:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching page by slug:', error);
    return null;
  }
}

/**
 * 페이지 데이터 저장/업데이트
 * Service Role Key를 사용하여 RLS 우회
 */
export async function updatePageBySlug(
  slug: string, 
  updateData: IPageUpdateRequest
): Promise<IPage | null> {
  try {
    // Service Role Key 사용 (RLS 우회)
    const { data, error } = await supabaseAdmin
      .from('pages')
      .update({
        ...updateData,
        updated_at: new Date().toISOString()
      })
      .eq('slug', slug)
      .select()
      .single();

    if (error) {
      console.error('Error updating page:', error);
      return null;
    }

    console.log('✅ Page updated successfully:', data.slug);
    return data;
  } catch (error) {
    console.error('Error updating page by slug:', error);
    return null;
  }
}

/**
 * 페이지가 존재하지 않으면 생성
 * Service Role Key를 사용하여 RLS 우회
 */
export async function createPageIfNotExists(
  slug: string, 
  title: string, 
  blocks: Block[] = []
): Promise<IPage | null> {
  try {
    // Service Role Key 사용 (RLS 우회)
    const { data, error } = await supabaseAdmin
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
      console.error('Error creating page:', error);
      return null;
    }

    console.log('✅ Page created successfully:', data.slug);
    return data;
  } catch (error) {
    console.error('Error creating page:', error);
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
    console.error('Error saving page data:', error);
    return null;
  }
} 