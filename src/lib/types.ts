export interface Book {
  id: string;
  title: string;
  author: string;
  description: string | null;
  cover_url: string | null;
  price: number;
  format: "text" | "pdf";
  content: { title: string; body: string }[] | null;
  pdf_path: string | null;
  rating: number | null;
}
