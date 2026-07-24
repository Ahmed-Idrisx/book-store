"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import {
  FiArrowLeft,
  FiMinus,
  FiPlus,
  FiShoppingCart,
  FiHeart,
  FiCheckCircle,
  FiTruck,
} from "react-icons/fi";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaWhatsapp,
  FaShareNodes,
} from "react-icons/fa6";
import Stars from "@/components/ui/Stars";
import ReviewCard from "@/features/books/components/ReviewCard";
import RelatedBooksCarousel from "@/features/books/components/RelatedBooksCarousel";
import { useBook, useBooks } from "@/features/books/hooks";
import { Review } from "@/features/books/api";
import Image from "next/image";
import { useAddToCart } from "@/features/cart/hooks";
import { useAddToWishlist } from "@/features/wishlist/hooks";

type Tab = "details" | "reviews" | "recommended";

const mockReviews: Review[] = [
  {
    id: 1,
    reviewerName: "Ahmed Hassan",
    rating: 5,
    text: "One of the best books I've ever read. The ideas are practical, easy to apply, and truly life-changing.",
    date: "2026-07-10",
  },
  {
    id: 2,
    reviewerName: "Sarah Mohamed",
    rating: 4,
    text: "Very informative and well written. I enjoyed every chapter and learned many useful habits.",
    date: "2026-07-05",
  },
  {
    id: 3,
    reviewerName: "Omar Ali",
    rating: 5,
    text: "Excellent quality and fast delivery. The content exceeded my expectations.",
    date: "2026-06-28",
  },
  {
    id: 4,
    reviewerName: "Mona Ibrahim",
    rating: 4,
    text: "Great book with valuable insights. I only wish there were a few more real-life examples.",
    date: "2026-06-22",
  },
];

