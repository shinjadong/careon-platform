import { createClient } from '@supabase/supabase-js';

// Supabase 프로젝트 정보 - 새 careon-platform 프로젝트
const supabaseUrl = 'https://clbutkcmgxfetdcceoaa.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsYnV0a2NtZ3hmZXRkY2Nlb2FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxMzM5ODksImV4cCI6MjA2NzcwOTk4OX0.ueDigeMvdez2-PQD5X_nVwE4BiX8QZI1eRsiDtaZUWM';

// 클라이언트용 Supabase 인스턴스
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 관리자용 Supabase 인스턴스 (Service Role Key 필요시)
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey
);

// 파일 업로드 결과 인터페이스
export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
  path?: string;
}

/**
 * 파일 업로드 함수
 * @param file - 업로드할 파일
 * @param folder - 저장할 폴더 (기본: uploads)
 * @returns 업로드 결과
 */
export async function uploadFile(file: File, folder: string = 'uploads'): Promise<UploadResult> {
  try {
    // 파일명을 안전하게 변환 (한글, 특수문자 등 처리)
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    // Storage에 파일 업로드
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('files')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('업로드 에러:', uploadError);
      return {
        success: false,
        error: uploadError.message
      };
    }

    // Public URL 생성
    const { data: urlData } = supabase.storage
      .from('files')
      .getPublicUrl(filePath);

    return {
      success: true,
      url: urlData.publicUrl,
      path: filePath
    };

  } catch (error: any) {
    console.error('파일 업로드 중 에러:', error);
    return {
      success: false,
      error: error.message || '알 수 없는 오류가 발생했습니다.'
    };
  }
}

/**
 * 파일 목록 조회
 * @param folder - 조회할 폴더 (기본: uploads)
 * @returns 파일 목록
 */
export async function listFiles(folder: string = 'uploads') {
  try {
    const { data, error } = await supabase.storage
      .from('files')
      .list(folder, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'updated_at', order: 'desc' }
      });

    if (error) {
      return { data: null, error };
    }

    // Public URL 추가
    const filesWithUrls = data?.map(file => ({
      ...file,
      publicUrl: supabase.storage
        .from('files')
        .getPublicUrl(`${folder}/${file.name}`).data.publicUrl
    }));

    return { data: filesWithUrls, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

/**
 * 파일 삭제
 * @param path - 삭제할 파일 경로
 * @returns 삭제 결과
 */
export async function deleteFile(path: string) {
  try {
    const { data, error } = await supabase.storage
      .from('files')
      .remove([path]);

    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
}

/**
 * 파일 타입 확인
 * @param fileName - 파일명
 * @returns 파일 확장자
 */
export function getFileType(fileName: string): string {
  return fileName.split('.').pop()?.toLowerCase() || '';
}

/**
 * 파일 크기 포맷팅
 * @param bytes - 바이트 크기
 * @returns 포맷된 크기
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export default supabase; 