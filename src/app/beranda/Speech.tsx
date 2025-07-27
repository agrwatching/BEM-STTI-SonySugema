import Image from "next/image"

export default function Speech() {
  return (
    <section className="bg-blue-100 py-20 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div className="relative w-full h-[300px] md:h-[400px]">
          <Image
            src="/ketua.jpg" // Ganti sesuai foto kamu di folder public
            alt="Ketua Senat"
            fill
            className="object-cover rounded-xl shadow-lg"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Sambutan Ketua Senat</h2>
          <p className="text-gray-800 text-lg leading-relaxed">
            Assalamu’alaikum Warahmatullahi Wabarakatuh. <br />
            Dengan penuh semangat dan rasa syukur, kami menyambut Anda di website resmi Senat Mahasiswa STTI Sony Sugema.
            Website ini adalah ruang komunikasi terbuka untuk menyampaikan program kerja, kegiatan, dan aspirasi mahasiswa.
            Mari bersama-sama membangun kampus yang aktif, kritis, dan penuh semangat kolaboratif.
          </p>
        </div>
      </div>
    </section>
  )
}
