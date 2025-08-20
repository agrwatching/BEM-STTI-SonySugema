// src/app/(dashboard)/dashboard/admin/beranda/hero/page.tsx
"use client";

import { useState, useEffect } from "react";

interface HeroImage {
  _id?: string;
  url: string;
}

export default function HeroManagement() {
  const [images, setImages] = useState<HeroImage[]>([]);
  const [file, setFile] = useState<File | null>(null);

  // ambil data hero dari backend
  useEffect(() => {
    fetch("/api/hero")
      .then((res) => res.json())
      .then((data) => setImages(data));
  }, []);

  // upload gambar
  const handleUpload = async () => {
    if (!file) return alert("Pilih file dulu!");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default"); // nanti kita ganti preset cloudinary

    // upload ke cloudinary
    const cloudinaryRes = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());

    // simpan URL ke backend
    await fetch("/api/hero", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: cloudinaryRes.secure_url }),
    });

    // refresh list
    const updated = await fetch("/api/hero").then((r) => r.json());
    setImages(updated);
  };

  // hapus gambar
  const handleDelete = async (id: string) => {
    await fetch(`/api/hero/${id}`, { method: "DELETE" });
    setImages(images.filter((img) => img._id !== id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Management Hero</h1>

      {/* Upload */}
      <div className="flex gap-2 mb-6">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <button
          onClick={handleUpload}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Upload
        </button>
      </div>

      {/* List gambar */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img) => (
          <div key={img._id} className="relative">
            <img src={img.url} alt="Hero" className="rounded shadow" />
            <button
              onClick={() => handleDelete(img._id!)}
              className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded"
            >
              Hapus
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
