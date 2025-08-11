"use client";

import Link from "next/link";
import { useState } from "react";

interface AdminNavbarMobileProps {
  onLogout: () => void;
}

export default function SubadminNavbarMobile({ onLogout }: AdminNavbarMobileProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const menus = [
    { label: "Dashboard Subadmin", href: "/dashboard/subadmin" },
    { label: "Management Proker", href: "/dashboard/subadmin/proker" },
    { label: "Settings", href: "/dashboard/subadmin/settings" },
  ];

  return (
    <>
      {/* Navbar Top */}
      <header className="fixed top-0 left-0 right-0 bg-gray-800 text-white flex justify-between items-center p-4 z-50">
        <div className="font-bold text-lg">Dashboard Subadmin</div>
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
          {menus.map((menu) => (
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
