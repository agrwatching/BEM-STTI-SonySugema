'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function Hero() {
  return (
    <section className="relative z-10 group">
      <div className="relative w-full aspect-[16/9]">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
          className="w-full h-full"
        >
          <SwiperSlide>
            <Image
              src="/slide1.jpg"
              alt="Kegiatan 1"
              fill
              className="object-cover"
              priority
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/slide2.jpg"
              alt="Kegiatan 2"
              fill
              className="object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/slide3.jpg"
              alt="Kegiatan 3"
              fill
              className="object-cover"
            />
          </SwiperSlide>
        </Swiper>

        {/* Overlay text */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center px-4 z-0 pointer-events-none">
          <div>
            <h1 className="text-white text-4xl md:text-5xl font-bold">Selamat Datang</h1>
            <p className="text-white mt-3 text-lg md:text-xl">
              Website Resmi Senat Mahasiswa STTI Sony Sugema
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
