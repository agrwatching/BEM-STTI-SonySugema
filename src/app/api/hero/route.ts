import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("your_db_name"); // ganti sesuai DB kamu

    const heroes = await db
      .collection("heroes")
      .find({ isActive: true })
      .sort({ order: 1 })
      .toArray();

    return NextResponse.json(heroes);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
