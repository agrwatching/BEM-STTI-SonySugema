"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "./AdminSidebar";
import AdminNavbarMobile from "./AdminNavbarMobile";

type User = { email: string; role: string };

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        if (!res.ok) {
          router.replace("/dashboard/login");
          return;
        }

        const data: User = await res.json();
        if (data.role !== "admin") {
          router.replace("/dashboard/login");
          return;
        }

        setUser(data);
      } catch {
        router.replace("/dashboard/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST", credentials: "include" });
    router.replace("/dashboard/login");
  };

  // 🔹 Jangan render layout sebelum auth selesai
  if (loading) {
    return <p className="p-8">Loading...</p>;
  }

  // 🔹 Kalau gagal login / user null → jangan render apapun
  if (!user) {
    return null;
  }

  return (
    <div>
      {/* Sidebar desktop */}
      <div className="hidden md:block fixed top-0 left-0 h-screen z-50">
        <AdminSidebar onLogout={handleLogout} />
      </div>

      {/* Navbar mobile */}
      <div className="block md:hidden">
        <AdminNavbarMobile onLogout={handleLogout} />
      </div>

      {/* Konten utama */}
      <main className="pt-16 md:ml-64 p-6 bg-gray-50 min-h-screen">
        {children}
      </main>
    </div>
  );
}
