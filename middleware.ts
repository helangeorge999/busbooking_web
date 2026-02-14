import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token    = req.cookies.get("auth_token")?.value;
  const userData = req.cookies.get("user_data")?.value;
  const { pathname } = req.nextUrl;

  const user = userData ? JSON.parse(userData) : null;
  const role = user?.role;

  // Already logged in → redirect away from auth pages
  if (token && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(
      new URL(role === "admin" ? "/admin" : "/user/dashboard", req.url)
    );
  }

  // Protect /user/* routes
  if (pathname.startsWith("/user")) {
    if (!token) return NextResponse.redirect(new URL("/login", req.url));
    if (role === "admin") return NextResponse.redirect(new URL("/admin", req.url));
  }

  // Protect /admin/* routes
  if (pathname.startsWith("/admin")) {
    if (!token) return NextResponse.redirect(new URL("/login", req.url));
    if (role !== "admin") return NextResponse.redirect(new URL("/user/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*", "/admin/:path*", "/login", "/register"],
};