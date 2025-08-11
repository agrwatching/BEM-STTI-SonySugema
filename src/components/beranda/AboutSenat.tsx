'use client';

import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

// 🔹 Komponen animasi slide kiri/kanan saat scroll
function AnimatedBox({
  children,
  direction = 'left',
}: {
  children: React.ReactNode;
  direction: 'left' | 'right';
}) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: 'easeOut' },
      });
    } else {
      controls.start({
        opacity: 0,
        x: direction === 'left' ? -100 : 100,
      });
    }
  }, [controls, inView, direction]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: direction === 'left' ? -100 : 100 }}
      animate={controls}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}

// 🔹 Komponen utama: Tentang Senat
export default function AboutSenat() {
  return (
    <section
      className="bg-white py-20 md:pt-40 pt-20 px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 overflow-x-hidden"
      id="about"
    >
      <div className="max-w-8xl mx-auto">
        {/* Judul */}
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-10">
          Tentang Senat
        </h2>

        {/* Paragraf dengan logo melayang */}
        <div className="text-gray-700 text-lg leading-relaxed text-justify">
          <div className="float-left mr-6 mb-4">
            <Image
              src="/logo_senat.png"
              alt="Logo Senat"
              width={140}
              height={140}
              className="rounded-md shadow-sm"
              priority
            />
          </div>

          <p>
            <span className="font-semibold text-blue-900">Senat Mahasiswa STTI Sony Sugema</span> merupakan organisasi kemahasiswaan yang menjadi wadah aspirasi, pengembangan diri, dan partisipasi aktif mahasiswa dalam kegiatan kampus. Kami berkomitmen untuk menciptakan lingkungan akademik yang inklusif, kreatif, dan progresif bagi seluruh civitas akademika. Senat Mahasiswa juga berperan sebagai jembatan antara mahasiswa dan pihak kampus dalam menyuarakan pendapat, menyampaikan ide, serta mendorong terwujudnya kebijakan yang berpihak pada kepentingan bersama. Melalui berbagai kegiatan, program kerja, dan forum diskusi yang diselenggarakan, Senat Mahasiswa terus mendorong terbentuknya generasi muda yang kritis, solutif, dan bertanggung jawab. Selain itu, Senat Mahasiswa menjadi pusat koordinasi bagi berbagai organisasi internal kampus, memastikan sinergi dan kolaborasi antar lembaga berjalan secara efektif dan efisien. Kami percaya bahwa kolaborasi yang sehat akan memperkuat solidaritas antar mahasiswa dan turut meningkatkan kualitas kehidupan kampus secara menyeluruh. Dengan menjunjung tinggi semangat pelayanan, integritas, dan profesionalisme, Senat Mahasiswa STTI Sony Sugema terus berupaya menjadi motor penggerak perubahan positif di lingkungan kampus serta memfasilitasi pertumbuhan mahasiswa baik dalam bidang akademik, organisasi, maupun sosial kemasyarakatan.
          </p>
        </div>

        {/* Visi & Misi */}
        <div className="clear-both mt-16 bg-white p-6 sm:p-8 rounded-xl">
          <div className="flex flex-col md:flex-row gap-6 items-stretch">
            {/* Visi */}
            <AnimatedBox direction="left">
              <div className="flex-1 bg-white rounded-lg shadow-sm border-2 border-black flex flex-col h-full">
                <div className="bg-blue-900 rounded-t-sm border-b-2 border-black">
                    <h3 className="text-2xl font-bold text-white my-4 text-center ">
                    Visi
                    </h3>
                </div>
                <p className="text-gray-700 text-lg text-justify flex-1 p-6">
                  Menjadikan Senat STTI Sony Sugema sebagai motor penggerak inovasi, 
                  kolaborasi, kreativitas mahasiswa untuk menciptakan lingkungan kampus yang unggul, 
                  berdaya saing, dan di kenal luas sebagai kampus teknologi.
                </p>
              </div>
            </AnimatedBox>

            {/* Misi */}
            <AnimatedBox direction="right">
              <div className="flex-1 bg-white rounded-lg shadow-sm border-2 border-black flex flex-col h-full">
                <div className="bg-blue-900 rounded-t-sm border-b-2 border-black">
                    <h3 className="text-2xl font-bold text-white my-4 text-center">
                    Misi
                    </h3>
                </div>
                <ul className="list-disc list-inside text-gray-700 space-y-3 text-lg flex-1 p-6">
                  <li>
                    Mengembangkan potensi kepemimpinan mahasiswa melalui
                    berbagai program kerja yang inovatif.
                  </li>
                  <li>
                    Menampung dan menyalurkan aspirasi mahasiswa secara
                    transparan dan bertanggung jawab.
                  </li>
                  <li>
                    Membangun sinergi antar organisasi kemahasiswaan dan pihak
                    kampus.
                  </li>
                  <li>
                    Mendorong terciptanya lingkungan kampus yang aktif, kritis,
                    dan solutif.
                  </li>
                </ul>
              </div>
            </AnimatedBox>
          </div>
        </div>
      </div>
    </section>
  );
}
