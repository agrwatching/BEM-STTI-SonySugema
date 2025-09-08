import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const runtime = "nodejs";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("bemstti");

    const heroes = await db
      .collection("heroes")
      .find({ isActive: true })
      .sort({ order: 1 })
      .toArray();

    return NextResponse.json(heroes);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
