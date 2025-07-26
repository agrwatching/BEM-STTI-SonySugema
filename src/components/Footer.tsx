'use client'

import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10 text-sm">
        
        {/* Kolom 1: Tentang */}
        <div>
          <div className="flex items-center space-x-4 mb-4">
            {/* Logo STTI */}
            <Image
              src="/logo_stti.png"
              alt="Logo STTI"
              width={40}
              height={40}
              className="object-contain opacity-90"
            />
            {/* Logo Senat */}
            <Image
              src="/logo_senat.png"
              alt="Logo Senat"
              width={40}
              height={40}
              className="object-contain"
            />
            {/* Teks nama lembaga */}
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-semibold">Senat Mahasiswa</span>
              <span className="text-sm text-gray-300 -mt-[2px]">STTI Sony Sugema</span>
            </div>
          </div>
          <p className="text-gray-300 leading-relaxed">
            Suara Mahasiswa, Pilar Perubahan. Bersama membangun kampus yang progresif dan partisipatif.
          </p>
        </div>

        {/* Kolom 2: Navigasi */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Navigasi</h3>
          <ul className="space-y-3">
            <li><a href="/" className="hover:underline transition">Beranda</a></li>
            <li><a href="/proker" className="hover:underline transition">Program Kerja</a></li>
            <li><a href="/login" className="hover:underline transition">Login Admin</a></li>
          </ul>
        </div>

        {/* Kolom 3: Kontak */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Kontak</h3>
          <ul className="space-y-3 text-gray-300 leading-relaxed">
            <li>Email: senatmahasiswa@stti-ss.ac.id</li>
            <li>Instagram: @senatsttiss</li>
            <li>Alamat: Jl. STTI No. 12, Bandung</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-blue-800 py-5 text-center text-gray-400 text-xs sm:text-sm">
        &copy; {new Date().getFullYear()} Senat Mahasiswa STTI Sony Sugema. All rights reserved.
      </div>
    </footer>
  )
}
