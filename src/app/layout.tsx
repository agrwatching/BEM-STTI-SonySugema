import type { Metadata } from "next";
import "./globals.css";
import Head from "next/head";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
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
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="antialiased bg-white text-gray-900 font-sans min-h-screen flex flex-col">
        <Navbar />
        {/* Konten utama harus grow supaya dorong footer ke bawah */}
        <main className="flex-grow">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
