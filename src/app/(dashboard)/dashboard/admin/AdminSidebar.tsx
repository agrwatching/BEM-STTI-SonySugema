"use client";

import Link from "next/link";
import { useState } from "react";

interface SidebarProps {
  onLogout: () => void;
}

export default function AdminSidebar({ onLogout }: SidebarProps) {
  const [berandaOpen, setBerandaOpen] = useState(false);

  const menus = [
    { label: "Dashboard Admin", href: "/dashboard/admin" },
    { label: "Management User", href: "/dashboard/admin/users" },
    { label: "Management Struktur", href: "/dashboard/admin/struktur" },
    { label: "Management Proker", href: "/dashboard/admin/proker" },
    { label: "Management Galeri", href: "/dashboard/admin/galeri" },
    { label: "Management Artikel", href: "/dashboard/admin/artikel" },
    { label: "Settings", href: "/dashboard/admin/settings" },
  ];

  const berandaSubmenus = [
    { label: "Hero", href: "/dashboard/admin/beranda/hero" },
    { label: "Tentang Senat", href: "/dashboard/admin/beranda/tentang" },
    { label: "Visi", href: "/dashboard/admin/beranda/visi" },
    { label: "Misi", href: "/dashboard/admin/beranda/misi" },
    { label: "Sambutan", href: "/dashboard/admin/beranda/sambutan" },
    { label: "Komentar", href: "/dashboard/admin/beranda/komentar" },
  ];

  return (
    <aside className="w-64 h-screen bg-gray-800 text-white flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold p-4 border-b border-gray-700">
          ADMIN MENU
        </h2>
        <nav className="flex flex-col p-4 space-y-2">
          {/* Dashboard Admin */}
          <Link
            key="Dashboard Admin"
            href="/dashboard/admin"
            className="hover:bg-gray-700 rounded px-3 py-2 transition block"
          >
            Dashboard Admin
          </Link>

          {/* Management User */}
          <Link
            key="Management User"
            href="/dashboard/admin/users"
            className="hover:bg-gray-700 rounded px-3 py-2 transition block"
          >
            Management User
          </Link>

          {/* Management Beranda (Dropdown) */}
          <div>
            <button
              onClick={() => setBerandaOpen(!berandaOpen)}
              className="w-full text-left hover:bg-gray-700 rounded px-3 py-2 transition flex justify-between items-center"
            >
              <span>Management Beranda</span>
              <span>{berandaOpen ? "▲" : "▼"}</span>
            </button>
            {berandaOpen && (
              <div className="ml-4 mt-1 flex flex-col space-y-1">
                {berandaSubmenus.map((submenu) => (
                  <Link
                    key={submenu.label}
                    href={submenu.href}
                    className="hover:bg-gray-700 rounded px-3 py-1 transition block text-sm"
                  >
                    {submenu.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Menu lain setelah Beranda */}
          {menus
            .filter(
              (menu) =>
                menu.label !== "Dashboard Admin" &&
                menu.label !== "Management User"
            )
            .map((menu) => (
              <Link
                key={menu.label}
                href={menu.href}
                className="hover:bg-gray-700 rounded px-3 py-2 transition block"
              >
                {menu.label}
              </Link>
            ))}
        </nav>
      </div>
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={onLogout}
          className="w-full bg-red-600 hover:bg-red-700 transition rounded py-2"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
