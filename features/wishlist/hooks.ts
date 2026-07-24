"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { wishlistApi } from "./api";

export function useWishlist(enabled: boolean = true) {
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: wishlistApi.getWishlist,
    enabled,
    select: (response) => response.data,
  });
}

export function useAddToWishlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookId: number | string) => wishlistApi.addToWishlist(bookId),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["wishlist"],
      });
    },
  });
}

export function useRemoveFromWishlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookId: number | string) => wishlistApi.removeItem(bookId),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["wishlist"],
      });
    },
  });
}

export function useMoveWishlistToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => wishlistApi.moveAllToCart(),

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["wishlist"] }),
        queryClient.invalidateQueries({ queryKey: ["cart"] }),
      ]);
    },
  });
}
