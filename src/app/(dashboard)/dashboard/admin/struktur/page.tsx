// src/app/(dashboard)/dashboard/admin/struktur/page.tsx
"use client";

import StrukturInti from "./inti/page";
import StrukturDivisi from "./divisi/page";

export default function StrukturPage() {
  return (
    <div className="p-6 space-y-10">
      <h1 className="text-2xl font-bold">Management Struktur 🏛️</h1>
      <StrukturInti />
      <StrukturDivisi />
    </div>
  );
}