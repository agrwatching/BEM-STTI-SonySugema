// src/app/(dashboard)/dashboard/admin/proker/page.tsx
"use client";

import SenatProkerPage from "./inti/page";
import DivisiProkerPage from "./divisi/page";

export default function AdminProkerPage() {
  return (
    <div className="p-6 space-y-10">
      <h1 className="text-2xl font-bold">Management Proker</h1>
      <SenatProkerPage />
      <DivisiProkerPage />
    </div>
  );
}
