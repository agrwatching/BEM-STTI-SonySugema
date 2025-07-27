import Image from "next/image";

export default function Speech() {
  return (
    <section className="bg-black py-20 px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 overflow-x-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Neon Border Container */}
        <div className="neon-border hover:shadow-[0_4px_12px_0_#d946ef]">
          <div className="neon-border-inner">
            {/* Judul */}
            <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
              Sambutan Ketua Senat
            </h2>

            {/* Konten */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Foto Ketua + Nama */}
              <div className="w-full md:w-1/3 max-w-[160px] mx-auto md:mx-0 flex flex-col items-center">
                <div className="w-full aspect-[3/4] relative">
                  <Image
                    src="/pp.jpg"
                    alt="Ketua Senat"
                    fill
                    className="object-cover rounded-xl shadow-md"
                    priority
                  />
                </div>
                <p className="mt-4 text-center text-sm text-gray-700 font-semibold">
                  Muhammad Rizal <br />
                  <span className="text-xs font-normal text-gray-500">
                    Ketua Senat 2025
                  </span>
                </p>
              </div>

              {/* Teks Sambutan */}
              <div className="flex-1 text-gray-800 text-2xl leading-relaxed text-justify">
                <p>
                  <span className="font-semibold text-blue-900">
                    Assalamu’alaikum Warahmatullahi Wabarakatuh.
                  </span>{" "}
                  Dengan penuh semangat dan rasa syukur, kami menyambut Anda di website resmi Senat Mahasiswa STTI Sony Sugema.
                  Website ini adalah ruang komunikasi terbuka untuk menyampaikan program kerja, kegiatan, dan aspirasi mahasiswa.
                  Mari bersama-sama membangun kampus yang aktif, kritis, dan penuh semangat kolaboratif.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
