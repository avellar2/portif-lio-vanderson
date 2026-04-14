import { useState } from 'react'

export default function Navbar({ isScrolled }) {
  const [open, setOpen] = useState(false)
  const links = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'Sobre' },
    { href: '#skills', label: 'Skills' },
    { href: '#services', label: 'Serviços' },
    { href: '#projects', label: 'Projetos' },
    { href: '#contact', label: 'Contato' },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Share+Tech+Mono&display=swap');

        .cyber-nav-link {
          position: relative;
          font-family: 'Share Tech Mono', monospace;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .cyber-nav-link::before {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #00ffff, #ff00ff);
          transition: width 0.3s ease;
        }

        .cyber-nav-link:hover::before {
          width: 100%;
        }

        .cyber-nav-link:hover {
          color: #00ffff;
          text-shadow: 0 0 10px #00ffff;
        }

        .cyber-logo {
          font-family: 'Orbitron', sans-serif;
          font-weight: 700;
          background: linear-gradient(135deg, #00ffff, #ff00ff);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 30px rgba(0, 255, 255, 0.5);
        }

        .mobile-menu {
          backdrop-filter: blur(20px);
          background: rgba(0, 0, 0, 0.9);
          border: 1px solid rgba(0, 255, 255, 0.2);
        }

        .hamburger-line {
          transition: all 0.3s ease;
        }

        .hamburger-line:nth-child(1) {
          transform-origin: left center;
        }

        .hamburger-line:nth-child(3) {
          transform-origin: left center;
        }

        .hamburger-open .hamburger-line:nth-child(1) {
          transform: rotate(45deg) translate(2px, -2px);
        }

        .hamburger-open .hamburger-line:nth-child(2) {
          opacity: 0;
        }

        .hamburger-open .hamburger-line:nth-child(3) {
          transform: rotate(-45deg) translate(2px, 2px);
        }
      `}</style>

      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-xl border-b border-cyan-500/20' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <a href="#home" className="cyber-logo text-2xl tracking-tighter">
              VA.
            </a>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-6">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="cyber-nav-link text-gray-400 text-sm transition-all duration-300"
                >
                  {l.label}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden w-8 h-8 flex flex-col justify-center gap-1.5 ${open ? 'hamburger-open' : ''}`}
              onClick={() => setOpen(!open)}
            >
              <span className="hamburger-line w-full h-px bg-cyan-400" />
              <span className="hamburger-line w-3/4 h-px bg-cyan-400 ml-auto" />
              <span className="hamburger-line w-full h-px bg-cyan-400" />
            </button>
          </div>

          {/* Mobile Menu */}
          {open && (
            <div className="mobile-menu md:hidden rounded-lg mb-4 p-4 space-y-2">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block cyber-nav-link text-gray-400 text-sm py-2 px-4 hover:bg-cyan-500/10 rounded"
                >
                  {l.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>
    </>
  )
}
