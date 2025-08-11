"use client";

const programKerjaSenat = [
  {
    nama: "Penerimaan Anggota Baru",
    deskripsi: "Proses seleksi dan pelatihan untuk anggota baru Senat Mahasiswa.",
  },
  {
    nama: "Pelatihan Kepemimpinan",
    deskripsi: "Workshop dan pelatihan untuk meningkatkan kemampuan kepemimpinan.",
  },
  {
    nama: "Seminar Nasional",
    deskripsi: "Kegiatan seminar tingkat nasional dengan pembicara inspiratif.",
  },
  {
    nama: "Bakti Sosial",
    deskripsi: "Aksi sosial untuk membantu masyarakat sekitar kampus.",
  },
];

const programKerjaDivisi = [
  {
    divisi: "Divisi Kerohanian",
    proker: [
      { nama: "Kajian Rutin", deskripsi: "Pengajian mingguan untuk mahasiswa." },
      { nama: "Buka Bersama", deskripsi: "Acara kebersamaan saat bulan Ramadan." },
    ],
  },
  {
    divisi: "Divisi Humas Internal dan Eksternal",
    proker: [
      { nama: "Media Partner", deskripsi: "Kolaborasi dengan organisasi luar kampus." },
      { nama: "Open Talk", deskripsi: "Forum terbuka untuk aspirasi mahasiswa." },
    ],
  },
  {
    divisi: "Divisi Olahraga",
    proker: [
      { nama: "Turnamen Futsal", deskripsi: "Kompetisi futsal antar angkatan." },
      { nama: "Senam Pagi", deskripsi: "Senam sehat rutin setiap akhir pekan." },
    ],
  },
  {
    divisi: "Divisi Kominfo",
    proker: [
      { nama: "Pelatihan Desain", deskripsi: "Workshop desain grafis dasar." },
      { nama: "Manajemen Media Sosial", deskripsi: "Mengelola konten Instagram Senat." },
    ],
  },
  {
    divisi: "Divisi Penelitian dan Pengembangan",
    proker: [
      { nama: "Survey Mahasiswa", deskripsi: "Kuesioner tahunan untuk evaluasi kampus." },
      { nama: "Inovasi Kampus", deskripsi: "Kegiatan eksplorasi ide dan kreativitas." },
    ],
  },
];

export default function ProgramKerja() {
  return (
    <section className="bg-[#0a0f1c] min-h-screen text-white py-16 px-4">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Program Kerja Senat */}
        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-12 text-center">
            Program Kerja Senat Mahasiswa
          </h2>
          <div className="grid gap-8">
            {programKerjaSenat.map((proker, index) => (
              <div
                key={index}
                className="bg-white/10 border border-white/20 rounded-xl p-6 backdrop-blur-md shadow"
              >
                <h3 className="text-lg md:text-xl font-semibold mb-2">{proker.nama}</h3>
                <p className="text-white/80 text-sm md:text-lg">{proker.deskripsi}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Program Kerja Divisi */}
        <div>
          <h2 className="text-2xl md:text-4xl font-bold mb-10 text-center">
            Program Kerja Tiap Divisi
          </h2>
          <div className="space-y-12">
            {programKerjaDivisi.map((divisi, i) => (
              <div key={i}>
                <h3 className="text-xl md:text-2xl font-semibold mb-4 border-b border-white/30 pb-2">
                  {divisi.divisi}
                </h3>
                <div className="grid gap-6">
                  {divisi.proker.map((proker, j) => (
                    <div
                      key={j}
                      className="bg-white/10 border border-white/20 rounded-xl p-4 backdrop-blur-md shadow"
                    >
                      <h4 className="text-lg md:text-xl font-semibold mb-1">{proker.nama}</h4>
                      <p className="text-white/80 text-sm md:text-lg">{proker.deskripsi}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
