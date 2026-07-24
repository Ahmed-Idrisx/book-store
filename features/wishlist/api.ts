import { apiRequest, type ApiResponse } from "@/lib/api-client";
import { normalizeBook, type Book } from "@/features/books/api";

export interface WishlistItem {
  quantity: number;
  book: Book;
}

export interface WishlistResponse {
  id: number;
  user_id: number;
  book_id: number;
  qty: number;
  created_at: string;
  updated_at: string;
}

function normalizeWishlistItem(raw: unknown): WishlistItem | null {
  if (!raw || typeof raw !== "object") return null;

  const item = raw as Record<string, unknown>;

  return {
    quantity: Number(item.quantity) || 0,
    book: normalizeBook(item.book),
  };
}

export const wishlistApi = {
  getWishlist: async (): Promise<ApiResponse<WishlistItem[]>> => {
    const res = await apiRequest<unknown>("/wishlist", {
      method: "GET",
    });

    const rawItems = Array.isArray(res.data) ? res.data : [];

    return {
      ...res,
      data: rawItems
        .map((item) => normalizeWishlistItem(item))
        .filter((item): item is WishlistItem => Boolean(item)),
    };
  },

  addToWishlist: (
    bookId: number | string,
  ): Promise<ApiResponse<WishlistResponse>> =>
    apiRequest<WishlistResponse>(`/wishlist/store/${bookId}`, {
      method: "POST",
    }),

  removeItem: (bookId: number | string): Promise<ApiResponse<unknown>> =>
    apiRequest(`/wishlist/destroy/${bookId}`, {
      method: "POST",
      body: { _method: "delete" },
    }),

  moveAllToCart: (): Promise<ApiResponse<unknown>> =>
    apiRequest("/wishlist/move-to-cart", { method: "POST" }),
};
