import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

// Use Node.js runtime instead of Edge (bcrypt requires crypto module)
export const runtime = "nodejs";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // Protected routes that require authentication
  const protectedRoutes = ["/generate", "/dashboard"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  );

  // Check if it's an edit route (e.g., /username/edit)
  const isEditRoute = nextUrl.pathname.endsWith("/edit");

  // Auth routes (login/signup) - redirect to dashboard if already logged in
  const authRoutes = ["/login", "/signup"];
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Redirect unauthenticated users from protected routes or edit routes to login
  if ((isProtectedRoute || isEditRoute) && !isLoggedIn) {
    const loginUrl = new URL("/login", nextUrl);
    loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users from auth routes to dashboard
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Match all routes except static files and api routes (except auth)
    "/((?!_next/static|_next/image|favicon.ico|img/).*)",
  ],
};
