'use client'

import Image from "next/image"
import Link from "next/link"
import { FaInstagram, FaTiktok } from "react-icons/fa6"

export default function Footer() {
  return (
    <footer className="bg-[#0e1a2b] text-white mt-10">
      <div className="px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-left md:pl-60">

        {/* Kolom 1: Tentang */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Image src="/logo_stti.png" alt="Logo STTI" width={40} height={40} />
            <Image src="/logo_senat.png" alt="Logo Senat" width={40} height={40} />
            <div>
              <p className="md:text-2xl text-xl font-bold">Senat Mahasiswa</p>
              <p className="md:text-xl text-lg text-gray-300">STTI Sony Sugema</p>
            </div>
          </div>
          <p className="text-gray-300 md:text-xl text-lg leading-relaxed">
            Suara Mahasiswa, Pilar Perubahan. Bersama membangun kampus yang progresif dan partisipatif.
          </p>
        </div>

        {/* Kolom 2: Navigasi */}
        <div>
          <h3 className="md:text-2xl text-xl font-semibold mb-4">Navigasi</h3>
          <ul className="space-y-2 text-gray-300 md:text-xl text-lg">
            <li>
              <Link href="/" className="hover:text-white transition">Beranda</Link>
            </li>
            <li>
              <Link href="/proker" className="hover:text-white transition">Program Kerja</Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-white transition">Login Admin</Link>
            </li>
          </ul>
        </div>

        {/* Kolom 3: Kontak */}
        <div>
          <h3 className="md:text-2xl text-xl font-semibold mb-4">Kontak</h3>
          <ul className="text-gray-300 md:text-xl text-lg space-y-2">
            <li>Email: senatmahasiswa@stti-ss.ac.id</li>
            <li>Instagram: <a href="https://instagram.com/senatsttiss" className="hover:text-white">@senatsttiss</a></li>
            <li>Alamat: Jl. STTI No. 12, Bandung</li>
          </ul>

          {/* Ikon Sosial Media */}
          <div className="flex gap-4 mt-4 text-2xl text-gray-300">
            <a href="https://instagram.com/senatsttiss" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <FaInstagram />
            </a>
            <a href="https://www.tiktok.com/@senatsttiss" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <FaTiktok />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 py-5 px-3 text-center text-gray-400 text-sm md:text-lg">
        &copy; {new Date().getFullYear()} Senat Mahasiswa STTI Sony Sugema. Dibuat dengan ❤️ oleh tim Senat.
      </div>
    </footer>
  )
}
