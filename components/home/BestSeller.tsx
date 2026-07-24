"use client";

import Link from "next/link";
import Image from "next/image";
import { useHomeData } from "@/features/books/hooks";

export default function BestSeller() {
  const { data, isLoading } = useHomeData();

  const images = data?.bestSellingImages ?? [];

  return (
    <section className="bg-brand-night px-6 py-16 sm:px-10">
      <div className="mx-auto max-w-300 text-center">
        <h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl">
          Best Seller
        </h2>

        <p className="mx-auto mb-10 max-w-150 text-sm text-white/60">
          Discover the books our readers love most. From bestselling novels to
          inspiring self-development and educational titles, explore the most
          popular picks trusted by thousands of book lovers.
        </p>

        {isLoading ? (
          <p className="mb-10 text-sm text-white/50">Loading books...</p>
        ) : images.length === 0 ? (
          <p className="mb-10 text-sm text-white/50">No books to show yet.</p>
        ) : (
          <div
            className="-mx-6 mb-10 flex gap-5 overflow-x-auto px-6 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none" }}
          >
            {images.map((img, index) => (
              <div
                key={index}
                className="relative h-64 w-44 shrink-0 overflow-hidden rounded-lg"
              >
                <Image
                  src={img}
                  alt={`Best Seller ${index + 1}`}
                  fill
                  sizes="176px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}

        <Link
          href="/books"
          className="inline-block rounded-lg bg-brand-pink px-10 py-3.5 text-sm font-bold text-white transition hover:bg-brand-pink-dark"
        >
          Shop now
        </Link>
      </div>
    </section>
  );
}
