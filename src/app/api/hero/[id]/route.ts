import { NextResponse, NextRequest } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import cloudinary from "@/lib/cloudinary";

export const runtime = "nodejs";

export async function DELETE(
  _: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid id format" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("bemstti");

    const hero = await db
      .collection("heroes")
      .findOne({ _id: new ObjectId(id) });
    if (!hero) {
      return NextResponse.json(
        { error: "Hero not found" },
        { status: 404 }
      );
    }

    // hapus dari Cloudinary
    if (hero.public_id) {
      await cloudinary.uploader.destroy(hero.public_id);
    }

    // hapus dari MongoDB
    await db.collection("heroes").deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
