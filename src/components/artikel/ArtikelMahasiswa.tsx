"use client";

type Artikel = {
  id: number;
  judul: string;
  deskripsi: string;
  url: string;
};

const dummyArtikel: Artikel[] = [
  {
    id: 1,
    judul: "Lulusan STTI Raih Penghargaan Nasional",
    deskripsi:
      "Mahasiswa STTI meraih penghargaan dalam ajang kompetisi teknologi tingkat nasional.",
    url: "https://www.artikel.com/sttisonysugema-lulusan-terbaik",
  },
  {
    id: 2,
    judul: "Senat Mahasiswa STTI Gelar Seminar Kewirausahaan",
    deskripsi:
      "Kegiatan seminar ini bertujuan untuk meningkatkan jiwa entrepreneur mahasiswa.",
    url: "https://www.artikel.com/seminar-kewirausahaan-stti",
  },
  {
    id: 3,
    judul: "Kolaborasi Mahasiswa STTI dengan Komunitas Lokal",
    deskripsi:
      "Proyek sosial antara mahasiswa dan komunitas warga berhasil meningkatkan literasi digital.",
    url: "https://www.artikel.com/kolaborasi-stti-dan-warga",
  },
];

export default function ArtikelMahasiswa() {
  return (
    <section className="min-h-screen bg-[#0a0f1c] text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-12 text-center">
          Artikel Mahasiswa
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {dummyArtikel.map((artikel) => (
            <a
              key={artikel.id}
              href={artikel.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white/10 border border-white/20 p-6 rounded-xl hover:bg-white/20 transition duration-300 backdrop-blur-md"
            >
              <h3 className="text-xl font-semibold mb-2">{artikel.judul}</h3>
              <p className="text-sm text-white/80">{artikel.deskripsi}</p>
              <span className="block mt-4 text-sm text-blue-400 hover:underline">
                Baca selengkapnya →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
