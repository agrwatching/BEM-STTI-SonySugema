"use client";

import { useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  X,
  GripVertical,
  Save,
  Ban,
} from "lucide-react";
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

export default function StrukturInti() {
  const [senatInti, setSenatInti] = useState<Anggota[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ nama: "", jabatan: "", foto: "" });

  // state untuk modal hapus
  const [deleteTarget, setDeleteTarget] = useState<Anggota | null>(null);

  // Tambah data baru
  const handleFotoChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setter(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nama || !form.jabatan) return;
    setSenatInti([
      ...senatInti,
      {
        id: Date.now().toString(),
        nama: form.nama,
        jabatan: form.jabatan,
        foto: form.foto,
      },
    ]);
    setForm({ nama: "", jabatan: "", foto: "" });
    setShowModal(false);
  };

  // Drag reorder
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newItems = Array.from(senatInti);
    const [moved] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, moved);

    setSenatInti(newItems);
  };

  // Edit mode
  const startEdit = (id: string) => {
    setSenatInti(
      senatInti.map((a) =>
        a.id === id
          ? {
              ...a,
              isEditing: true,
              backup: { nama: a.nama, jabatan: a.jabatan, foto: a.foto },
            }
          : a
      )
    );
  };

  const cancelEdit = (id: string) => {
    setSenatInti(
      senatInti.map((a) =>
        a.id === id
          ? {
              ...a.backup!,
              id: a.id,
              isEditing: false,
              backup: undefined,
            }
          : a
      )
    );
  };

  const saveEdit = (id: string) => {
    setSenatInti(
      senatInti.map((a) =>
        a.id === id ? { ...a, isEditing: false, backup: undefined } : a
      )
    );
  };

  const updateField = (id: string, field: keyof Anggota, value: string) => {
    setSenatInti(
      senatInti.map((a) =>
        a.id === id ? { ...a, [field]: value } : a
      )
    );
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      setSenatInti(senatInti.filter((a) => a.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-100 rounded-2xl shadow p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg sm:text-xl font-semibold">Struktur Inti</h2>
          <button
            className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition"
            onClick={() => setShowModal(true)}
          >
            <Plus size={16} /> Tambah
          </button>
        </div>

        {senatInti.length === 0 && (
          <p className="text-gray-500 text-sm">Belum ada data.</p>
        )}

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="senat-inti">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-2"
              >
                {senatInti.map((s, index) => (
                  <Draggable key={s.id} draggableId={s.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="flex items-center justify-between bg-white rounded-xl px-3 py-2 shadow"
                      >
                        <div className="flex items-center gap-3 w-full">
                          {s.isEditing ? (
                            <>
                              <input
                                type="file"
                                accept="image/*"
                                className="text-sm"
                                onChange={(e) =>
                                  handleFotoChange(e, (url) =>
                                    updateField(s.id, "foto", url)
                                  )
                                }
                              />
                              <input
                                type="text"
                                value={s.nama}
                                onChange={(e) =>
                                  updateField(s.id, "nama", e.target.value)
                                }
                                className="border rounded px-2 py-1 text-sm flex-1"
                              />
                              <input
                                type="text"
                                value={s.jabatan}
                                onChange={(e) =>
                                  updateField(s.id, "jabatan", e.target.value)
                                }
                                className="border rounded px-2 py-1 text-sm flex-1"
                              />
                            </>
                          ) : (
                            <>
                              {s.foto ? (
                                <img
                                  src={s.foto}
                                  alt={s.nama}
                                  className="w-10 h-10 rounded-full object-cover"
                                />
                              ) : (
                                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold uppercase">
                                  {s.nama[0]}
                                </div>
                              )}
                              <div>
                                <p className="font-medium">{s.nama}</p>
                                <p className="text-sm text-gray-500">
                                  {s.jabatan}
                                </p>
                              </div>
                            </>
                          )}
                        </div>

                        <div className="flex items-center gap-2 ml-4">
                          {s.isEditing ? (
                            <>
                              <button
                                className="p-2 rounded-lg hover:bg-gray-100 text-green-600"
                                onClick={() => saveEdit(s.id)}
                              >
                                <Save size={16} />
                              </button>
                              <button
                                className="p-2 rounded-lg hover:bg-gray-100 text-red-500"
                                onClick={() => cancelEdit(s.id)}
                              >
                                <Ban size={16} />
                              </button>
                            </>
                          ) : (
                            <button
                              className="p-2 rounded-lg hover:bg-gray-100"
                              onClick={() => startEdit(s.id)}
                            >
                              <Edit2 size={16} />
                            </button>
                          )}
                          <button
                            className="p-2 rounded-lg hover:bg-gray-100 text-red-500"
                            onClick={() => setDeleteTarget(s)}
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

      {/* Modal Tambah */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl shadow-lg w-96 p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShowModal(false)}
            >
              <X />
            </button>
            <h3 className="text-lg font-semibold mb-4">Form Tambah Anggota</h3>
            <form className="space-y-3" onSubmit={handleSubmit}>
              <div>
                <label className="text-sm text-gray-600">Foto Profil</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full text-sm mt-1 border rounded-lg p-2"
                  onChange={(e) =>
                    handleFotoChange(e, (url) => setForm({ ...form, foto: url }))
                  }
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Nama Lengkap</label>
                <input
                  type="text"
                  className="w-full border rounded-lg p-2 mt-1"
                  placeholder="Masukkan nama"
                  value={form.nama}
                  onChange={(e) =>
                    setForm({ ...form, nama: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Jabatan</label>
                <input
                  type="text"
                  className="w-full border rounded-lg p-2 mt-1"
                  placeholder="Masukkan jabatan"
                  value={form.jabatan}
                  onChange={(e) =>
                    setForm({ ...form, jabatan: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Hapus */}
      {deleteTarget && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl shadow-lg w-96 p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setDeleteTarget(null)}
            >
              <X />
            </button>
            <h3 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h3>
            <p className="text-gray-600 mb-6">
              Yakin ingin menghapus{" "}
              <span className="font-semibold">{deleteTarget.nama}</span>?
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
