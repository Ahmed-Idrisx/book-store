"use client";

import { useQuery } from "@tanstack/react-query";
import { booksApi } from "./api";

export function useBooks() {
  return useQuery({
    queryKey: ["books"],
    queryFn: booksApi.getAllBooks,
    staleTime: 1000 * 60 * 5,
  });
}

/* one book + recommended books + reviews*/
export function useBook(id: number | string) {
  return useQuery({
    queryKey: ["book", id],
    queryFn: () => booksApi.getOne(id),
    enabled: !!id,
  });
}

/* home data (recommended, flashSales, best selling) */
export function useHomeData() {
  return useQuery({
    queryKey: ["home"],
    queryFn: booksApi.getHome,
    staleTime: 1000 * 60 * 5,
  });
}
