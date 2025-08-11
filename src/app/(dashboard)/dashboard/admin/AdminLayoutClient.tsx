"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "./AdminSidebar";
import AdminNavbarMobile from "./AdminNavbarMobile";

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ email: string; role: string } | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        if (!res.ok) return router.push("/dashboard/login");

        const data = await res.json();
        if (data.role !== "admin") return router.push("/dashboard/login");

        setUser(data);
      } catch {
        router.push("/dashboard/login");
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST", credentials: "include" });
    router.push("/dashboard/login");
  };

  if (loading) return <p className="p-8">Loading...</p>;

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
      <main className="pt-16 md:ml-64 p-6 bg-gray-50 min-h-screen">{children}</main>
    </div>
  );
}
