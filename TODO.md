# Book Store — Project Roadmap

Stack: Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · TanStack Query · js-cookie · react-icons · react-toastify

---

## Phase 0 — Project Setup

- [ ] `npx create-next-app` with TypeScript + Tailwind + App Router
- [ ] Install dependencies (js-cookie, react-icons, react-toastify, clsx, tailwind-merge, @tanstack/react-query)
- [ ] Push initial commit to GitHub
- [ ] Add `.env.local` with `NEXT_PUBLIC_API_URL`
- [ ] Set up `lib/api-client.ts` (fetch wrapper, token handling, ApiError)
- [ ] Set up `lib/query-client.ts` (QueryClient + Provider)
- [ ] Write README.md (project description, stack, setup instructions, screenshots)

## Phase 1 — Auth Module

- [ ] `features/auth/api.ts` (login, register, logout, forget/reset password, profile)
- [ ] `features/auth/hooks.ts` (React Query version — useLogin, useRegister, useProfile)
- [ ] `context/AuthContext.tsx` (session state, token persistence)
- [ ] Login page
- [ ] Signup page
- [ ] Forget password page
- [ ] Verify code (OTP) page
- [ ] Reset password page
- [ ] Middleware for protected routes
- [ ] Profile page (view + update, avatar upload)

## Phase 2 — Layout

- [ ] Navbar (guest state + logged-in state, mobile menu, scroll effect)
- [ ] Footer (links, social icons, copyright) — **not built yet**
- [ ] Root layout wiring (AuthProvider, QueryClientProvider, ToastContainer)

## Phase 3 — Books Module

- [ ] `features/books/api.ts` + normalizers (bookId/bookName/bookImage mapping)
- [ ] `features/books/hooks.ts` (useBooks, useBook, useHomeData)
- [ ] Home page (hero, features, best sellers, recommended, flash sale)
  - [ ] Switch Recommended + Flash Sale to use the real `/home` endpoint
- [ ] Books listing page (search, category/year filters, sort, pagination)
- [ ] Single book details page (gallery, tabs, related books)
- [ ] About us page — **not built yet**

## Phase 4 — Cart & Wishlist

- [ ] `features/cart/api.ts` + `hooks.ts`
- [ ] `features/wishlist/api.ts` + `hooks.ts`
- [ ] Cart page (qty update, remove, promo code UI)
- [ ] Wishlist page (remove, move-to-cart)
- [ ] Live cart/wishlist counts in navbar (via React Query cache, not manual refresh)
- [ ] Remove `CartWishlistContext` once migrated to React Query

## Phase 5 — Checkout & Orders

- [ ] `features/orders/api.ts` (checkout, apply coupon, get orders)
- [ ] Checkout page (shipping form, payment method, order summary)
- [ ] Order confirmation page
- [ ] My Orders page (order history, order details) — linked from navbar already

## Phase 6 — Contacts

- [ ] Contact us page + form (`/contacts` endpoint)

## Phase 7 — Polish

- [ ] Loading states / skeletons audit across all pages
- [ ] Error boundaries / empty states audit
- [ ] Responsive design pass (mobile/tablet)
- [ ] Accessibility pass (labels, alt text, keyboard nav)
- [ ] SEO basics (metadata per page, favicon, OG image)

## Phase 8 — Deployment

- [ ] Push final code to GitHub
- [ ] Deploy to Vercel (connect repo, set env vars)
- [ ] Verify production build works against the live API
- [ ] Add live demo link + screenshots to README

---

## Notes / Known Backend Limitations

- No public review-submission endpoint (reviews are admin-managed only)
- No `publisher` field on books (Publisher filter removed from UI)
- Category counts are computed client-side (no count field from API)
- Wishlist has no real quantity concept (qty always 1, duplicate add is a no-op)
