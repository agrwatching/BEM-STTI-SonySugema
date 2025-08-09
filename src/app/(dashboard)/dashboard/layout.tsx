// src/app/(dashboard)/dashboard/layout.tsx
import "@/app/globals.css";

export const metadata = {
  title: "Dashboard | Senat STTI Sony Sugema",
  description: "Halaman dashboard untuk pengelolaan konten Senat STTI Sony Sugema",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">{children}</main>
  );
}
