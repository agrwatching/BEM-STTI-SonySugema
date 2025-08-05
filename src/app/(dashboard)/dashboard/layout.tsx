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
    <html lang="id">
      <body className="min-h-screen bg-gray-100 text-gray-900 font-sans p-4">
        {/* Bisa tambahkan sidebar/topbar di sini */}
        <div className="max-w-6xl mx-auto">
          <header className="mb-6">
            <h1 className="text-2xl font-bold">Dashboard Admin</h1>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
