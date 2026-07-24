"use client";

import Link from "next/link";
import { FiShoppingCart, FiHeart } from "react-icons/fi";
import Stars from "@/components/ui/Stars";
import { getBookCoverImage, type Book } from "@/features/books/api";
import Image from "next/image";

interface BookCardProps {
  book: Book;
  onAddToCart: (book: Book) => void;
  onAddToWishlist: (book: Book) => void;
}

export default function BookCard({
  book,
  onAddToCart,
  onAddToWishlist,
}: BookCardProps) {
  const cover = getBookCoverImage(book);
  // add 20 just to test ui
  const discountPercent =
    book.discount > 0 ? Math.round((book.discount / book.price) * 100) : 20;

  return (
    <div className="flex flex-col gap-5 rounded-xl border border-neutral-200 bg-white p-5 sm:flex-row">
      {/* Cover */}
      <Link
        href={`/books/${book.id}`}
        className="relative mx-auto h-55 w-37.5 shrink-0 overflow-hidden rounded-lg bg-neutral-100 sm:mx-0"
      >
        {cover ? (
          <Image src={cover} alt={book.title} fill className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center p-2 text-center text-xs text-neutral-400">
            {book.title}
          </div>
        )}
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col">
        {/* Top row: title + description | discount badge */}
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="mb-1 font-bold text-neutral-900">{book.title}</h3>
            {book.description && (
              <p className="line-clamp-2 sm:line-clamp-4 text-sm text-neutral-500">
                {book.description}
              </p>
            )}
          </div>
          {discountPercent > 0 && (
            <span className="shrink-0 whitespace-nowrap rounded-full border border-amber-400 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-600">
              -{discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Bottom row: rating + meta | price + actions */}
        <div className="mt-auto flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            {book.rate !== null ? (
              <div className="mb-5 flex items-center gap-2">
                <Stars rating={book.rate} />
                <span className="text-xs text-neutral-400">
                  ({book.countReview} Review)
                </span>
              </div>
            ) : (
              <p className="mb-5 text-xs text-neutral-400">No reviews yet</p>
            )}
            {book.rate !== null && (
              <p className="mb-3 text-sm text-neutral-500">
                <span className="text-neutral-400">Rate: </span>
                {book.rate}
              </p>
            )}

            <div className="flex gap-8">
              <div>
                <p className="text-xs text-neutral-400">Author</p>
                <p className="text-sm font-semibold text-neutral-900">
                  {book.author}
                </p>
              </div>
              {book.publicationYear && (
                <div>
                  <p className="text-xs text-neutral-400">Publication Year</p>
                  <p className="text-sm font-semibold text-neutral-900">
                    {book.publicationYear}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:items-end">
            <div>
              {book.discount > 0 && (
                <span className="mr-2 text-base text-neutral-400 line-through">
                  ${book.price}
                </span>
              )}
              <span className="text-lg font-bold text-neutral-900">
                ${book.finalPrice}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => onAddToCart(book)}
                className="flex-1 flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-brand-pink px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-pink-dark"
              >
                <FiShoppingCart size={16} />
                Add To Cart
              </button>
              <button
                type="button"
                onClick={() => onAddToWishlist(book)}
                aria-label="Add to wishlist"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-brand-pink text-brand-pink hover:bg-pink-50"
              >
                <FiHeart size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
