import { apiRequest, ApiResponse } from "@/lib/api-client";
import { normalizeBook, type Book } from "@/features/books/api";

export interface CartItem {
  cartId: number;
  bookId: number;
  qty: number;
  unitPrice: number;
  discount: number;
  finalPrice: number;
  lineTotal: number;
  book: Book;
}

export interface CartSummary {
  items: CartItem[];
  subTotal: number;
  tax: number;
  total: number;
}

function toNumber(value: unknown): number {
  const numericValue = typeof value === "number" ? value : Number(value);
  return Number.isFinite(numericValue) ? numericValue : 0;
}

function normalizeCartItem(raw: unknown): CartItem | null {
  if (!raw || typeof raw !== "object") return null;
  const item = raw as Record<string, unknown>;

  return {
    cartId: toNumber(item.cartId),
    bookId: toNumber(item.bookId),
    qty: toNumber(item.qty),
    unitPrice: toNumber(item.unitPrice),
    discount: toNumber(item.discount),
    finalPrice: toNumber(item.finalPrice),
    lineTotal: toNumber(item.lineTotal),
    book: normalizeBook(item.bookDetails),
  };
}

export const cartApi = {
  getCart: async (): Promise<ApiResponse<CartSummary>> => {
    const res = await apiRequest<unknown>("/cart", {
      method: "GET",
    });

    const payload = (res.data ?? {}) as Record<string, unknown>;

    const items = Array.isArray(payload.cart)
      ? (payload.cart as unknown[])
          .map((item) => normalizeCartItem(item))
          .filter((item): item is CartItem => Boolean(item))
      : [];

    return {
      ...res,
      data: {
        items,
        subTotal: toNumber(payload.subTotal),
        tax: toNumber(payload.tax),
        total: toNumber(payload.total),
      },
    };
  },

  // bookId Not cartId
  addToCart: async (
    bookId: number | string,
    qty: number = 1,
  ): Promise<ApiResponse<CartItem>> => {
    const res = await apiRequest<unknown>(`/cart/store/${bookId}`, {
      method: "POST",
      body: { qty },
    });
    return {
      ...res,
      data: normalizeCartItem(res.data) as CartItem,
    };
  },

  // bookId Not cartId
  updateQty: async (
    bookId: number | string,
    qty: number,
  ): Promise<ApiResponse<CartItem>> => {
    const res = await apiRequest<unknown>(`/cart/update/${bookId}`, {
      method: "POST",
      body: { qty },
    });
    return {
      ...res,
      data: normalizeCartItem(res.data) as CartItem,
    };
  },

  removeItem: async (
    cartId: number | string,
  ): Promise<ApiResponse<unknown>> => {
    const res = await apiRequest<unknown>(`/cart/destroy/${cartId}`, {
      method: "DELETE",
    });

    return res;
  },
};
