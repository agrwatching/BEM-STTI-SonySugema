'use client'

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-[#001f3f] shadow-md mt-4 mx-4 sm:mx-6 lg:mx-20 xl:mx-32 rounded-xl font-sans">
      <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
        {/* Logo kiri */}
        <div className="flex items-center space-x-3">
          <Image
            src="/logo_senat.png"
            alt="Logo Senat"
            width={60}
            height={60}
            priority
          />
          <div className="flex flex-col leading-tight">
            <span className="text-[17px] font-semibold text-white text-2xl">
              Senat Mahasiswa
            </span>
            <span className="text-sm text-gray-200 -mt-[2px]">
              STTI Sony Sugema
            </span>
          </div>
        </div>

        {/* Tombol burger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 bg-white/20 rounded-md text-white hover:bg-white/30 transition"
          >
            <Menu size={26} />
          </button>
        </div>

        {/* Menu kanan untuk desktop */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-white hover:bg-gray-500 p-2 rounded transition text-2xl">
            Beranda
          </Link>
          <Link href="/proker" className="text-white hover:bg-gray-500 p-2 rounded transition text-2xl">
            Program Kerja
          </Link>
          <Link href="/login" className="text-white hover:bg-gray-500 p-2 rounded transition text-2xl">
            Login
          </Link>
        </div>
      </div>

      {/* Fullscreen Mobile Menu */}
      <div
        className={`fixed inset-0 bg-[#001f3f] z-40 flex flex-col items-center justify-center gap-6 text-xl text-white transform transition-transform duration-300 ease-in-out ${
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
