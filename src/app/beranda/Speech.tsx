"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Deklarasi agar TypeScript tahu tentang particlesJS dari window
declare global {
  interface Window {
    particlesJS: any;
  }
}

export default function Speech() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.particlesJS) {
      window.particlesJS("particles-js", {
        particles: {
          number: { value: 80 },
          color: { value: "#ffffff" },
          shape: { type: "circle" },
          opacity: { value: 0.6 },
          size: { value: 1.5 },
          move: {
            enable: true,
            speed: 0.5,
            direction: "none",
            out_mode: "bounce",
          },
        },
        interactivity: {
          events: {
            onhover: { enable: true, mode: "repulse" },
          },
        },
        background: {
          color: "#00000000", // transparan
        },
      });
    }
  }, []);

  return (
    <section className="relative bg-black py-16 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 overflow-hidden">
      {/* Efek partikel bintang dari CDN */}
      <div id="particles-js" className="absolute inset-0 z-0" />

      {/* Konten utama sambutan */}
      <div className="w-full relative h-[500px] sm:h-[600px] md:h-[650px] z-10">
        <motion.div
          className="absolute left-0 right-0 mx-auto w-[90%] max-w-[350px] sm:max-w-[500px] md:max-w-[800px] cursor-grab active:cursor-grabbing"
          drag
          dragConstraints={{ top: 0, bottom: 100, left: -80, right: 80 }}
          dragElastic={0.4}
          whileDrag={{
            scale: 1.03,
            boxShadow: "0px 25px 50px rgba(0,0,0,0.3)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="neon-border border-[#d946ef] border-4 bg-white rounded-xl shadow-[0_4px_12px_0_#d946ef]">
            <div className="neon-border-inner p-4 sm:p-6 md:p-8">
              <h2 className="text-lg sm:text-xl md:text-4xl font-bold text-blue-900 mb-5 text-center">
                Sambutan Ketua Senat
              </h2>

              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="w-[90px] sm:w-[110px] md:w-1/3 mx-auto md:mx-0 flex flex-col items-center">
                  <div className="w-full aspect-[3/4] relative">
                    <Image
                      src="/pp.jpg"
                      alt="Ketua Senat"
                      fill
                      className="object-cover rounded-xl shadow-md"
                      priority
                    />
                  </div>
                  <p className="mt-3 text-center text-sm text-gray-700 font-semibold leading-tight">
                    Muhammad Rizal <br />
                    <span className="text-xs font-normal text-gray-500">
                      Ketua Senat 2025
                    </span>
                  </p>
                </div>

                <div className="flex-1 text-gray-800 text-xs sm:text-sm md:text-2xl leading-relaxed text-justify">
                  <p>
                    <span className="font-semibold text-blue-900">
                      Assalamu’alaikum Warahmatullahi Wabarakatuh.
                    </span>{" "}
                    Dengan penuh semangat dan rasa syukur, kami menyambut Anda
                    di website resmi Senat Mahasiswa STTI Sony Sugema.
                    Website ini adalah ruang komunikasi terbuka untuk
                    menyampaikan program kerja, kegiatan, dan aspirasi mahasiswa.
                    Mari bersama-sama membangun kampus yang aktif, kritis,
                    dan penuh semangat kolaboratif.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
