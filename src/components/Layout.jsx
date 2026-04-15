import { Link } from 'react-router-dom'
import Navbar from './Navbar.jsx'

export default function Layout({ children, showBackButton = true }) {
  return (
    <div className="min-h-screen bg-black relative">
      {/* Aurora background layer */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div
          className="absolute -top-[30%] -left-[30%] w-[160%] h-[160%] aurora-gradient animate-aurora"
        />
      </div>

      {/* Grid pattern layer */}
      <div className="fixed inset-0 pointer-events-none bg-grid-lines" style={{ zIndex: 1 }} />

      {/* Noise texture layer */}
      <div className="fixed inset-0 pointer-events-none noise-texture opacity-60" style={{ zIndex: 2 }} />

      {/* Content */}
      <div className="relative" style={{ zIndex: 10 }}>
        <Navbar isScrolled={false} />

        {showBackButton && (
          <div className="max-w-7xl mx-auto px-4 pt-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Voltar para o portfolio
            </Link>
          </div>
        )}

        {children}
      </div>
    </div>
  )
}
