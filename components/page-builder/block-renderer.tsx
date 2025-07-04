'use client';

import { Block } from '@/types/page-builder';
import { HeadingBlockRenderer } from './blocks/heading-block';
import { TextBlockRenderer } from './blocks/text-block';
import { ImageBlockRendererEnhanced as ImageBlockRenderer } from './blocks/image-block-enhanced';
import { VideoBlockRenderer } from './blocks/video-block';
import { ButtonBlockRenderer } from './blocks/button-block';
import { SpacerBlockRenderer } from './blocks/spacer-block';
import { HeroBlockRenderer } from './blocks/hero-block';
import { HTMLBlockRenderer } from './blocks/html-block';

interface BlockRendererProps {
  block: Block;
  isEditing?: boolean;
  onUpdate?: (block: Block) => void;
  onDelete?: (id: string) => void;
}

export function BlockRenderer({ 
  block, 
  isEditing = false, 
  onUpdate, 
  onDelete 
}: BlockRendererProps) {
  const renderBlock = () => {
    switch (block.type) {
      case 'heading':
        return <HeadingBlockRenderer block={block} isEditing={isEditing} onUpdate={onUpdate} />;
      case 'text':
        return <TextBlockRenderer block={block} isEditing={isEditing} onUpdate={onUpdate} />;
      case 'image':
        return <ImageBlockRenderer block={block} isEditing={isEditing} onUpdate={onUpdate} />;
      case 'video':
        return <VideoBlockRenderer block={block} isEditing={isEditing} onUpdate={onUpdate} />;
      case 'button':
        return <ButtonBlockRenderer block={block} isEditing={isEditing} onUpdate={onUpdate} />;
      case 'spacer':
        return <SpacerBlockRenderer block={block} isEditing={isEditing} onUpdate={onUpdate} />;
      case 'hero':
        return <HeroBlockRenderer block={block} isEditing={isEditing} onUpdate={onUpdate} />;
      case 'html':
        return <HTMLBlockRenderer block={block} isEditing={isEditing} onUpdate={onUpdate} />;
      default:
        return <div>Unknown block type</div>;
    }
  };

  const blockStyles: React.CSSProperties = {
    padding: block.settings?.padding ? 
      `${block.settings.padding.top || 0}px ${block.settings.padding.right || 0}px ${block.settings.padding.bottom || 0}px ${block.settings.padding.left || 0}px` : undefined,
    margin: block.settings?.margin ? 
      `${block.settings.margin.top || 0}px ${block.settings.margin.right || 0}px ${block.settings.margin.bottom || 0}px ${block.settings.margin.left || 0}px` : undefined,
    backgroundColor: block.settings?.backgroundColor,
    color: block.settings?.textColor,
    textAlign: block.settings?.alignment,
  };

  return (
    <div 
      className={`block-wrapper ${isEditing ? 'relative group' : ''} ${block.settings?.width === 'full' ? 'w-full' : block.settings?.width === 'wide' ? 'max-w-6xl mx-auto' : 'max-w-4xl mx-auto'}`}
      style={blockStyles}
    >
      {isEditing && (
        <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onDelete?.(block.id)}
            className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
          >
            삭제
          </button>
        </div>
      )}
      {renderBlock()}
    </div>
  );
}