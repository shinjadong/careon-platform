-- Create pages table for page builder
CREATE TABLE IF NOT EXISTS public.pages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    blocks JSONB NOT NULL DEFAULT '[]'::jsonb,
    status TEXT NOT NULL DEFAULT 'published',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_pages_slug ON public.pages(slug);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS idx_pages_status ON public.pages(status);

-- Insert default landing page data
INSERT INTO public.pages (slug, title, blocks, status) VALUES (
    'landing',
    '케어온 랜딩 페이지',
    '[]'::jsonb,
    'published'
) ON CONFLICT (slug) DO NOTHING;

-- Enable RLS (Row Level Security)
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Public pages are viewable by everyone" ON public.pages
    FOR SELECT USING (status = 'published');

-- Create policy for authenticated users to manage pages
CREATE POLICY "Authenticated users can manage pages" ON public.pages
    FOR ALL USING (auth.role() = 'authenticated'); 