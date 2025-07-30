// src/app/galeri/page.tsx

export const metadata = {
  title: "Galeri Senat | Senat Mahasiswa STTI Sony Sugema",
  description:
    "Lihat dokumentasi kegiatan dan momen penting Senat Mahasiswa STTI Sony Sugema dalam bentuk galeri foto.",
};

import Galeri from "@/components/galeri/Galeri";

export default function GaleriPage() {
  return (
    <main>
      <Galeri />
    </main>
  );
}
