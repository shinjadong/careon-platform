'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { TextBlock } from '@/types/page-builder';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Type, Settings, X, Eye, Edit3 } from 'lucide-react';

interface TextBlockRendererProps {
  block: TextBlock;
  isEditing?: boolean;
  onUpdate?: (block: TextBlock) => void;
}

export function TextBlockRenderer({ block, isEditing, onUpdate }: TextBlockRendererProps) {
  const [isEditingText, setIsEditingText] = useState(false);
  const [textData, setTextData] = useState(block.content);
  const [showPreview, setShowPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSave = useCallback(() => {
    if (!textData.text.trim()) {
      return;
    }

    onUpdate?.({
      ...block,
      content: textData,
    });
    setIsEditingText(false);
  }, [block, textData, onUpdate]);

  const resetToDefault = () => {
    setTextData(block.content);
    setShowPreview(false);
  };

  // 자동 높이 조정
  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [textData.text, isEditingText]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.target as HTMLTextAreaElement;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const value = textarea.value;
      
      setTextData({
        ...textData,
        text: value.substring(0, start) + '  ' + value.substring(end)
      });
      
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
    
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      handleSave();
    }
  };

  if (isEditing && isEditingText) {
    return (
      <div className="space-y-4 p-6 border-2 border-blue-200 rounded-lg bg-blue-50/50">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Type className="w-5 h-5 mr-2" />
            텍스트 편집
          </h3>
          <div className="flex items-center gap-2">
            {textData.format === 'markdown' && (
              <button
                onClick={() => setShowPreview(!showPreview)}
                className={`p-2 rounded ${showPreview ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-gray-600'}`}
                title={showPreview ? '편집 모드' : '미리보기'}
              >
                {showPreview ? <Edit3 className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            )}
            <button
              onClick={() => {
                resetToDefault();
                setIsEditingText(false);
              }}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">텍스트 형식</label>
          <select
            value={textData.format || 'plain'}
            onChange={(e) => setTextData({ ...textData, format: e.target.value as 'plain' | 'markdown' | 'rich' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="plain">일반 텍스트</option>
            <option value="markdown">마크다운</option>
          </select>
        </div>

        {textData.format === 'markdown' && !showPreview && (
          <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-800">
            <p className="font-medium mb-1">마크다운 문법 가이드:</p>
            <ul className="text-xs space-y-1">
              <li>**굵게**, *기울임*, ~~취소선~~</li>
              <li># 제목1, ## 제목2, ### 제목3</li>
              <li>- 목록, 1. 번호 목록</li>
              <li>[링크](https://example.com), ![이미지](url)</li>
            </ul>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4">
          {showPreview && textData.format === 'markdown' ? (
            <div className="min-h-[200px] p-4 border border-gray-300 rounded-md bg-white">
              <div className="text-sm text-gray-500 mb-2">미리보기:</div>
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                className="prose prose-sm max-w-none"
              >
                {textData.text}
              </ReactMarkdown>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium mb-2">
                텍스트 내용
                <span className="text-xs text-gray-500 ml-2">
                  (Ctrl/Cmd + Enter로 저장)
                </span>
              </label>
              <textarea
                ref={textareaRef}
                value={textData.text}
                onChange={(e) => setTextData({ ...textData, text: e.target.value })}
                onKeyDown={handleKeyDown}
                placeholder={
                  textData.format === 'markdown' 
                    ? "마크다운 문법을 사용하여 텍스트를 입력하세요...\n\n예시:\n# 제목\n**굵은 글씨**\n*기울임*\n- 목록 아이템"
                    : "텍스트를 입력하세요..."
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[200px] resize-none font-mono text-sm"
                autoFocus
              />
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-4 border-t">
          <button
            onClick={handleSave}
            disabled={!textData.text.trim()}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
          >
            저장
          </button>
          <button
            onClick={() => {
              resetToDefault();
              setIsEditingText(false);
            }}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 font-medium"
          >
            취소
          </button>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    if (!block.content.text.trim()) {
      return (
        <div 
          className={`w-full min-h-[100px] bg-gray-100 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 ${isEditing ? 'hover:border-blue-400 hover:bg-blue-50 cursor-pointer' : ''}`}
          onClick={() => isEditing && setIsEditingText(true)}
        >
          <Type className="w-12 h-12 text-gray-400 mb-2" />
          <span className="text-gray-500 text-sm text-center">
            {isEditing ? '클릭하여 텍스트를 추가하세요' : '텍스트가 없습니다'}
          </span>
        </div>
      );
    }

    if (block.content.format === 'markdown') {
      return (
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              // 링크는 새 탭에서 열기
              a: ({ href, children, ...props }) => (
                <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
                  {children}
                </a>
              ),
              // 이미지 최적화
              img: ({ src, alt, ...props }) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={src} alt={alt} className="max-w-full h-auto rounded-lg" {...props} />
              ),
            }}
          >
            {block.content.text}
          </ReactMarkdown>
        </div>
      );
    }
    
    return (
      <div className="whitespace-pre-wrap leading-relaxed">
        {block.content.text}
      </div>
    );
  };

  return (
    <div className="relative group">
      <div
        className={`${isEditing ? 'cursor-pointer hover:ring-2 hover:ring-blue-400 hover:ring-opacity-50 rounded-lg transition-all p-2' : ''}`}
        onClick={() => isEditing && setIsEditingText(true)}
      >
        {renderContent()}
      </div>

      {isEditing && block.content.text.trim() && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditingText(true);
            }}
            className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 shadow-lg"
            title="텍스트 편집"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}