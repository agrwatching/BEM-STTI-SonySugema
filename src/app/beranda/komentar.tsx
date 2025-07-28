// app/(beranda)/beranda/komentar.tsx
'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Komentar() {
  const { data: session, status } = useSession();
  const [komentar, setKomentar] = useState([]);
  const [isiKomentar, setIsiKomentar] = useState('');

  // Fetch komentar dari backend
  useEffect(() => {
    fetch('/api/komentar')
      .then(res => res.json())
      .then(data => setKomentar(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isiKomentar) return;

    const res = await fetch('/api/komentar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        komentar: isiKomentar,
      }),
    });

    if (res.ok) {
      const newKomentar = await res.json();
      setKomentar(prev => [newKomentar, ...prev]);
      setIsiKomentar('');
    }
  };

  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-black">Komentar</h2>

        {/* Form Komentar */}
        {status === 'authenticated' ? (
          <form onSubmit={handleSubmit} className="mb-8">
            <textarea
              className="w-full p-4 border rounded-lg shadow-sm"
              placeholder="Tulis komentar..."
              value={isiKomentar}
              onChange={(e) => setIsiKomentar(e.target.value)}
            />
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Kirim
            </button>
          </form>
        ) : (
          <div className="text-center mb-8">
            <p className="mb-2">Login untuk berkomentar</p>
            <button
              onClick={() => signIn('google')}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Login dengan Google
            </button>
          </div>
        )}

        {/* List Komentar */}
        <div className="space-y-6">
          {komentar.map((k, i) => (
            <div key={i} className="flex items-start gap-4 border-b pb-4">
              <Image
                src={k.image || '/default-avatar.png'}
                alt={k.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="font-semibold">{k.name}</p>
                <p className="text-sm text-gray-500">{new Date(k.createdAt).toLocaleString()}</p>
                <p className="mt-1 text-gray-800">{k.komentar}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
