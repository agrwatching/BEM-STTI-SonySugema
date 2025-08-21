"use client";

import { useState } from "react";

interface Props {
  onClose: () => void;
  onUploaded: () => void;
}

export default function HeroUploadModal({ onClose, onUploaded }: Props) {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return alert("Pilih file dulu!");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");

    const cloudinaryRes = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: "POST", body: formData }
    ).then((r) => r.json());

    await fetch("/api/hero", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: cloudinaryRes.secure_url,
        name: file.name,
      }),
    });

    onUploaded();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Tambah Hero</h2>
        <input
          type="file"
          className="mb-4"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Batal
          </button>
          <button
            onClick={handleUpload}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Tambah
          </button>
        </div>
      </div>
    </div>
  );
}
