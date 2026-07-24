"use client";

import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { type Book, getBookCoverImage } from "@/features/books/api";
import { toast } from "react-toastify";
import Stars from "../ui/Stars";
import Image from "next/image";
import { useAddToCart } from "@/features/cart/hooks";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { useAddToWishlist } from "@/features/wishlist/hooks";
import Link from "next/link";
// Just to test the UI
export const mockFlashSaleBooks: Book[] = [
  {
    id: 55,
    title: "Atomic Habits",
    author: "James Clear",
    price: 200,
    discount: 20,
    finalPrice: 160,
    description: "Tiny changes, remarkable results.",
    rate: 4.8,
    countReview: 1248,
    stock: 20,
    numberOfPages: 320,
    publicationYear: 2018,
    lang: "English",
    asinCode: "9780735211292",
    bookFormat: "Hard Cover",
    categoryId: 57,
    categoryName: "Self Development",
    images: [
      {
        id: 109,
        book_id: 55,
        image:
          "https://bookstore.eraasoft.pro/storage/book-images/99442026070113163941Wkr448KSL._AC_UF1000,1000_QL80_.jpg",
        type: "main",
      },
    ],
  },
  {
    id: 56,
    title: "The Power of Now",
    author: "Eckhart Tolle",
    price: 180,
    discount: 15,
    finalPrice: 153,
    description: "Timeless lessons on wealth and happiness.",
    rate: 4.7,
    countReview: 867,
    stock: 22,
    numberOfPages: 240,
    publicationYear: 1997,
    lang: "English",
    asinCode: "B002Q6XG54",
    bookFormat: "Hard Cover",
    categoryId: 57,
    categoryName: "Self Development",
    images: [
      {
        id: 110,
        book_id: 56,
        image:
          "https://bookstore.eraasoft.pro/storage/book-images/8314720260701131919images.jfif",
        type: "random",
      },
    ],
  },
  {
    id: 57,
    title: "Awaken the Giant Within",
    author: "Tony Robbins",
    price: 250,
    discount: 10,
    finalPrice: 225,
    description: "A powerful manual for taking control of your destiny.",
    rate: 4.9,
    countReview: 1523,
    stock: 8,
    numberOfPages: 544,
    publicationYear: 1991,
    lang: "English",
    asinCode: "B000SEV4V4",
    bookFormat: "Hard Cover",
    categoryId: 57,
    categoryName: "Self Development",
    images: [
      {
        id: 111,
        book_id: 57,
        image:
          "https://bookstore.eraasoft.pro/storage/book-images/290420260701132107images-(1).jfif",
        type: "random",
      },
    ],
  },
  {
    id: 58,
    title: "How to Win Friends and Influence People",
    author: "Dale Carnegie",
    price: 150,
    discount: 25,
    finalPrice: 113,
    description: "Improve communication and relationships.",
    rate: 4.8,
    countReview: 2041,
    stock: 30,
    numberOfPages: 320,
    publicationYear: 1936,
    lang: "English",
    asinCode: "B003V1W5F4",
    bookFormat: "Hard Cover",
    categoryId: 56,
    categoryName: "Business",
    images: [
      {
        id: 112,
        book_id: 58,
        image:
          "https://bookstore.eraasoft.pro/storage/book-images/235720260701132212images-(2).jfif",
        type: "random",
      },
    ],
  },
  {
    id: 59,
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen Covey",
    price: 220,
    discount: 18,
    finalPrice: 180,
    description: "A classic framework for personal effectiveness.",
    rate: 4.9,
    countReview: 1865,
    stock: 21,
    numberOfPages: 381,
    publicationYear: 1989,
    lang: "English",
    asinCode: "B00GOESUMC",
    bookFormat: "Hard Cover",
    categoryId: 56,
    categoryName: "Business",
    images: [
      {
        id: 113,
        book_id: 59,
        image:
          "https://bookstore.eraasoft.pro/storage/book-images/2839720260701132327images-(3).jfif",
        type: "random",
      },
    ],
  },
];

export default function FlashSaleCarousel({ books }: { books: Book[] }) {
  const flashBooks = books.length ? books : mockFlashSaleBooks;
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
      {flashBooks.map((book) => {
        const cover = getBookCoverImage(book);
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

                {book.description && (
                  <p className="mb-4 line-clamp-1 text-sm text-neutral-500">
                    {book.description}
                  </p>
                )}

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

                <p className="mb-1 text-sm">
                  <span className="text-white/50 line-through">
                    ${book.price}
                  </span>{" "}
                  <span className="font-bold">${book.finalPrice}</span>{" "}
                  {discountPercent > 0 && (
                    <span className="text-xs text-pink-400">
                      (-{discountPercent}%)
                    </span>
                  )}
                </p>

                <p className="mb-3 text-xs text-white/60">
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
