import ArtikelMahasiswa from "@/components/artikel/ArtikelMahasiswa";

export const metadata = {
  title: "Artikel Mahasiswa | Senat Mahasiswa STTI Sony Sugema",
  description:
    "Kumpulan artikel yang relevan dengan kegiatan dan prestasi mahasiswa STTI Sony Sugema.",
};

export default function ArtikelPage() {
  return (
    <main>
      <ArtikelMahasiswa />
    </main>
  );
}
