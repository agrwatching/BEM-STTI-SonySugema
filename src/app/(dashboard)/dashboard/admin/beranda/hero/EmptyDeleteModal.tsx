"use client";

interface EmptyDeleteModalProps {
  onClose: () => void;
}

export default function EmptyDeleteModal({ onClose }: EmptyDeleteModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg flex items-center gap-4 p-6 max-w-md animate-fadeIn">
        <img src="/what.png" alt="Empty" className="w-20 h-20" />
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Belum ada data untuk dihapus
          </h2>
          <button
            onClick={onClose}
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Oke
          </button>
        </div>
      </div>

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
