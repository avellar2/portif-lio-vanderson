export default function Marquee() {
  const row1 = ['Next.js', 'React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'Firebase', 'Chart.js', 'Git']
  const row2 = ['Landing Pages', 'Full Stack', 'Freelancer', 'Baixada Fluminense', 'Agendamento Online', 'Painel Admin', 'Alta Conversao', 'SEO', 'Performance', 'UI/UX']

  const Separator = () => <span className="text-indigo-500/25 mx-6 text-xl select-none">&#x2726;</span>

  return (
    <section className="py-8 border-y border-white/[0.03] overflow-hidden relative">
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#06060e] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#06060e] to-transparent z-10 pointer-events-none" />

      {/* Row 1 — left to right */}
      <div className="marquee-track mb-4">
        {[0, 1].map((set) => (
          <div key={set} className="flex items-center shrink-0">
            {row1.map((skill) => (
              <span key={`${set}-${skill}`} className="text-gray-600 font-semibold text-xs whitespace-nowrap tracking-[0.2em] uppercase mx-4">
                {skill}
              </span>
            ))}
            {row1.map((_, i) => (
              <Separator key={`sep1-${set}-${i}`} />
            ))}
          </div>
        ))}
      </div>

      {/* Row 2 — right to left */}
      <div className="marquee-track-reverse">
        {[0, 1].map((set) => (
          <div key={set} className="flex items-center shrink-0">
            {row2.map((text) => (
              <span key={`${set}-${text}`} className="text-gray-700 font-medium text-xs whitespace-nowrap tracking-[0.15em] uppercase mx-4">
                {text}
              </span>
            ))}
            {row2.map((_, i) => (
              <Separator key={`sep2-${set}-${i}`} />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
