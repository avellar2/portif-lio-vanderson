const projects = [
  {
    title: "Sistema CSDT",
    description: "Sistema de gerenciamento escolar desenvolvido com Next.js. Inclui gestão de alunos, escolas e impressoras, com geração de relatórios completos.",
    tags: ["Next.js", "TypeScript", "Prisma", "Tailwind"],
    link: "https://github.com/avellar2/CSDT-2",
    gradient: "from-blue-500 via-cyan-500 to-indigo-500",
    icon: "💻",
    featured: true,
  },
  {
    title: "LP JL Odontologia",
    description: "Landing Page completa com simulador de tratamento, agendamento online e painel administrativo para gestão de leads e consultas.",
    tags: ["React", "Next.js", "Tailwind", "Firebase"],
    link: "#",
    gradient: "from-emerald-500 via-green-500 to-teal-500",
    icon: "🦷",
    featured: false,
  },
  {
    title: "Modelo Advocacia",
    description: "Landing Page para escritórios de advocacia com formulário de triagem, agendamento de consulta e painel de gestão de clientes.",
    tags: ["React", "Next.js", "Tailwind", "PostgreSQL"],
    link: "#",
    gradient: "from-amber-500 via-orange-500 to-yellow-500",
    icon: "⚖️",
    featured: false,
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-32 relative overflow-hidden" style={{ background: '#06060e' }}>
      {/* Grid Background */}
      <div className="absolute inset-0 grid-bg opacity-50" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-20">
          <p className="section-label mb-4">Portfolio</p>
          <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Projetos
            <span className="block mt-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              selecionados
            </span>
          </h2>
          <p className="text-gray-400 text-lg mt-6 max-w-2xl">
            Alguns dos trabalhos que desenvolvi com dedicação e paixão.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`project-card ${project.featured ? 'md:col-span-2 lg:col-span-2' : ''}`}
              style={{
                '--project-from': project.gradient.split(' ')[0].replace('from-', ''),
                '--project-to': project.gradient.split(' ')[2].replace('to-', ''),
                transitionDelay: `${index * 100}ms`,
              }}
            >
              {/* Header */}
              <div className={`project-header ${project.featured ? 'md:h-64' : 'h-52'}`}>
                {project.featured && <span className="featured-badge">✨ Destaque</span>}
                <span className="project-icon">{project.icon}</span>
              </div>

              {/* Content */}
              <div className="p-7 relative z-10">
                <h3 className="text-xl font-bold text-white mb-3">
                  {project.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed mb-5">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={project.link}
                  target={project.link.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  Ver projeto
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-6">
            Quer um projeto como este para seu negócio?
          </p>
          <a
            href="https://wa.me/5521968410983"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-bold"
          >
            <span>Vamos conversar</span>
            <svg className="w-5 h-5 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>

      <style>{`
        .project-card {
          position: relative;
          background: linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 100%);
          border: 1px solid rgba(255,255,255,0.04);
          border-radius: 24px;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .project-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, var(--project-from, #818cf8), var(--project-to, #a78bfa));
          opacity: 0;
          transition: opacity 0.5s;
          z-index: 0;
        }

        .project-card:hover::before {
          opacity: 0.03;
        }

        .project-card:hover {
          transform: translateY(-8px);
          border-color: var(--project-from);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }

        .project-header {
          position: relative;
          background: linear-gradient(135deg, var(--project-from), var(--project-to));
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .project-header::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.3);
          transition: background 0.5s;
        }

        .project-card:hover .project-header::after {
          background: rgba(0,0,0,0.1);
        }

        .project-icon {
          position: relative;
          z-index: 1;
          font-size: 80px;
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .project-card:hover .project-icon {
          transform: scale(1.2) rotate(-5deg);
        }

        .project-tag {
          position: relative;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 6px 14px;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 500;
          color: #9ca3af;
          transition: all 0.3s;
        }

        .project-tag:hover {
          background: rgba(129, 140, 248, 0.15);
          border-color: rgba(129, 140, 248, 0.3);
          color: #fff;
          transform: translateY(-2px);
        }

        .project-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #818cf8;
          font-weight: 600;
          transition: all 0.3s;
        }

        .project-link:hover {
          color: #a78bfa;
          gap: 12px;
        }

        .featured-badge {
          position: absolute;
          top: 16px;
          left: 16px;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(10px);
          padding: 8px 16px;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 600;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 1px;
          z-index: 2;
        }
      `}</style>
    </section>
  )
}
