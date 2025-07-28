// app/api/komentar/route.ts
import { connectMongoDB } from "@/lib/mongodb";
import Komentar from "@/models/komentar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongoDB();
  const komentar = await Komentar.find().sort({ createdAt: -1 }); // komentar terbaru di atas
  return NextResponse.json(komentar);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { isi } = await req.json();

  if (!isi || isi.trim() === "") {
    return NextResponse.json({ message: "Isi komentar tidak boleh kosong" }, { status: 400 });
  }

  await connectMongoDB();

  const newKomentar = await Komentar.create({
    nama: session.user?.name,
    email: session.user?.email,
    foto: session.user?.image,
    isi,
    createdAt: new Date(),
  });

  return NextResponse.json(newKomentar, { status: 201 });
}
