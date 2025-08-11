// src/components/Footer.tsx
'use client'

import Image from "next/image"
import Link from "next/link"
import { Mail, Instagram } from "lucide-react"
import { FaWhatsapp, FaTiktok } from "react-icons/fa6"

export default function Footer() {
  return (
    <footer className="bg-[#0e1a2b] text-white">
      <div className="px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-left justify-center">

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
        <div className="text-left">
          <h3 className="md:text-2xl text-xl font-semibold mb-4">Navigasi</h3>
          <div className="grid grid-cols-2 gap-x-4 text-gray-300 md:text-lg text-lg">
            <Link href="/" className="hover:text-white transition hover:underline">Beranda</Link>
            <Link href="/struktur" className="hover:text-white transition hover:underline">Struktur Organisasi</Link>
            <Link href="/proker" className="hover:text-white transition hover:underline">Program Kerja</Link>
            <Link href="/galeri" className="hover:text-white transition hover:underline">Galeri</Link>
            <Link href="/artikel" className="hover:text-white transition hover:underline">Artikel Mahasiswa</Link>
            <Link href="/diskusi" className="hover:text-white transition hover:underline">Ruang Diskusi</Link>
            <Link href="/kontak" className="hover:text-white transition hover:underline">Kontak Kami</Link>
            <Link href="/dashboard/login" className="hover:text-white transition hover:underline">Login</Link>
          </div>
        </div>

        {/* Kolom 3: Kontak */}
        <div>
          <h3 className="md:text-2xl text-xl font-semibold mb-4">Kontak</h3>
          <div className="flex items-center gap-4 text-gray-300 mb-4">
            <a
              href="mailto:senatmahasiswa@stti-ss.ac.id"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              <Mail size={24} />
            </a>
            <a
              href="https://instagram.com/senatsttiss"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              <Instagram size={24} />
            </a>
            <a
              href="https://wa.me/6285179718031"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              <FaWhatsapp size={24} />
            </a>
            <a
              href="https://tiktok.com/@senatmahasiswa"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              <FaTiktok size={24} />
            </a>
          </div>
          <ul className="text-gray-300 md:text-xl text-lg space-y-2">
            <li>Alamat: Jalan Raya Lemahmulya, RT.008/RW.004, Karawang</li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 py-5 px-3 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Senat Mahasiswa STTI Sony Sugema.
      </div>
    </footer>
  )
}
