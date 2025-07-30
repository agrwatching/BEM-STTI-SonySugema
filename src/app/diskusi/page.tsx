export default function DiskusiPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 text-center" style={{ backgroundColor: "#0a0f1c" }}>
      {/* Logo Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-10 text-[25vw] md:text-[15vw]">
        🚫
      </div>

      {/* Konten */}
      <div className="relative z-10 text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Halaman Diskusi</h1>
        <p className="text-lg md:text-xl text-white/80">
          Maaf, halaman ini masih dalam pengembangan.<br />
          Nantikan update-nya segera! 🚧
        </p>
      </div>
    </div>
  );
}
