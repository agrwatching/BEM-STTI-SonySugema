// src/app/(dashboard)/dashboard/admin/proker/inti/page.tsx
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

export default function SenatProkerPage() {
  const [senatProker, setSenatProker] = useState<Proker[]>([]);
  const [loading, setLoading] = useState(true);

  // state buat confirm delete
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [confirmText, setConfirmText] = useState("");

  // fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/proker?type=senat");
        const data = await res.json();
        // pastikan semua item dimulai dengan isEditing: false
        const cleanData = (data || []).map((p: Proker) => ({
          ...p,
          isEditing: false,
        }));
        setSenatProker(cleanData);
      } catch (err) {
        console.error("Gagal fetch proker senat:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // tambah
  const tambahSenatProker = async () => {
    const newProker: Proker = {
      nama: "Masukan judul",
      deskripsi: "Masukan deskripsi",
      isEditing: true,
      backup: { nama: "Masukan judul", deskripsi: "Masukan deskripsi" },
    };
    const res = await fetch("/api/proker", {
      method: "POST",
      body: JSON.stringify({ ...newProker, type: "senat" }),
    });
    const saved = await res.json();
    // tambahin ke state dengan isEditing true
    setSenatProker([...senatProker, { ...saved, isEditing: true }]);
  };

  // update di state
  const updateSenatProker = (id: string, field: keyof Proker, value: string) => {
    setSenatProker(
      senatProker.map((p) => (p._id === id ? { ...p, [field]: value } : p))
    );
  };

  // save ke db
  const saveSenatProker = async (id: string) => {
    const target = senatProker.find((p) => p._id === id);
    if (!target) return;
    await fetch(`/api/proker/${id}`, {
      method: "PUT",
      body: JSON.stringify(target),
    });
    setSenatProker(
      senatProker.map((p) =>
        p._id === id ? { ...p, isEditing: false, backup: { nama: p.nama, deskripsi: p.deskripsi } } : p
      )
    );
  };

  // cancel edit
  const cancelSenatProker = (id: string) => {
    setSenatProker(
      senatProker.map((p) =>
        p._id === id
          ? {
              ...p,
              isEditing: false,
              nama: p.backup?.nama || p.nama,
              deskripsi: p.backup?.deskripsi || p.deskripsi,
            }
          : p
      )
    );
  };

  // delete
  const deleteSenatProker = async (id: string) => {
    await fetch(`/api/proker/${id}`, { method: "DELETE" });
    setSenatProker(senatProker.filter((p) => p._id !== id));
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="border rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-xl">Proker Senat Mahasiswa</h2>
        <button
          onClick={tambahSenatProker}
          className="p-2 bg-blue-600 text-white rounded"
        >
          <Plus size={16} />
        </button>
      </div>
      <div className="space-y-4">
        {senatProker.map((p) => (
          <div
            key={p._id}
            className="border p-3 rounded-md bg-gray-50 flex justify-between items-start"
          >
            <div className="flex-1">
              {p.isEditing ? (
                <>
                  <input
                    className="w-full font-semibold outline-none mb-1"
                    value={p.nama}
                    onChange={(e) =>
                      updateSenatProker(p._id!, "nama", e.target.value)
                    }
                  />
                  <textarea
                    className="w-full text-sm outline-none bg-transparent"
                    value={p.deskripsi}
                    onChange={(e) =>
                      updateSenatProker(p._id!, "deskripsi", e.target.value)
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
                    onClick={() => saveSenatProker(p._id!)}
                    className="p-1 bg-green-500 rounded"
                  >
                    <Save size={16} className="text-white" />
                  </button>
                  <button
                    onClick={() => cancelSenatProker(p._id!)}
                    className="p-1 bg-red-500 rounded"
                  >
                    <Ban size={16} className="text-white" />
                  </button>
                </>
              ) : (
                <button
                  onClick={() =>
                    setSenatProker(
                      senatProker.map((item) =>
                        item._id === p._id
                          ? {
                              ...item,
                              isEditing: true,
                              backup: { nama: item.nama, deskripsi: item.deskripsi },
                            }
                          : item
                      )
                    )
                  }
                  className="p-1 bg-gray-200 rounded"
                >
                  ✏️
                </button>
              )}
              <button
                onClick={() => setConfirmId(p._id!)}
                className="p-1 bg-red-500 rounded"
              >
                <X size={16} className="text-white" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal confirm delete */}
      {confirmId && (
        <div
          onClick={() => setConfirmId(null)}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 rounded-lg shadow-md w-96"
          >
            <h3 className="font-semibold mb-2">
              Are you sure you want to delete this program?
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Please type <span className="font-bold">delete</span> below to
              confirm.
            </p>
            <input
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              className="w-full border p-2 rounded mb-4"
              placeholder="Type 'delete' here"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setConfirmId(null)}
                className="px-3 py-1 rounded bg-gray-200"
              >
                Cancel
              </button>
              <button
                disabled={confirmText !== "delete"}
                onClick={async () => {
                  await deleteSenatProker(confirmId);
                  setConfirmId(null);
                  setConfirmText("");
                }}
                className="px-3 py-1 rounded bg-red-500 text-white disabled:opacity-50"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
