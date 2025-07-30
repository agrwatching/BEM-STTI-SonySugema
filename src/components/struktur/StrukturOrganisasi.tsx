'use client';

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Biar TypeScript gak error pas akses particlesJS
declare global {
  interface Window {
    particlesJS: any;
  }
}

const strukturData = {
  ketua: {
    nama: "MUHAMMAD RIZAL",
    jabatan: "Ketua Senat",
    foto: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  inti: [
    {
      nama: "AHMAD NURJAMAN",
      jabatan: "Wakil Ketua",
      foto: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      nama: "YULIA APRILIANI",
      jabatan: "Sekretaris",
      foto: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
      nama: "WIDIA KANTRI DEWI",
      jabatan: "Bendahara",
      foto: "https://randomuser.me/api/portraits/women/4.jpg",
    },
  ],
  divisi: [
    {
      nama: "Divisi Kerohanian",
      anggota: ["A", "B", "C", "D"],
    },
    {
      nama: "Divisi Humas Internal dan Eksternal",
      anggota: ["A", "B", "C", "D"],
    },
    {
      nama: "Divisi Olahraga",
      anggota: ["A", "B", "C", "D"],
    },
    {
      nama: "Divisi Kominfo",
      anggota: ["A", "B", "C", "D", "E"],
    },
    {
      nama: "Divisi Penelitian dan Pengembangan",
      anggota: ["A", "B", "C", "D"],
    },
  ],
};

const Card = ({
  nama,
  jabatan,
  foto,
}: {
  nama: string;
  jabatan: string;
  foto: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-4 flex flex-col items-center w-[140px] md:w-[160px] text-center border border-white/20"
  >
    <div className="relative w-24 h-24 md:w-28 md:h-28 mb-3 rounded-full overflow-hidden border-2 border-white">
      <Image src={foto} alt={nama} fill className="object-cover" />
    </div>
    <p className="font-semibold text-white text-sm md:text-base leading-tight">{nama}</p>
    <p className="text-white/80 text-xs md:text-sm italic">{jabatan}</p>
  </motion.div>
);

const StrukturOrganisasi = () => {
  useEffect(() => {
    if (typeof window !== "undefined" && window.particlesJS) {
      window.particlesJS("particles-js", {
        particles: {
          number: { value: 100 },
          color: { value: "#ffffff" },
          shape: { type: "circle" },
          opacity: { value: 0.5 },
          size: { value: 2 },
          move: {
            enable: true,
            speed: 0.6,
            direction: "none",
            out_mode: "bounce",
          },
        },
        interactivity: {
          events: {
            onhover: { enable: true, mode: "repulse" },
          },
        },
      });
    }
  }, []);

  return (
    <div className="relative min-h-screen w-full py-16 px-4 overflow-hidden bg-black text-white">
      {/* Bintang latar belakang */}
      <div id="particles-js" className="absolute inset-0 z-0" />

      {/* Konten struktur */}
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-10 drop-shadow">
          Struktur Organisasi Senat Mahasiswa
        </h2>

        {/* Ketua */}
        <div className="flex justify-center mb-10">
          <Card {...strukturData.ketua} />
        </div>

        {/* Inti */}
        <div className="flex flex-wrap justify-center gap-6 mb-14">
          {strukturData.inti.map((item, i) => (
            <Card key={i} {...item} />
          ))}
        </div>

        {/* Divisi */}
        <div className="flex flex-col gap-14">
          {strukturData.divisi.map((div, i) => (
            <div key={i}>
              <h3 className="text-xl md:text-2xl font-bold mb-6">{div.nama}</h3>
              <div className="flex flex-wrap justify-center gap-6">
                {div.anggota.map((nama, j) => (
                  <Card
                    key={j}
                    nama={nama}
                    jabatan="Anggota"
                    foto={`https://randomuser.me/api/portraits/lego/${(i + j) % 10}.jpg`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StrukturOrganisasi;
