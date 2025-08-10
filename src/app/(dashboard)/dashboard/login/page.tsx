'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ReCAPTCHA from 'react-google-recaptcha';

export default function LoginPage() {
  const router = useRouter();
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const recaptchaValue = recaptchaRef.current?.getValue();
    if (!recaptchaValue) {
      setErrorMessage('Mohon verifikasi reCAPTCHA');
      setShowErrorModal(true);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, recaptchaValue }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setErrorMessage(data.message || 'Login gagal');
        setShowErrorModal(true);
        recaptchaRef.current?.reset();
        return;
      }

      if (data.redirect) {
        router.push(data.redirect);
      } else {
        setErrorMessage('Role tidak dikenali');
        setShowErrorModal(true);
        recaptchaRef.current?.reset();
      }
    } catch (err) {
      setLoading(false);
      setErrorMessage('Terjadi kesalahan koneksi');
      setShowErrorModal(true);
      recaptchaRef.current?.reset();
    }
  }

  return (
    <>
          <button
        type="button"
        onClick={() => router.back()}
        disabled={loading || showErrorModal}
        className="
          fixed top-4 left-4 z-50
          bg-gray-700 hover:bg-gray-800
          text-white px-4 py-2 rounded-md
          shadow-md
          transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-gray-500
          disabled:opacity-50 disabled:cursor-not-allowed
        "
        aria-label="Kembali ke halaman sebelumnya"
      >
        ← Kembali
      </button>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleLogin}
          className="bg-white shadow-md w-full max-w-sm border-t-4 border-blue-500 rounded-lg overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-center px-4 py-3">
            <img
              src="/logo_senat.png"
              alt="Logo Senat Mahasiswa"
              className="w-12 h-12 object-contain"
            />
            <div className="ml-3">
              <h1 className="text-2xl text-gray-800">Senat Mahasiswa</h1>
              <hr />
              <p className="text-xs text-gray-600">Suara Mahasiswa, Pilar Perubahan</p>
            </div>
          </div>
          <h2 className='text-center w-full pb-4 font-semibold text-gray-700 text-lg'>Kota Karawang</h2>
          {/* Garis separator */}
          <hr />

          {/* Tagline */}
          <div className="px-4 py-4">
            <h2 className="text-center text-sm text-gray-700 font-semibold">
              Halaman Login
            </h2>
          </div>

          {/* Input Email */}
{/* Input Email */}
<div className='px-4 mb-6'>
<div className="flex items-center mb-4 border border-gray-300 rounded overflow-hidden">
  <input
    suppressHydrationWarning
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="Email"
    className="flex-1 py-2 px-3"
    required
    disabled={loading || showErrorModal}
    autoComplete="username"
  />
  <div className="bg-gray-100 border-l border-gray-300 p-2">
    <img src="/user.png" alt="User Icon" className="w-5 h-5" />
  </div>
</div>
<div className="flex items-center mb-2 border border-gray-300 rounded overflow-hidden">
  <input
    suppressHydrationWarning
    type={showPassword ? "text" : "password"}
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Password"
    className="flex-1 py-2 px-3"
    required
    disabled={loading || showErrorModal}
    autoComplete="current-password"
  />
  <div className="bg-gray-100 border-l border-gray-300 p-2">
    <img src="/padlock.png" alt="Padlock Icon" className="w-5 h-5" />
  </div>
</div>

</div>

{/* Tampilkan kata sandi & Lupa password */}
<div className="flex items-center justify-between px-5 mb-4 text-sm">
  <label className="flex items-center gap-2">
    <input
      type="checkbox"
      checked={showPassword}
      onChange={() => setShowPassword(!showPassword)}
    />
    Tampilkan kata sandi
  </label>
  <a href="/forgot-password" className="text-blue-600 hover:underline">
    Lupa Kata Sandi?
  </a>
</div>


          {/* reCAPTCHA */}
          <div className="px-4 mb-4 flex items-center justify-center">
            <ReCAPTCHA
              key={loading ? 'loading' : 'normal'}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''}
              ref={recaptchaRef}
              theme="light"
              onExpired={() => recaptchaRef.current?.reset()}
            />
          </div>

          {/* Tombol */}
          <div className="px-4 pb-4">
            <button
              type="submit"
              disabled={loading || showErrorModal || !mounted}
              className={`w-full ${
                loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
              } text-white py-2 rounded`}
            >
              {mounted ? (loading ? 'Memproses...' : 'Masuk') : 'Loading...'}
            </button>
          </div>
        </form>
      </div>

      {/* Modal Error */}
      {showErrorModal && (
        <div
          role="alertdialog"
          aria-modal="true"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="bg-white rounded p-6 max-w-xs w-full text-center">
            <p className="text-red-600 font-semibold mb-4">{errorMessage}</p>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              onClick={() => setShowErrorModal(false)}
              autoFocus
              disabled={loading}
            >
              Oke
            </button>
          </div>
        </div>
      )}
    </>
  );
}
