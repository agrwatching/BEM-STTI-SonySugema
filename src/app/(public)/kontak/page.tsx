"use client";

import { Mail, MapPin, Instagram } from "lucide-react";
import { FaWhatsapp, FaTiktok } from "react-icons/fa";

export default function KontakPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white py-16 px-6 md:px-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-10">
          Kontak Kami
        </h1>

        <div className="bg-white/10 backdrop-blur-md rounded p-8 border border-white/20 shadow-lg space-y-10">
          {/* Google Maps */}
          <div className="rounded-xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.583890934828!2d107.37658310470532!3d-6.318260716504574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e699b059bb8deb9%3A0x86980df629d49c93!2sSTTI%20Sony%20Sugema!5e0!3m2!1sid!2sid!4v1753875642908!5m2!1sid!2sid"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Flex Container */}
          <div className="flex flex-col md:flex-row gap-10">
            {/* Info Kontak */}
            <div className="space-y-6 flex-1">
              <div className="flex items-start gap-2">
                <MapPin className="text-blue-400 w-20 h-20" />
                <div>
                  <p className="font-semibold text-xl">Alamat</p>
                  <a
                    href="https://maps.google.com/?q=STTI+Sony+Sugema"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 text-base md:text-lg hover:underline"
                  >
                    Jalan Raya Lemahmulya, RT.008/RW.004, Gokgik, Lemahmulya, Majalaya, Karawang Barat, Jawa Barat 41371
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="text-blue-400 mt-1" />
                <div>
                  <p className="font-semibold">Email</p>
                  <a
                    href="mailto:senatmahasiswa@stti.ac.id"
                    className="text-white/80 text-base md:text-lg hover:underline"
                  >
                    senatmahasiswa@stti.ac.id
                  </a>
                </div>
              </div>
            </div>

            {/* Sosial Media */}
            <div className="space-y-4 flex-1">
              <h2 className="text-xl font-semibold text-white">Ikuti Kami</h2>

              <div className="flex gap-4 flex-wrap">
                <a
                  href="https://tiktok.com/@senatmahasiswa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 p-3 rounded-lg transition"
                >
                  <FaTiktok size={20} />
                  TikTok
                </a>

                <a
                  href="https://instagram.com/senatmahasiswa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 p-3 rounded-lg transition"
                >
                  <Instagram size={20} />
                  Instagram
                </a>

                <a
                  href="https://wa.me/6285179718031"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 p-3 rounded-lg transition text-green-400"
                >
                  <FaWhatsapp size={20} />
                  WhatsApp
                </a>
              </div>

              <p className="text-sm md:text-xl text-white/60">
                Untuk pertanyaan lebih lanjut, jangan ragu menghubungi kami melalui email atau sosial media.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
