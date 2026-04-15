import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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

// Páginas de projetos
import LPOdontologia from './pages/lp-odontologia/LPOdontologia.jsx'
import LPAdvocacia from './pages/lp-advocacia/LPAdvocacia.jsx'
import SistemaCSDT from './pages/sistema-csdt/SistemaCSDT.jsx'
import LojaVirtual from './pages/loja-virtual/LojaVirtual.jsx'
import AppDelivery from './pages/app-delivery/AppDelivery.jsx'
import SistemaAgendamento from './pages/sistema-agendamento/SistemaAgendamento.jsx'
import CardapioDigital from './pages/cardapio-digital/CardapioDigital.jsx'
import PainelLPDentista from './pages/painel-lp-dentista/PainelLPDentista.jsx'

function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false)
  useScrollReveal()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <Navbar isScrolled={isScrolled} />
      <Hero />
      <Marquee />
      <About />
      <Skills />
      <Services />
      <Projects />
      <Contact />
      <Footer />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página principal */}
        <Route path="/" element={<HomePage />} />

        {/* Rotas dos projetos */}
        <Route path="/projeto/lp-odontologia" element={<LPOdontologia />} />
        <Route path="/projeto/lp-advocacia" element={<LPAdvocacia />} />
        <Route path="/projeto/sistema-csdt" element={<SistemaCSDT />} />
        <Route path="/projeto/loja-virtual" element={<LojaVirtual />} />
        <Route path="/projeto/app-delivery" element={<AppDelivery />} />
        <Route path="/projeto/sistema-agendamento" element={<SistemaAgendamento />} />
        <Route path="/projeto/cardapio-digital" element={<CardapioDigital />} />

        {/* Paineis Administrativos */}
        <Route path="/painel/lp-dentista" element={<PainelLPDentista />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
