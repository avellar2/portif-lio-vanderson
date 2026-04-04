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
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-[#06060e]/60 backdrop-blur-2xl border-b border-white/[0.04]' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="#home" className="text-xl font-display font-extrabold gradient-text-animated tracking-tight">
            VA.
          </a>
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-gray-500 hover:text-white transition-all duration-300 font-medium text-sm px-4 py-2 rounded-xl hover:bg-white/[0.04] relative group"
              >
                {l.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-2/3 transition-all duration-300" />
              </a>
            ))}
          </div>
          <button className="md:hidden text-gray-400 hover:text-white p-2" onClick={() => setOpen(!open)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
        {open && (
          <div className="md:hidden glass-strong rounded-2xl mb-4 p-3 space-y-1">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block text-gray-400 hover:text-white hover:bg-white/[0.06] px-4 py-3 rounded-xl transition-all font-medium text-sm">{l.label}</a>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
