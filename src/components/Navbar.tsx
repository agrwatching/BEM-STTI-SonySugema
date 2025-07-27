'use client'

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-[#001f3f] sticky top-0 z-[999] w-full font-sans">
      <div className="px-4 sm:px-6 lg:px-20  py-4 flex items-center justify-between">
        {/* Logo kiri */}
        <Link href="/">
          <div className="flex items-center space-x-3 p-2 rounded-md transition-transform duration-300 transform hover:scale-105 neon-hover cursor-pointer">
            <Image
              src="/logo_senat.png"
              alt="Logo Senat"
              width={45}
              height={45}
              priority
            />
            <div className="leading-tight">
              <span className="text-xl sm:text-2xl font-semibold text-white">
                Senat Mahasiswa
              </span>
              <div className="text-sm text-gray-200 -mt-1">
                STTI Sony Sugema
              </div>
            </div>
          </div>
        </Link>

        {/* Tombol burger mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 bg-white/20 rounded-md text-white hover:bg-white/30 transition"
          >
            <Menu size={26} />
          </button>
        </div>

        {/* Menu kanan desktop */}
        <div className="hidden md:flex flex-wrap justify-center gap-4 max-w-full overflow-x-hidden py-4 px-4">

          <Link href="/" className="text-white px-3 py-2 rounded transition text-lg bg-indigo-700 border-2 hover:border-[#d946ef] hover:bg-indigo-900 hover:scale-105 hover:-rotate-2 hover:shadow-[0_4px_12px_0_#d946ef]">
            Beranda
          </Link>
          <Link href="/" className="text-white px-3 py-2 rounded transition text-lg bg-indigo-700 border-2 hover:border-[#d946ef] hover:bg-indigo-900 hover:scale-105 hover:-rotate-2 hover:shadow-[0_4px_12px_0_#d946ef]">
            Struktur Organisasi
          </Link>
          <Link href="/proker" className="text-white px-3 py-2 rounded transition text-lg bg-indigo-700 border-2 hover:border-[#d946ef] hover:bg-indigo-900 hover:scale-105 hover:-rotate-2 hover:shadow-[0_4px_12px_0_#d946ef]">
            Program Kerja
          </Link>
           <Link href="/proker" className="text-white px-3 py-2 rounded transition text-lg bg-indigo-700 border-2 hover:border-[#d946ef] hover:bg-indigo-900 hover:scale-105 hover:-rotate-2 hover:shadow-[0_4px_12px_0_#d946ef]">
            Galeri
          </Link>
           <Link href="/proker" className="text-white px-3 py-2 rounded transition text-lg bg-indigo-700 border-2 hover:border-[#d946ef] hover:bg-indigo-900 hover:scale-105 hover:-rotate-2 hover:shadow-[0_4px_12px_0_#d946ef]">
            Artikel Mahasiswa
          </Link>
          <Link href="/proker" className="text-white px-3 py-2 rounded transition text-lg bg-indigo-700 border-2 hover:border-[#d946ef] hover:bg-indigo-900 hover:scale-105 hover:-rotate-2 hover:shadow-[0_4px_12px_0_#d946ef]">
            Ruang Diskusi
          </Link>
          <Link href="/proker" className="text-white px-3 py-2 rounded transition text-lg bg-indigo-700 border-2 hover:border-[#d946ef] hover:bg-indigo-900 hover:scale-105 hover:-rotate-2 hover:shadow-[0_4px_12px_0_#d946ef]">
            Kontak Kami
          </Link>
        </div>
      </div>

      {/* Fullscreen Mobile Menu */}
      <div
        className={`fixed inset-0 bg-[#001f3f] z-[998] flex flex-col items-center justify-center gap-6 text-xl text-white transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition"
        >
          <X size={30} />
        </button>
        <Link href="/" onClick={() => setIsOpen(false)} className="text-white hover:text-blue-300 transition">Beranda</Link>
        <Link href="/proker" onClick={() => setIsOpen(false)} className="text-white hover:text-blue-300 transition">Program Kerja</Link>
        <Link href="/login" onClick={() => setIsOpen(false)} className="text-white hover:text-blue-300 transition">Login</Link>
      </div>
    </nav>
  )
}
