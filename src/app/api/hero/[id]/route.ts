import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import cloudinary from "@/lib/cloudinary";

export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const client = await clientPromise;
    const db = client.db("your_db_name");

    const hero = await db.collection("heroes").findOne({ _id: new ObjectId(id) });

    if (!hero) {
      return NextResponse.json({ error: "Hero not found" }, { status: 404 });
    }

    await cloudinary.uploader.destroy(hero.public_id);
    await db.collection("heroes").deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
