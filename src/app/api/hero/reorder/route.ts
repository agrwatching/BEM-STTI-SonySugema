import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("your_db_name");

    const ids: string[] = await req.json();

    for (let i = 0; i < ids.length; i++) {
      await db.collection("heroes").updateOne(
        { _id: new ObjectId(ids[i]) },
        { $set: { order: i } }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
