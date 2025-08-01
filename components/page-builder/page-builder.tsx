'use client';

import { useState, useEffect } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Block, BlockType, HeadingBlock, TextBlock, ImageBlock, VideoBlock, ButtonBlock, SpacerBlock, ColumnsBlock, HeroBlock, HTMLBlock } from '@/types/page-builder';
import { BlockRenderer } from './block-renderer';
import { Button } from '@/components/ui/button';
import { Plus, Eye, Edit, Save, Download, Upload, FolderOpen } from 'lucide-react';
import { FileManager } from './file-manager';

interface PageBuilderProps {
  initialBlocks?: Block[];
  onSave?: (blocks: Block[]) => void;
}

interface SortableBlockProps {
  block: Block;
  isEditing: boolean;
  onUpdate: (block: Block) => void;
  onDelete: (id: string) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}

function SortableBlock({ block, isEditing, onUpdate, onDelete, onMoveUp, onMoveDown, canMoveUp, canMoveDown }: SortableBlockProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div className={`relative group ${isEditing ? 'border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400' : ''}`}>
        {isEditing && (
          <div className="absolute top-2 left-2 z-10 bg-gray-800 text-white p-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
            <div {...listeners} className="cursor-move p-1">
              ⋮⋮
            </div>
          </div>
        )}
        <BlockRenderer
          block={block}
          isEditing={isEditing}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
          canMoveUp={canMoveUp}
          canMoveDown={canMoveDown}
        />
      </div>
    </div>
  );
}

