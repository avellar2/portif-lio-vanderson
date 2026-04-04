import { useState, useEffect } from 'react'
import { useScrollReveal } from './hooks/useScrollReveal.js'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Services from './components/Services.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  useScrollReveal()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-surface relative">
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
        <Navbar isScrolled={isScrolled} />
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Services />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </div>
  )
}

export default App
