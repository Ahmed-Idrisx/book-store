"use client";

import CircularCountdown from "./CircularCountdown";
import FlashSaleCarousel from "./FlashSaleCarousel";
import { useHomeData, useBooks } from "@/features/books/hooks";
import type { Book } from "@/features/books/api";

export default function FlashSale() {
  const { data: home, isLoading } = useHomeData();
  const { data: allBooks } = useBooks();

  const books: Book[] =
    home?.flashSales.map((fb) => {
      const fullMatch = allBooks?.books.find((b) => b.id === fb.id);
      return fullMatch ? { ...fb, images: fullMatch.images } : fb;
    }) ?? [];

  return (
    <section className="bg-white px-6 py-16 sm:px-10">
      <div className="mx-auto max-w-300">
        <div className="mb-8 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="mb-2 text-2xl font-bold text-neutral-900">
              Flash Sale
            </h2>
            <p className="max-w-125 text-sm text-neutral-500">
              Don&apos;t miss our limited-time offers on bestselling books. Save
              big on selected titles across fiction, self-development, business,
              and more while stocks last.
            </p>
          </div>

          <CircularCountdown durationSeconds={30 * 3600} />
        </div>

        {isLoading ? (
          <p className="text-sm text-neutral-500">Loading deals...</p>
        ) : (
          <FlashSaleCarousel books={books} />
        )}
      </div>
    </section>
  );
}
