const services = [
  {
    num: '01',
    icon: '🛒',
    title: 'E-commerce Completo',
    desc: 'Loja virtual com carrinho, checkout, catálogo de produtos, gestão de estoque e integração com meios de pagamento.',
    gradient: 'from-emerald-500 to-green-500',
  },
  {
    num: '02',
    icon: '📱',
    title: 'App de Delivery',
    desc: 'Sistema completo de pedidos online com rastreamento em tempo real, integração com iFood e app próprio.',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    num: '03',
    icon: '📅',
    title: 'Sistema de Agendamento',
    desc: 'Agenda online 24/7, lembretes WhatsApp automático, perfil de profissionais e gestão de horários.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    num: '04',
    icon: '📊',
    title: 'SaaS / Software de Gestão',
    desc: 'Sistemas personalizados: matrículas, mensalidades, frequência, controle financeiro e relatórios.',
    gradient: 'from-purple-500 to-violet-500',
  },
  {
    num: '05',
    icon: '🎫',
    title: 'Cardápio Digital',
    desc: 'QR Code na mesa, pedidos diretos para cozinha, conta individual e integração com pagamento.',
    gradient: 'from-amber-500 to-yellow-500',
  },
  {
    num: '06',
    icon: '🏪',
    title: 'Catálogo de Produtos',
    desc: 'Vitrine digital com fotos, descrições, filtros e contato via WhatsApp para fechar vendas.',
    gradient: 'from-teal-500 to-cyan-500',
  },
  {
    num: '07',
    icon: '💳',
    title: 'Portal do Cliente',
    desc: 'Área restrita para clientes acessarem documentos, históricos, boletos e fazer solicitações.',
    gradient: 'from-indigo-500 to-blue-500',
  },
  {
    num: '08',
    icon: '🌐',
    title: 'Landing Page Premium',
    desc: 'Página de vendas otimizada para converter visitantes em clientes. Inclui formulário e WhatsApp.',
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
            Soluções para
            <span className="block mt-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              seu tipo de negócio
            </span>
          </h2>
          <p className="text-gray-400 text-lg mt-6 max-w-2xl">
            Seja você uma clínica, restaurante, loja ou escritório: tenho a solução certa para transformar seu negócio digital.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {services.map((service, index) => (
            <div
              key={service.num}
              className="service-card p-6"
              style={{
                '--service-from': service.gradient.split(' ')[0].replace('from-', ''),
                '--service-to': service.gradient.split(' ')[1].replace('to-', ''),
                transitionDelay: `${index * 50}ms`,
              }}
            >
              <span className="service-number font-display">{service.num}</span>

              <div className="relative z-10">
                <div className="service-icon-wrapper">
                  {service.icon}
                </div>

                <h3 className="text-lg font-bold text-white mb-3">
                  {service.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Urgência */}
        <div className="flex items-center justify-center gap-4 mb-8 p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5">
          <span className="text-2xl">⚠️</span>
          <p className="text-yellow-400 text-sm">
            <span className="font-bold">Vagas limitadas:</span> Aceito apenas 2 projetos novos por mês para garantir qualidade
          </p>
        </div>

        {/* CTA Section */}
        <div className="glass-strong rounded-3xl p-10 md:p-12 text-center border border-white/[0.04]">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Qual seu negócio?
          </h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Resturante, clínica, loja, escritório, escola... tenho a solução certa para você.
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
          border-radius: 24px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .service-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, var(--service-from, #818cf8), var(--service-to, #a78bfa));
          opacity: 0;
          transition: opacity 0.4s;
          z-index: 0;
        }

        .service-card:hover::after {
          opacity: 0.05;
        }

        .service-card:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: var(--service-from);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }

        .service-number {
          position: absolute;
          top: -15px;
          right: -8px;
          font-size: 120px;
          font-weight: 900;
          background: linear-gradient(135deg, var(--service-from), var(--service-to));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          opacity: 0.05;
          line-height: 1;
          pointer-events: none;
          transition: all 0.4s;
        }

        .service-card:hover .service-number {
          opacity: 0.1;
          transform: scale(1.1) rotate(-5deg);
        }

        .service-icon-wrapper {
          position: relative;
          width: 60px;
          height: 60px;
          border-radius: 18px;
          background: linear-gradient(135deg, var(--service-from), var(--service-to));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          margin-bottom: 16px;
          transition: all 0.4s;
        }

        .service-card:hover .service-icon-wrapper {
          transform: scale(1.1) rotate(-5deg);
          box-shadow: 0 15px 30px rgba(0,0,0,0.3);
        }
      `}</style>
    </section>
  )
}
