'use client';

import { useState, useEffect, useCallback } from 'react';
import { Folder, Image, Video, File, Trash2, Copy, ExternalLink, Cloud, Search, X } from 'lucide-react';
import { listFiles, deleteFile, getFileType, formatFileSize } from '@/lib/supabase';
import { Button } from '@/components/ui/button';

interface FileManagerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFile?: (url: string) => void;
  fileType?: 'image' | 'video' | 'all';
}

interface FileItem {
  name: string;
  id: string;
  updated_at: string;
  metadata: Record<string, unknown>;
  publicUrl?: string;
  type: 'image' | 'video' | 'document' | 'other';
  size: number;
}

export function FileManager({ isOpen, onClose, onSelectFile, fileType = 'all' }: FileManagerProps) {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<'images' | 'videos' | 'all'>('all');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const loadFiles = useCallback(async () => {
    setLoading(true);
    try {
      const folders = selectedFolder === 'all' ? ['images', 'videos'] : [selectedFolder];
      const allFiles: FileItem[] = [];

      for (const folder of folders) {
        const { data } = await listFiles(folder);
        if (data) {
          const filesWithMetadata = data.map(file => ({
            ...file,
            type: getFileType(file.name),
            size: file.metadata?.size || 0,
            publicUrl: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/shortformai/careon/${folder}/${file.name}`
          }));
          allFiles.push(...filesWithMetadata);
        }
      }

      // 파일 타입 필터링
      const filteredFiles = fileType === 'all' 
        ? allFiles 
        : allFiles.filter(file => file.type === fileType);

      setFiles(filteredFiles.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()));
    } catch (error) {
      console.error('Failed to load files:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedFolder, fileType]);

  useEffect(() => {
    if (isOpen) {
      loadFiles();
    }
  }, [isOpen, loadFiles]);

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (fileName: string, folder: string) => {
    try {
      const filePath = `careon/${folder}/${fileName}`;
      await deleteFile(filePath);
      setFiles(files.filter(file => file.name !== fileName));
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Failed to delete file:', error);
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    // TODO: Add toast notification
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <Image className="w-5 h-5 text-blue-600" />;
      case 'video':
        return <Video className="w-5 h-5 text-purple-600" />;
      default:
        return <File className="w-5 h-5 text-gray-600" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-2">
            <Cloud className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold">Supabase Storage 파일 관리</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Controls */}
        <div className="p-6 border-b space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="파일 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Folder selection */}
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedFolder('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedFolder === 'all'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Folder className="w-4 h-4 inline mr-2" />
              전체
            </button>
            <button
              onClick={() => setSelectedFolder('images')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedFolder === 'images'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Image className="w-4 h-4 inline mr-2" />
              이미지
            </button>
            <button
              onClick={() => setSelectedFolder('videos')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedFolder === 'videos'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Video className="w-4 h-4 inline mr-2" />
              동영상
            </button>
          </div>
        </div>

        {/* File list */}
        <div className="flex-1 overflow-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-gray-600">파일을 불러오는 중...</span>
            </div>
          ) : filteredFiles.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Cloud className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p>파일이 없습니다</p>
              <p className="text-sm">파일을 업로드하여 시작하세요</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFiles.map((file) => (
                <div
                  key={file.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => onSelectFile?.(file.publicUrl || '')}
                >
                  {/* File preview */}
                  <div className="aspect-video bg-gray-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                    {file.type === 'image' ? (
                      <img
                        src={file.publicUrl}
                        alt={file.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      getFileIcon(file.type)
                    )}
                  </div>

                  {/* File info */}
                  <div className="space-y-2">
                    <h3 className="font-medium text-sm truncate" title={file.name}>
                      {file.name}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{formatFileSize(file.size)}</span>
                      <span>{new Date(file.updated_at).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t">
                    <div className="flex items-center space-x-2">
                      {getFileIcon(file.type)}
                      <span className="text-xs text-gray-500 uppercase">
                        {file.type}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyUrl(file.publicUrl || '');
                        }}
                        className="p-1.5 hover:bg-gray-100 rounded"
                        title="URL 복사"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(file.publicUrl, '_blank');
                        }}
                        className="p-1.5 hover:bg-gray-100 rounded"
                        title="새 탭에서 열기"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteConfirm(file.name);
                        }}
                        className="p-1.5 hover:bg-red-100 text-red-600 rounded"
                        title="삭제"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              총 {filteredFiles.length}개 파일
            </p>
            <Button onClick={onClose} variant="outline">
              닫기
            </Button>
          </div>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">파일 삭제</h3>
            <p className="text-gray-600 mb-6">
              <strong>{deleteConfirm}</strong> 파일을 삭제하시겠습니까?
              <br />
              이 작업은 되돌릴 수 없습니다.
            </p>
            <div className="flex space-x-3">
              <Button
                onClick={() => {
                  const folder = files.find(f => f.name === deleteConfirm)?.type === 'image' ? 'images' : 'videos';
                  handleDelete(deleteConfirm, folder);
                }}
                variant="destructive"
                className="flex-1"
              >
                삭제
              </Button>
              <Button
                onClick={() => setDeleteConfirm(null)}
                variant="outline"
                className="flex-1"
              >
                취소
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}