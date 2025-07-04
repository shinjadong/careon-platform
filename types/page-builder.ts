export type BlockType = 
  | 'heading'
  | 'text'
  | 'image'
  | 'video'
  | 'button'
  | 'spacer'
  | 'columns'
  | 'hero'
  | 'features'
  | 'testimonial'
  | 'cta'
  | 'html';

export interface Block {
  id: string;
  type: BlockType;
  content: any;
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

export interface HeadingBlock extends Block {
  type: 'heading';
  content: {
    text: string;
    level: 1 | 2 | 3 | 4 | 5 | 6;
  };
}

export interface TextBlock extends Block {
  type: 'text';
  content: {
    text: string;
    format?: 'plain' | 'markdown' | 'rich';
  };
}

export interface ImageBlock extends Block {
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

export interface VideoBlock extends Block {
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

export interface ButtonBlock extends Block {
  type: 'button';
  content: {
    text: string;
    link: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    icon?: string;
  };
}

export interface ColumnsBlock extends Block {
  type: 'columns';
  content: {
    columns: Block[][];
    layout?: '1-1' | '1-2' | '2-1' | '1-1-1' | '1-2-1';
  };
}

export interface HeroBlock extends Block {
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