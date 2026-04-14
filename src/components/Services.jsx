const services = [
  {
    num: '01',
    icon: '🎯',
    title: 'Landing Page Premium',
    desc: 'Design profissional, rápido e otimizado para converter visitantes em clientes. Responsivo em todos os dispositivos.',
    gradient: 'from-indigo-500 to-violet-500',
  },
  {
    num: '02',
    icon: '📅',
    title: 'Agendamento 24/7',
    desc: 'Sistema integrado para seus clientes agendarem diretamente pelo site, a qualquer hora do dia ou da noite.',
    gradient: 'from-purple-500 to-fuchsia-500',
  },
  {
    num: '03',
    icon: '📊',
    title: 'Painel Administrativo',
    desc: 'Controle total: visualize leads, agendamentos da semana e histórico de contatos em um só lugar.',
    gradient: 'from-pink-500 to-rose-500',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-32 relative overflow-hidden" style={{ background: '#06060e' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-20">
          <p className="section-label mb-4">Serviços</p>
          <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            O que eu
            <span className="block mt-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              entrego para você
            </span>
          </h2>
          <p className="text-gray-400 text-lg mt-6 max-w-2xl">
            Um sistema completo, do site ao painel de gestão. Tudo integrado para maximizar seus resultados.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <div
              key={service.num}
              className="service-card p-8"
              style={{
                '--service-from': service.gradient.split(' ')[0].replace('from-', ''),
                '--service-to': service.gradient.split(' ')[1].replace('to-', ''),
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <span className="service-number font-display">{service.num}</span>

              <div className="relative z-10">
                <div className="service-icon-wrapper">
                  {service.icon}
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">
                  {service.title}
                </h3>

                <p className="text-gray-400 leading-relaxed">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="glass-strong rounded-3xl p-10 md:p-12 text-center border border-white/[0.04]">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pronto para transformar seu negócio?
          </h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Entre em contato agora e receba uma proposta personalizada para seu negócio.
          </p>
          <a
            href="https://wa.me/5521968410983"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-white font-bold text-lg"
          >
            <span>Solicitar Proposta</span>
            <svg className="w-5 h-5 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>

      <style>{`
        .service-card {
          position: relative;
          background: linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 100%);
          border: 1px solid rgba(255,255,255,0.04);
          border-radius: 28px;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .service-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, var(--service-from, #818cf8), var(--service-to, #a78bfa));
          opacity: 0;
          transition: opacity 0.5s;
          z-index: 0;
        }

        .service-card:hover::after {
          opacity: 0.05;
        }

        .service-card:hover {
          transform: translateY(-10px) scale(1.02);
          border-color: var(--service-from);
          box-shadow: 0 25px 50px rgba(0,0,0,0.3);
        }

        .service-number {
          position: absolute;
          top: -20px;
          right: -10px;
          font-size: 180px;
          font-weight: 900;
          background: linear-gradient(135deg, var(--service-from), var(--service-to));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          opacity: 0.05;
          line-height: 1;
          pointer-events: none;
          transition: all 0.5s;
        }

        .service-card:hover .service-number {
          opacity: 0.1;
          transform: scale(1.1) rotate(-5deg);
        }

        .service-icon-wrapper {
          position: relative;
          width: 80px;
          height: 80px;
          border-radius: 24px;
          background: linear-gradient(135deg, var(--service-from), var(--service-to));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 40px;
          margin-bottom: 24px;
          transition: all 0.5s;
        }

        .service-card:hover .service-icon-wrapper {
          transform: scale(1.1) rotate(-5deg);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
      `}</style>
    </section>
  )
}
