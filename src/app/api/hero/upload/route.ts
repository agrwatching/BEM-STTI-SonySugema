// src/app/api/hero/upload/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("your_db_name");
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert File → Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload ke Cloudinary
    const uploadRes: any = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: "hero" }, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }).end(buffer);
    });

    const heroDoc = {
      url: uploadRes.secure_url,
      public_id: uploadRes.public_id,
      order: 0,
      isActive: true,
      createdAt: new Date(),
    };

    const res = await db.collection("heroes").insertOne(heroDoc);

    return NextResponse.json({ ...heroDoc, _id: res.insertedId });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
