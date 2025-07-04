'use client';

import { useState } from 'react';
import { Block } from '@/types/page-builder';

interface HTMLBlock extends Block {
  type: 'html';
  content: {
    html: string;
  };
}

interface HTMLBlockRendererProps {
  block: HTMLBlock;
  isEditing?: boolean;
  onUpdate?: (block: HTMLBlock) => void;
}

export function HTMLBlockRenderer({ block, isEditing, onUpdate }: HTMLBlockRendererProps) {
  const [isEditingHTML, setIsEditingHTML] = useState(false);
  const [html, setHtml] = useState(block.content.html);

  const handleSave = () => {
    onUpdate?.({
      ...block,
      content: {
        html,
      },
    });
    setIsEditingHTML(false);
  };

  if (isEditing && isEditingHTML) {
    return (
      <div className="space-y-4 p-4 border rounded">
        <div>
          <label className="block text-sm font-medium mb-2">HTML 코드</label>
          <textarea
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            className="w-full px-3 py-2 border rounded font-mono text-sm"
            rows={10}
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            저장
          </button>
          <button
            onClick={() => {
              setHtml(block.content.html);
              setIsEditingHTML(false);
            }}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            취소
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${isEditing ? 'cursor-pointer hover:bg-gray-50 p-2 rounded border border-transparent hover:border-gray-200' : ''}`}
      onClick={() => isEditing && setIsEditingHTML(true)}
      dangerouslySetInnerHTML={{ __html: block.content.html }}
    />
  );
}