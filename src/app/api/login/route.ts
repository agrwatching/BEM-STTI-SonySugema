// src/app/api/login/route.ts
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY!;

async function verifyRecaptcha(token: string) {
  const params = new URLSearchParams();
  params.append('secret', RECAPTCHA_SECRET);
  params.append('response', token);

  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });

  const data = await res.json();
  console.log('reCAPTCHA verify response:', data);

  return data.success; // cukup cek success untuk reCAPTCHA v2
}

export async function POST(req: Request) {
  try {
    const { email, password, recaptchaValue } = await req.json();

    // --- Validasi dasar ---
    if (!recaptchaValue) {
      return NextResponse.json({ message: 'reCAPTCHA wajib diisi' }, { status: 400 });
    }

    const isHuman = await verifyRecaptcha(recaptchaValue);
    if (!isHuman) {
      return NextResponse.json({ message: 'Verifikasi reCAPTCHA gagal' }, { status: 400 });
    }

    if (!email || !password) {
      return NextResponse.json({ message: 'Email dan password wajib diisi' }, { status: 400 });
    }

    // --- Validasi format email ---
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: 'Format email tidak valid' }, { status: 400 });
    }

    // --- Cari user ---
    const client = await clientPromise;
    const db = client.db('bemstti');
    const user = await db.collection('users').findOne({ email });

    if (!user) {
      return NextResponse.json({ message: 'User tidak ditemukan' }, { status: 404 });
    }

    // --- Verifikasi password ---
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Password salah' }, { status: 401 });
    }

    // --- Hanya izinkan admin & subadmin ---
    if (user.role !== 'admin' && user.role !== 'subadmin') {
      return NextResponse.json({ message: 'Role tidak diizinkan' }, { status: 403 });
    }

    // --- Buat token JWT ---
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' }
    );

    // --- Tentukan redirect sesuai role ---
    let redirectPath = '/';
    if (user.role === 'admin') redirectPath = '/dashboard/admin';
    else if (user.role === 'subadmin') redirectPath = '/dashboard/subadmin';

    // --- Kirim response ---
    const res = NextResponse.json({
      message: 'Login berhasil',
      role: user.role,
      redirect: redirectPath,
    });

    res.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24,
    });

    return res;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Terjadi kesalahan server' }, { status: 500 });
  }
}
