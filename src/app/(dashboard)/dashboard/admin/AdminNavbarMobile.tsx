"use client";

import Link from "next/link";
import { useState } from "react";

interface AdminNavbarMobileProps {
  onLogout: () => void;
}

export default function AdminNavbarMobile({ onLogout }: AdminNavbarMobileProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [berandaOpen, setBerandaOpen] = useState(false);

  const menus = [
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
    <>
      {/* Navbar Top */}
      <header className="fixed top-0 left-0 right-0 bg-gray-800 text-white flex justify-between items-center p-4 z-50">
        <div className="font-bold text-lg">Dashboard Admin</div>
        <button
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
          className="space-y-1.5"
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${
              menuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </button>
      </header>

      {/* Fullscreen Menu */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-95 text-white transform transition-transform duration-300 ease-in-out z-40 ${
          menuOpen ? "translate-y-0" : "-translate-y-full"
        } overflow-y-auto`}
      >
        <nav className="flex flex-col p-6 space-y-4 mt-16">
          <Link
            href="/dashboard/admin"
            onClick={() => setMenuOpen(false)}
            className="hover:bg-gray-700 rounded px-3 py-2 transition block"
          >
            Dashboard Admin
          </Link>

          <Link
            href="/dashboard/admin/users"
            onClick={() => setMenuOpen(false)}
            className="hover:bg-gray-700 rounded px-3 py-2 transition block"
          >
            Management User
          </Link>

          {/* Dropdown Management Beranda */}
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
                    onClick={() => setMenuOpen(false)}
                    className="hover:bg-gray-700 rounded px-3 py-1 transition block text-sm"
                  >
                    {submenu.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {menus
            .filter((menu) => menu.label !== "Management User")
            .map((menu) => (
              <Link
                key={menu.label}
                href={menu.href}
                onClick={() => setMenuOpen(false)}
                className="hover:bg-gray-700 rounded px-3 py-2 transition block"
              >
                {menu.label}
              </Link>
            ))}

          {/* Logout */}
          <button
            onClick={() => {
              onLogout();
              setMenuOpen(false);
            }}
            className="mt-8 w-full bg-red-600 hover:bg-red-700 transition rounded py-2"
          >
            Logout
          </button>
        </nav>
      </div>
    </>
  );
}
