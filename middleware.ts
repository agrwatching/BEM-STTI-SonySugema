// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Halaman & API yang boleh diakses tanpa login
  if (
    pathname.startsWith("/dashboard/login") || // halaman login
    pathname.startsWith("/unauthorized") ||    // halaman unauthorized
    pathname.startsWith("/api/login")           // API login
  ) {
    return NextResponse.next();
  }

  // Ambil token dari cookie
  const token = req.cookies.get("token")?.value;

  // Kalau token tidak ada → redirect ke login
  if (!token) {
    return NextResponse.redirect(new URL("/dashboard/login", req.url));
  }

  // Pastikan JWT_SECRET ada
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    console.error("JWT_SECRET environment variable is not set");
    return NextResponse.redirect(new URL("/dashboard/login", req.url));
  }

  try {
    // Verifikasi token dan decode payload
    const decoded = jwt.verify(token, jwtSecret) as { role?: string };

    // Role check
    if (pathname.startsWith("/dashboard/admin") && decoded.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    if (pathname.startsWith("/dashboard/subadmin") && decoded.role !== "subadmin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // Token valid, lanjutkan akses
    return NextResponse.next();
  } catch (err) {
    // Token tidak valid atau error → redirect ke login
    console.warn("Invalid or expired token:", err);
    return NextResponse.redirect(new URL("/dashboard/login", req.url));
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*", // proteksi semua route dashboard
  ],
};
