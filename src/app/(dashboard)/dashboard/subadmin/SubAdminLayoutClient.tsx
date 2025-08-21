"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SubadminSidebar from "./SubadminSidebar";
import SubadminNavbarMobile from "./SubadminNavbarMobile";

type User = { email: string; role: string };

export default function SubAdminLayoutClient({
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
        if (data.role !== "subadmin") {
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
        <SubadminSidebar onLogout={handleLogout} />
      </div>

      {/* Navbar mobile */}
      <div className="block md:hidden">
        <SubadminNavbarMobile onLogout={handleLogout} />
      </div>

      {/* Main content */}
      <main className="pt-16 md:ml-64 p-6 bg-gray-50 min-h-screen">
        {children}
      </main>
    </div>
  );
}
