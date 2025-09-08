// src/app/(dashboard)/dashboard/subadmin/proker/page.tsx
"use client";

import { useState } from "react";
import { Plus, Save, Ban, X } from "lucide-react";

type Proker = {
  id: number;
  nama: string;
  deskripsi: string;
  isEditing?: boolean;
  backup?: { nama: string; deskripsi: string };
};

type Divisi = {
  id: number;
  nama: string;
  prokers: Proker[];
};

export default function SubadminProkerPage() {
  const [divisi, setDivisi] = useState<Divisi[]>([
    {
      id: 1,
      nama: "Divisi Humas",
      prokers: [
        { id: 101, nama: "Publikasi Acara", deskripsi: "Mengatur publikasi event di sosial media" },
        { id: 102, nama: "Media Partner", deskripsi: "Menjalin kerja sama dengan media partner" },
      ],
    },
    {
      id: 2,
      nama: "Divisi Acara",
      prokers: [
        { id: 201, nama: "Seminar Nasional", deskripsi: "Mengadakan seminar tahunan tingkat nasional" },
        { id: 202, nama: "Malam Keakraban", deskripsi: "Acara untuk mempererat hubungan anggota" },
      ],
    },
  ]);

  // tambah divisi
  const tambahDivisi = () => {
    setDivisi([
      ...divisi,
      { id: Date.now(), nama: "Divisi Baru", prokers: [] },
    ]);
  };

  // tambah proker di divisi tertentu
  const tambahProker = (divisiId: number) => {
    setDivisi(
      divisi.map((d) =>
        d.id === divisiId
          ? {
              ...d,
              prokers: [
                ...d.prokers,
                {
                  id: Date.now(),
                  nama: "Judul Proker Baru",
                  deskripsi: "Deskripsi proker baru",
                },
              ],
            }
          : d
      )
    );
  };

  // update field proker
  const updateProker = (divisiId: number, prokerId: number, field: keyof Proker, value: string) => {
    setDivisi(
      divisi.map((d) =>
        d.id === divisiId
          ? {
              ...d,
              prokers: d.prokers.map((p) =>
                p.id === prokerId ? { ...p, [field]: value } : p
              ),
            }
          : d
      )
    );
  };

  // save edit
  const saveProker = (divisiId: number, prokerId: number) => {
    setDivisi(
      divisi.map((d) =>
        d.id === divisiId
          ? {
              ...d,
              prokers: d.prokers.map((p) =>
                p.id === prokerId ? { ...p, isEditing: false } : p
              ),
            }
          : d
      )
    );
  };

  // cancel edit
  const cancelProker = (divisiId: number, prokerId: number) => {
    setDivisi(
      divisi.map((d) =>
        d.id === divisiId
          ? {
              ...d,
              prokers: d.prokers.map((p) =>
                p.id === prokerId
                  ? {
                      ...p,
                      isEditing: false,
                      nama: p.backup?.nama || p.nama,
                      deskripsi: p.backup?.deskripsi || p.deskripsi,
                    }
                  : p
              ),
            }
          : d
      )
    );
  };

  // delete proker
  const deleteProker = (divisiId: number, prokerId: number) => {
    setDivisi(
      divisi.map((d) =>
        d.id === divisiId
          ? { ...d, prokers: d.prokers.filter((p) => p.id !== prokerId) }
          : d
      )
    );
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Management Proker Subadmin</h1>
        <button
          onClick={tambahDivisi}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          + Tambah Divisi
        </button>
      </div>

      {/* List Divisi */}
      {divisi.map((d) => (
        <div key={d.id} className="border rounded-xl shadow-sm">
          <div className="flex justify-between items-center bg-blue-600 text-white px-4 py-2 rounded-t-xl">
            <h2 className="font-semibold text-lg">{d.nama}</h2>
            <button
              onClick={() => tambahProker(d.id)}
              className="p-1 bg-white rounded"
            >
              <Plus size={16} className="text-blue-600" />
            </button>
          </div>

          <div className="p-4 space-y-4">
            {d.prokers.map((p) => (
              <div
                key={p.id}
                className="border p-3 rounded-md bg-gray-50 flex justify-between items-start"
              >
                <div className="flex-1">
                  {p.isEditing ? (
                    <>
                      <input
                        className="w-full font-semibold outline-none mb-1"
                        value={p.nama}
                        onChange={(e) =>
                          updateProker(d.id, p.id, "nama", e.target.value)
                        }
                      />
                      <textarea
                        className="w-full text-sm outline-none bg-transparent"
                        value={p.deskripsi}
                        onChange={(e) =>
                          updateProker(d.id, p.id, "deskripsi", e.target.value)
                        }
                      />
                    </>
                  ) : (
                    <>
                      <h3 className="font-semibold">{p.nama}</h3>
                      <p className="text-sm text-gray-600">{p.deskripsi}</p>
                    </>
                  )}
                </div>

                <div className="flex gap-2 ml-2">
                  {p.isEditing ? (
                    <>
                      <button
                        onClick={() => saveProker(d.id, p.id)}
                        className="p-1 bg-green-500 rounded"
                      >
                        <Save size={16} className="text-white" />
                      </button>
                      <button
                        onClick={() => cancelProker(d.id, p.id)}
                        className="p-1 bg-red-500 rounded"
                      >
                        <Ban size={16} className="text-white" />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() =>
                        updateProker(d.id, p.id, "isEditing", "true" as any)
                      }
                      className="p-1 bg-gray-200 rounded"
                    >
                      ✏️
                    </button>
                  )}
                  <button
                    onClick={() => deleteProker(d.id, p.id)}
                    className="p-1 bg-red-500 rounded"
                  >
                    <X size={16} className="text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
