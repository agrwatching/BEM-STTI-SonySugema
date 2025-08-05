// src/components/Navbar.tsx
'use client'

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
  { href: "/", label: "Beranda" },
  { href: "/struktur", label: "Struktur Organisasi" },
  { href: "/proker", label: "Program Kerja" },
  { href: "/galeri", label: "Galeri" },
  { href: "/artikel", label: "Artikel Mahasiswa" },
  { href: "/diskusi", label: "Ruang Diskusi" },
  { href: "/kontak", label: "Kontak Kami" },
]


  return (
    <nav className="bg-[#001f3f] sticky top-0 z-[999] w-full font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20 md:py-4 py-1 flex items-center justify-between">
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
        <div className="hidden md:flex flex-wrap justify-end gap-x-2 gap-y-2 max-w-full py-4 px-4 lg:flex-nowrap">
          {navItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="text-white text-sm sm:text-base px-3 py-2 min-w-fit rounded transition hover:border-[#d946ef] hover:bg-indigo-900 hover:scale-105 hover:-rotate-2 hover:shadow-[0_4px_12px_0_#d946ef]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Fullscreen Mobile Menu */}
      <div
        className={`fixed inset-0 bg-[#001f3f] z-[998] flex flex-col items-center justify-center px-6 py-10 text-white transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition"
        >
          <X size={30} />
        </button>

        {/* Mobile menu tanpa hover/animasi */}
        <div className="flex flex-col gap-4 w-full items-center">
          {navItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="w-full text-center text-lg sm:text-xl px-4 py-2 rounded text-white border-[#d946ef] bg-indigo-900 hover:shadow-[0_4px_12px_0_#d946ef]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
