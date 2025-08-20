// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface DecodedToken {
  userId: string;
  role: "admin" | "subadmin";
  iat: number;
  exp: number;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Halaman & API yang boleh diakses tanpa login
  if (
    pathname.startsWith("/dashboard/login") || // halaman login
    pathname.startsWith("/unauthorized") ||    // halaman unauthorized
    pathname.startsWith("/api/login")          // API login
  ) {
    return NextResponse.next();
  }

  // Ambil token dari cookie
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/dashboard/login", req.url));
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    console.error("JWT_SECRET environment variable is not set");
    return NextResponse.redirect(new URL("/dashboard/login", req.url));
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as DecodedToken;

    // Role-based access control
    if (pathname.startsWith("/dashboard/admin") && decoded.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    if (pathname.startsWith("/dashboard/subadmin") && decoded.role !== "subadmin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // Token valid → lanjutkan akses
    return NextResponse.next();
  } catch (err) {
    console.warn("Invalid or expired token:", err);
    const res = NextResponse.redirect(new URL("/dashboard/login", req.url));
    res.cookies.set("token", "", { maxAge: 0 }); // hapus token invalid
    return res;
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    // "/api/:path*", // aktifkan kalau mau proteksi API juga
  ],
};
