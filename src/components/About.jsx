import { useCard3D } from '../hooks/useCard3D.jsx'

function BentoCard({ children, className = '', onMouseMove, onMouseLeave }) {
  return (
    <div
      className={`glass rounded-3xl card-3d bento-glow ${className}`}
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
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold reveal-item">
            <span className="gradient-text-animated">Sobre Mim</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-5">

          {/* Bio — 2 cols */}
          <BentoCard
            className="col-span-2 p-7 md:p-8 reveal-item"
            {...bind()}
          >
            <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-5 flex items-center gap-3">
              <span className="text-2xl">👋</span> Prazer!
            </h3>
            <p className="text-base text-gray-300 leading-relaxed mb-4">
              Tenho <span className="font-bold text-indigo-400">28 anos</span> e sou <span className="font-bold text-indigo-400">carioca</span>.
              Formado em <span className="font-bold text-purple-400">Analise e Desenvolvimento de Sistemas</span> e verdadeiro
              <span className="font-bold text-pink-400"> amante de tecnologia</span>.
            </p>
            <p className="text-base text-gray-300 leading-relaxed">
              Sou <span className="font-bold text-indigo-400">desenvolvedor web freelancer</span> especializado em criar
              <span className="font-bold text-purple-400"> Landing Pages de alta conversao</span>. Entrego nao so o site, mas um
              <span className="font-bold text-pink-400"> sistema completo</span> com agendamento online e painel administrativo.
            </p>
          </BentoCard>

          {/* Age */}
          <BentoCard
            className="p-6 flex flex-col items-center justify-center reveal-item bg-gradient-to-br from-indigo-600/[0.08] to-purple-600/[0.08]"
            {...bind()}
          >
            <div className="text-5xl md:text-6xl font-display font-extrabold gradient-text-animated leading-none">28</div>
            <div className="text-gray-500 text-xs font-semibold tracking-widest uppercase mt-2">Anos</div>
          </BentoCard>

          {/* Location */}
          <BentoCard
            className="p-6 flex flex-col items-center justify-center reveal-item"
            {...bind()}
          >
            <span className="text-3xl mb-2">📍</span>
            <div className="text-white font-bold text-sm">Rio de Janeiro</div>
            <div className="text-gray-500 text-xs">Duque de Caxias</div>
          </BentoCard>

          {/* Education */}
          <BentoCard
            className="p-6 flex flex-col items-center justify-center reveal-item"
            {...bind()}
          >
            <span className="text-3xl mb-2">🎓</span>
            <div className="text-white font-bold text-sm text-center">Analise e Desenvolvimento</div>
            <div className="text-gray-500 text-xs">de Sistemas</div>
          </BentoCard>

          {/* Region */}
          <BentoCard
            className="p-6 flex flex-col items-center justify-center reveal-item bg-gradient-to-br from-purple-600/[0.08] to-pink-600/[0.08]"
            {...bind()}
          >
            <div className="text-5xl md:text-6xl font-display font-extrabold gradient-text-animated leading-none">RJ</div>
            <div className="text-gray-500 text-xs font-semibold tracking-widest uppercase mt-2">Brasil</div>
          </BentoCard>

          {/* Focus */}
          <BentoCard
            className="col-span-2 p-6 reveal-item"
            {...bind()}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600/20 to-purple-600/20 flex items-center justify-center border border-indigo-500/10 flex-shrink-0">
                <span className="text-xl">🚀</span>
              </div>
              <div>
                <div className="text-white font-bold text-sm">Foco atual</div>
                <div className="text-gray-400 text-sm">Landing Pages de alta conversao para saude e direito</div>
              </div>
            </div>
          </BentoCard>

          {/* Freelancer */}
          <BentoCard
            className="col-span-2 p-6 reveal-item"
            {...bind()}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-600/20 to-emerald-600/20 flex items-center justify-center border border-green-500/10 flex-shrink-0">
                <span className="text-xl">💼</span>
              </div>
              <div>
                <div className="text-white font-bold text-sm">Freelancer</div>
                <div className="text-gray-400 text-sm">Aceitando projetos — Baixada Fluminense e regiao</div>
              </div>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  )
}
