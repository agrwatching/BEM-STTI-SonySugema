'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ReCAPTCHA from 'react-google-recaptcha';

export default function LoginPage() {
  const router = useRouter();
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // Inisialisasi state dengan string kosong (default)
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
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleLogin}
          className="bg-white p-6 rounded shadow-md w-full max-w-sm"
          aria-disabled={loading}
        >
          <h2 className="text-xl font-semibold mb-4">Halaman Login</h2>

          <input
            suppressHydrationWarning
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full mb-3 p-2 border border-gray-300 rounded"
            required
            disabled={loading || showErrorModal}
            autoComplete="username"
          />

          <input
            suppressHydrationWarning
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full mb-3 p-2 border border-gray-300 rounded"
            required
            disabled={loading || showErrorModal}
            autoComplete="current-password"
          />

          <div className="mb-3">
            <ReCAPTCHA
              key={loading ? 'loading' : 'normal'}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''}
              ref={recaptchaRef}
              theme="light"
              onExpired={() => recaptchaRef.current?.reset()}
            />
          </div>

          <button
            type="submit"
            disabled={loading || showErrorModal || !mounted}
            className={`w-full ${
              loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
            } text-white py-2 rounded`}
          >
            {mounted ? (loading ? 'Memproses...' : 'Login') : 'Loading...'}
          </button>
        </form>
      </div>

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
