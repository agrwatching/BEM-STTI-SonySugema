"use client";

export default function Komentar() {
  const komentarDummy = [
    {
      nama: "Agus Wijaya",
      komentar: "Webnya keren banget!",
      waktu: "2 jam lalu",
      foto: "https://i.pravatar.cc/40?img=1",
    },
    {
      nama: "Sari Dewi",
      komentar: "Semangat untuk Senat Mahasiswa STTI!",
      waktu: "1 hari lalu",
      foto: "https://i.pravatar.cc/40?img=2",
    },
  ];

  return (
    <section className="py-16 px-4 bg-gray-100" id="komentar">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          Komentar & Dukungan
        </h2>
        <p className="text-gray-600 mb-8">
          Bagikan dukungan dan pemikiran Anda untuk program ini
        </p>

        {/* Card Login */}
        <div className="bg-white rounded-xl shadow p-6 sm:p-8 mb-10">
          <div className="flex flex-col items-center justify-center space-y-4">
            <span className="text-[60px]">💬</span>
            <h3 className="text-lg sm:text-xl font-semibold">
              Login untuk Berkomentar
            </h3>
            <p className="text-sm text-gray-600">
              Silakan login terlebih dahulu untuk memberikan komentar
            </p>
            <button className="bg-blue-500 hover:bg-green-500 text-white px-5 py-2 rounded-lg font-medium transition duration-300">
              Login dengan Google
            </button>
          </div>
        </div>

        {/* List Komentar */}
        <div className="bg-white rounded-xl shadow p-6 sm:p-8 text-left">
          <h4 className="text-lg font-semibold mb-4">Komentar yang masuk:</h4>
          <div className="space-y-4">
            {komentarDummy.map((komentar, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 bg-blue-50 p-4 rounded-lg shadow-sm"
              >
                <img
                  src={komentar.foto}
                  alt={komentar.nama}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold">{komentar.nama}</p>
                  <p className="text-sm text-gray-600">{komentar.waktu}</p>
                  <p className="mt-1">{komentar.komentar}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
