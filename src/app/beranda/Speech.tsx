"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    particlesJS: any;
  }
}

export default function Speech() {
  useEffect(() => {
    if (window.particlesJS) {
      window.particlesJS("particles-speech", {
        particles: {
          number: { value: 10 },
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
    }

    return () => {
      const canvas = document.querySelector("#particles-speech canvas");
      canvas?.parentNode?.removeChild(canvas);
    };
  }, []);

  return (
    <section className="relative bg-black py-16 px-4 sm:px-8 md:px-16 xl:px-32 overflow-hidden">
      <div id="particles-speech" className="absolute inset-0 z-0" />

      <div className="w-full relative h-auto z-10">
        <motion.div
          className="mx-auto w-full max-w-[800px] p-4"
          drag
          dragConstraints={{ top: 0, bottom: 50, left: -50, right: 50 }}
          dragElastic={0.4}
          whileDrag={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <div className="relative p-6 rounded-xl border border-blue-500 bg-white shadow-[0_0_15px_#3b82f6]">
            <h2 className="text-2xl md:text-4xl font-bold text-blue-900 mb-5 text-center">
              Sambutan Ketua Senat
            </h2>

            <div className="flex flex-col md:flex-row gap-4 items-start">
              <div className="w-[90px] sm:w-[110px] md:w-1/4 mx-auto md:mx-0 flex flex-col items-center">
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

              <div className="flex-1 text-gray-800 text-sm md:text-xl leading-relaxed text-justify">
                <p>
                  <span className="font-semibold text-blue-900">
                    Assalamu’alaikum Warahmatullahi Wabarakatuh.
                  </span>{" "}
                  Dengan penuh semangat dan rasa syukur, kami menyambut Anda di
                  website resmi Senat Mahasiswa STTI Sony Sugema. Website ini
                  adalah ruang komunikasi terbuka untuk menyampaikan program
                  kerja, kegiatan, dan aspirasi mahasiswa. Mari bersama-sama
                  membangun kampus yang aktif, kritis, dan penuh semangat
                  kolaboratif.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
