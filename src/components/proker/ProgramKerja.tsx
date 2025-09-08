// src/components/proker/ProgramKerja.tsx
"use client";

import { useEffect, useState } from "react";

interface Proker {
  _id: string;
  nama: string;
  deskripsi: string;
}

interface Divisi {
  _id: string;
  nama: string;
  proker: Proker[];
}

export default function ProgramKerja() {
  const [prokerSenat, setProkerSenat] = useState<Proker[]>([]);
  const [divisiList, setDivisiList] = useState<Divisi[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [senatRes, divisiRes] = await Promise.all([
          fetch("/api/proker?type=senat"),
          fetch("/api/divisi"),
        ]);

        const senatData = await senatRes.json();
        const divisiData = await divisiRes.json();

        setProkerSenat(senatData || []);
        setDivisiList(divisiData || []);
      } catch (error) {
        console.error("Gagal fetch data proker:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="bg-[#0a0f1c] min-h-screen text-white flex items-center justify-center">
        <p className="text-gray-400">Memuat data program kerja...</p>
      </section>
    );
  }

  return (
    <section className="bg-[#0a0f1c] min-h-screen text-white py-16 px-4">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Program Kerja Senat */}
        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-12 text-center">
            Program Kerja Senat Mahasiswa
          </h2>
          {prokerSenat.length > 0 ? (
            <div className="grid gap-8">
              {prokerSenat.map((proker) => (
                <div
                  key={proker._id}
                  className="bg-white/10 border border-white/20 rounded-xl p-6 backdrop-blur-md shadow"
                >
                  <h3 className="text-lg md:text-xl font-semibold mb-2">
                    {proker.nama}
                  </h3>
                  <p className="text-white/80 text-sm md:text-lg">
                    {proker.deskripsi}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center">
              Belum ada program kerja inti.
            </p>
          )}
        </div>

        {/* Program Kerja Divisi */}
        <div>
          <h2 className="text-2xl md:text-4xl font-bold mb-10 text-center">
            Program Kerja Tiap Divisi
          </h2>
          {divisiList.length > 0 ? (
            <div className="space-y-12">
              {divisiList.map((divisi) => (
                <div key={divisi._id}>
                  <h3 className="text-xl md:text-2xl font-semibold mb-4 border-b border-white/30 pb-2">
                    {divisi.nama}
                  </h3>
                  {divisi.proker.length > 0 ? (
                    <div className="grid gap-6">
                      {divisi.proker.map((proker) => (
                        <div
                          key={proker._id}
                          className="bg-white/10 border border-white/20 rounded-xl p-4 backdrop-blur-md shadow"
                        >
                          <h4 className="text-lg md:text-xl font-semibold mb-1">
                            {proker.nama}
                          </h4>
                          <p className="text-white/80 text-sm md:text-lg">
                            {proker.deskripsi}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-sm">
                      Belum ada proker untuk divisi ini.
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center">
              Belum ada data divisi atau proker.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
