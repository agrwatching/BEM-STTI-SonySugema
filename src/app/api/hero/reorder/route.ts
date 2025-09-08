import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("bemstti");

    const ids: string[] = await req.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: "Invalid ids" },
        { status: 400 }
      );
    }

    for (let i = 0; i < ids.length; i++) {
      if (!ObjectId.isValid(ids[i])) continue;
      await db.collection("heroes").updateOne(
        { _id: new ObjectId(ids[i]) },
        { $set: { order: i } } as any
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