export default function BookDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const { data, isLoading } = useBook(id);
  const { data: allBooksData } = useBooks();
  const addToCartMutation = useAddToCart();
  const addToWishlistMutation = useAddToWishlist();

  const [activeThumb, setActiveThumb] = useState(0);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<Tab>("details");

  const book = data?.book;
  const reviews = data?.reviews ?? [];

  const relatedBooks = useMemo(() => {
    if (!data) return [];
    return data.recommendedBooks.map((rb) => {
      const fullMatch = allBooksData?.books.find((b) => b.id === rb.id);
      return fullMatch ? { ...rb, images: fullMatch.images } : rb;
    });
  }, [data, allBooksData]);

  const images = useMemo(
    () => book?.images.map((img) => img.image) ?? [],
    [book],
  );
  const discountPercent =
    book && book.discount > 0
      ? Math.round((book.discount / book.price) * 100)
      : 0;

  const handleAddToCart = () => {
    if (!book) return;
    addToCartMutation.mutate(
      { bookId: book.id, qty },
      {
        onSuccess: (response) => toast.success(response.message),
        onError: () => {
          toast.error("Could not add to cart, Try again later");
        },
      },
    );
  };

  const handleAddToWishlist = () => {
    if (!book) return;
    addToWishlistMutation.mutate(book.id, {
      onSuccess: (response) => toast.success(response.message),
      onError: () => {
        toast.error("Could not add to wishlist, Try again later");
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-100 flex-col items-center justify-center gap-4 bg-neutral-100">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-neutral-200 border-t-brand-pink" />
        <p className="text-sm text-neutral-500">Loading book...</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex min-h-100 flex-col items-center justify-center gap-3 bg-neutral-100">
        <p className="text-neutral-500">Book not found.</p>
        <Link
          href="/books"
          className="font-semibold text-brand-pink hover:underline"
        >
          Back to Books
        </Link>
      </div>
    );
  }

  return (
    <main>
      {/* Hero */}
      <div className="relative h-30 w-full">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero.png')" }}
        />
        <div className="absolute inset-0 bg-black/45" />
      </div>

      <div className="mx-auto max-w-325 px-5 py-10 sm:px-8">
        <Link
          href="/books"
          className="mb-6 inline-flex items-center gap-2 rounded-lg bg-brand-pink px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-pink-dark"
        >
          <FiArrowLeft size={14} />
          Back to Books
        </Link>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[380px_1fr]">
          {/* LEFT: images */}
          <div>
            <div className="relative mb-4 h-105 w-full overflow-hidden rounded-xl bg-white">
              {images.length > 0 ? (
                <Image
                  src={images[activeThumb]}
                  alt={book.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 380px"
                  className="object-cover"
                  priority={activeThumb === 0}
                />
              ) : (
                <div className="flex h-full items-center justify-center text-neutral-400">
                  {book.title}
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveThumb(i)}
                    className={`relative h-20 w-16 shrink-0 overflow-hidden rounded-lg border-2 ${
                      i === activeThumb
                        ? "border-brand-pink"
                        : "border-transparent"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${book.title} thumbnail ${i + 1}`}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: details */}
          <div className="flex h-full flex-col">
            {/* Title + description + socials */}
            <div className="mb-5 flex flex-col sm:flex-row items-start justify-between gap-4">
              <div>
                <h1 className="mb-2 text-2xl font-bold text-neutral-900">
                  {book.title}
                </h1>
                {book.description && (
                  <p className="text-sm text-neutral-500 max-sm:line-clamp-2">
                    {book.description}
                  </p>
                )}
              </div>
              <div className="flex shrink-0 gap-2">
                {[
                  FaFacebookF,
                  FaInstagram,
                  FaXTwitter,
                  FaWhatsapp,
                  FaShareNodes,
                ].map((Icon, i) => (
                  <button
                    key={i}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-200 text-neutral-500"
                  >
                    <Icon size={14} />
                  </button>
                ))}
              </div>
            </div>

            {/* Meta */}
            <div className="mb-5 flex gap-5 sm:gap-8 border-b border-neutral-200 pb-5">
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
              {book.numberOfPages && (
                <div>
                  <p className="text-xs text-neutral-400">Pages</p>
                  <p className="text-sm font-semibold text-neutral-900">
                    {book.numberOfPages}
                  </p>
                </div>
              )}
              {book.lang && (
                <div>
                  <p className="text-xs text-neutral-400">Language</p>
                  <p className="text-sm font-semibold capitalize text-neutral-900">
                    {book.lang}
                  </p>
                </div>
              )}
            </div>

            {/* Rating + badges + price + actions - pinned to bottom */}
            <div className="mt-auto">
              <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  {book.rate !== null ? (
                    <>
                      <div className="mb-1 flex items-center gap-2">
                        <Stars rating={book.rate} />
                        <span className="text-xs text-neutral-400">
                          ({book.countReview} Review)
                        </span>
                      </div>
                      <p className="text-sm text-neutral-500">
                        <span className="text-neutral-400">Rate: </span>
                        {book.rate}
                      </p>
                    </>
                  ) : (
                    <p className="text-sm text-neutral-400">No reviews yet</p>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {book.stock > 0 && (
                    <span className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">
                      <FiCheckCircle size={14} />
                      In Stock
                    </span>
                  )}
                  <span className="flex items-center gap-1.5 rounded-full bg-neutral-300 border border-neutral-400 px-3 py-1.5 text-xs font-semibold text-neutral-500">
                    <FiTruck size={14} />
                    Free Shipping Today
                  </span>
                  {discountPercent > 0 && (
                    <span className="rounded-full border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-600">
                      -{discountPercent}% OFF
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="mr-2 text-2xl font-bold text-neutral-900">
                    ${book.finalPrice}
                  </span>
                  {book.discount > 0 && (
                    <span className="text-lg text-neutral-400 line-through">
                      ${book.price}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-3 rounded-lg border border-neutral-300 px-3 py-2">
                    <button
                      type="button"
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      disabled={qty <= 1}
                      className="text-brand-pink disabled:opacity-30"
                    >
                      <FiMinus size={16} />
                    </button>
                    <span className="w-6 text-center font-bold">{qty}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setQty((q) => Math.min(book.stock || 1, q + 1))
                      }
                      disabled={qty >= book.stock}
                      className="text-brand-pink disabled:opacity-30"
                    >
                      <FiPlus size={16} />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={book.stock === 0 || addToCartMutation.isPending}
                    aria-label="Add to cart"
                    className="flex items-center gap-2 whitespace-nowrap rounded-lg bg-brand-pink px-6 py-3 text-sm font-bold text-white hover:bg-brand-pink-dark disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <FiShoppingCart size={16} />
                    {addToCartMutation.isPending ? "Adding" : "Add To Cart"}
                  </button>
                  <button
                    type="button"
                    onClick={handleAddToWishlist}
                    disabled={addToWishlistMutation.isPending}
                    aria-label="Add to wishlist"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-brand-pink text-brand-pink hover:bg-pink-50"
                  >
                    <FiHeart size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-14">
          <div className="mb-6 flex gap-8 border-b border-neutral-200">
            {(
              [
                { key: "details", label: "Product Details" },
                { key: "reviews", label: "Customer Reviews" },
                { key: "recommended", label: "Recommended For You" },
              ] as { key: Tab; label: string }[]
            ).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`border-b-2 pb-3 text-sm font-semibold transition-colors ${
                  activeTab === tab.key
                    ? "border-brand-amber text-neutral-900"
                    : "border-transparent text-neutral-400 hover:text-neutral-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "details" && (
            <div className="space-y-3 text-sm">
              <p>
                <span className="text-neutral-600">Book Title: </span>
                <span className="font-bold text-neutral-900">{book.title}</span>
              </p>
              <p>
                <span className="text-neutral-600">Author: </span>
                <span className="font-bold text-neutral-900">
                  {book.author}
                </span>
              </p>
              {book.publicationYear && (
                <p>
                  <span className="text-neutral-600">Publication Year: </span>
                  <span className="font-bold text-neutral-900">
                    {book.publicationYear}
                  </span>
                </p>
              )}
              {book.asinCode && (
                <p>
                  <span className="text-neutral-600">ASIN: </span>
                  <span className="font-bold text-neutral-900">
                    {book.asinCode}
                  </span>
                </p>
              )}
              {book.lang && (
                <p>
                  <span className="text-neutral-600">Language: </span>
                  <span className="font-bold text-neutral-900 capitalize">
                    {book.lang}
                  </span>
                </p>
              )}
              {book.numberOfPages && (
                <p>
                  <span className="text-neutral-600">Pages: </span>
                  <span className="font-bold text-neutral-900">
                    {book.numberOfPages}
                  </span>
                </p>
              )}
              {book.bookFormat && (
                <p>
                  <span className="text-neutral-600">Book Format: </span>
                  <span className="font-bold text-neutral-900">
                    {book.bookFormat}
                  </span>
                </p>
              )}
              {book.categoryName && (
                <p>
                  <span className="text-neutral-600">Category: </span>
                  <span className="font-bold text-neutral-900">
                    {book.categoryName}
                  </span>
                </p>
              )}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {reviews.length === 0
                ? mockReviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))
                : // <p className="text-sm text-neutral-500">No reviews yet.</p>
                  reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
            </div>
          )}

          {activeTab === "recommended" && (
            <RelatedBooksCarousel books={relatedBooks} />
          )}
        </div>
      </div>
    </main>
  );
}
