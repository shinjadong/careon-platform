export type BlockType = 
  | 'heading'
  | 'text'
  | 'image'
  | 'video'
  | 'button'
  | 'spacer'
  | 'columns'
  | 'hero'
  | 'html';

// The base interface for all blocks, without the problematic `content: any`
export interface BaseBlock {
  id: string;
  type: BlockType;
  settings?: BlockSettings;
}

export interface BlockSettings {
  padding?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  margin?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  backgroundColor?: string;
  textColor?: string;
  alignment?: 'left' | 'center' | 'right';
  width?: 'full' | 'wide' | 'narrow';
}

// Specific block types extending the BaseBlock
export interface HeadingBlock extends BaseBlock {
  type: 'heading';
  content: {
    text: string;
    level: 1 | 2 | 3 | 4 | 5 | 6;
  };
}

export interface TextBlock extends BaseBlock {
  type: 'text';
  content: {
    text: string;
    format?: 'plain' | 'markdown' | 'rich';
  };
}

export interface ImageBlock extends BaseBlock {
  type: 'image';
  content: {
    src: string;
    alt: string;
    caption?: string;
    link?: string;
    width?: number;
    height?: number;
    objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  };
}

export interface VideoBlock extends BaseBlock {
  type: 'video';
  content: {
    src: string;
    type: 'url' | 'youtube' | 'vimeo';
    autoplay?: boolean;
    loop?: boolean;
    muted?: boolean;
    controls?: boolean;
  };
}

export interface ButtonBlock extends BaseBlock {
  type: 'button';
  content: {
    text: string;
    link: string;
    variant?: 'default' | 'secondary' | 'outline' | 'ghost';
    size?: 'default' | 'sm' | 'lg';
    icon?: string;
  };
}

// Added based on renderer usage
export interface SpacerBlock extends BaseBlock {
  type: 'spacer';
  content: {
    height: number;
  };
}

export interface ColumnsBlock extends BaseBlock {
  type: 'columns';
  content: {
    columns: Block[][];
    layout?: '1-1' | '1-2' | '2-1' | '1-1-1' | '1-2-1';
  };
}

export interface HeroBlock extends BaseBlock {
  type: 'hero';
  content: {
    title: string;
    subtitle?: string;
    backgroundImage?: string;
    backgroundVideo?: string;
    overlay?: boolean;
    overlayOpacity?: number;
    buttons?: ButtonBlock['content'][];
  };
}

// Added based on renderer usage
export interface HTMLBlock extends BaseBlock {
  type: 'html';
  content: {
    html: string;
  };
}

// The new discriminated union Block type
export type Block = 
  | HeadingBlock
  | TextBlock
  | ImageBlock
  | VideoBlock
  | ButtonBlock
  | SpacerBlock
  | ColumnsBlock
  | HeroBlock
  | HTMLBlock
  | HTMLBlock;


// Page related types remain the same, but will now use the correct Block union type
export interface Page {
  id: string;
  title: string;
  slug: string;
  blocks: Block[];
  settings?: PageSettings;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  status: 'draft' | 'published';
}

export interface PageSettings {
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: string;
  };
  theme?: {
    primaryColor?: string;
    secondaryColor?: string;
    fontFamily?: string;
  };
}
