// src/app/api/auth/me/route.ts
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    const token = cookieHeader
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error('JWT_SECRET is not defined');
      return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }

    const decoded = jwt.verify(token, secret) as DecodedToken;

    return NextResponse.json({ email: decoded.email, role: decoded.role });
  } catch (err) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
}
