'use client';

import { useState, useCallback } from 'react';
import { ImageBlock } from '@/types/page-builder';
import Image from 'next/image';
import { Upload, Link as LinkIcon, Settings, X, Cloud } from 'lucide-react';
import { FileUploader } from '@/components/ui/file-uploader';
import { UploadResult } from '@/lib/supabase';

interface ImageBlockRendererProps {
  block: ImageBlock;
  isEditing?: boolean;
  onUpdate?: (block: ImageBlock) => void;
}

export function ImageBlockRendererEnhanced({ block, isEditing, onUpdate }: ImageBlockRendererProps) {
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [imageData, setImageData] = useState(block.content);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadSource, setUploadSource] = useState<'url' | 'upload'>('upload');

  const handleSave = useCallback(() => {
    // URL 유효성 검사
    if (imageData.src && !isValidUrl(imageData.src) && !imageData.src.startsWith('data:')) {
      setUploadError('올바른 URL을 입력해주세요.');
      return;
    }

    onUpdate?.({
      ...block,
      content: {
        ...imageData,
        alt: imageData.alt || '이미지',
      },
    });
    setIsEditingImage(false);
    setUploadError(null);
  }, [block, imageData, onUpdate]);

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  const isGif = (src: string) => {
    return src.toLowerCase().includes('.gif') || 
           src.toLowerCase().includes('giphy') || 
           src.toLowerCase().includes('tenor');
  };

  const handleSupabaseUpload = async (results: UploadResult[] | UploadResult) => {
    console.log('Upload results:', results);
    console.log('Full result object:', JSON.stringify(results, null, 2));
    
    // results가 배열인지 단일 객체인지 확인
    const result = Array.isArray(results) ? results[0] : results;
    
    if (result) {
      console.log('Result data:', result.data);
      console.log('Result error:', result.error);
      
      if (result.data && result.data.publicUrl) {
        console.log('Setting image URL to:', result.data.publicUrl);
        
        onUpdate?.({
          ...block,
          content: {
            ...block.content,
            src: result.data.publicUrl,
            alt: block.content.alt || 'Uploaded image'
          }
        });
        
        setIsEditingImage(false);
        setUploadError(null);
      } else if (result.error) {
        console.error('Upload failed with error:', result.error);
        setUploadError(result.error);
      } else {
        console.error('Upload failed: No valid data or URL received');
        console.log('Available result properties:', Object.keys(result.data || {}));
        setUploadError('업로드는 성공했지만 이미지 URL을 가져올 수 없습니다.');
      }
    } else {
      console.error('Upload failed: No results received');
      setUploadError('업로드 결과를 받지 못했습니다.');
    }
  };

  const handleUploadError = (error: string) => {
    console.error('Upload error:', error);
    alert(`이미지 업로드 실패: ${error}`);
  };

  const handleUrlChange = (url: string) => {
    setImageData({ ...imageData, src: url });
    setUploadError(null);
    setImageError(false);
  };

  const resetToDefault = () => {
    setImageData(block.content);
    setUploadError(null);
    setImageError(false);
  };

  if (isEditing && isEditingImage) {
    return (
      <div className="space-y-6 p-6 border-2 border-blue-200 rounded-lg bg-blue-50/50">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">이미지 설정</h3>
          <button
            onClick={() => {
              resetToDefault();
              setIsEditingImage(false);
            }}
            className="p-2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {uploadError && (
          <div className="p-3 bg-red-100 border border-red-300 rounded-md text-red-700 text-sm">
            {uploadError}
          </div>
        )}

        {/* 업로드 방식 선택 */}
        <div>
          <label className="block text-sm font-medium mb-3">이미지 추가 방식</label>
          <div className="flex space-x-2">
            <button
              onClick={() => setUploadSource('upload')}
              className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg border-2 transition-colors ${
                uploadSource === 'upload' 
                  ? 'border-blue-500 bg-blue-50 text-blue-700' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Cloud className="w-5 h-5 mr-2" />
              클라우드 업로드
            </button>
            <button
              onClick={() => setUploadSource('url')}
              className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg border-2 transition-colors ${
                uploadSource === 'url' 
                  ? 'border-blue-500 bg-blue-50 text-blue-700' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <LinkIcon className="w-5 h-5 mr-2" />
              URL 링크
            </button>
          </div>
        </div>

        {uploadSource === 'upload' ? (
          /* Supabase 파일 업로드 */
          <div>
            <label className="block text-sm font-medium mb-2">
              파일 업로드 (Supabase Storage)
            </label>
            <FileUploader
              onUploadComplete={handleSupabaseUpload}
              onUploadError={handleUploadError}
              accept="image/*,.gif"
              maxSize={500 * 1024 * 1024} // 500MB
              folder="images"
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-2">
              📁 업로드된 파일은 Supabase Storage의 careon/images 폴더에 저장됩니다
            </p>
          </div>
        ) : (
          /* URL 입력 */
          <div>
            <label className="flex items-center text-sm font-medium mb-2">
              <LinkIcon className="w-4 h-4 mr-2" />
              이미지 URL
            </label>
            <input
              type="url"
              value={imageData.src}
              onChange={(e) => handleUrlChange(e.target.value)}
              placeholder="https://example.com/image.jpg 또는 https://media.giphy.com/media/..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              JPG, PNG, GIF, WebP 형식 지원. Giphy, Tenor, Imgur 등 직접 링크 가능
            </p>
          </div>
        )}

        {/* 미리보기 */}
        {imageData.src && (
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-100 p-2 text-sm font-medium flex items-center justify-between">
              <span>미리보기</span>
              {imageData.src.includes('supabase') && (
                <div className="flex items-center text-xs text-green-600">
                  <Cloud className="w-3 h-3 mr-1" />
                  Supabase Storage
                </div>
              )}
            </div>
            <div className="p-4 bg-white">
              {isGif(imageData.src) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageData.src}
                  alt={imageData.alt}
                  className="max-w-full max-h-64 mx-auto rounded"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="relative max-w-full max-h-64 mx-auto">
                  <Image
                    src={imageData.src}
                    alt={imageData.alt}
                    width={imageData.width || 400}
                    height={imageData.height || 300}
                    style={{ objectFit: imageData.objectFit || 'contain' }}
                    className="rounded"
                    unoptimized={imageData.src.startsWith('data:')}
                    onError={() => setImageError(true)}
                  />
                </div>
              )}
              
              {imageError && (
                <div className="text-center py-8 text-red-500">
                  이미지를 불러올 수 없습니다. URL을 확인해주세요.
                </div>
              )}
            </div>
          </div>
        )}

        {/* 상세 설정 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">대체 텍스트 (필수)</label>
            <input
              type="text"
              value={imageData.alt}
              onChange={(e) => setImageData({ ...imageData, alt: e.target.value })}
              placeholder="이미지 설명"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">캡션</label>
            <input
              type="text"
              value={imageData.caption || ''}
              onChange={(e) => setImageData({ ...imageData, caption: e.target.value })}
              placeholder="이미지 하단에 표시될 설명"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">링크 URL</label>
            <input
              type="url"
              value={imageData.link || ''}
              onChange={(e) => setImageData({ ...imageData, link: e.target.value })}
              placeholder="클릭 시 이동할 URL"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">표시 방식</label>
            <select
              value={imageData.objectFit || 'cover'}
              onChange={(e) => setImageData({ ...imageData, objectFit: e.target.value as 'contain' | 'cover' | 'fill' | 'none' | 'scale-down' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="contain">전체 보기 (contain)</option>
              <option value="cover">채우기 (cover)</option>
              <option value="fill">늘이기 (fill)</option>
              <option value="none">원본 크기</option>
              <option value="scale-down">축소 (scale-down)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">너비 (px)</label>
            <input
              type="number"
              value={imageData.width || ''}
              onChange={(e) => setImageData({ ...imageData, width: parseInt(e.target.value) || undefined })}
              placeholder="자동"
              min="1"
              max="3840"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">높이 (px)</label>
            <input
              type="number"
              value={imageData.height || ''}
              onChange={(e) => setImageData({ ...imageData, height: parseInt(e.target.value) || undefined })}
              placeholder="자동"
              min="1"
              max="3840"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t">
          <button
            onClick={handleSave}
            disabled={!imageData.src || !imageData.alt}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
          >
            저장
          </button>
          <button
            onClick={() => {
              resetToDefault();
              setIsEditingImage(false);
            }}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 font-medium"
          >
            취소
          </button>
        </div>
      </div>
    );
  }

  const imageElement = block.content.src ? (
    <div className="relative group">
      {isGif(block.content.src) ? (
        // GIF는 img 태그 사용 (애니메이션 유지)
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={block.content.src}
          alt={block.content.alt}
          width={block.content.width}
          height={block.content.height}
          style={{ objectFit: block.content.objectFit }}
          className="max-w-full h-auto rounded-lg shadow-sm"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setImageError(true);
            setIsLoading(false);
          }}
        />
      ) : (
        // 일반 이미지는 Next.js Image 컴포넌트 사용
        <Image
          src={block.content.src}
          alt={block.content.alt}
          width={block.content.width || 800}
          height={block.content.height || 600}
          style={{ objectFit: block.content.objectFit }}
          className="max-w-full h-auto rounded-lg shadow-sm"
          unoptimized={block.content.src.startsWith('data:')}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setImageError(true);
            setIsLoading(false);
          }}
        />
      )}
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

      {imageError && (
        <div className="w-full h-64 bg-gray-100 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
          <div className="text-4xl mb-2">🖼️</div>
          <span className="text-gray-500 text-sm text-center">
            이미지를 불러올 수 없습니다<br />
            {isEditing && '클릭하여 다시 설정하세요'}
          </span>
        </div>
      )}

      {isEditing && !imageError && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setIsEditingImage(true)}
            className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 shadow-lg"
            title="이미지 설정"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Supabase Storage 표시 */}
      {block.content.src.includes('supabase') && (
        <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs flex items-center">
            <Cloud className="w-3 h-3 mr-1" />
            Supabase
          </div>
        </div>
      )}

      {block.content.caption && (
        <p className="text-sm text-gray-600 mt-3 text-center italic">
          {block.content.caption}
        </p>
      )}
    </div>
  ) : (
    <div 
      className={`w-full h-64 bg-gray-100 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 ${isEditing ? 'hover:border-blue-400 hover:bg-blue-50 cursor-pointer' : ''}`}
      onClick={() => isEditing && setIsEditingImage(true)}
    >
      <Upload className="w-12 h-12 text-gray-400 mb-2" />
      <span className="text-gray-500 text-sm text-center">
        {isEditing ? '클릭하여 이미지를 추가하세요' : '이미지가 없습니다'}
        <br />
        <span className="text-xs">클라우드 업로드 또는 URL 링크 지원</span>
      </span>
    </div>
  );

  if (block.content.link && !isEditing) {
    return (
      <a 
        href={block.content.link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block hover:opacity-90 transition-opacity"
      >
        {imageElement}
      </a>
    );
  }

  return (
    <div
      className={`${isEditing && !isEditingImage ? 'cursor-pointer hover:ring-2 hover:ring-blue-400 hover:ring-opacity-50 rounded-lg transition-all' : ''}`}
      onClick={() => isEditing && !isEditingImage && setIsEditingImage(true)}
    >
      {imageElement}
    </div>
  );
}