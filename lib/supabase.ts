import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL');
}

if (!supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

// Regular client for general operations  
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client with service role for storage operations
export const supabaseAdmin = supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : supabase; // Fallback to regular client if no service key

// Storage bucket name
export const STORAGE_BUCKET = 'careon';



export interface UploadResult {
  data?: {
    path: string;
    fullPath: string;
    publicUrl: string;
  };
  error?: string;
}

export async function uploadFile(
  file: File,
  folder: string = 'general'
): Promise<UploadResult> {
  try {
    console.log('Starting file upload:', {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      folder: folder
    });

    // Skip bucket creation and proceed directly to upload
    // The bucket should be manually created in Supabase Dashboard

    // Generate unique filename with timestamp
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const fileExtension = file.name.split('.').pop();
    const fileName = `${timestamp}_${randomString}.${fileExtension}`;
    const filePath = `${folder}/${fileName}`;

    console.log('Uploading to path:', filePath);

    // Use regular client for uploads (less restrictive)
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Supabase upload error:', {
        message: error.message,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        details: (error as any).details || 'No details available',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        hint: (error as any).hint || 'No hint available',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        statusCode: (error as any).statusCode
      });
      
      return { error: `Upload failed: ${error.message}` };
    }

    console.log('Upload successful:', data);

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(filePath);

    console.log('Public URL generated:', urlData.publicUrl);

    return {
      data: {
        path: data.path,
        fullPath: filePath,
        publicUrl: urlData.publicUrl
      }
    };
  } catch (error) {
    console.error('Upload exception:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown upload error';
    return { error: `Upload exception: ${errorMessage}` };
  }
}

export async function deleteFile(filePath: string): Promise<{ error?: string }> {
  try {
    const { error } = await supabaseAdmin.storage
      .from(STORAGE_BUCKET)
      .remove([filePath]);

    if (error) {
      return { error: error.message };
    }

    return {};
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Delete failed' };
  }
}

export async function listFiles(folder: string = ''): Promise<{
  data?: Array<{ name: string; id: string; updated_at: string; metadata: Record<string, unknown> }>;
  error?: string;
}> {
  try {
    const path = folder || '';
    
    const { data, error } = await supabaseAdmin.storage
      .from(STORAGE_BUCKET)
      .list(path, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'created_at', order: 'desc' }
      });

    if (error) {
      return { error: error.message };
    }

    return { data };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'List failed' };
  }
}

// Helper function to get file type from extension
export function getFileType(fileName: string): 'image' | 'video' | 'document' | 'other' {
  const extension = fileName.split('.').pop()?.toLowerCase();
  
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension || '')) {
    return 'image';
  }
  
  if (['mp4', 'webm', 'ogg', 'mov', 'avi'].includes(extension || '')) {
    return 'video';
  }
  
  if (['pdf', 'doc', 'docx', 'txt'].includes(extension || '')) {
    return 'document';
  }
  
  return 'other';
}

// Helper function to format file size
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}