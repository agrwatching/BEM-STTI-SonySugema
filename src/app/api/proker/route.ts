//src/app/api/proker/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// GET semua proker, bisa filter via query ?type=senat / ?type=divisi / ?divisiName=Humas
export async function GET(req: Request) {
  const client = await clientPromise;
  const db = client.db("bemstti");
  const collection = db.collection("prokers");

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const divisiName = searchParams.get("divisiName");

  const filter: any = {};
  if (type) filter.type = type;
  if (divisiName) filter.divisiName = divisiName;

  const prokers = await collection.find(filter).toArray();
  return NextResponse.json(prokers);
}

// POST tambah proker baru
export async function POST(req: Request) {
  const client = await clientPromise;
  const db = client.db("bemstti");
  const collection = db.collection("prokers");

  const body = await req.json();
  const newProker = {
    ...body,
    createdAt: new Date(),
  };

  const result = await collection.insertOne(newProker);
  return NextResponse.json({ _id: result.insertedId, ...newProker }, { status: 201 });
}
