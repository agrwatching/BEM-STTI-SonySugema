// src/app/proker/page.tsx

export const metadata = {
  title: "Program Kerja | Senat Mahasiswa STTI Sony Sugema",
  description:
    "Jelajahi berbagai program kerja Senat Mahasiswa STTI Sony Sugema yang mencakup kegiatan, inisiatif, dan rencana strategis mahasiswa.",
};

import ProgramKerja from "@/components/proker/ProgramKerja";

export default function ProkerPage() {
  return (
    <main>
      <ProgramKerja />
    </main>
  );
}
