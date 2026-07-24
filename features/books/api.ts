import { apiRequest } from "@/lib/api-client";

export interface BookImage {
  id: number;
  book_id: number;
  image: string; // full URL
  type: string;
}

export interface Category {
  id: number;
  name: string;
  image?: string;
}

export interface Review {
  id: number;
  reviewerName: string;
  rating: number;
  text: string;
  date?: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  discount: number;
  finalPrice: number;
  description?: string;
  rate: number | null;
  countReview: number;
  images: BookImage[];
  stock: number;
  numberOfPages?: number;
  publicationYear?: number;
  lang?: string;
  asinCode?: string;
  bookFormat?: string;
  categoryId: number;
  categoryName?: string;
}

function toNumber(value: unknown): number {
  const numericValue = typeof value === "number" ? value : Number(value);
  return Number.isFinite(numericValue) ? numericValue : 0;
}

function normalizeBookImage(raw: unknown): BookImage | null {
  if (!raw || typeof raw !== "object") return null;
  const item = raw as Record<string, unknown>;
  const image = typeof item.image === "string" ? item.image : null;
  if (!image) return null;

  return {
    id: toNumber(item.id),
    book_id: toNumber(item.book_id),
    image,
    type: typeof item.type === "string" ? item.type : "image",
  };
}

function normalizeCategory(raw: unknown): Category {
  const item = (raw ?? {}) as Record<string, unknown>;
  return {
    id: toNumber(item.id),
    name: typeof item.categoryName === "string" ? item.categoryName : "",
    image: typeof item.image === "string" ? item.image : undefined,
  };
}

function normalizeReview(raw: unknown): Review | null {
  if (!raw || typeof raw !== "object") return null;
  const item = raw as Record<string, unknown>;

  const rating = toNumber(item.stars_number ?? item.rating ?? item.stars);
  const text =
    typeof item.review === "string"
      ? item.review
      : typeof item.comment === "string"
        ? item.comment
        : typeof item.text === "string"
          ? item.text
          : "";
  const reviewerName =
    typeof item.reviewer_name === "string"
      ? item.reviewer_name
      : typeof item.user_name === "string"
        ? item.user_name
        : "Anonymous";

  return {
    id: toNumber(item.id),
    reviewerName,
    rating,
    text,
    date: typeof item.created_at === "string" ? item.created_at : undefined,
  };
}

export function normalizeBook(raw: unknown): Book {
  const item = (raw ?? {}) as Record<string, unknown>;

  const images = Array.isArray(item.bookImage)
    ? item.bookImage
        .map((img) => normalizeBookImage(img))
        .filter((img): img is BookImage => Boolean(img))
    : [];

  return {
    id: toNumber(item.bookId),
    title: typeof item.bookName === "string" ? item.bookName : "",
    author: typeof item.author === "string" ? item.author : "",
    price: toNumber(item.price),
    discount: toNumber(item.discount),
    finalPrice: toNumber(item.final_price),
    description:
      typeof item.description === "string" ? item.description : undefined,
    rate: typeof item.rate === "number" ? item.rate : null,
    countReview: toNumber(item.countReview),
    images,
    stock: toNumber(item.stock),
    numberOfPages: item.numberOfPages
      ? toNumber(item.numberOfPages)
      : undefined,
    publicationYear: item.publicationYear
      ? toNumber(item.publicationYear)
      : undefined,
    lang: typeof item.lang === "string" ? item.lang : undefined,
    asinCode: typeof item.asinCode === "string" ? item.asinCode : undefined,
    bookFormat:
      typeof item.bookFormat === "string" ? item.bookFormat : undefined,
    categoryId: toNumber(item.catId),
    categoryName:
      typeof item.category_name === "string" ? item.category_name : undefined,
  };
}

/** Returns the first available image for a book, or null if it has none */
export function getBookCoverImage(book: Book): string | null {
  return book.images.length > 0 ? book.images[0].image : null;
}

export interface HomeData {
  bestSellingImages: string[];
  recommended: Book[];
  flashSales: Book[];
}

export const booksApi = {
  getAllBooks: async (): Promise<{ books: Book[]; categories: Category[] }> => {
    const allBooks: Book[] = [];
    let categories: Category[] = [];
    let page = 1;
    let lastPage = 1;

    do {
      const res = await apiRequest<unknown>(`/book?page=${page}`, {
        method: "GET",
        auth: false,
      });
      const payload = res.data as Record<string, unknown>;

      if (Array.isArray(payload.books)) {
        allBooks.push(
          ...(payload.books as unknown[]).map((b) => normalizeBook(b)),
        );
      }
      if (page === 1 && Array.isArray(payload.categories)) {
        categories = (payload.categories as unknown[]).map((c) =>
          normalizeCategory(c),
        );
      }

      const meta = (
        payload.pagination_links as
          | { meta?: { last_page?: number } }
          | undefined
      )?.meta;
      lastPage = meta?.last_page ?? 1;
      page += 1;
    } while (page <= lastPage);

    return { books: allBooks, categories };
  },

  /* one book + recommended books + reviews*/
  getOne: async (
    id: number | string,
  ): Promise<{ book: Book; reviews: Review[]; recommendedBooks: Book[] }> => {
    const res = await apiRequest<unknown>(`/book/show/${id}`, {
      method: "GET",
      auth: false,
    });
    const payload = (res.data ?? {}) as Record<string, unknown>;

    const book = normalizeBook(payload.book);
    const reviews = Array.isArray(payload.reviews)
      ? payload.reviews
          .map((r) => normalizeReview(r))
          .filter((r): r is Review => Boolean(r))
      : [];
    const recommendedBooks = Array.isArray(payload.recommendedBooks)
      ? (payload.recommendedBooks as unknown[]).map((b) => normalizeBook(b))
      : [];

    return { book, reviews, recommendedBooks };
  },

  /* home data (recommended, flashSales, best selling) */
  getHome: async (): Promise<HomeData> => {
    const res = await apiRequest<unknown>("/home", {
      method: "GET",
      auth: false,
    });
    const payload = (res.data ?? {}) as Record<string, unknown>;

    return {
      bestSellingImages: Array.isArray(payload.best_selling_image)
        ? (payload.best_selling_image as unknown[]).filter(
            (i): i is string => typeof i === "string",
          )
        : [],
      recommended: Array.isArray(payload.recommended)
        ? (payload.recommended as unknown[]).map((b) => normalizeBook(b))
        : [],
      flashSales: Array.isArray(payload.flashSales)
        ? (payload.flashSales as unknown[]).map((b) => normalizeBook(b))
        : [],
    };
  },
};
