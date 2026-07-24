"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import {
  useWishlist,
  useRemoveFromWishlist,
  useMoveWishlistToCart,
} from "@/features/wishlist/hooks";

import { useBooks } from "@/features/books/hooks";
import type { WishlistItem } from "@/features/wishlist/api";

import EmptyWishlist from "./EmptyWishlist";
import WishlistTableHeader from "./WishlistTableHeader";
import WishlistList from "./WishlistList";
import Hero from "./Hero";
import WishlistLoading from "./WishlistLoading";
import WishlistActions from "./WishlistActions";

const WishlistPage = () => {
  const router = useRouter();

  const { data: wishlistItems, isLoading } = useWishlist();
  const { data: allBooksData } = useBooks();

  const removeMutation = useRemoveFromWishlist();
  const moveToCartMutation = useMoveWishlistToCart();

  const items: WishlistItem[] = useMemo(() => {
    if (!wishlistItems) return [];
    return wishlistItems.map((item) => {
      const fullMatch = allBooksData?.books.find((b) => b.id === item.book.id);
      return fullMatch
        ? { ...item, book: { ...item.book, images: fullMatch.images } }
        : item;
    });
  }, [wishlistItems, allBooksData]);

  const total = items.reduce((acc, item) => acc + item.book.finalPrice, 0);

  const removingBookId =
    removeMutation.isPending && removeMutation.variables
      ? Number(removeMutation.variables)
      : undefined;

  const handleDelete = (item: WishlistItem) => {
    removeMutation.mutate(item.book.id, {
      onSuccess: (response) => toast.success(response.message),
      onError: () => {
        toast.error("Could not remove item, Try again later");
      },
    });
  };

  const handleMoveAllToCart = () => {
    moveToCartMutation.mutate(undefined, {
      onSuccess: (response) => toast.success(response.message),
      onError: () => {
        toast.error("Could not move items to cart, Try again later");
      },
    });
  };

  if (isLoading) {
    return <WishlistLoading />;
  }

  return (
    <main>
      <Hero />

      <div className="mx-auto max-w-300 px-5 py-10 pb-32 sm:px-8">
        {items.length === 0 ? (
          <EmptyWishlist />
        ) : (
          <>
            <WishlistTableHeader />

            <WishlistList
              items={items}
              removingBookId={removingBookId}
              onDelete={handleDelete}
            />

            <WishlistActions
              itemsCount={items.length}
              total={total}
              loading={moveToCartMutation.isPending}
              onMoveToCart={handleMoveAllToCart}
              onCheckout={() => router.push("/checkout")}
            />
          </>
        )}
      </div>
    </main>
  );
};

export default WishlistPage;
