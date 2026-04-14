import { useState, useEffect, useRef } from 'react'

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [glitchActive, setGlitchActive] = useState(false)
  const [currentTime, setCurrentTime] = useState('')
  const [currentWord, setCurrentWord] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const heroRef = useRef(null)
  const canvasRef = useRef(null)

  // Palavras que aparecem automaticamente
  const words = ['CONVERSÕES', 'LEADS', 'RESULTADOS', 'VENDAS', 'AGENDAMENTOS', 'SUCESSO']

  // Relógio digital
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  // Efeito de palavras que aparecem e somem
  useEffect(() => {
    const timeout = setTimeout(() => {
      const word = words[wordIndex]

      if (!isDeleting) {
        // Digitando
        setCurrentWord(word.substring(0, currentWord.length + 1))

        if (currentWord === word) {
          // Palavra completa, espera antes de apagar
          setIsDeleting(true)
        }
      } else {
        // Apagando
        setCurrentWord(word.substring(0, currentWord.length - 1))

        if (currentWord === '') {
          // Palavra apagada, vai para próxima
          setIsDeleting(false)
          setWordIndex((prev) => (prev + 1) % words.length)
        }
      }
    }, isDeleting ? 50 : 150)

    return () => clearTimeout(timeout)
  }, [currentWord, isDeleting, wordIndex])

  // Efeito glitch aleatório
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.95) {
        setGlitchActive(true)
        setTimeout(() => setGlitchActive(false), 200)
      }
    }, 3000)
    return () => clearInterval(glitchInterval)
  }, [])

  // Mouse move para tilt
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      setMousePos({
        x: (e.clientX - rect.left - rect.width / 2) / 25,
        y: (e.clientY - rect.top - rect.height / 2) / 25,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Matrix rain effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const chars = 'VANDERSONDEV010101'
    const fontSize = 14
    const columns = canvas.width / fontSize
    const drops = Array(Math.floor(columns)).fill(1)

    const drawMatrix = () => {
      ctx.fillStyle = 'rgba(6, 6, 14, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillStyle = Math.random() > 0.95 ? '#818cf8' : 'rgba(129, 140, 248, 0.3)'
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(drawMatrix, 50)

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleClick = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&display=swap');

        .hero-cyber {
          position: relative;
          overflow: hidden;
        }

        #matrix-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.15;
          z-index: 1;
          pointer-events: none;
        }

        .cyber-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(rgba(255, 0, 255, 0.02) 2px, transparent 2px),
            linear-gradient(90deg, rgba(255, 0, 255, 0.02) 2px, transparent 2px);
          background-size: 40px 40px, 40px 40px, 200px 200px, 200px 200px;
          animation: grid-scroll 20s linear infinite;
          z-index: 2;
          pointer-events: none;
        }

        @keyframes grid-scroll {
          0% { background-position: 0 0, 0 0, 0 0, 0 0; }
          100% { background-position: 40px 40px, 40px 40px, 200px 200px, 200px 200px; }
        }

        .cyber-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.4;
          animation: orb-pulse 10s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes orb-pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.2); opacity: 0.5; }
        }

        .glitch-text {
          position: relative;
        }

        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .glitch-text::before {
          color: #00ffff;
          animation: glitch-1 3s infinite linear alternate-reverse;
          clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
        }

        .glitch-text::after {
          color: #ff00ff;
          animation: glitch-2 2s infinite linear alternate-reverse;
          clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
        }

        @keyframes glitch-1 {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-3px, 3px); }
          40% { transform: translate(-3px, -3px); }
          60% { transform: translate(3px, 3px); }
          80% { transform: translate(3px, -3px); }
        }

        @keyframes glitch-2 {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(3px, -3px); }
          40% { transform: translate(3px, 3px); }
          60% { transform: translate(-3px, -3px); }
          80% { transform: translate(-3px, 3px); }
        }

        .glitch-active {
          animation: glitch-shake 0.2s ease-in-out;
        }

        @keyframes glitch-shake {
          0%, 100% { transform: translate(0); }
          25% { transform: translate(-5px, 5px); }
          50% { transform: translate(5px, -5px); }
          75% { transform: translate(-5px, -5px); }
        }

        .typing-text {
          overflow: hidden;
          white-space: nowrap;
          border-right: 3px solid #00ffff;
          animation: typing 3s steps(40) 1s forwards, blink 0.75s step-end infinite;
          width: 0;
        }

        @keyframes typing {
          0%, 100% { width: 0; }
          50% { width: 100%; }
        }

        @keyframes blink {
          50% { border-color: transparent; }
        }

        .typing-cursor {
          animation: cursor-blink 1s step-end infinite;
        }

        @keyframes cursor-blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        .holo-card {
          position: relative;
          background: linear-gradient(135deg, rgba(0, 255, 255, 0.05) 0%, rgba(255, 0, 255, 0.05) 100%);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(0, 255, 255, 0.2);
          border-radius: 20px;
          overflow: hidden;
        }

        .holo-card::before {
          content: '';
          position: absolute;
          inset: -50%;
          background: linear-gradient(
            45deg,
            transparent 30%,
            rgba(0, 255, 255, 0.1) 50%,
            transparent 70%
          );
          animation: holo-scan 3s linear infinite;
        }

        @keyframes holo-scan {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }

        .scanlines {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.1) 0px,
            rgba(0, 0, 0, 0.1) 1px,
            transparent 1px,
            transparent 3px
          );
          pointer-events: none;
          z-index: 100;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #00ffff;
          border-radius: 50%;
          box-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff;
          animation: particle-float 10s linear infinite;
          pointer-events: none;
        }

        @keyframes particle-float {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
        }

        .cyber-btn {
          position: relative;
          background: transparent;
          border: 2px solid #00ffff;
          color: #00ffff;
          font-family: 'Rajdhani', sans-serif;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          overflow: hidden;
          transition: all 0.3s;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .cyber-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.4), transparent);
          transition: left 0.5s;
        }

        .cyber-btn:hover::before {
          left: 100%;
        }

        .cyber-btn:hover {
          background: rgba(0, 255, 255, 0.1);
          box-shadow: 0 0 30px rgba(0, 255, 255, 0.5), inset 0 0 30px rgba(0, 255, 255, 0.1);
          text-shadow: 0 0 10px #00ffff;
        }

        .cyber-btn-secondary {
          border-color: #ff00ff;
          color: #ff00ff;
        }

        .cyber-btn-secondary:hover {
          background: rgba(255, 0, 255, 0.1);
          box-shadow: 0 0 30px rgba(255, 0, 255, 0.5), inset 0 0 30px rgba(255, 0, 255, 0.1);
          text-shadow: 0 0 10px #ff00ff;
        }

        .status-dot {
          position: relative;
        }

        .status-dot::before {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: #00ff00;
          opacity: 0.3;
          animation: status-pulse 2s ease-in-out infinite;
        }

        @keyframes status-pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.5); opacity: 0; }
        }

        .corner-deco {
          position: absolute;
          width: 30px;
          height: 30px;
          border: 2px solid #00ffff;
          opacity: 0.5;
        }

        .corner-deco.top-left {
          top: -2px;
          left: -2px;
          border-right: none;
          border-bottom: none;
        }

        .corner-deco.top-right {
          top: -2px;
          right: -2px;
          border-left: none;
          border-bottom: none;
        }

        .corner-deco.bottom-left {
          bottom: -2px;
          left: -2px;
          border-right: none;
          border-top: none;
        }

        .corner-deco.bottom-right {
          bottom: -2px;
          right: -2px;
          border-left: none;
          border-top: none;
        }

        .scroll-cyber {
          animation: scroll-pulse 2s ease-in-out infinite;
        }

        @keyframes scroll-pulse {
          0%, 100% { opacity: 0.5; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(10px); }
        }
      `}</style>

      <section ref={heroRef} className="hero-cyber min-h-screen relative flex items-center" style={{ background: '#06060e' }}>
        {/* Matrix Rain Canvas */}
        <canvas ref={canvasRef} id="matrix-canvas" />

        {/* Grid cyberpunk */}
        <div className="cyber-grid" />

        {/* Gradient orbs */}
        <div className="cyber-orb w-96 h-96 bg-cyan-500/20" style={{ top: '-10%', right: '10%' }} />
        <div className="cyber-orb w-80 h-80 bg-purple-500/20" style={{ bottom: '-10%', left: '10%', animationDelay: '-5s' }} />
        <div className="cyber-orb w-64 h-64 bg-pink-500/20" style={{ top: '40%', left: '30%', animationDelay: '-2s' }} />

        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
            }}
          />
        ))}

        {/* Scanlines overlay */}
        <div className="scanlines" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-50 w-full">
          <div className="flex flex-col lg:flex-row gap-12 items-center justify-center">

            {/* Content */}
            <div className="space-y-6 flex-1 lg:max-w-xl w-full">
              {/* Top bar */}
              <div className="flex items-center justify-between glass-strong rounded-xl px-4 py-3 border border-cyan-500/20">
                <div className="flex items-center gap-3">
                  <div className="status-dot w-3 h-3 bg-green-400 rounded-full" />
                  <span className="text-cyan-400 font-mono text-sm tracking-widest">SYSTEM ONLINE</span>
                </div>
                <span className="text-cyan-400/60 font-mono text-sm">{currentTime}</span>
              </div>

              {/* Title */}
              <div className={glitchActive ? 'glitch-active' : ''}>
                <p className="text-cyan-400/60 font-mono text-sm mb-4 tracking-widest">{"// DEVELOPER"}</p>
                <h1
                  className="glitch-text font-black text-white mb-2 leading-none tracking-tight"
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: 'clamp(2.5rem, 12vw, 4.5rem)',
                    wordBreak: 'break-word'
                  }}
                  data-text="VANDERSON"
                >
                  VANDERSON
                </h1>
                <p className="text-cyan-400 font-mono text-sm font-semibold">Landing Pages que triplicam agendamentos</p>
              </div>

              {/* Typing effect subtitle */}
              <div className="h-16 overflow-hidden">
                <p className="text-base md:text-lg text-gray-300 font-mono" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                  Crio Landing Pages que geram{' '}
                  <span className="text-cyan-400 font-bold">{currentWord}</span>
                  <span className="typing-cursor text-cyan-400">|</span>
                </p>
              </div>

              {/* Stats */}
              <div className="flex gap-6">
                <div className="holo-card p-3 text-center">
                  <p className="text-3xl font-bold text-cyan-400 font-mono">28</p>
                  <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Anos</p>
                </div>
                <div className="holo-card p-3 text-center">
                  <p className="text-3xl font-bold text-purple-400 font-mono">RJ</p>
                  <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Brasil</p>
                </div>
                <div className="holo-card p-3 text-center">
                  <p className="text-3xl font-bold text-pink-400 font-mono">100%</p>
                  <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Dedicação</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <a href="#projects" className="cyber-btn px-6 py-3 rounded-lg font-bold">
                  Ver Projetos Que Vendem
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/5521968410983"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyber-btn cyber-btn-secondary px-6 py-3 rounded-lg font-bold"
                >
                  Quero um Orçamento
                </a>
              </div>

              {/* Code decoration */}
              <div className="font-mono text-xs p-4 rounded-lg border border-gray-800 bg-black/30">
                <p className="text-green-400">// Stack Principal</p>
                <p><span className="text-purple-400">const</span> <span className="text-cyan-400">stack</span> = [</p>
                <p className="pl-4"><span className="text-yellow-400">'React'</span>, <span className="text-yellow-400">'Next.js'</span>, <span className="text-yellow-400">'TypeScript'</span>,</p>
                <p className="pl-4"><span className="text-yellow-400">'Node.js'</span>, <span className="text-yellow-400">'Tailwind'</span></p>
                <p>];</p>
              </div>
            </div>

            {/* Image */}
            <div className="relative flex justify-center items-center flex-1 max-w-lg">
              <div
                className="holo-card p-3 relative"
                style={{
                  transform: `perspective(1000px) rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)`,
                  transition: 'transform 0.1s ease-out',
                }}
              >
                {/* Corner decorations */}
                <div className="corner-deco top-left" />
                <div className="corner-deco top-right" />
                <div className="corner-deco bottom-left" />
                <div className="corner-deco bottom-right" />

                <img
                  src="/foto-transparente.png"
                  alt="Vanderson"
                  className="relative z-10 w-full h-auto"
                />

                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 holo-card px-4 py-2 rounded-lg" style={{ animation: 'orb-pulse 3s ease-in-out infinite' }}>
                  <p className="text-cyan-400 font-mono text-xs">v2.0.26</p>
                </div>

                <div className="absolute -bottom-4 -left-4 holo-card px-4 py-2 rounded-lg" style={{ animation: 'orb-pulse 3s ease-in-out infinite', animationDelay: '1s' }}>
                  <p className="text-pink-400 font-mono text-xs">FULL STACK</p>
                </div>
              </div>

              {/* Rotating rings */}
              <div className="absolute inset-0 border-2 border-cyan-500/10 rounded-full animate-spin pointer-events-none" style={{ animationDuration: '20s' }} />
              <div className="absolute inset-0 border-2 border-purple-500/10 rounded-full animate-spin pointer-events-none" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
            </div>

          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer scroll-cyber z-50" onClick={handleClick}>
          <p className="text-cyan-400/60 font-mono text-xs tracking-widest">SCROLL_DOWN</p>
          <div className="w-px h-12 bg-gradient-to-b from-cyan-400 to-transparent" />
        </div>
      </section>
    </>
  )
}
