// src/components/beranda/Hero.tsx
'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface HeroImage {
  _id: string
  url: string
}

export default function Hero() {
  const [images, setImages] = useState<HeroImage[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Ambil gambar dari API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch('/api/hero')
        if (!res.ok) throw new Error('Gagal memuat data hero.')
        const data = await res.json()
        setImages(data)
      } catch (err) {
        console.error(err)
        setError('Gagal memuat gambar hero. Silakan coba lagi nanti.')
      } finally {
        setLoading(false)
      }
    }
    fetchImages()
  }, [])

  // Auto ganti slide setiap 5 detik
  useEffect(() => {
    if (images.length === 0) return
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length)
    }, 10000)
    return () => clearInterval(interval)
  }, [images])

  // Loading state
  if (loading) {
    return (
      <section className="relative w-full aspect-[16/9] bg-gray-800 flex items-center justify-center text-white">
        <p>Memuat hero section...</p>
      </section>
    )
  }

  // Jika ada error
  if (error) {
    return (
      <section className="relative w-full aspect-[16/9] bg-gray-900 flex items-center justify-center text-center text-white px-4">
        <div>
          <Image src="/what.png" alt="Error" width={120} height={120} className="mx-auto mb-4" />
          <p className="text-lg font-semibold mb-2">{error}</p>
          <p className="text-sm text-gray-300">Pastikan koneksi internet stabil atau hubungi admin.</p>
        </div>
      </section>
    )
  }

  // Jika tidak ada gambar
  if (images.length === 0) {
    return (
      <section className="relative w-full aspect-[16/9] bg-gray-800 flex flex-col items-center justify-center text-white px-4">
        <Image src="/what.png" alt="Kosong" width={100} height={100} className="mb-4" />
        <p className="text-lg font-semibold mb-2">Waduh mohon maaf sepertinya gambar belum tersedia</p>
        <p className="text-sm text-gray-300">Silakan hubungi admin.</p>
      </section>
    )
  }

  return (
    <section className="relative w-full aspect-[16/9] overflow-hidden z-10">
      {/* Background Images */}
      {images.map((img, index) => (
        <Image
          key={img._id}
          src={img.url}
          alt={`Slide ${index + 1}`}
          fill
          className={`absolute object-cover transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-20 flex items-center justify-center text-center px-4 pb-12 md:pb-28">
        <div className="max-w-5xl">
          <p className="text-white text-xs md:text-2xl md:mb-4 mb-0 font-extrabold tracking-wide uppercase">
            Senat STTI Sony Sugema 2025
          </p>
          <h1 className="text-white text-3xl md:text-7xl font-extrabold">
            KABINET <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500 text-transparent bg-clip-text drop-shadow-md">
              TUNAS LANGIT
            </span>
          </h1>
          <p className="text-gray-200 md:mt-6 mt-0 text-sm md:text-lg px-4 md:px-0">
            Bergerak Bersama, Mewujudkan Dampak Nyata untuk Mahasiswa & Kampus
          </p>
          <a href="#about">
            <button className="mt-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 hover:brightness-110 text-white px-6 py-2 rounded-full text-sm md:text-base font-semibold shadow-lg transition duration-300 drop-shadow-md">
              Jelajahi Lebih Lanjut
            </button>
          </a>
        </div>
      </div>
    </section>
  )
}
