export type Book = {
  id: string;

  title: string;

  author: string;

  description: string;

  cover_url: string;

  pdf_url?: string;

  price: number;

  rating: number;

  format: string;

  created_at?: string;
};