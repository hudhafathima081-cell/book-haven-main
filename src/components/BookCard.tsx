import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import type { Book } from "@/lib/types";

export const BookCard = ({ book }: { book: Book }) => {
  return (
    <Link to={`/book/${book.id}`} className="group block animate-fade-up">
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg book-cover bg-secondary">
        {book.cover_url ? (
          <img
            src={book.cover_url}
            alt={`${book.title} cover`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gradient-spine" />
        )}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute left-3 top-3">
          {book.price === 0 ? (
            <span className="rounded-full bg-emerald-500/90 px-2.5 py-0.5 text-xs font-semibold text-emerald-950">FREE</span>
          ) : (
            <span className="rounded-full bg-primary/90 px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">${book.price}</span>
          )}
        </div>
      </div>
      <div className="mt-3 space-y-1">
        <h3 className="font-display text-base font-semibold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
          {book.title}
        </h3>
        <p className="text-xs text-muted-foreground">{book.author}</p>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3 w-3 fill-primary text-primary" />
          <span>{book.rating?.toFixed(1)}</span>
        </div>
      </div>
    </Link>
  );
};
