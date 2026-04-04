import { useCard3D } from '../hooks/useCard3D.jsx'

const projects = [
  {
    title: "Sistema CSDT",
    description: "Sistema de gerenciamento escolar desenvolvido com Next.js. Inclui gestao de alunos, escolas e impressoras, com geracao de relatorios.",
    tags: ["Next.js", "TypeScript", "Prisma", "Tailwind"],
    link: "https://github.com/avellar2/CSDT-2",
    gradient: "from-blue-600/20 via-cyan-600/15 to-indigo-600/20",
    icon: "💻",
    featured: true,
  },
  {
    title: "LP JL Odontologia",
    description: "Landing Page completa com simulador de tratamento, agendamento online e painel administrativo para gestao de leads e consultas.",
    tags: ["React", "Next.js", "Tailwind", "Firebase"],
    link: "#",
    gradient: "from-emerald-600/15 via-green-600/15 to-teal-600/15",
    icon: "🦷",
    featured: false,
  },
  {
    title: "Modelo Advocacia (Demo)",
    description: "Landing Page para escritorios de advocacia com formulario de triagem, agendamento de consulta e painel de gestao de clientes.",
    tags: ["React", "Next.js", "Tailwind", "PostgreSQL"],
    link: "#",
    gradient: "from-yellow-600/15 via-amber-600/15 to-orange-600/15",
    icon: "⚖️",
    featured: false,
  },
]

export default function Projects() {
  const { handleCardMove, handleCardLeave } = useCard3D()

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold reveal-item">
            <span className="gradient-text-animated">Meus Projetos</span>
          </h2>
          <p className="text-gray-500 text-base mt-4 reveal-item">Alguns dos trabalhos que tenho orgulho de compartilhar</p>
        </div>

        {/* Bento Grid — featured project gets more space */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
          {projects.map((p, i) => (
            <div
              key={i}
              className={`reveal-item group glass rounded-3xl overflow-hidden card-3d bento-glow bg-gradient-to-br ${p.gradient} ${p.featured ? 'md:row-span-2' : ''}`}
              style={{ transitionDelay: `${i * 100}ms` }}
              onMouseMove={(e) => handleCardMove(e, e.currentTarget)}
              onMouseLeave={(e) => handleCardLeave(e.currentTarget)}
            >
              {/* Header gradient area */}
              <div className={`h-44 ${p.featured ? 'md:h-56' : 'md:h-40'} bg-gradient-to-br ${p.gradient} flex items-center justify-center text-6xl md:text-7xl relative overflow-hidden border-b border-white/[0.03]`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-all duration-700" />
                <span className="relative z-10 transform group-hover:scale-125 transition-transform duration-700 drop-shadow-2xl">{p.icon}</span>

                {/* Featured badge */}
                {p.featured && (
                  <span className="absolute top-4 left-4 glass-strong px-3 py-1 rounded-full text-[10px] font-bold text-indigo-300 uppercase tracking-wider border border-indigo-500/20">
                    Destaque
                  </span>
                )}
              </div>

              <div className="p-6 md:p-7">
                <h3 className="text-lg md:text-xl font-display font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                  {p.title}
                </h3>
                <p className="text-gray-500 mb-5 leading-relaxed text-sm">{p.description}</p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {p.tags.map((tag, ti) => (
                    <span key={ti} className="bg-white/[0.04] border border-white/[0.06] text-indigo-400/70 px-3 py-1 rounded-full text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>

                <a href={p.link} className="inline-flex items-center text-indigo-400 font-bold text-sm hover:text-indigo-300 transition-colors group/link gap-2">
                  Ver projeto
                  <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
