// src/app/(dashboard)/dashboard/admin/settings/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AdminSidebar from '../Sidebar';

export default function SettingsAdmin() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ email: string; role: string } | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' });
        if (!res.ok) return router.push('/dashboard/login');

        const data = await res.json();
        if (data.role !== 'admin') return router.push('/dashboard/login');

        setUser(data);
      } catch {
        router.push('/dashboard/login');
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST', credentials: 'include' });
    router.push('/dashboard/login');
  };

  if (loading) return <p className="p-8">Loading...</p>;

  return (
    <div className="flex min-h-screen">
      <AdminSidebar onLogout={handleLogout} />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">Settings Admin ⚙️</h1>
        <p>Halaman ini untuk mengatur konfigurasi sistem.</p>
      </main>
    </div>
  );
}
