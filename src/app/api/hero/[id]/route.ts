import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import cloudinary from "@/lib/cloudinary";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db("your_db_name"); // Ganti sesuai DB kamu

    const hero = await db
      .collection("heroes")
      .findOne<{ public_id: string }>({ _id: new ObjectId(params.id) });

    if (!hero) {
      return NextResponse.json({ error: "Hero not found" }, { status: 404 });
    }

    // Hapus file dari Cloudinary
    await cloudinary.uploader.destroy(hero.public_id);

    // Hapus dari MongoDB
    await db.collection("heroes").deleteOne({ _id: new ObjectId(params.id) });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
