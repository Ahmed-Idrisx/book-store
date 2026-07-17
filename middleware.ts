import { NextRequest, NextResponse } from "next/server";

/** Routes that require a logged-in user */
const PROTECTED_ROUTES = ["/profile", "/cart", "/wishlist", "/checkout"];

/** Routes a logged-in user shouldn't see again (send them home instead) */
const AUTH_ROUTES = ["/login", "/signup"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  );
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  // No token + trying to reach a protected page -> send to /login
  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", request.url);
    // remembers where the user was trying to go, so we can send them back after login
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Already has a token + trying to open /login or /signup -> send home
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Only run this middleware on the routes above (better performance than running on every request)
export const config = {
  matcher: [
    "/profile/:path*",
    "/cart/:path*",
    "/wishlist/:path*",
    "/checkout/:path*",
    "/login",
    "/signup",
  ],
};
