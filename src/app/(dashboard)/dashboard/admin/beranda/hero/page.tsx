"use client";

import { useState, useEffect } from "react";
import HeroList from "./HeroList";
import HeroUploadModal from "./HeroUploadModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import EmptyDeleteModal from "./EmptyDeleteModal";

interface HeroImage {
  _id?: string;
  url: string;
  name?: string;
  createdAt?: string;
}

export default function HeroManagement() {
  const [images, setImages] = useState<HeroImage[]>([]);
  const [showUpload, setShowUpload] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<HeroImage | null>(null);
  const [showEmptyDelete, setShowEmptyDelete] = useState(false);

  const fetchImages = async () => {
    const res = await fetch("/api/hero");
    const data = await res.json();
    setImages(data);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-6">Management Hero</h1>

      {images.length === 0 ? (
        <>
          {/* Empty State */}
          <div className="bg-[#1D4ED8] text-white p-8 rounded-2xl flex items-center justify-center gap-4 shadow-lg">
            <img
              src="/what.png"
              alt="Empty"
              className="w-32 h-32 object-contain"
            />
            <p className="text-lg font-medium">
              Sepertinya anda belum menambahkan <br /> hero section
            </p>
          </div>

          {/* Tombol di luar container */}
          <div className="flex justify-end mt-4 gap-3">
            <button
              onClick={() => setShowEmptyDelete(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-semibold shadow"
            >
              Hapus
            </button>
            <button
              onClick={() => setShowUpload(true)}
              className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded-full font-semibold shadow"
            >
              Tambah
            </button>
          </div>
        </>
      ) : (
        <HeroList
          images={images}
          onAdd={() => setShowUpload(true)}
          onDelete={(img) => setDeleteTarget(img)}
          onReorder={async (newOrder) => {
            setImages(newOrder);
            await fetch("/api/hero/reorder", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(newOrder.map((item) => item._id)),
            });
          }}
        />
      )}

      {/* Modal Upload */}
      {showUpload && (
        <HeroUploadModal
          onClose={() => setShowUpload(false)}
          onUploaded={fetchImages}
        />
      )}

      {/* Modal Delete */}
      {deleteTarget && (
        <ConfirmDeleteModal
          target={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={async () => {
            await fetch(`/api/hero/${deleteTarget._id}`, { method: "DELETE" });
            setDeleteTarget(null);
            fetchImages();
          }}
        />
      )}

      {/* Modal Empty Delete */}
      {showEmptyDelete && (
        <EmptyDeleteModal onClose={() => setShowEmptyDelete(false)} />
      )}
    </div>
  );
}
