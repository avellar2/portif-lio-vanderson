import { useCard3D } from '../hooks/useCard3D.jsx'

const skills = [
  { name: "Next.js", abbr: "Nxt", color: "text-white", bg: "bg-white/[0.04]", border: "border-white/10", size: "col-span-1 row-span-1" },
  { name: "React", abbr: "Re", color: "text-cyan-400", bg: "bg-cyan-500/[0.06]", border: "border-cyan-500/15", size: "col-span-1 row-span-1" },
  { name: "TypeScript", abbr: "TS", color: "text-blue-400", bg: "bg-blue-500/[0.06]", border: "border-blue-500/15", size: "md:col-span-2 md:row-span-1" },
  { name: "Node.js", abbr: "Nde", color: "text-green-400", bg: "bg-green-500/[0.06]", border: "border-green-500/15", size: "col-span-1 row-span-1" },
  { name: "Tailwind CSS", abbr: "Tw", color: "text-teal-400", bg: "bg-teal-500/[0.06]", border: "border-teal-500/15", size: "col-span-1 row-span-1" },
  { name: "Prisma", abbr: "Pri", color: "text-indigo-400", bg: "bg-indigo-500/[0.06]", border: "border-indigo-500/15", size: "col-span-1 row-span-1" },
  { name: "PostgreSQL", abbr: "PG", color: "text-sky-400", bg: "bg-sky-500/[0.06]", border: "border-sky-500/15", size: "col-span-1 row-span-1" },
  { name: "Firebase", abbr: "Fir", color: "text-amber-400", bg: "bg-amber-500/[0.06]", border: "border-amber-500/15", size: "col-span-1 row-span-1" },
  { name: "Chart.js", abbr: "Ch", color: "text-rose-400", bg: "bg-rose-500/[0.06]", border: "border-rose-500/15", size: "col-span-1 row-span-1" },
  { name: "Git", abbr: "Git", color: "text-orange-400", bg: "bg-orange-500/[0.06]", border: "border-orange-500/15", size: "col-span-1 row-span-1" },
]

export default function Skills() {
  const { handleCardMove, handleCardLeave } = useCard3D()

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold reveal-item">
            <span className="gradient-text-animated">Minhas Skills</span>
          </h2>
        </div>

        {/* Bento Grid Skills */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className={`reveal-item glass rounded-2xl p-5 md:p-6 text-center group cursor-pointer transition-all duration-300 card-3d bento-glow ${skill.size}`}
              style={{ transitionDelay: `${index * 50}ms` }}
              onMouseMove={(e) => handleCardMove(e, e.currentTarget)}
              onMouseLeave={(e) => handleCardLeave(e.currentTarget)}
            >
              <div className="flex justify-center mb-3">
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${skill.bg} border ${skill.border} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <span className={`${skill.color} font-bold text-sm md:text-base`}>{skill.abbr}</span>
                </div>
              </div>
              <p className="font-semibold text-gray-400 group-hover:text-white transition-colors text-xs md:text-sm">{skill.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
