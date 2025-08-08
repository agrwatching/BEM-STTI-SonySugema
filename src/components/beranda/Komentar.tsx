"use client";

import { useState } from "react";

export default function Komentar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [komentarBaru, setKomentarBaru] = useState("");
  const [komentarList, setKomentarList] = useState([
    {
      nama: "Agus Wijaya",
      komentar: "Webnya keren banget!",
      waktu: "29 Jul 2025, 10.15",
      foto: "https://i.pravatar.cc/40?img=1",
    },
    {
      nama: "Sari Dewi",
      komentar: "Semangat untuk Senat Mahasiswa STTI!",
      waktu: "28 Jul 2025, 09.05",
      foto: "https://i.pravatar.cc/40?img=2",
    },
    {
      nama: "Andi Saputra",
      komentar: "Sangat inspiratif!",
      waktu: "27 Jul 2025, 15.30",
      foto: "https://i.pravatar.cc/40?img=3",
    },
    {
      nama: "Dewi Lestari",
      komentar: "Ayo semangat terus!",
      waktu: "26 Jul 2025, 08.45",
      foto: "https://i.pravatar.cc/40?img=4",
    },
    {
      nama: "Budi Santoso",
      komentar: "Mantap broo!",
      waktu: "25 Jul 2025, 14.20",
      foto: "https://i.pravatar.cc/40?img=5",
    },
    {
      nama: "Rina Marlina",
      komentar: "Keren banget programnya!",
      waktu: "24 Jul 2025, 12.10",
      foto: "https://i.pravatar.cc/40?img=6",
    },
    {
      nama: "Yoga Prasetyo",
      komentar: "Terus berjuang untuk kemajuan!",
      waktu: "23 Jul 2025, 16.00",
      foto: "https://i.pravatar.cc/40?img=7",
    },
    {
      nama: "Tania Sari",
      komentar: "Bangga menjadi bagian dari kampus ini!",
      waktu: "22 Jul 2025, 11.25",
      foto: "https://i.pravatar.cc/40?img=8",
    },
  ]);

  const [jumlahTampil, setJumlahTampil] = useState(6);

  const userDummy = {
    nama: "Kamu",
    foto: "https://i.pravatar.cc/40?img=9",
  };

  const formatWaktuLengkap = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Jakarta",
    };

    const formatted = new Intl.DateTimeFormat("id-ID", options).format(date);
    return formatted.replace(":", ".");
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleSubmitKomentar = () => {
    if (!komentarBaru.trim()) return;

    const komentarBaruObj = {
      nama: userDummy.nama,
      komentar: komentarBaru,
      waktu: formatWaktuLengkap(new Date()),
      foto: userDummy.foto,
    };

    setKomentarList([komentarBaruObj, ...komentarList]);
    setKomentarBaru("");
  };

  const tampilkanLebihBanyak = () => {
    setJumlahTampil(komentarList.length); // tampilkan semua
  };

  const sembunyikanKomentar = () => {
    setJumlahTampil(6); // kembali ke 6
  };

  return (
    <section className="py-16 px-4 bg-gray-100" id="komentar">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2">
          Komentar & Dukungan
        </h2>
        <p className="text-gray-600 mb-8 text-lg">
          Bagikan dukungan dan pemikiran Anda untuk program ini
        </p>

        {/* Login atau Form Komentar */}
        {!isLoggedIn ? (
          <div className="bg-white rounded-xl shadow p-6 sm:p-8 mb-10">
            <div className="flex flex-col items-center justify-center space-y-4">
              <span className="text-[60px]">💬</span>
              <h3 className="text-lg md:text-2xl font-semibold">
                Login untuk Berkomentar
              </h3>
              <p className="text-sm md:text-xl text-gray-600">
                Silakan login terlebih dahulu untuk memberikan komentar
              </p>
              <button
                onClick={handleLogin}
                className="bg-blue-500 hover:bg-green-500 text-white px-5 py-2 rounded-lg font-medium transition duration-300"
              >
                Login dengan Google
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow p-6 sm:p-8 mb-10 text-left">
            {/* Tombol Logout kanan atas */}
            <div className="flex justify-end mb-4">
              <button
                onClick={handleLogout}
                className="text-sm text-gray-500 hover:text-red-500 transition"
              >
                Logout
              </button>
            </div>

            {/* Input komentar */}
            <div className="flex items-start space-x-4 mb-4">
              <img
                src={userDummy.foto}
                alt="User"
                className="w-10 h-10 rounded-full"
              />
              <textarea
                value={komentarBaru}
                onChange={(e) => setKomentarBaru(e.target.value)}
                placeholder="Tulis komentar kamu di sini..."
                className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows={3}
              />
            </div>

            {/* Tombol kirim */}
            <div className="flex justify-end">
              <button
                onClick={handleSubmitKomentar}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
              >
                Kirim Komentar
              </button>
            </div>
          </div>
        )}

        {/* Daftar Komentar */}
        <div className="bg-white rounded-xl shadow p-6 sm:p-8 text-left">
          <h4 className="text-lg font-semibold mb-4">Komentar yang masuk:</h4>
          <div className="space-y-4">
            {komentarList.slice(0, jumlahTampil).map((komentar, index) => (
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

          {/* Tombol kontrol komentar */}
          {komentarList.length > 6 && (
            <div className="mt-6 text-center">
              {jumlahTampil < komentarList.length ? (
                <button
                  onClick={tampilkanLebihBanyak}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Lihat lebih banyak komentar
                </button>
              ) : (
                <button
                  onClick={sembunyikanKomentar}
                  className="text-gray-500 hover:underline font-medium"
                >
                  Sembunyikan komentar
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
