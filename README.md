# Bookshop

An online book store built with Next.js, TypeScript, and Tailwind CSS, connected to a real Laravel REST API.

## Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Server state**: TanStack Query (React Query)
- **Auth token storage**: js-cookie
- **Icons**: react-icons
- **Notifications**: react-toastify

## Architecture

The project follows a **feature-based architecture**: code is grouped by what it does (`auth`, `books`, `cart`, `wishlist`), not by technical layer.

```
app/                 → routes only, no business logic
features/<name>/
  api.ts             → plain fetch functions, no React
  hooks.ts           → useQuery / useMutation wrappers around api.ts
  components/        → UI specific to this feature only
components/
  ui/                → generic, reusable (Stars, Spinner)
  layout/            → Navbar, Footer
  home/              → home page sections (not a standalone feature - just uses features/books)
context/             → real client state only (auth session)
lib/                 → api client, query client, utils
```

Note: `components/<feature>/` was the pattern used for early features (home). Starting from the Books module onward, feature-specific UI lives inside `features/<name>/components/` for tighter colocation.

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Scripts

- `npm run dev` — start development server
- `npm run build` — build for production
- `npm run lint` — run ESLint

## Environment variables

| Variable              | Description                 |
| --------------------- | --------------------------- |
| `NEXT_PUBLIC_API_URL` | Base URL of the backend API |

## Deployment

Deployed on [Vercel](https://vercel.com). Push to `main` to trigger a deployment.
