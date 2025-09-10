"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, X, GripVertical, Save, Ban } from "lucide-react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

type Anggota = {
  id: string;
  nama: string;
  jabatan: string;
  foto?: string;
  isEditing?: boolean;
  backup?: { nama: string; jabatan: string; foto?: string };
};

type Divisi = {
  id: string;
  nama: string;
  anggota: Anggota[];
  isEditing?: boolean;
  backup?: { nama: string };
};

export default function StrukturDivisi() {
  const [divisi, setDivisi] = useState<Divisi[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<{
    type: "divisi" | "anggota";
    divisiId: string;
    anggotaId?: string;
  } | null>(null);

  // ---- Tambah Divisi ----
  const tambahDivisi = () => {
    const newDiv: Divisi = {
      id: Date.now().toString(),
      nama: "Divisi Baru",
      anggota: [],
    };
    setDivisi([...divisi, newDiv]);
  };

  // ---- Edit Divisi ----
  const startEditDivisi = (id: string) => {
    setDivisi(
      divisi.map((d) =>
        d.id === id ? { ...d, isEditing: true, backup: { nama: d.nama } } : d
      )
    );
  };

  const cancelEditDivisi = (id: string) => {
    setDivisi(
      divisi.map((d) =>
        d.id === id && d.backup
          ? { ...d, nama: d.backup.nama, isEditing: false, backup: undefined }
          : d
      )
    );
  };

  const saveEditDivisi = (id: string) => {
    setDivisi(
      divisi.map((d) =>
        d.id === id ? { ...d, isEditing: false, backup: undefined } : d
      )
    );
  };

  const updateDivisiField = (id: string, value: string) => {
    setDivisi(divisi.map((d) => (d.id === id ? { ...d, nama: value } : d)));
  };

  // ---- Tambah Anggota ----
  const tambahAnggota = (divisiId: string) => {
    const newAnggota: Anggota = {
      id: Date.now().toString(),
      nama: "Nama Anggota",
      jabatan: "Jabatan",
    };
    setDivisi(
      divisi.map((d) =>
        d.id === divisiId ? { ...d, anggota: [...d.anggota, newAnggota] } : d
      )
    );
  };

  // ---- Edit Anggota ----
  const startEditAnggota = (divisiId: string, anggotaId: string) => {
    setDivisi(
      divisi.map((d) =>
        d.id === divisiId
          ? {
              ...d,
              anggota: d.anggota.map((a) =>
                a.id === anggotaId
                  ? {
                      ...a,
                      isEditing: true,
                      backup: {
                        nama: a.nama,
                        jabatan: a.jabatan,
                        foto: a.foto,
                      },
                    }
                  : a
              ),
            }
          : d
      )
    );
  };

  const cancelEditAnggota = (divisiId: string, anggotaId: string) => {
    setDivisi(
      divisi.map((d) =>
        d.id === divisiId
          ? {
              ...d,
              anggota: d.anggota.map((a) =>
                a.id === anggotaId && a.backup
                  ? {
                      ...a,
                      nama: a.backup.nama,
                      jabatan: a.backup.jabatan,
                      foto: a.backup.foto,
                      isEditing: false,
                      backup: undefined,
                    }
                  : a
              ),
            }
          : d
      )
    );
  };

  const saveEditAnggota = (divisiId: string, anggotaId: string) => {
    setDivisi(
      divisi.map((d) =>
        d.id === divisiId
          ? {
              ...d,
              anggota: d.anggota.map((a) =>
                a.id === anggotaId
                  ? { ...a, isEditing: false, backup: undefined }
                  : a
              ),
            }
          : d
      )
    );
  };

  const updateAnggotaField = (
    divisiId: string,
    anggotaId: string,
    field: keyof Anggota,
    value: string
  ) => {
    setDivisi(
      divisi.map((d) =>
        d.id === divisiId
          ? {
              ...d,
              anggota: d.anggota.map((a) =>
                a.id === anggotaId ? { ...a, [field]: value } : a
              ),
            }
          : d
      )
    );
  };

  const handleFotoChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    divisiId: string,
    anggotaId: string
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      updateAnggotaField(divisiId, anggotaId, "foto", url);
    }
  };

  // ---- Drag & Drop Anggota ----
  const handleDragEnd = (result: DropResult, divisiId: string) => {
    if (!result.destination) return; // ✅ aman

    setDivisi((prev) =>
      prev.map((d) => {
        if (d.id !== divisiId) return d;

        const newAnggota = Array.from(d.anggota);
        const [moved] = newAnggota.splice(result.source.index, 1);
        newAnggota.splice(result.destination!.index, 0, moved);

        return { ...d, anggota: newAnggota };
      })
    );
  };

  // ---- Konfirmasi Hapus ----
  const confirmDelete = () => {
    if (!deleteTarget) return;

    if (deleteTarget.type === "divisi") {
      setDivisi(divisi.filter((d) => d.id !== deleteTarget.divisiId));
    } else if (deleteTarget.type === "anggota" && deleteTarget.anggotaId) {
      setDivisi(
        divisi.map((d) =>
          d.id === deleteTarget.divisiId
            ? {
                ...d,
                anggota: d.anggota.filter(
                  (a) => a.id !== deleteTarget.anggotaId
                ),
              }
            : d
        )
      );
    }

    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6 bg-blue-100 rounded-lg p-4 sm:p-6 shadow">
      {/* Header Struktur Divisi */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-lg sm:text-xl font-semibold">Struktur Divisi</h2>
        <button
          className="flex items-center justify-center gap-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 text-sm sm:text-base"
          onClick={tambahDivisi}
        >
          <Plus size={16} /> Tambah Divisi
        </button>
      </div>

      {divisi.length === 0 && (
        <p className="text-gray-500 text-sm">Belum ada divisi.</p>
      )}

      {divisi.map((d) => (
        <div
          key={d.id}
          className="bg-white rounded-2xl shadow p-4 space-y-4 overflow-hidden"
        >
          {/* Header Divisi */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            {d.isEditing ? (
              <input
                type="text"
                value={d.nama}
                onChange={(e) => updateDivisiField(d.id, e.target.value)}
                className="border rounded px-2 py-1 text-sm flex-1"
              />
            ) : (
              <h3 className="text-base sm:text-lg font-semibold">{d.nama}</h3>
            )}

            <div className="flex flex-wrap items-center gap-2">
              {d.isEditing ? (
                <>
                  <button
                    className="p-2 rounded-lg hover:bg-gray-100 text-green-600"
                    onClick={() => saveEditDivisi(d.id)}
                  >
                    <Save size={16} />
                  </button>
                  <button
                    className="p-2 rounded-lg hover:bg-gray-100 text-red-500"
                    onClick={() => cancelEditDivisi(d.id)}
                  >
                    <Ban size={16} />
                  </button>
                </>
              ) : (
                <button
                  className="p-2 rounded-lg hover:bg-gray-100"
                  onClick={() => startEditDivisi(d.id)}
                >
                  <Edit2 size={16} />
                </button>
              )}
              <button
                className="p-2 rounded-lg hover:bg-gray-100 text-blue-600"
                onClick={() => tambahAnggota(d.id)}
              >
                <Plus size={16} />
              </button>
              <button
                className="p-2 rounded-lg hover:bg-gray-100 text-red-500"
                onClick={() =>
                  setDeleteTarget({ type: "divisi", divisiId: d.id })
                }
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          {/* Anggota List */}
          <DragDropContext onDragEnd={(result) => handleDragEnd(result, d.id)}>
            <Droppable droppableId={`divisi-${d.id}`}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-2"
                >
                  {d.anggota.map((a, index) => (
                    <Draggable key={a.id} draggableId={a.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="bg-white rounded-xl px-3 py-2 shadow space-y-2"
                        >
                          {/* Baris 1: Foto + input/nama */}
                          {a.isEditing ? (
                            <div className="flex flex-col sm:flex-row gap-2">
                              <input
                                type="file"
                                accept="image/*"
                                className="text-sm"
                                onChange={(e) =>
                                  handleFotoChange(e, d.id, a.id)
                                }
                              />
                              <input
                                type="text"
                                value={a.nama}
                                onChange={(e) =>
                                  updateAnggotaField(
                                    d.id,
                                    a.id,
                                    "nama",
                                    e.target.value
                                  )
                                }
                                className="border rounded px-2 py-1 text-sm flex-1"
                              />
                              <input
                                type="text"
                                value={a.jabatan}
                                onChange={(e) =>
                                  updateAnggotaField(
                                    d.id,
                                    a.id,
                                    "jabatan",
                                    e.target.value
                                  )
                                }
                                className="border rounded px-2 py-1 text-sm flex-1"
                              />
                            </div>
                          ) : (
                            <div className="flex items-center gap-3">
                              {a.foto ? (
                                <img
                                  src={a.foto}
                                  alt={a.nama}
                                  className="w-10 h-10 rounded-full object-cover"
                                />
                              ) : (
                                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold uppercase">
                                  {a.nama[0]}
                                </div>
                              )}
                              <div>
                                <p className="font-medium">{a.nama}</p>
                                <p className="text-sm text-gray-500">
                                  {a.jabatan}
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Baris 2: Tombol aksi */}
                          <div className="flex items-center justify-end gap-2">
                            {a.isEditing ? (
                              <>
                                <button
                                  className="p-2 rounded-lg hover:bg-gray-100 text-green-600"
                                  onClick={() => saveEditAnggota(d.id, a.id)}
                                >
                                  <Save size={16} />
                                </button>
                                <button
                                  className="p-2 rounded-lg hover:bg-gray-100 text-red-500"
                                  onClick={() => cancelEditAnggota(d.id, a.id)}
                                >
                                  <Ban size={16} />
                                </button>
                              </>
                            ) : (
                              <button
                                className="p-2 rounded-lg hover:bg-gray-100"
                                onClick={() => startEditAnggota(d.id, a.id)}
                              >
                                <Edit2 size={16} />
                              </button>
                            )}
                            <button
                              className="p-2 rounded-lg hover:bg-gray-100 text-red-500"
                              onClick={() =>
                                setDeleteTarget({
                                  type: "anggota",
                                  divisiId: d.id,
                                  anggotaId: a.id,
                                })
                              }
                            >
                              <Trash2 size={16} />
                            </button>
                            <div
                              {...provided.dragHandleProps}
                              className="cursor-grab text-gray-500"
                            >
                              <GripVertical size={18} />
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      ))}

      {/* Modal Hapus */}
      {deleteTarget && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setDeleteTarget(null)}
            >
              <X />
            </button>
            <h3 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h3>
            <p className="text-gray-600 mb-6">
              Yakin ingin menghapus{" "}
              <span className="font-semibold">
                {deleteTarget.type === "divisi"
                  ? divisi.find((d) => d.id === deleteTarget.divisiId)?.nama
                  : divisi
                      .find((d) => d.id === deleteTarget.divisiId)
                      ?.anggota.find((a) => a.id === deleteTarget.anggotaId)
                      ?.nama}
              </span>
              ?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
