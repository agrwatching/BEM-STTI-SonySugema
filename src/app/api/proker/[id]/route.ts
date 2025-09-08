// src/app/api/proker/[id]/route.ts
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

// UPDATE proker berdasarkan id
export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  const client = await clientPromise;
  const db = client.db("bemstti");
  const collection = db.collection("prokers");

  const body = await req.json();
  delete body._id; // hindari update _id

  const updated = await collection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { ...body, updatedAt: new Date() } },
    { returnDocument: "after" }
  );

  return NextResponse.json(updated);
}

// DELETE proker berdasarkan id
export async function DELETE(_: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  const client = await clientPromise;
  const db = client.db("bemstti");
  const collection = db.collection("prokers");

  await collection.deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ success: true });
}
