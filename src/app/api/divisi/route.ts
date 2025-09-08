// src/app/api/divisi/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

function docToJson(doc: any) {
  if (!doc) return null;
  return {
    ...doc,
    _id: doc._id?.toString?.() ?? doc._id,
    proker: Array.isArray(doc.proker)
      ? doc.proker.map((p: any) => ({
          ...p,
          _id: p._id?.toString?.() ?? p._id,
        }))
      : [],
  };
}

// GET semua divisi
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("bemstti");
    const col = db.collection("divisions");
    const docs = await col.find({}).toArray();
    const jsonable = docs.map(docToJson);
    return NextResponse.json(jsonable);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Gagal mengambil data divisi" }, { status: 500 });
  }
}

// POST tambah divisi baru
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("bemstti");
    const col = db.collection("divisions");

    const now = new Date();
    const newDiv = {
      nama: typeof body?.nama === "string" ? body.nama : "Divisi Baru",
      proker: [],
      createdAt: now,
      updatedAt: now,
    };

    const result = await col.insertOne(newDiv as any);
    const inserted = await col.findOne({ _id: result.insertedId });
    return NextResponse.json(docToJson(inserted));
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Gagal menambahkan divisi" }, { status: 500 });
  }
}
