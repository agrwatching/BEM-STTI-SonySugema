"use client";

import { useEffect, useState } from "react";
import { Plus, X, Save, Ban } from "lucide-react";

type Proker = {
  _id?: string;
  nama: string;
  deskripsi: string;
  isEditing?: boolean;
  backup?: { nama: string; deskripsi: string };
};

type Divisi = {
  _id?: string;
  nama: string;
  proker: Proker[];
  isEditing?: boolean;
  backup?: { nama: string };
};

export default function DivisiProkerPage() {
  const [divisiList, setDivisiList] = useState<Divisi[]>([]);

  // Ambil data awal dari backend
  useEffect(() => {
    fetch("/api/divisi")
      .then((res) => res.json())
      .then((data) => setDivisiList(data))
      .catch((err) => console.error("Fetch divisi error:", err));
  }, []);

  // ===================== DIVISI =====================
  const tambahDivisi = async () => {
    const res = await fetch("/api/divisi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nama: "Divisi Baru" }),
    });
    const data = await res.json();
    setDivisiList((prev) => [...prev, data]);
  };

  const updateDivisi = (id: string, field: keyof Divisi, value: any) => {
    setDivisiList((prev) =>
      prev.map((d) => (d._id === id ? { ...d, [field]: value } : d))
    );
  };

  const saveDivisi = async (id: string) => {
    const divisi = divisiList.find((d) => d._id === id);
    if (!divisi) return;

    const res = await fetch(`/api/divisi/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nama: divisi.nama }),
    });
    const data = await res.json();

    setDivisiList((prev) =>
      prev.map((d) => (d._id === id ? { ...data, isEditing: false } : d))
    );
  };

  const cancelDivisi = (id: string) => {
    setDivisiList((prev) =>
      prev.map((d) =>
        d._id === id
          ? { ...d, isEditing: false, nama: d.backup?.nama || d.nama }
          : d
      )
    );
  };

  const deleteDivisi = async (id: string) => {
    await fetch(`/api/divisi/${id}`, { method: "DELETE" });
    setDivisiList((prev) => prev.filter((d) => d._id !== id));
  };

  // ===================== PROKER =====================
  const tambahProker = async (divisiId: string) => {
    const res = await fetch(`/api/divisi/${divisiId}/proker`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nama: "Judul Baru", deskripsi: "Deskripsi Baru" }),
    });
    const data = await res.json();

    setDivisiList((prev) =>
      prev.map((d) => (d._id === divisiId ? data : d))
    );
  };

  const updateProker = (
    divisiId: string,
    prokerId: string,
    field: keyof Proker,
    value: any
  ) => {
    setDivisiList((prev) =>
      prev.map((d) =>
        d._id === divisiId
          ? {
              ...d,
              proker: d.proker.map((p) =>
                p._id === prokerId ? { ...p, [field]: value } : p
              ),
            }
          : d
      )
    );
  };

  const saveProker = async (divisiId: string, prokerId: string) => {
    const divisi = divisiList.find((d) => d._id === divisiId);
    const proker = divisi?.proker.find((p) => p._id === prokerId);
    if (!proker) return;

    const res = await fetch(`/api/divisi/${divisiId}/proker`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prokerId,
        nama: proker.nama,
        deskripsi: proker.deskripsi,
      }),
    });
    const data = await res.json();

    setDivisiList((prev) =>
      prev.map((d) => (d._id === divisiId ? data : d))
    );
  };

  const cancelProker = (divisiId: string, prokerId: string) => {
    setDivisiList((prev) =>
      prev.map((d) =>
        d._id === divisiId
          ? {
              ...d,
              proker: d.proker.map((p) =>
                p._id === prokerId
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

  const deleteProker = async (divisiId: string, prokerId: string) => {
    const res = await fetch(`/api/divisi/${divisiId}/proker`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prokerId }),
    });
    const data = await res.json();

    setDivisiList((prev) =>
      prev.map((d) => (d._id === divisiId ? data : d))
    );
  };

  // ===================== RENDER =====================
  return (
    <div className="border rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-xl">Proker Tiap Divisi</h2>
        <button
          onClick={tambahDivisi}
          className="p-2 bg-blue-600 text-white rounded"
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="space-y-6">
        {divisiList.map((divisi) => (
          <div key={divisi._id} className="border rounded-md p-4 bg-gray-50">
            <div className="flex justify-between items-center mb-3">
              {divisi.isEditing ? (
                <input
                  className="font-semibold text-lg outline-none flex-1"
                  value={divisi.nama}
                  onChange={(e) =>
                    updateDivisi(divisi._id!, "nama", e.target.value)
                  }
                />
              ) : (
                <h3 className="font-semibold text-lg">{divisi.nama}</h3>
              )}

              <div className="flex gap-2 ml-2">
                {divisi.isEditing ? (
                  <>
                    <button
                      onClick={() => saveDivisi(divisi._id!)}
                      className="p-1 bg-green-500 rounded"
                    >
                      <Save size={16} className="text-white" />
                    </button>
                    <button
                      onClick={() => cancelDivisi(divisi._id!)}
                      className="p-1 bg-red-500 rounded"
                    >
                      <Ban size={16} className="text-white" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() =>
                      updateDivisi(divisi._id!, "isEditing", true as any)
                    }
                    className="p-1 bg-gray-200 rounded"
                  >
                    ✏️
                  </button>
                )}

                {/* Tambah Proker */}
                <button
                  onClick={() => tambahProker(divisi._id!)}
                  className="p-1 bg-blue-500 rounded"
                >
                  <Plus size={16} className="text-white" />
                </button>

                <button
                  onClick={() => deleteDivisi(divisi._id!)}
                  className="p-1 bg-red-500 rounded"
                >
                  <X size={16} className="text-white" />
                </button>
              </div>
            </div>

            {/* PROKER LIST */}
            <div className="space-y-3 pl-4 border-l">
              {divisi.proker.map((p) => (
                <div
                  key={p._id}
                  className="border rounded-md p-3 flex justify-between bg-white"
                >
                  <div className="flex-1">
                    {p.isEditing ? (
                      <>
                        <input
                          className="font-semibold w-full outline-none mb-1"
                          value={p.nama}
                          onChange={(e) =>
                            updateProker(divisi._id!, p._id!, "nama", e.target.value)
                          }
                        />
                        <textarea
                          className="text-sm w-full outline-none bg-transparent"
                          value={p.deskripsi}
                          onChange={(e) =>
                            updateProker(divisi._id!, p._id!, "deskripsi", e.target.value)
                          }
                        />
                      </>
                    ) : (
                      <>
                        <h4 className="font-semibold">{p.nama}</h4>
                        <p className="text-sm text-gray-600">{p.deskripsi}</p>
                      </>
                    )}
                  </div>

                  <div className="flex gap-2 ml-2">
                    {p.isEditing ? (
                      <>
                        <button
                          onClick={() => saveProker(divisi._id!, p._id!)}
                          className="w-8 h-8 flex items-center justify-center bg-green-500 rounded"
                        >
                          <Save size={16} className="text-white" />
                        </button>
                        <button
                          onClick={() => cancelProker(divisi._id!, p._id!)}
                          className="w-8 h-8 flex items-center justify-center bg-red-500 rounded"
                        >
                          <Ban size={16} className="text-white" />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() =>
                          updateProker(divisi._id!, p._id!, "isEditing", true as any)
                        }
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded"
                      >
                        ✏️
                      </button>
                    )}
                    <button
                      onClick={() => deleteProker(divisi._id!, p._id!)}
                      className="w-8 h-8 flex items-center justify-center bg-red-500 rounded"
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
    </div>
  );
}
