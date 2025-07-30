"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

const dummyGaleri = [
  {
    id: 1,
    src: "", // Kosong dulu
    alt: "Foto Kegiatan 1",
    deskripsi: "Kegiatan bakti sosial bersama warga sekitar",
    tanggal: "2025-05-01",
  },
  {
    id: 2,
    src: "",
    alt: "Foto Kegiatan 2",
    deskripsi: "Seminar nasional bersama pemateri hebat",
    tanggal: "2025-04-20",
  },
  {
    id: 3,
    src: "",
    alt: "Foto Kegiatan 3",
    deskripsi: "Pelatihan kepemimpinan di aula kampus",
    tanggal: "2025-03-15",
  },
  {
    id: 4,
    src: "",
    alt: "Foto Kegiatan 4",
    deskripsi: "Diskusi mingguan antar divisi",
    tanggal: "2025-02-28",
  },
];

export default function Galeri() {
  const [selected, setSelected] = useState<null | typeof dummyGaleri[0]>(null);

  return (
    <section className="min-h-screen bg-black text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
          Galeri Kegiatan
        </h2>

        {/* Grid besar untuk desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4">
          {dummyGaleri.map((item) => (
            <div
              key={item.id}
              className="relative group cursor-pointer overflow-hidden rounded-lg"
              onClick={() => setSelected(item)}
            >
              <div className="aspect-video bg-white/10 flex items-center justify-center text-white/50 text-sm">
                {item.src ? (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={800}
                    height={600}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  "Foto belum tersedia"
                )}
              </div>

              {/* Overlay saat hover */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center px-4">
                <p className="text-sm font-medium">{item.deskripsi}</p>
                <p className="text-xs text-white/60 mt-1">{item.tanggal}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selected && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <div
              className="max-w-5xl w-full flex flex-col items-center relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Tombol X */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-0 right-0 mt-2 mr-2 text-white hover:text-red-400 bg-white/10 rounded-full p-1 transition hover:scale-110"
              >
                <X size={28} />
              </button>

              {/* Gambar */}
              <div className="w-full aspect-video bg-white/10 rounded flex items-center justify-center overflow-hidden text-white/50">
                {selected.src ? (
                  <Image
                    src={selected.src}
                    alt={selected.alt}
                    width={1200}
                    height={800}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  "Foto belum tersedia"
                )}
              </div>

              {/* Deskripsi */}
              <div className="mt-4 text-center">
                <p className="text-lg font-semibold">{selected.deskripsi}</p>
                <p className="text-sm text-white/60">{selected.tanggal}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
