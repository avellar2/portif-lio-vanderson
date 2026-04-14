const skills = [
  { name: "React", abbr: "⚛️", level: 95, color: "from-cyan-400 to-blue-500" },
  { name: "Next.js", abbr: "▲", level: 90, color: "from-slate-200 to-slate-400" },
  { name: "TypeScript", abbr: "TS", level: 88, color: "from-blue-400 to-blue-600" },
  { name: "Node.js", abbr: "N", level: 85, color: "from-green-400 to-emerald-600" },
  { name: "Tailwind", abbr: "TW", level: 92, color: "from-teal-400 to-cyan-500" },
  { name: "PostgreSQL", abbr: "DB", level: 80, color: "from-sky-400 to-blue-600" },
  { name: "Prisma", abbr: "PR", level: 82, color: "from-indigo-400 to-purple-500" },
  { name: "Firebase", abbr: "🔥", level: 78, color: "from-amber-400 to-orange-500" },
]

export default function Skills() {
  return (
    <section id="skills" className="py-32 relative overflow-hidden" style={{ background: '#06060e' }}>
      {/* Background Orbs */}
      <div className="absolute w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl -top-48 -left-48" style={{ animation: 'orb-float 15s ease-in-out infinite' }} />
      <div className="absolute w-80 h-80 bg-pink-500/20 rounded-full blur-3xl bottom-0 right-0" style={{ animation: 'orb-float 15s ease-in-out infinite', animationDelay: '-5s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-20">
          <p className="section-label mb-4">Tecnologias</p>
          <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Stack
            <span className="block mt-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Tecnológico
            </span>
          </h2>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className="skill-card p-6"
              style={{
                transitionDelay: `${index * 50}ms`,
                '--skill-from': skill.color.split(' ')[0].replace('from-', ''),
                '--skill-to': skill.color.split(' ')[1].replace('to-', ''),
              }}
            >
              <div className="text-4xl mb-4 skill-icon">{skill.abbr}</div>
              <h3 className="text-white font-semibold mb-3">{skill.name}</h3>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${skill.level}%` }} />
              </div>
              <p className="text-gray-500 text-xs mt-2">{skill.level}% domínio</p>
            </div>
          ))}
        </div>

        {/* Tech Stack Badges */}
        <div className="glass-strong rounded-3xl p-8 border border-white/[0.04]">
          <p className="text-gray-400 text-sm mb-6">Também trabalho com:</p>
          <div className="flex flex-wrap gap-3">
            {['Git', 'GitHub', 'Vercel', 'Figma', 'VS Code', 'npm', 'REST APIs', 'CSS3', 'HTML5'].map((tech) => (
              <span key={tech} className="tech-badge px-4 py-2 rounded-xl text-gray-300 text-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .skill-card {
          position: relative;
          background: linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 100%);
          border: 1px solid rgba(255,255,255,0.04);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .skill-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.03) 50%, transparent 60%);
          transform: translateX(-100%);
          transition: transform 0.6s;
        }

        .skill-card:hover::before {
          transform: translateX(100%);
        }

        .skill-card:hover {
          transform: translateY(-5px) scale(1.02);
          border-color: rgba(129, 140, 248, 0.15);
          box-shadow: 0 15px 35px rgba(0,0,0,0.2);
        }

        .skill-icon {
          background: linear-gradient(135deg, var(--skill-from, #818cf8), var(--skill-to, #a78bfa));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .progress-bar {
          height: 4px;
          background: rgba(255,255,255,0.05);
          border-radius: 2px;
          overflow: hidden;
          position: relative;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--skill-from, #818cf8), var(--skill-to, #a78bfa));
          border-radius: 2px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 1s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .skill-card:hover .progress-fill {
          transform: scaleX(1);
        }

        .tech-badge {
          position: relative;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          backdrop-filter: blur(10px);
          transition: all 0.3s;
        }

        .tech-badge:hover {
          background: rgba(129, 140, 248, 0.1);
          border-color: rgba(129, 140, 248, 0.2);
          transform: scale(1.05);
        }
      `}</style>
    </section>
  )
}
