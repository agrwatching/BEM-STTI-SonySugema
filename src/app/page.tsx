// src/app/page.tsx
export const metadata = {
  title: "Beranda | Senat Mahasiswa STTI Sony Sugema",
  description: "Selamat datang di website resmi Senat Mahasiswa STTI Sony Sugema. Temukan informasi terbaru seputar kegiatan dan organisasi kami.",
};

import Hero from './beranda/Hero'
import AboutSenat from './beranda/AboutSenat'
import Speech from './beranda/Speech'
import Komentar from './beranda/Komentar'

export default function Home() {
  return (
    <main className="min-h-screen bg-blue-50">
      <Hero />
      <AboutSenat />
      <Speech />
      <Komentar />
    </main>
  )
}
