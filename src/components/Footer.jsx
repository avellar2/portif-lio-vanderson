export default function Footer() {
  return (
    <footer className="py-10 border-t border-white/[0.03] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-lg font-display font-extrabold gradient-text-animated">VA.</span>
            <span className="text-gray-700 text-xs">|</span>
            <span className="text-gray-500 text-xs font-medium">Avellar Digital</span>
          </div>
          <p className="text-gray-700 text-xs">
            &copy; 2026 Avellar Digital. Feito com React + Vite + Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}
