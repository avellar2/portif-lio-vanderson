import { useCard3D } from '../hooks/useCard3D.jsx'

const services = [
  {
    num: '01',
    icon: '🎯',
    title: 'Landing Page de Alta Conversao',
    desc: 'Design profissional, rapido e otimizado para converter visitantes em clientes.',
    gradient: 'from-indigo-600/10 to-violet-600/10',
  },
  {
    num: '02',
    icon: '📅',
    title: 'Agendamento Online',
    desc: 'Sistema integrado para seus clientes agendarem diretamente pelo site, 24h por dia.',
    gradient: 'from-purple-600/10 to-fuchsia-600/10',
  },
  {
    num: '03',
    icon: '📊',
    title: 'Painel Administrativo',
    desc: 'Visualize seus leads, agendamentos da semana e historico de contatos em um so lugar.',
    gradient: 'from-pink-600/10 to-rose-600/10',
  },
]

export default function Services() {
  const { handleCardMove, handleCardLeave } = useCard3D()

  return (
    <section id="services" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold reveal-item">
            <span className="gradient-text-animated">O que eu entrego</span>
          </h2>
          <p className="text-gray-500 text-base mt-4 reveal-item">Um sistema completo, do site ao painel de gestao</p>
        </div>

        {/* Bento Grid Services */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-5">
          {services.map((s, i) => (
            <div
              key={i}
              className={`reveal-item group glass rounded-3xl p-7 md:p-8 relative overflow-hidden card-3d bento-glow bg-gradient-to-br ${s.gradient} ${i === 0 ? 'md:col-span-5' : i === 1 ? 'md:col-span-4' : 'md:col-span-3'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
              onMouseMove={(e) => handleCardMove(e, e.currentTarget)}
              onMouseLeave={(e) => handleCardLeave(e.currentTarget)}
            >
              {/* Background number */}
              <span className="absolute -top-4 -right-2 text-white/[0.03] font-display font-extrabold text-[8rem] leading-none select-none pointer-events-none">
                {s.num}
              </span>

              <div className="relative z-10">
                <div className="text-4xl md:text-5xl mb-5 transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
                  {s.icon}
                </div>
                <h3 className="text-lg md:text-xl font-display font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                  {s.title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-sm">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
