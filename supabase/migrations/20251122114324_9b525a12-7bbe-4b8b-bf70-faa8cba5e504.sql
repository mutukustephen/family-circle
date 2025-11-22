-- Allow authenticated users to upload media
DROP POLICY IF EXISTS "Authenticated users can upload media" ON public.media;
CREATE POLICY "Authenticated users can upload media"
ON public.media
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = uploaded_by);

-- Allow authenticated users to create blog posts
DROP POLICY IF EXISTS "Authenticated users can create blog posts" ON public.blog_posts;
CREATE POLICY "Authenticated users can create blog posts"
ON public.blog_posts
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = author_id);

-- Allow authenticated users to update their own blog posts
DROP POLICY IF EXISTS "Users can update own blog posts" ON public.blog_posts;
CREATE POLICY "Users can update own blog posts"
ON public.blog_posts
FOR UPDATE
TO authenticated
USING (auth.uid() = author_id);

-- Allow authenticated users to add family members
DROP POLICY IF EXISTS "Authenticated users can add family members" ON public.family_members;
CREATE POLICY "Authenticated users can add family members"
ON public.family_members
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

-- Allow authenticated users to create family news/stories
DROP POLICY IF EXISTS "Authenticated users can create family news" ON public.family_news;
CREATE POLICY "Authenticated users can create family news"
ON public.family_news
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = author_id);

-- Allow authenticated users to update their own family news
DROP POLICY IF EXISTS "Users can update own family news" ON public.family_news;
CREATE POLICY "Users can update own family news"
ON public.family_news
FOR UPDATE
TO authenticated
USING (auth.uid() = author_id);