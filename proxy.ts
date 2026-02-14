import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token       = req.cookies.get("auth_token")?.value;
  const userDataRaw = req.cookies.get("user_data")?.value;

  let role: string | undefined;
  try {
    if (userDataRaw) {
      const userData = JSON.parse(decodeURIComponent(userDataRaw));
      role = userData?.role;
    }
  } catch {
    role = undefined;
  }

  const isLoggedIn = !!token;

  // ── Unauthenticated user hitting protected routes ─────────────────────────
  if (!isLoggedIn) {
    if (pathname.startsWith("/user"))  return NextResponse.redirect(new URL("/login", req.url));
    if (pathname.startsWith("/admin") && pathname !== "/admin/login")
      return NextResponse.redirect(new URL("/admin/login", req.url));
    return NextResponse.next();
  }

  // ── Authenticated: block wrong-role access ────────────────────────────────

  // Admin trying to visit user login / register
  if (role === "admin" && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  // Regular user trying to visit /admin/*
  if (role === "user" && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/user/dashboard", req.url));
  }

  // Regular user already logged in hitting /login or /register
  if (role === "user" && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/user/dashboard", req.url));
  }

  // Admin already logged in hitting /admin/login
  if (role === "admin" && pathname === "/admin/login") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*", "/admin/:path*", "/login", "/register"],
};