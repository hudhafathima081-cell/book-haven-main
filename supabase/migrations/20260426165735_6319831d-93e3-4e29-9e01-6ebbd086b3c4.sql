-- Tighten storage policy on the private `books` bucket so signed URLs only succeed
-- for: admins, free books, or users who have a purchase row for the book.
-- The book's `pdf_path` is matched against storage.objects.name.

DROP POLICY IF EXISTS "authenticated read books bucket" ON storage.objects;

CREATE POLICY "read books bucket if entitled"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'books'
  AND (
    public.has_role(auth.uid(), 'admin')
    OR EXISTS (
      SELECT 1 FROM public.books b
      WHERE b.pdf_path = storage.objects.name
        AND (
          b.price = 0
          OR EXISTS (
            SELECT 1 FROM public.purchases p
            WHERE p.book_id = b.id AND p.user_id = auth.uid()
          )
        )
    )
  )
);