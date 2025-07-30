// src/app/page.tsx
'use client'

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
