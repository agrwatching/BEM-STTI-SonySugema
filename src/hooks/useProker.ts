// src/hooks/useProker.ts
import { useState, useEffect } from "react";

export interface Proker {
  _id?: string;
  type: "senat" | "divisi";
  divisiName?: string; // wajib kalau type divisi
  nama: string;
  deskripsi: string;
}

export function useProker(type?: string, divisiName?: string) {
  const [data, setData] = useState<Proker[]>([]);
  const [loading, setLoading] = useState(false);

  // GET data
  useEffect(() => {
    fetchData();
  }, [type, divisiName]);

  async function fetchData() {
    setLoading(true);
    let url = "/api/proker";
    const params = new URLSearchParams();
    if (type) params.append("type", type);
    if (divisiName) params.append("divisiName", divisiName);
    if (params.toString()) url += `?${params.toString()}`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Gagal fetch proker");
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }

  // CREATE
  async function createProker(newProker: Proker) {
    const res = await fetch("/api/proker", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProker),
    });
    const json = await res.json();
    setData([...data, json]);
  }

  // UPDATE
  async function updateProker(id: string, updates: Partial<Proker>) {
    const res = await fetch(`/api/proker/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    const json = await res.json();
    setData(data.map((p) => (p._id === id ? json : p)));
  }

  // DELETE
  async function deleteProker(id: string) {
    await fetch(`/api/proker/${id}`, { method: "DELETE" });
    setData(data.filter((p) => p._id !== id));
  }

  return { data, loading, createProker, updateProker, deleteProker, fetchData };
}
