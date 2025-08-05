// app/(public)/layout.tsx
import "@/app/globals.css";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";

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
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
