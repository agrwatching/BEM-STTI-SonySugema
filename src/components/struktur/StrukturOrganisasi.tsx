'use client';

import { useEffect } from "react";
import Image from "next/image";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    particlesJS: any;
  }
}

const strukturData = {
  ketua: { nama: "MUHAMMAD RIZAL", jabatan: "Ketua Senat", foto: "" },
  inti: [
    { nama: "AHMAD NURJAMAN", jabatan: "Wakil Ketua", foto: "" },
    { nama: "YULIA APRILIANI", jabatan: "Sekretaris", foto: "" },
    { nama: "WIDIA KANTRI DEWI", jabatan: "Bendahara", foto: "" },
  ],
  divisi: [
    {
      nama: "Divisi Kerohanian",
      ketua: "Zaki",
      wakil: "Laila",
      anggota: ["Ahmad", "Budi", "Citra"],
    },
    {
      nama: "Divisi Humas Internal dan Eksternal",
      ketua: "Rina",
      wakil: "Dian",
      anggota: ["Eka", "Fajar", "Gina"],
    },
    {
      nama: "Divisi Olahraga",
      ketua: "Bayu",
      wakil: "Fikri",
      anggota: ["Hana", "Irfan", "Joko"],
    },
    {
      nama: "Divisi Kominfo",
      ketua: "Tari",
      wakil: "Dimas",
      anggota: ["Lutfi", "Mira", "Nina", "Omar"],
    },
    {
      nama: "Divisi Penelitian dan Pengembangan",
      ketua: "Robby",
      wakil: "Fauzi",
      anggota: ["Putri", "Qori", "Rendi"],
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
  <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow p-4 flex flex-col items-center w-[140px] md:w-[160px] text-center border border-white/20 transition-transform duration-300 hover:scale-105 cursor-pointer">
    <div className="relative w-24 h-24 md:w-28 md:h-28 mb-3 rounded-full overflow-hidden border-2 border-white bg-white/20 flex items-center justify-center text-xs text-white/50">
      {foto ? (
        <Image src={foto} alt={nama} fill className="object-cover" />
      ) : (
        "No Image"
      )}
    </div>
    <p className="font-semibold text-white text-sm md:text-base leading-tight">
      {nama}
    </p>
    <p className="text-white/80 text-xs md:text-sm italic">{jabatan}</p>
  </div>
);

const StrukturOrganisasi = () => {
useEffect(() => {
  const initParticles = () => {
    if (window.particlesJS) {
      window.particlesJS("particles-org", {
        particles: {
          number: { value: 20 },
          color: { value: "#ffffff" },
          shape: { type: "circle" },
          opacity: { value: 0.3 },
          size: { value: 1.2 },
          move: {
            enable: true,
            speed: 0.2,
            direction: "none",
            out_mode: "bounce",
          },
        },
        interactivity: {
          events: {
            onhover: { enable: false },
          },
        },
      });
    } else {
      setTimeout(initParticles, 100); // tunggu sampai particlesJS siap
    }
  };

  initParticles();

  return () => {
    const canvas = document.querySelector("#particles-org canvas");
    canvas?.parentNode?.removeChild(canvas);
  };
}, []);

  return (
    <div className="relative min-h-screen w-full py-16 px-4 overflow-hidden bg-black text-white">
      <div id="particles-org" className="absolute inset-0 z-0" />

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-10 drop-shadow">
          Struktur Organisasi Senat Mahasiswa
        </h2>

        <div className="flex flex-wrap justify-center gap-6 mb-10">
          <Card {...strukturData.ketua} />
          {strukturData.inti.slice(0, 1).map((item, i) => (
            <Card key={i} {...item} />
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-6 mb-14">
          {strukturData.inti.slice(1).map((item, i) => (
            <Card key={i} {...item} />
          ))}
        </div>

        <div className="flex flex-col gap-14">
          {strukturData.divisi.map((div, i) => (
            <div key={i}>
              <h3 className="text-xl md:text-2xl font-bold mb-6">{div.nama}</h3>
              <div className="flex flex-wrap justify-center gap-6 mb-3">
                <Card nama={div.ketua} jabatan="Ketua Divisi" foto="" />
                <Card nama={div.wakil} jabatan="Wakil Ketua" foto="" />
              </div>
              <div className="flex flex-wrap justify-center gap-6">
                {div.anggota.map((nama, j) => (
                  <Card key={j} nama={nama} jabatan="Anggota" foto="" />
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
