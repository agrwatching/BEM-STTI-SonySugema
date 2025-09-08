"use client";

import Link from "next/link";

interface SidebarProps {
  onLogout: () => void;
}

export default function SubadminSidebar({ onLogout }: SidebarProps) {
  const menus = [
    { label: "Dashboard Subadmin", href: "/dashboard/subadmin" },
    { label: "Management Proker", href: "/dashboard/subadmin/proker" },
    { label: "Settings", href: "/dashboard/subadmin/settings" },
  ];

  return (
    <aside className="w-64 h-screen bg-gray-800 text-white flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold p-4 border-b border-gray-700">
          SUBADMIN MENU
        </h2>
        <nav className="flex flex-col p-4 space-y-2 scrollbar-hide">
          {menus.map((menu) => (
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
