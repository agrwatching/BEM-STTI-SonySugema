"use client";

import { Mail, MapPin, Phone, Facebook, Instagram } from "lucide-react";

export default function KontakPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white py-16 px-6 md:px-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-10">
          Kontak Kami
        </h1>

        <div className="grid md:grid-cols-2 gap-10 bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-lg">
          {/* Info Kontak */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="text-blue-400 mt-1" />
              <div>
                <p className="font-semibold">Alamat</p>
                <p className="text-white/80 text-sm">
                  Jl. Contoh Raya No.123, Bandung, Indonesia
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="text-blue-400 mt-1" />
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-white/80 text-sm">senatmahasiswa@stti.ac.id</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="text-blue-400 mt-1" />
              <div>
                <p className="font-semibold">Telepon</p>
                <p className="text-white/80 text-sm">+62 812-3456-7890</p>
              </div>
            </div>
          </div>

          {/* Sosial Media */}
          <div className="space-y-6">
            <p className="text-lg font-semibold mb-2">Ikuti Kami</p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 p-3 rounded-lg transition"
              >
                <Facebook size={20} />
                Facebook
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 p-3 rounded-lg transition"
              >
                <Instagram size={20} />
                Instagram
              </a>
            </div>
            <p className="text-sm text-white/60">
              Untuk pertanyaan lebih lanjut, jangan ragu menghubungi kami melalui email atau sosial media.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
