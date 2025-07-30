// src/app/struktur/page.tsx

export const metadata = {
  title: "Struktur Organisasi | Senat Mahasiswa STTI Sony Sugema",
  description:
    "Lihat susunan lengkap struktur organisasi Senat Mahasiswa STTI Sony Sugema, termasuk ketua, wakil, dan seluruh divisi.",
};

import StrukturOrganisasi from "@/components/struktur/StrukturOrganisasi";

export default function StrukturPage() {
  return (
    <main>
      <StrukturOrganisasi />
    </main>
  );
}
