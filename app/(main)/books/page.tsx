"use client";

import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { FiMic, FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import FilterAccordion, {
  type FilterItem,
} from "@/features/books/components/FilterAccordion";
import SortDropdown, {
  type SortOption,
} from "@/features/books/components/SortDropdown";
import BookCard from "@/features/books/components/BookCard";
import { useBooks } from "@/features/books/hooks";
import type { Book } from "@/features/books/api";
import { useAddToCart } from "@/features/cart/hooks";
import { useAddToWishlist } from "@/features/wishlist/hooks";

const BOOKS_PER_PAGE = 5;

const SORT_OPTIONS: SortOption[] = [
  { label: "Price: Low to High", value: "price_low_high" },
  { label: "Price: High to Low", value: "price_high_low" },
  { label: "Publication Date", value: "publication_date" },
  { label: "Best Rated", value: "best_rated" },
];

export default function BooksPage() {
  const { data, isLoading } = useBooks();
  const books = useMemo(() => data?.books ?? [], [data?.books]);
  const categories = useMemo(() => data?.categories ?? [], [data?.categories]);
  const addToCartMutation = useAddToCart();
  const addToWishlistMutation = useAddToWishlist();

  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const categoryFilterItems: FilterItem[] = useMemo(
    () =>
      categories.map((cat) => ({
        id: cat.id,
        label: cat.name,
        value: cat.name,
        count: books.filter((b) => b.categoryId === cat.id).length,
      })),
    [categories, books],
  );

  const yearFilterItems: FilterItem[] = useMemo(() => {
    const years = Array.from(
      new Set(
        books
          .map((b) => b.publicationYear)
          .filter((y): y is number => typeof y === "number"),
      ),
    ).sort((a, b) => b - a);
    return years.map((year) => ({
      id: year,
      label: String(year),
      value: String(year),
    }));
  }, [books]);

  const genreTabs = useMemo(
    () => ["All", ...categories.map((c) => c.name)],
    [categories],
  );

  const filteredBooks = useMemo(() => {
    let result = [...books];
    const normalize = (str: string) => str.toLowerCase().trim();

    // Filter by search term
    if (search.trim()) {
      const s = normalize(search);
      result = result.filter(
        (b) =>
          normalize(b.title).includes(s) || normalize(b.author).includes(s),
      );
    }

    // Filter by genre, categories, and years
    const activeCategories = [
      ...(selectedGenre !== "All" ? [normalize(selectedGenre)] : []),
      ...selectedCategories.map(normalize),
    ];
    if (activeCategories.length > 0) {
      result = result.filter((b) =>
        activeCategories.includes(normalize(b.categoryName ?? "")),
      );
    }

    if (selectedYears.length > 0) {
      result = result.filter((b) =>
        selectedYears.includes(String(b.publicationYear)),
      );
    }

    // Sort the books based on the selected sort option
    const sortMap: Record<string, (a: Book, b: Book) => number> = {
      price_low_high: (a, b) => a.finalPrice - b.finalPrice,
      price_high_low: (a, b) => b.finalPrice - a.finalPrice,
      publication_date: (a, b) =>
        (b.publicationYear ?? 0) - (a.publicationYear ?? 0),
      best_rated: (a, b) => (b.rate ?? 0) - (a.rate ?? 0),
    };
    if (sortOption && sortMap[sortOption]) {
      result.sort(sortMap[sortOption]);
    }

    return result;
  }, [
    books,
    search,
    selectedGenre,
    selectedCategories,
    selectedYears,
    sortOption,
  ]);

  // Pagination logic
  const totalPages = Math.max(
    1,
    Math.ceil(filteredBooks.length / BOOKS_PER_PAGE),
  );
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * BOOKS_PER_PAGE,
    currentPage * BOOKS_PER_PAGE,
  );

  // Reset current page to 1 whenever a filter changes
  const handleFilterChange =
    <T,>(setter: (v: T) => void) =>
    (val: T) => {
      setter(val);
      setCurrentPage(1);
    };

  // Generate an array of page numbers for pagination, including ellipses when necessary
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }
    pages.push(1);
    if (currentPage > 2) pages.push("...");
    if (currentPage !== 1 && currentPage !== totalPages)
      pages.push(currentPage);
    if (currentPage < totalPages - 1) pages.push("...");
    pages.push(totalPages);
    return pages;
  };

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

  const handleAddToWishlist = (book: Book) => {
    addToWishlistMutation.mutate(book.id, {
      onSuccess: (response) => toast.success(response.message),
      onError: () => {
        toast.error("Could not add to wishlist, Try again later");
      },
    });
  };

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
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
          {/* Sidebar */}
          <aside>
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-neutral-900">
              Filter
            </h2>

            <FilterAccordion
              title="Categories"
              items={categoryFilterItems}
              selected={selectedCategories}
              onChange={handleFilterChange(setSelectedCategories)}
              initialVisibleCount={4}
            />
            <FilterAccordion
              title="Year"
              items={yearFilterItems}
              selected={selectedYears}
              onChange={handleFilterChange(setSelectedYears)}
              initialVisibleCount={4}
              defaultOpen={false}
            />
          </aside>

          {/* Main content */}
          <div>
            {/* Search + Sort */}
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
              <form className="flex flex-1 items-center rounded-lg border border-neutral-200 bg-white px-2">
                <input
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={(e) =>
                    handleFilterChange(setSearch)(e.target.value)
                  }
                  className="flex-1 bg-transparent px-3 py-3 text-sm outline-none placeholder:text-neutral-400"
                />
                <button
                  type="button"
                  aria-label="Voice search"
                  className="flex h-9 w-9 items-center justify-center text-neutral-400 hover:text-neutral-600"
                >
                  <FiMic size={16} />
                </button>
                <button
                  type="button"
                  aria-label="Search"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-pink text-white hover:bg-brand-pink-dark"
                >
                  <FiSearch size={16} />
                </button>
              </form>

              <SortDropdown
                options={SORT_OPTIONS}
                value={sortOption}
                onChange={handleFilterChange(setSortOption)}
              />
            </div>

            {/* Genre tabs */}
            <div className="mb-5 flex flex-wrap gap-2">
              {genreTabs.map((genre) => (
                <button
                  key={genre}
                  onClick={() => handleFilterChange(setSelectedGenre)(genre)}
                  className={`rounded-lg border  px-4 py-2 text-sm font-semibold transition-colors ${
                    selectedGenre === genre
                      ? "border-brand-pink bg-brand-pink text-white"
                      : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>

            {/* Results count */}
            <p className="mb-4 text-sm text-neutral-500">
              {isLoading
                ? "Loading books..."
                : `${filteredBooks.length} book${filteredBooks.length !== 1 ? "s" : ""} found`}
            </p>

            {/* Book list */}
            {!isLoading && paginatedBooks.length === 0 ? (
              <p className="py-10 text-center text-sm text-neutral-500">
                No books match your filters.
              </p>
            ) : (
              <div className="flex flex-col gap-5">
                {paginatedBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onAddToCart={handleAddToCart}
                    onAddToWishlist={handleAddToWishlist}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex flex-col items-center gap-2">
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                    className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-neutral-600 disabled:opacity-40"
                  >
                    <FiChevronLeft size={14} />
                    Previous
                  </button>

                  {getPageNumbers().map((page, i) =>
                    page === "..." ? (
                      <span
                        key={`ellipsis-${i}`}
                        className="px-2 text-neutral-400"
                      >
                        ...
                      </span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page as number)}
                        className={`h-9 w-9 rounded-lg text-sm font-semibold ${
                          currentPage === page
                            ? "bg-brand-pink text-white"
                            : "bg-white text-neutral-700 hover:bg-neutral-50"
                        }`}
                      >
                        {page}
                      </button>
                    ),
                  )}

                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                    className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-neutral-600 disabled:opacity-40"
                  >
                    Next
                    <FiChevronRight size={14} />
                  </button>
                </div>
                <span className="text-xs text-neutral-400">
                  {(currentPage - 1) * BOOKS_PER_PAGE + 1}-
                  {Math.min(currentPage * BOOKS_PER_PAGE, filteredBooks.length)}{" "}
                  of {filteredBooks.length} books
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
