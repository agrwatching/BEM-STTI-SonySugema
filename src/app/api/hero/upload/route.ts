import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";

interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
}

export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("your_db_name");
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert File → Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload ke Cloudinary
    const uploadRes: CloudinaryUploadResult = await new Promise(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "hero" }, (err, result) => {
            if (err || !result) {
              reject(err || new Error("Upload failed"));
            } else {
              resolve({
                secure_url: result.secure_url,
                public_id: result.public_id,
              });
            }
          })
          .end(buffer);
      }
    );

    const heroDoc = {
      url: uploadRes.secure_url,
      public_id: uploadRes.public_id,
      order: 0,
      isActive: true,
      createdAt: new Date(),
    };

    const res = await db.collection("heroes").insertOne(heroDoc);

    return NextResponse.json({ ...heroDoc, _id: res.insertedId });
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
