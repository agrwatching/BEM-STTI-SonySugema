//src/lib/auth.ts
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) throw new Error("Please define JWT_SECRET in .env.local");

export type UserRole = "admin" | "subadmin";

export interface TokenPayload {
  id: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

// Hash password
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(12); // lebih aman daripada 10
  return bcrypt.hash(password, salt);
};

// Verifikasi password
export const verifyPassword = async (password: string, hashed: string): Promise<boolean> => {
  return bcrypt.compare(password, hashed);
};

// Buat token
export const signToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
};

// Verifikasi token dan kembalikan payload
export const verifyToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    console.warn("Invalid token:", error);
    return null;
  }
};
