interface HeroImage {
  _id?: string;
  url: string;
  name?: string;
}

interface Props {
  target: HeroImage;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmDeleteModal({ target, onClose, onConfirm }: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Konfirmasi</h2>
        <p className="mb-4">
          Yakin ingin menghapus {target.name || "gambar ini"}?
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
