"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cartApi } from "./api";

export function useCart(enabled: boolean = true) {
  return useQuery({
    queryKey: ["cart"],
    queryFn: cartApi.getCart,
    enabled,
    select: (response) => response.data,
  });
}

export function useAddToCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      bookId,
      qty = 1,
    }: {
      bookId: number | string;
      qty?: number;
    }) => cartApi.addToCart(bookId, qty),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

export function useUpdateCartQty() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ bookId, qty }: { bookId: number | string; qty: number }) =>
      cartApi.updateQty(bookId, qty),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

export function useRemoveFromCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (cartId: number | string) => cartApi.removeItem(cartId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
