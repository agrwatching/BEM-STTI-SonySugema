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

// ✅ Update divisi
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
    const client = await clientPromise;
    const db = client.db("bemstti");
    const col = db.collection("divisions");

    // Jangan terima _id dari body
    const { _id, ...payload } = body || {};
    const updateFields: any = { ...payload, updatedAt: new Date() };

    const updateRes = await col.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields } as any
    );

    if (updateRes.matchedCount === 0) {
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
      { error: "Gagal update divisi" },
      { status: 500 }
    );
  }
}

// ✅ Hapus divisi
export async function DELETE(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("bemstti");
    const col = db.collection("divisions");

    const del = await col.deleteOne({ _id: new ObjectId(id) });
    if (del.deletedCount === 0) {
      return NextResponse.json(
        { error: "Divisi tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Gagal hapus divisi" },
      { status: 500 }
    );
  }
}