export function PageBuilder({ initialBlocks = [], onSave }: PageBuilderProps) {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);
  const [isEditing, setIsEditing] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showFileManager, setShowFileManager] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setBlocks((blocks) => {
        const oldIndex = blocks.findIndex((block) => block.id === active.id);
        const newIndex = blocks.findIndex((block) => block.id === over?.id);

        return arrayMove(blocks, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  };

  const addBlock = (type: BlockType) => {
    const newBlock = {
      id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      content: getDefaultContent(type),
    } as Block;

    setBlocks([...blocks, newBlock]);
  };

  const getDefaultContent = (type: BlockType): HeadingBlock['content'] | TextBlock['content'] | ImageBlock['content'] | VideoBlock['content'] | ButtonBlock['content'] | SpacerBlock['content'] | ColumnsBlock['content'] | HeroBlock['content'] | HTMLBlock['content'] | Record<string, unknown> => {
    switch (type) {
      case 'heading':
        return { text: '새 제목', level: 1 as const };
      case 'text':
        return { text: '새 텍스트를 입력하세요...', format: 'plain' as const };
      case 'image':
        return { src: '', alt: '새 이미지' };
      case 'video':
        return { src: '', type: 'youtube' as const };
      case 'button':
        return { text: '버튼', link: '#' };
      case 'spacer':
        return { height: 50 };
      case 'hero':
        return { title: '새 히어로 섹션', subtitle: '부제목을 입력하세요' };
      case 'columns':
        return { columns: [{ content: '첫 번째 열' }, { content: '두 번째 열' }] };
      case 'html':
        return { html: '<p>HTML 코드를 입력하세요</p>' };
      default:
        return {};
    }
  };

  const updateBlock = (updatedBlock: Block) => {
    setBlocks(blocks.map(block => 
      block.id === updatedBlock.id ? updatedBlock : block
    ));
  };

  const deleteBlock = (id: string) => {
    setBlocks(blocks.filter(block => block.id !== id));
  };

  const moveBlockUp = (id: string) => {
    const currentIndex = blocks.findIndex(block => block.id === id);
    if (currentIndex > 0) {
      setBlocks(arrayMove(blocks, currentIndex, currentIndex - 1));
    }
  };

  const moveBlockDown = (id: string) => {
    const currentIndex = blocks.findIndex(block => block.id === id);
    if (currentIndex < blocks.length - 1) {
      setBlocks(arrayMove(blocks, currentIndex, currentIndex + 1));
    }
  };

  const handleSave = () => {
    onSave?.(blocks);
    alert('페이지가 저장되었습니다!');
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(blocks, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `page-${Date.now()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedBlocks = JSON.parse(e.target?.result as string);
        setBlocks(importedBlocks);
      } catch {
        alert('파일을 불러오는데 실패했습니다.');
      }
    };
    reader.readAsText(file);
  };

  const blockTypes: { type: BlockType; label: string; icon: string }[] = [
    { type: 'heading', label: '제목', icon: '📝' },
    { type: 'text', label: '텍스트', icon: '📄' },
    { type: 'image', label: '이미지', icon: '🖼️' },
    { type: 'video', label: '동영상', icon: '🎥' },
    { type: 'button', label: '버튼', icon: '🔘' },
    { type: 'spacer', label: '공백', icon: '⬜' },
    { type: 'hero', label: '히어로', icon: '🌟' },
    { type: 'html', label: 'HTML', icon: '💻' },
  ];

  const activeBlock = blocks.find(block => block.id === activeId);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 툴바 */}
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">페이지 빌더</h1>
            <div className="flex items-center space-x-2">
              <Button
                variant={isEditing ? 'default' : 'outline'}
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? <Edit className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                {isEditing ? '편집 모드' : '미리보기'}
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
              id="import-file"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => document.getElementById('import-file')?.click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              가져오기
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
            >
              <Download className="w-4 h-4 mr-2" />
              내보내기
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFileManager(true)}
            >
              <FolderOpen className="w-4 h-4 mr-2" />
              파일 관리
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleSave}
            >
              <Save className="w-4 h-4 mr-2" />
              저장
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <div className="flex gap-6">
          {/* 사이드바 - 편집 모드에서만 표시 */}
          {isEditing && (
            <div className="w-64 bg-white rounded-lg shadow-sm border border-gray-200 p-4 h-fit sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">블록 추가</h3>
              <div className="space-y-2">
                {blockTypes.map((blockType) => (
                  <button
                    key={blockType.type}
                    onClick={() => addBlock(blockType.type)}
                    className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors"
                  >
                    <span className="text-2xl">{blockType.icon}</span>
                    <span className="font-medium text-gray-700">{blockType.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 메인 콘텐츠 영역 */}
          <div className={`flex-1 ${isEditing ? '' : 'max-w-none'}`}>
            {mounted ? (
              <DndContext
                sensors={sensors}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              >
                <SortableContext items={blocks.map(block => block.id)} strategy={verticalListSortingStrategy}>
                  <div className="space-y-6">
                    {blocks.map((block, index) => (
                      <SortableBlock
                        key={block.id}
                        block={block}
                        isEditing={isEditing}
                        onUpdate={updateBlock}
                        onDelete={deleteBlock}
                        onMoveUp={moveBlockUp}
                        onMoveDown={moveBlockDown}
                        canMoveUp={index > 0}
                        canMoveDown={index < blocks.length - 1}
                      />
                    ))}
                  </div>
                </SortableContext>
                <DragOverlay>
                  {activeBlock && (
                    <div className="opacity-80">
                      <BlockRenderer
                        block={activeBlock}
                        isEditing={false}
                        onUpdate={() => {}}
                        onDelete={() => {}}
                        onMoveUp={() => {}}
                        onMoveDown={() => {}}
                        canMoveUp={false}
                        canMoveDown={false}
                      />
                    </div>
                  )}
                </DragOverlay>
              </DndContext>
            ) : (
              <div className="space-y-6">
                {blocks.map((block, index) => (
                  <div key={block.id}>
                    <BlockRenderer
                      block={block}
                      isEditing={isEditing}
                      onUpdate={updateBlock}
                      onDelete={deleteBlock}
                      onMoveUp={moveBlockUp}
                      onMoveDown={moveBlockDown}
                      canMoveUp={index > 0}
                      canMoveDown={index < blocks.length - 1}
                    />
                  </div>
                ))}
              </div>
            )}

            {blocks.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📝</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">페이지를 만들어보세요</h3>
                <p className="text-gray-600 mb-4">왼쪽 사이드바에서 블록을 추가하여 페이지를 구성하세요.</p>
                {isEditing && (
                  <Button onClick={() => addBlock('text')}>
                    <Plus className="w-4 h-4 mr-2" />
                    첫 번째 블록 추가
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* File Manager Modal */}
      <FileManager
        isOpen={showFileManager}
        onClose={() => setShowFileManager(false)}
        fileType="all"
      />
    </div>
  );
}