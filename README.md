# 🎓 Website Resmi BEM STTI Sony Sugema

![Next.js](https://img.shields.io/badge/Next.js-13+-000?logo=nextdotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000?logo=vercel)
![Made with 💙](https://img.shields.io/badge/Made%20with-%F0%9F%92%99-blue)

> **Suara Mahasiswa, Pilar Perubahan**  
> Situs resmi Badan Eksekutif Mahasiswa STTI Sony Sugema untuk informasi program kerja dan kegiatan kampus.

---

## 🚀 Fitur Utama

- 🎯 **Landing Page Informatif**  
  Desain bersih dan responsif, memuat informasi seputar BEM.

- 🧭 **Navigasi Dinamis**  
  Navbar + Footer dengan struktur modular yang mudah diatur.

- 🧾 **Halaman Program Kerja (Proker)**  
  Menampilkan program kerja berdasarkan divisi.

- 🔐 **Dashboard Admin**  
  Login aman dan panel CRUD untuk kelola konten slider & proker.

- 🌐 **SEO Friendly**  
  Menggunakan Next.js agar mudah terindeks oleh mesin pencari.

- ☁️ **Deployment ke Vercel**  
  Hosting frontend dan backend sekaligus.

---

## 🛠️ Teknologi yang Digunakan

| Teknologi         | Deskripsi                                   |
|-------------------|----------------------------------------------|
| **Next.js 13+**   | Framework React dengan App Router            |
| **MongoDB Atlas** | Cloud database NoSQL untuk menyimpan data    |
| **Tailwind CSS**  | CSS modern berbasis utility class            |
| **Mongoose**      | ODM untuk berinteraksi dengan MongoDB        |
| **Next Auth / JWT**| Autentikasi admin yang aman dan fleksibel   |

---

## 🧱 Struktur Folder (Singkat)

```
/app
  ├─ layout.tsx          # Root layout (navbar & footer)
  ├─ page.tsx            # Landing page
  └─ dashboard/          # Halaman admin

/components
  ├─ Navbar.tsx
  ├─ Footer.tsx
  └─ beranda/            # Section-section terpisah

/lib
  └─ db.ts               # Koneksi MongoDB

/public
  └─ logo_senat.png, logo_stti.png

.env.local
```

---

## 🖼️ Tampilan Website

### 💻 Desktop View
![Desktop View](https://via.placeholder.com/900x400?text=Tampilan+Desktop)

### 📱 Mobile View
![Mobile View](https://via.placeholder.com/400x700?text=Tampilan+Mobile)

---

## 🚧 Roadmap

- [ ] 🎞️ Slider dinamis di halaman utama
- [ ] 🗂️ CRUD Proker per divisi
- [ ] 📊 Statistik kegiatan mahasiswa
- [ ] 🔐 Multi-role Admin (superadmin / editor)
- [ ] 🌗 Mode Gelap & Terang

---

## 📦 Instalasi Lokal

```bash
# 1. Clone repo ini
git clone https://github.com/username/nama-repo.git

# 2. Masuk ke direktori project
cd nama-repo

# 3. Install dependencies
npm install

# 4. Buat file .env.local dan isi variabel yang dibutuhkan
cp .env.example .env.local

# 5. Jalankan project di localhost
npm run dev
```

> 📌 Pastikan kamu sudah mengatur variabel lingkungan seperti `MONGODB_URI`, `JWT_SECRET`, dan lainnya di file `.env.local`

---

## 🔒 Autentikasi Admin

- Menggunakan **NextAuth.js** atau **JWT**
- Hanya admin yang bisa login & mengakses dashboard
- Admin bisa mengelola konten proker dan slider

---

## 🚀 Deployment

Website ini di-deploy menggunakan [Vercel](https://vercel.com), dengan backend MongoDB di MongoDB Atlas.

---

## 📄 Lisensi

MIT © 2025 — STTI Sony Sugema  
Website ini dikembangkan oleh tim BEM STTI SS dengan ❤️

---

> _“Bersama Mahasiswa, Kita Bangun Masa Depan!”_ 🇮🇩
