import { useCard3D } from '../hooks/useCard3D.jsx'

function PremiumCard({ children, className = '', delay = 0, onMouseMove, onMouseLeave }) {
  return (
    <div
      className={`premium-bento-card ${className}`}
      style={{ animationDelay: `${delay}ms` }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  )
}

export default function About() {
  const { handleCardMove, handleCardLeave } = useCard3D()

  const bind = (el) => ({
    onMouseMove: (e) => handleCardMove(e, el ?? e.currentTarget),
    onMouseLeave: (e) => handleCardLeave(el ?? e.currentTarget),
  })

  return (
    <section id="about" className="py-32 relative" style={{ background: '#06060e' }}>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-20">
          <p className="section-label mb-4">Sobre Mim</p>
          <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Transformo ideias em
            <br />
            <span className="stat-highlight text-6xl md:text-8xl" style={{
              background: 'linear-gradient(135deg, #818cf8, #a78bfa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>resultados digitais</span>
          </h2>
        </div>

        {/* Premium Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

          {/* Main Bio Card */}
          <PremiumCard className="col-span-2 md:col-span-2" delay={0} {...bind()}>
            <div className="flex items-start gap-4 mb-6">
              <div className="icon-wrapper w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                <span className="text-3xl">👋</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Prazer, Vanderson!</h3>
                <p className="text-gray-500 text-sm mt-1">Desenvolvedor Web & Criador de LPs</p>
              </div>
            </div>

            <p className="text-gray-400 leading-relaxed mb-4">
              Tenho <span className="stat-highlight text-lg" style={{
                background: 'linear-gradient(135deg, #818cf8, #a78bfa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>28 anos</span> e sou apaixonado por tecnologia.
              Formado em <span className="text-white font-medium">Análise e Desenvolvimento de Sistemas</span>.
            </p>

            <p className="text-gray-400 leading-relaxed">
              Especialista em desenvolver <span className="text-white font-medium">sistemas completos</span> para negócios locais.
              De landing pages a e-commerce, SaaS e apps de delivery — transformo ideias em <span className="text-white font-medium">soluções funcionais</span>.
            </p>
          </PremiumCard>

          {/* Age Card */}
          <PremiumCard className="flex flex-col items-center justify-center text-center" delay={100} {...bind()}>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-4">
              <span className="text-4xl">🎂</span>
            </div>
            <p className="text-5xl font-bold stat-highlight mb-2" style={{
              background: 'linear-gradient(135deg, #818cf8, #a78bfa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>28</p>
            <p className="text-gray-500 text-xs tracking-widest uppercase">Anos</p>
          </PremiumCard>

          {/* Location Card */}
          <PremiumCard className="flex flex-col items-center justify-center text-center" delay={200} {...bind()}>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center mb-4">
              <span className="text-4xl">📍</span>
            </div>
            <p className="text-xl font-bold text-white mb-1">Rio de Janeiro</p>
            <p className="text-gray-500 text-sm">Duque de Caxias</p>
          </PremiumCard>

          {/* Education Card */}
          <PremiumCard delay={300} {...bind()}>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-3xl">🎓</span>
              </div>
              <div>
                <p className="text-white font-semibold">Análise e Desenvolvimento</p>
                <p className="text-gray-500 text-sm">de Sistemas</p>
              </div>
            </div>
          </PremiumCard>

          {/* Region Card */}
          <PremiumCard className="flex flex-col items-center justify-center" delay={400} {...bind()}>
            <p className="text-6xl font-bold stat-highlight mb-2" style={{
              background: 'linear-gradient(135deg, #818cf8, #a78bfa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>RJ</p>
            <p className="text-gray-500 text-xs tracking-widest uppercase">Brasil 🇧🇷</p>
          </PremiumCard>

          {/* Focus Card */}
          <PremiumCard className="col-span-2" delay={500} {...bind()}>
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-3xl">🎯</span>
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold mb-1">Nichos Atendidos</p>
                <p className="text-gray-400 text-sm">Restaurantes, clínicas, lojas, escolas, serviços e mais</p>
              </div>
              <div className="text-green-400">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </PremiumCard>

          {/* Freelancer Card */}
          <PremiumCard className="col-span-2" delay={600} {...bind()}>
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-3xl">💼</span>
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold mb-1">Freelancer Disponível</p>
                <p className="text-gray-400 text-sm">Aceitando projetos — Baixada Fluminense e região</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 text-sm font-medium">Online</span>
              </div>
            </div>
          </PremiumCard>

          {/* Sistemas Card */}
          <PremiumCard className="col-span-2" delay={700} {...bind()}>
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-3xl">⚙️</span>
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold mb-1">Sistemas que já desenvolvi</p>
                <p className="text-gray-400 text-sm">SaaS escolar, e-commerce, delivery, agendamento, cardápio digital</p>
              </div>
            </div>
          </PremiumCard>

        </div>

        {/* Depoimentos */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            O que meus clientes dizem
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Dr. Carlos Mendes",
                role: "Odontologia",
                text: "Eu nem acreditava quando vi a agenda cheia. Antes eu ficava esperando o telefone tocar, agora os pacientes chegam pelo site. Ficou bem mais fácil organizar a rotina da clínica.",
              },
              {
                name: "Patrícia Costa",
                role: "Advocacia",
                text: "Sabe quando você tem aquele site que ninguém encontra? O Vanderson resolveu isso. Já recebi vários contatos de pessoas que realmente precisavam de um advogado, não era só curiosidade.",
              },
              {
                name: "Dr. Roberto Lima",
                role: "Clínica Médica",
                text: "O melhor foi o sistema de agendamento. As secretárias adoraram, e os pacientes também. Agora ninguém precisa ficar ligando fora do horário. Funciona de madrugada também, haha!",
              },
            ].map((depo, i) => (
              <div key={i} className="premium-bento-card p-6">
                <p className="text-gray-300 text-sm mb-4">"{depo.text}"</p>
                <div>
                  <p className="text-white font-semibold">{depo.name}</p>
                  <p className="text-cyan-400 text-xs">{depo.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
