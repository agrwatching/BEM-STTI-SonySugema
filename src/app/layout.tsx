// app/layout.tsx
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";

export const metadata = {
  title: "Senat STTI Sony Sugema",
  description: "Website resmi Badan Eksekutif Mahasiswa STTI Sony Sugema",
  icons: {
    icon: "/logo_senat.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="antialiased bg-white text-gray-900 font-sans min-h-screen flex flex-col">
        {/* Tambahkan Script di sini */}
        <Script
          src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"
          strategy="beforeInteractive"
        />
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}
