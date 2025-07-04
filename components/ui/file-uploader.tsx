'use client';

import { useState, useCallback } from 'react';
import { Upload, X, AlertCircle, CheckCircle, Image, Video, File } from 'lucide-react';
import { uploadFile, getFileType, formatFileSize, UploadResult } from '@/lib/supabase';

interface FileUploaderProps {
  onUploadComplete: (result: UploadResult) => void;
  onUploadStart?: () => void;
  onUploadError?: (error: string) => void;
  accept?: string;
  maxSize?: number; // in bytes
  folder?: string;
  className?: string;
  children?: React.ReactNode;
}

interface UploadProgress {
  file: File;
  progress: number;
  status: 'uploading' | 'success' | 'error';
  error?: string;
  result?: UploadResult;
}

export function FileUploader({
  onUploadComplete,
  onUploadStart,
  onUploadError,
  accept = 'image/*,video/*',
  maxSize = 50 * 1024 * 1024, // 50MB default
  folder = 'uploads',
  className = '',
  children
}: FileUploaderProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploads, setUploads] = useState<UploadProgress[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const validateFile = useCallback((file: File): string | null => {
    // Check file size
    if (file.size > maxSize) {
      return `파일 크기가 너무 큽니다. 최대 ${formatFileSize(maxSize)}까지 업로드 가능합니다.`;
    }

    // Check file type if accept is specified
    if (accept && accept !== '*') {
      const acceptedTypes = accept.split(',').map(type => type.trim());
      const fileType = file.type;
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();

      const isAccepted = acceptedTypes.some(acceptType => {
        if (acceptType.endsWith('/*')) {
          return fileType.startsWith(acceptType.slice(0, -1));
        }
        return acceptType === fileType || acceptType === fileExtension;
      });

      if (!isAccepted) {
        return `지원하지 않는 파일 형식입니다. (${acceptedTypes.join(', ')})`;
      }
    }

    return null;
  }, [accept, maxSize]);

  const handleUpload = useCallback(async (files: FileList) => {
    const fileArray = Array.from(files);
    setIsUploading(true);
    onUploadStart?.();

    const newUploads: UploadProgress[] = fileArray.map(file => ({
      file,
      progress: 0,
      status: 'uploading' as const
    }));

    setUploads(prev => [...prev, ...newUploads]);

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];
      const uploadIndex = uploads.length + i;

      // Validate file
      const validationError = validateFile(file);
      if (validationError) {
        setUploads(prev => prev.map((upload, idx) => 
          idx === uploadIndex 
            ? { ...upload, status: 'error', error: validationError }
            : upload
        ));
        onUploadError?.(validationError);
        continue;
      }

      try {
        // Simulate progress for better UX
        setUploads(prev => prev.map((upload, idx) => 
          idx === uploadIndex ? { ...upload, progress: 10 } : upload
        ));

        const result = await uploadFile(file, folder);

        setUploads(prev => prev.map((upload, idx) => 
          idx === uploadIndex ? { ...upload, progress: 90 } : upload
        ));

        if (result.error) {
          setUploads(prev => prev.map((upload, idx) => 
            idx === uploadIndex 
              ? { ...upload, status: 'error', error: result.error }
              : upload
          ));
          onUploadError?.(result.error);
        } else {
          setUploads(prev => prev.map((upload, idx) => 
            idx === uploadIndex 
              ? { ...upload, status: 'success', progress: 100, result }
              : upload
          ));
          onUploadComplete(result);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Upload failed';
        setUploads(prev => prev.map((upload, idx) => 
          idx === uploadIndex 
            ? { ...upload, status: 'error', error: errorMessage }
            : upload
        ));
        onUploadError?.(errorMessage);
      }
    }

    setIsUploading(false);
  }, [validateFile, onUploadComplete, onUploadStart, onUploadError, folder, uploads.length]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleUpload(files);
    }
  }, [handleUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleUpload(files);
    }
    // Reset input value to allow uploading same file again
    e.target.value = '';
  }, [handleUpload]);

  const removeUpload = useCallback((index: number) => {
    setUploads(prev => prev.filter((_, idx) => idx !== index));
  }, []);

  const getFileIcon = (file: File) => {
    const type = getFileType(file.name);
    switch (type) {
      case 'image':
        return <Image className="w-4 h-4" />;
      case 'video':
        return <Video className="w-4 h-4" />;
      default:
        return <File className="w-4 h-4" />;
    }
  };

  const getStatusIcon = (upload: UploadProgress) => {
    switch (upload.status) {
      case 'uploading':
        return (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600" />
        );
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
    }
  };

  if (children) {
    return (
      <div className={className}>
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-upload')?.click()}
        >
          {children}
        </div>
        <input
          id="file-upload"
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          multiple
          className="hidden"
        />
        {uploads.length > 0 && (
          <div className="mt-4 space-y-2">
            {uploads.map((upload, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center space-x-2 flex-1">
                  {getFileIcon(upload.file)}
                  <span className="text-sm truncate">{upload.file.name}</span>
                  <span className="text-xs text-gray-500">
                    ({formatFileSize(upload.file.size)})
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(upload)}
                  {upload.status === 'uploading' && (
                    <span className="text-xs text-gray-500">{upload.progress}%</span>
                  )}
                  {upload.status === 'error' && upload.error && (
                    <span className="text-xs text-red-600 max-w-32 truncate" title={upload.error}>
                      {upload.error}
                    </span>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeUpload(index);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
          isDragOver 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-upload')?.click()}
      >
        <Upload className={`w-12 h-12 mx-auto mb-2 ${isDragOver ? 'text-blue-500' : 'text-gray-400'}`} />
        <p className={`text-sm ${isDragOver ? 'text-blue-700' : 'text-gray-600'}`}>
          파일을 드롭하거나 클릭하여 업로드
        </p>
        <p className="text-xs text-gray-500 mt-1">
          최대 {formatFileSize(maxSize)} • {accept.replace(/\*/g, '모든 형식')}
        </p>
      </div>

      <input
        id="file-upload"
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        multiple
        className="hidden"
        disabled={isUploading}
      />

      {uploads.length > 0 && (
        <div className="mt-4 space-y-2">
          {uploads.map((upload, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3 flex-1">
                {getFileIcon(upload.file)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{upload.file.name}</p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(upload.file.size)}
                    {upload.status === 'uploading' && ` • ${upload.progress}%`}
                    {upload.status === 'error' && upload.error && ` • ${upload.error}`}
                  </p>
                  {upload.status === 'uploading' && (
                    <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                      <div 
                        className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                        style={{ width: `${upload.progress}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(upload)}
                <button
                  onClick={() => removeUpload(index)}
                  className="text-gray-400 hover:text-gray-600"
                  disabled={upload.status === 'uploading'}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}