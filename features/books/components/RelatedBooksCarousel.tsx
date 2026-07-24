"use client";

import Link from "next/link";
import { toast } from "react-toastify";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { type Book, getBookCoverImage } from "@/features/books/api";
import Stars from "@/components/ui/Stars";
import Image from "next/image";
import { useAddToCart } from "@/features/cart/hooks";
import { useAddToWishlist } from "@/features/wishlist/hooks";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function RelatedBooksCarousel({ books }: { books: Book[] }) {
  const addToCartMutation = useAddToCart();
  const addToWishlistMutation = useAddToWishlist();
  const handleAddToCart = (book: Book) => {
    addToCartMutation.mutate(
      { bookId: book.id, qty: 1 },
      {
        onSuccess: (response) => toast.success(response.message),
        onError: () => {
          toast.error("Could not add to cart, Try again later");
        },
      },
    );
  };
  const handleWishlist = (book: Book) => {
    addToWishlistMutation.mutate(book.id, {
      onSuccess: (response) => toast.success(response.message),
      onError: () => {
        toast.error("Could not add to wishlist, Try again later");
      },
    });
  };

  if (books.length === 0) {
    return (
      <p className="text-sm text-neutral-500">No related books to show.</p>
    );
  }

  return (
    <Swiper
      modules={[Pagination]}
      grabCursor
      spaceBetween={24}
      breakpoints={{
        0: {
          slidesPerView: 1,
        },
        640: {
          slidesPerView: 1.2,
        },
        768: {
          slidesPerView: 1.5,
        },
        1024: {
          slidesPerView: 2,
        },
        1280: {
          slidesPerView: 2.5,
        },
      }}
    >
      {books.map((book) => {
        const cover = getBookCoverImage(book);
        const stockPercent = Math.min(book.stock * 10, 100);
        const discountPercent =
          book.discount > 0
            ? Math.round((book.discount / book.price) * 100)
            : 0;

        return (
          <SwiperSlide key={book.id} className="h-auto">
            <div className="flex h-full flex-col rounded-xl bg-brand-night p-4 shadow-sm sm:flex-row gap-3">
              <div className="relative h-44 w-32 shrink-0 overflow-hidden rounded-lg sm:h-52 sm:w-36 mx-auto bg-white/10">
                <Link href={`/books/${book.id}`}>
                  {cover ? (
                    <Image
                      src={cover}
                      alt={book.title}
                      fill
                      sizes="110px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center p-2 text-center text-xs text-neutral-400">
                      {book.title}
                    </div>
                  )}
                </Link>
              </div>

              <div className="flex flex-1 flex-col text-white">
                <h4 className="mb-1 text-sm font-bold">{book.title}</h4>

                <p className="mb-2 text-sm text-neutral-400">
                  <span className="text-neutral-500">Author: </span>
                  {book.author}
                </p>

                {book.rate !== null ? (
                  <div className="mb-2 flex items-center gap-2">
                    <Stars rating={book.rate} size={12} />
                    <span className="text-xs text-white/60">
                      ({book.countReview} Review)
                    </span>
                  </div>
                ) : (
                  <p className="mb-2 text-xs text-white/50">No reviews yet</p>
                )}

                <p className="mt-auto mb-1 text-sm">
                  {book.price !== book.finalPrice && (
                    <span className="text-white/50 line-through">
                      ${book.price}
                    </span>
                  )}{" "}
                  <span className="font-bold">${book.finalPrice}</span>{" "}
                  {discountPercent > 0 && (
                    <span className="text-xs text-pink-400">
                      (-{discountPercent}%)
                    </span>
                  )}
                </p>

                <div className="mt-auto mb-2 h-1.5 w-1/2 overflow-hidden rounded-full bg-white/20">
                  <div
                    className="h-full bg-brand-amber"
                    style={{ width: `${stockPercent}%` }}
                  />
                </div>
                <p className="mt-auto mb-3 text-xs text-white/60">
                  {book.stock} books left
                </p>

                <div className="mt-auto flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleAddToCart(book)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-brand-pink py-3 text-sm font-bold text-white transition hover:bg-brand-pink-dark"
                  >
                    <FiShoppingCart size={18} />
                    <span className="hidden sm:flex">Add To Cart</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleWishlist(book)}
                    aria-label="Add to wishlist"
                    className="flex h-11 w-11 items-center justify-center rounded-lg border border-brand-pink text-brand-pink transition bg-white/90 hover:bg-pink-50"
                  >
                    <FiHeart size={18} />
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
