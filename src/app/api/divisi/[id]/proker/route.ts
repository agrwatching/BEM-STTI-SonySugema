// src/app/api/divisi/[id]/proker/route.ts
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

// ✅ Tambah proker ke divisi tertentu
export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("bemstti");
    const col = db.collection("divisions");

    const now = new Date();
    const newProker = {
      _id: new ObjectId(),
      nama: typeof body?.nama === "string" ? body.nama : "Judul Baru",
      deskripsi:
        typeof body?.deskripsi === "string"
          ? body.deskripsi
          : "Deskripsi Baru",
      createdAt: now,
      updatedAt: now,
    };

    await col.updateOne(
      { _id: new ObjectId(id) },
      { $push: { proker: newProker }, $set: { updatedAt: now } } as any
    );

    const updatedDoc = await col.findOne({ _id: new ObjectId(id) });
    return NextResponse.json(docToJson(updatedDoc));
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Gagal menambah proker" },
      { status: 500 }
    );
  }
}

// ✅ Update proker tertentu
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  try {
    const body = await req.json();
    const prokerId = body?.prokerId;
    if (!prokerId || !ObjectId.isValid(prokerId)) {
      return NextResponse.json({ error: "prokerId is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("bemstti");
    const col = db.collection("divisions");

    const now = new Date();
    const updateRes = await col.updateOne(
      { _id: new ObjectId(id), "proker._id": new ObjectId(prokerId) },
      {
        $set: {
          "proker.$.nama": body?.nama,
          "proker.$.deskripsi": body?.deskripsi,
          "proker.$.updatedAt": now,
          updatedAt: now,
        },
      } as any
    );

    if (updateRes.matchedCount === 0) {
      return NextResponse.json(
        { error: "Divisi atau Proker tidak ditemukan" },
        { status: 404 }
      );
    }

    const updatedDoc = await col.findOne({ _id: new ObjectId(id) });
    return NextResponse.json(docToJson(updatedDoc));
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Gagal update proker" },
      { status: 500 }
    );
  }
}

// ✅ Hapus proker tertentu
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  try {
    const body = await req.json();
    const prokerId = body?.prokerId;
    if (!prokerId || !ObjectId.isValid(prokerId)) {
      return NextResponse.json({ error: "prokerId is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("bemstti");
    const col = db.collection("divisions");

    const now = new Date();
    const pullRes = await col.updateOne(
      { _id: new ObjectId(id) },
      { $pull: { proker: { _id: new ObjectId(prokerId) } }, $set: { updatedAt: now } } as any
    );

    if (pullRes.matchedCount === 0) {
      return NextResponse.json(
        { error: "Divisi tidak ditemukan" },
        { status: 404 }
      );
    }

    const updatedDoc = await col.findOne({ _id: new ObjectId(id) });
    return NextResponse.json(docToJson(updatedDoc));
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Gagal menghapus proker" },
      { status: 500 }
    );
  }
}
