// app/(public)/layout.tsx
import "@/app/globals.css";
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

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <Script
          src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"
          strategy="beforeInteractive"
        />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
