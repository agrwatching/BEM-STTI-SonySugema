import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import cloudinary from "@/lib/cloudinary";

export const runtime = "nodejs";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db("your_db_name");

    const hero = await db.collection("heroes").findOne({ _id: new ObjectId(params.id) });
    if (!hero) return NextResponse.json({ error: "Hero not found" }, { status: 404 });

    // Hapus dari Cloudinary
    if (hero.public_id) await cloudinary.uploader.destroy(hero.public_id);

    // Hapus dari MongoDB
    await db.collection("heroes").deleteOne({ _id: new ObjectId(params.id) });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
