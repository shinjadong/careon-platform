import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseAccessToken = process.env.NEXT_PUBLIC_SUPABASE_ACCESS_TOKEN || '';

if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL');
}

if (!supabaseAccessToken) {
  console.warn('NEXT_PUBLIC_SUPABASE_ACCESS_TOKEN is recommended for full functionality');
  if (!supabaseAnonKey) {
    throw new Error('Missing both NEXT_PUBLIC_SUPABASE_ACCESS_TOKEN and NEXT_PUBLIC_SUPABASE_ANON_KEY');
  }
}

// Use access token as primary auth method if available
const primaryKey = supabaseAccessToken || supabaseAnonKey || 'fallback-key';

// Create client with access token priority
const clientOptions = {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  },
  global: {
    headers: supabaseAccessToken ? {
      'Authorization': `Bearer ${supabaseAccessToken}`,
      'apikey': supabaseAccessToken
    } : undefined
  }
};

// Regular client for general operations  
export const supabase = createClient(supabaseUrl, primaryKey, clientOptions);

// Admin client with service role for storage operations (same as regular for now)
export const supabaseAdmin = supabase;

// Storage bucket name
export const STORAGE_BUCKET = 'careon';
export const CAREON_FOLDER = 'uploads';

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
  folder: string = 'uploads'
): Promise<UploadResult> {
  try {
    // Check if we have proper authentication
    if (!supabaseAccessToken && !supabaseAnonKey) {
      return { error: 'No authentication token available' };
    }
    // Generate unique filename with timestamp
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const fileExtension = file.name.split('.').pop();
    const fileName = `${timestamp}_${randomString}.${fileExtension}`;
    const filePath = `${CAREON_FOLDER}/${folder}/${fileName}`;

    // Upload file to Supabase Storage using admin client for better permissions
    const { data, error } = await supabaseAdmin.storage
      .from(STORAGE_BUCKET)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Supabase upload error details:', {
        error: error,
        message: error.message,
        details: error.details || 'No details available',
        hint: error.hint || 'No hint available',
        code: error.code || 'No code available'
      });
      return { error: `Upload failed: ${error.message || error.details || JSON.stringify(error)}` };
    }

    // Get public URL
    const { data: urlData } = supabaseAdmin.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(filePath);

    return {
      data: {
        path: data.path,
        fullPath: filePath,
        publicUrl: urlData.publicUrl
      }
    };
  } catch (error) {
    console.error('Upload exception:', error);
    const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
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
    const path = folder ? `${CAREON_FOLDER}/${folder}` : CAREON_FOLDER;
    
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