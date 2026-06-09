-- Enum + table
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security-definer role checker (avoids recursive RLS)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;

-- Users can read their own roles. Admins can see all.
CREATE POLICY "own roles select" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
-- Only admins can change role assignments
CREATE POLICY "admin manage roles insert" ON public.user_roles
  FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admin manage roles update" ON public.user_roles
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admin manage roles delete" ON public.user_roles
  FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- Admin write access on books
CREATE POLICY "admin books insert" ON public.books
  FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admin books update" ON public.books
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admin books delete" ON public.books
  FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- Admin write access on the 'books' storage bucket
CREATE POLICY "admin upload book pdfs"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'books' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "admin update book pdfs"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'books' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "admin delete book pdfs"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'books' AND public.has_role(auth.uid(), 'admin'));