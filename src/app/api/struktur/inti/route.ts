//src/app/api/struktur/inti/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const runtime = "nodejs";

// GET semua anggota struktur inti
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("bemstti");

    const data = await db
      .collection("strukturInti")
      .find({})
      .sort({ order: 1 })
      .toArray();

    return NextResponse.json(data);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// POST tambah anggota
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nama, jabatan, foto, public_id } = body;

    if (!nama || !jabatan) {
      return NextResponse.json({ error: "Nama dan jabatan wajib diisi" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("bemstti");

    const count = await db.collection("strukturInti").countDocuments();

    const doc = {
      nama,
      jabatan,
      foto,       // Cloudinary secure_url
      public_id,  // Cloudinary public_id
      order: count,
      isActive: true,
    };

    await db.collection("strukturInti").insertOne(doc);

    return NextResponse.json(doc, { status: 201 });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
