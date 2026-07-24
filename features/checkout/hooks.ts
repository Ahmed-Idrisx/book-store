"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ordersApi } from "./api";

export function useCheckout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ordersApi.checkout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
