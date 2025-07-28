'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

const images = ['/slide1.jpg', '/slide2.jpg', '/slide3.jpg']

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length)
    }, 5000) // Ganti gambar setiap 5 detik

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative w-full aspect-[18/9] overflow-hidden z-10">
      {/* Background Images */}
      {images.map((src, index) => (
        <Image
          key={index}
          src={src}
          alt={`Slide ${index + 1}`}
          fill
          className={`absolute object-cover transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-20 flex items-center justify-center text-center px-4 pb-12 md:pb-28">
        <div className="max-w-3xl">
          <p className="text-white text-base md:text-xl mb-2 font-extrabold tracking-wide uppercase">
            Senat STTI Sony Sugema 2025
          </p>
          <h1 className="text-white text-3xl md:text-5xl font-extrabold">
            KABINET <span className="text-red-500">TUNAS LANGIT</span>
          </h1>
          <p className="text-gray-200 mt-3 text-base md:text-lg">
            Bergerak Bersama, Mewujudkan Dampak Nyata untuk Mahasiswa & Kampus
          </p>
          <button className="mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full text-sm md:text-base font-semibold shadow-lg transition duration-300">
            Jelajahi Lebih Lanjut
          </button>
        </div>
      </div>
    </section>
  )
}
