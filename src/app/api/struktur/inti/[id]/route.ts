//src/app/api/struktur/inti/[id]/route.ts
import { NextResponse, NextRequest } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import cloudinary from "@/lib/cloudinary";

export const runtime = "nodejs";

// UPDATE data anggota
export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const body = await req.json();
    const { nama, jabatan, foto, public_id, order } = body;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid id format" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("bemstti");

    await db.collection("strukturInti").updateOne(
      { _id: new ObjectId(id) },
      { $set: { nama, jabatan, foto, public_id, order } }
    );

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// DELETE data anggota + hapus foto dari Cloudinary
export async function DELETE(_: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid id format" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("bemstti");

    const anggota = await db.collection("strukturInti").findOne({ _id: new ObjectId(id) });
    if (!anggota) {
      return NextResponse.json({ error: "Anggota not found" }, { status: 404 });
    }

    if (anggota.public_id) {
      await cloudinary.uploader.destroy(anggota.public_id);
    }

    await db.collection("strukturInti").deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
