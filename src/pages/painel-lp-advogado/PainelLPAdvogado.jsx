import { useState } from 'react'
import { Link } from 'react-router-dom'

const leadsMock = [
  { id: 1, nome: 'Fernanda Oliveira', whatsapp: '(21) 98765-4321', email: 'fernanda@email.com', area: 'familia', caso: 'Preciso de ajuda com divórcio consensual. Casamos há 8 anos.', urgencia: 'normal', data: '16/04/2026', horario: '10:00', status: 'confirmado', createdAt: '15/04/2026 09:30' },
  { id: 2, nome: 'Carlos Eduardo', whatsapp: '(21) 97654-3210', email: 'carlos@email.com', area: 'criminal', caso: 'Meu filho foi preso ontem à noite. Preciso de advogado urgente.', urgencia: 'urgente', data: '16/04/2026', horario: '09:00', status: 'pendente', createdAt: '15/04/2026 14:15' },
  { id: 3, nome: 'Ana Paula Santos', whatsapp: '(21) 96543-2109', email: 'ana@email.com', area: 'trabalhista', caso: 'Fui demitida sem justa causa e não recebi minhas verbas rescisórias.', urgencia: 'normal', data: '17/04/2026', horario: '14:00', status: 'confirmado', createdAt: '15/04/2026 11:45' },
  { id: 4, nome: 'Roberto Mendes', whatsapp: '(21) 95432-1098', email: 'roberto@email.com', area: 'civil', caso: 'Comprei um apartamento na planta e a construtora atrasou 2 anos.', urgencia: 'normal', data: '18/04/2026', horario: '15:00', status: 'novo', createdAt: '15/04/2026 16:20' },
  { id: 5, nome: 'Juliana Costa', whatsapp: '(21) 94321-0987', email: 'juliana@email.com', area: 'familia', caso: 'Preciso revisar valor de pensão alimentícia do meu filho.', urgencia: 'normal', data: '18/04/2026', horario: '11:00', status: 'novo', createdAt: '15/04/2026 17:50' },
  { id: 6, nome: 'Marcos Vinícius', whatsapp: '(21) 93210-9876', email: 'marcos@email.com', area: 'empresarial', caso: 'Quero abrir uma LTDA com 2 sócios e preciso de contrato social.', urgencia: 'normal', data: '19/04/2026', horario: '16:00', status: 'contatado', createdAt: '14/04/2026 10:00' },
]

const areaLabels = { familia: 'Direito de Família', civil: 'Direito Civil', criminal: 'Direito Criminal', trabalhista: 'Direito Trabalhista', empresarial: 'Direito Empresarial', imobiliario: 'Direito Imobiliário' }
const urgenciaLabels = { urgente: '🚨 Urgente', normal: '📅 Normal' }
const statusStyles = { confirmado: 'bg-green-900/30 text-green-400 border-green-800', pendente: 'bg-yellow-900/30 text-yellow-400 border-yellow-800', novo: 'bg-blue-900/30 text-blue-400 border-blue-800', contatado: 'bg-purple-900/30 text-purple-400 border-purple-800', cancelado: 'bg-red-900/30 text-red-400 border-red-800' }

export default function PainelLPAdvogado() {
  const [abaAtiva, setAbaAtiva] = useState('dashboard')
  const [filtroStatus, setFiltroStatus] = useState('todos')
  const [filtroArea, setFiltroArea] = useState('todos')
  const [leadExpandido, setLeadExpandido] = useState(null)

  const leadsFiltrados = leadsMock.filter(l =>
    (filtroStatus === 'todos' || l.status === filtroStatus) &&
    (filtroArea === 'todos' || l.area === filtroArea)
  )

  const stats = {
    total: leadsMock.length,
    novos: leadsMock.filter(l => l.status === 'novo').length,
    confirmados: leadsMock.filter(l => l.status === 'confirmado').length,
    urgentes: leadsMock.filter(l => l.urgencia === 'urgente').length,
  }

  return (
    <div className="min-h-screen" style={{ background: '#0d0d12', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
      `}</style>

      {/* Header */}
      <header className="border-b sticky top-0 z-50" style={{ background: '#141418', borderColor: 'rgba(201,168,76,.12)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                Voltar
              </Link>
              <div className="h-6 w-px" style={{ background: 'rgba(201,168,76,.2)' }} />
              <div>
                <h1 className="text-lg font-bold text-white">Painel Administrativo</h1>
                <p className="text-xs" style={{ color: '#c9a84c' }}>Mendes & Torres Advocacia</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-2 text-sm text-gray-400">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Online
              </span>
              <a href="/lp-advogados/" target="_blank" className="px-4 py-2 text-sm font-medium text-black rounded-lg transition-colors" style={{ background: '#c9a84c' }}>
                Ver LP
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Abas */}
        <div className="rounded-xl border overflow-hidden mb-8" style={{ background: '#141418', borderColor: 'rgba(201,168,76,.12)' }}>
          <nav className="flex gap-8 px-6">
            {['dashboard', 'leads'].map(aba => (
              <button key={aba} onClick={() => setAbaAtiva(aba)}
                className="py-4 px-1 border-b-2 font-medium text-sm transition-colors"
                style={{
                  borderColor: abaAtiva === aba ? '#c9a84c' : 'transparent',
                  color: abaAtiva === aba ? '#c9a84c' : '#6a6a6a',
                }}
              >
                {aba === 'dashboard' ? '📊 Dashboard' : `👥 Leads (${leadsMock.length})`}
              </button>
            ))}
          </nav>
        </div>

        {/* Dashboard */}
        {abaAtiva === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: '👥', label: 'Total de Leads', value: stats.total, badge: `+${stats.total} esta semana`, badgeColor: 'text-blue-400' },
                { icon: '🆕', label: 'Novos', value: stats.novos, badge: 'Não contatados', badgeColor: 'text-yellow-400' },
                { icon: '✅', label: 'Confirmados', value: stats.confirmados, badge: 'Agendados', badgeColor: 'text-green-400' },
                { icon: '🚨', label: 'Urgentes', value: stats.urgentes, badge: 'Atenção prioritária', badgeColor: 'text-red-400' },
              ].map((stat, i) => (
                <div key={i} className="rounded-xl p-6 border" style={{ background: '#141418', borderColor: 'rgba(201,168,76,.12)' }}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{stat.icon}</span>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${stat.badgeColor}`} style={{ background: 'rgba(201,168,76,.06)' }}>{stat.badge}</span>
                  </div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Charts area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Leads por área */}
              <div className="rounded-xl p-6 border" style={{ background: '#141418', borderColor: 'rgba(201,168,76,.12)' }}>
                <h3 className="text-sm font-semibold text-gray-300 mb-4">Leads por Área</h3>
                <div className="space-y-3">
                  {Object.entries(areaLabels).map(([key, label]) => {
                    const count = leadsMock.filter(l => l.area === key).length
                    const max = Math.max(...Object.values(areaLabels).map((_, i) => leadsMock.filter(l => l.area === Object.keys(areaLabels)[i]).length))
                    return (
                      <div key={key} className="flex items-center gap-3">
                        <span className="text-xs text-gray-400 w-32 truncate">{label}</span>
                        <div className="flex-1 h-5 rounded-full overflow-hidden" style={{ background: '#1a1a20' }}>
                          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(count / max) * 100}%`, background: 'linear-gradient(90deg, #9a7a2e, #c9a84c)' }} />
                        </div>
                        <span className="text-xs font-semibold text-gray-300 w-6 text-right">{count}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Últimos leads */}
              <div className="rounded-xl p-6 border" style={{ background: '#141418', borderColor: 'rgba(201,168,76,.12)' }}>
                <h3 className="text-sm font-semibold text-gray-300 mb-4">Últimos Leads Recebidos</h3>
                <div className="space-y-3">
                  {leadsMock.slice(0, 4).map(lead => (
                    <div key={lead.id} className="flex items-center gap-3 p-3 rounded-lg" style={{ background: '#1a1a20' }}>
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: 'linear-gradient(135deg, #9a7a2e, #c9a84c)', color: '#0d0d12' }}>
                        {lead.nome.split(' ').map(n => n[0]).slice(0, 2).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{lead.nome}</p>
                        <p className="text-xs text-gray-500">{areaLabels[lead.area]} · {lead.createdAt}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${statusStyles[lead.status]}`}>
                        {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Leads */}
        {abaAtiva === 'leads' && (
          <div className="rounded-xl border overflow-hidden" style={{ background: '#141418', borderColor: 'rgba(201,168,76,.12)' }}>
            {/* Filtros */}
            <div className="p-6 border-b flex flex-wrap items-center gap-4" style={{ borderColor: 'rgba(201,168,76,.12)' }}>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-400">Status:</label>
                <select value={filtroStatus} onChange={e => setFiltroStatus(e.target.value)}
                  className="px-3 py-2 border rounded-lg text-sm text-white focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600" style={{ background: '#1a1a20', borderColor: 'rgba(201,168,76,.2)' }}>
                  <option value="todos">Todos</option>
                  <option value="novo">Novos</option>
                  <option value="contatado">Contatados</option>
                  <option value="confirmado">Confirmados</option>
                  <option value="pendente">Pendentes</option>
                  <option value="cancelado">Cancelados</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-400">Área:</label>
                <select value={filtroArea} onChange={e => setFiltroArea(e.target.value)}
                  className="px-3 py-2 border rounded-lg text-sm text-white focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600" style={{ background: '#1a1a20', borderColor: 'rgba(201,168,76,.2)' }}>
                  <option value="todos">Todas</option>
                  {Object.entries(areaLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>
              <span className="text-xs text-gray-500 ml-auto">{leadsFiltrados.length} resultado(s)</span>
            </div>

            {/* Tabela */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y" style={{ borderColor: 'rgba(201,168,76,.08)' }}>
                <thead>
                  <tr>
                    {['Cliente', 'Área', 'Caso', 'Data/Hora', 'Status', 'Ações'].map(h => (
                      <th key={h} className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {leadsFiltrados.map(lead => (
                    <>
                      <tr key={lead.id} className="cursor-pointer transition-colors hover:bg-white/[.02]" onClick={() => setLeadExpandido(leadExpandido === lead.id ? null : lead.id)}>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ background: 'linear-gradient(135deg, #9a7a2e, #c9a84c)', color: '#0d0d12' }}>
                              {lead.nome.split(' ').map(n => n[0]).slice(0, 2).join('')}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-white">{lead.nome}</p>
                              <p className="text-xs text-gray-500">{lead.whatsapp}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4"><span className="text-sm" style={{ color: '#c9a84c' }}>{areaLabels[lead.area]}</span></td>
                        <td className="px-6 py-4"><p className="text-sm text-gray-300 max-w-xs truncate">{lead.caso}</p></td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-white">{lead.data}</p>
                          <p className="text-xs text-gray-500">{lead.horario}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusStyles[lead.status]}`}>
                            {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <a href={`https://wa.me/55${lead.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                              className="px-3 py-1.5 bg-green-600/20 border border-green-700/30 text-green-400 rounded-lg text-xs font-medium hover:bg-green-600/30 transition-colors">
                              WhatsApp
                            </a>
                            <a href={`mailto:${lead.email}`} onClick={e => e.stopPropagation()}
                              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border" style={{ background: 'rgba(201,168,76,.1)', borderColor: 'rgba(201,168,76,.2)', color: '#c9a84c' }}>
                              Email
                            </a>
                          </div>
                        </td>
                      </tr>
                      {/* Expanded details */}
                      {leadExpandido === lead.id && (
                        <tr>
                          <td colSpan="6" className="px-6 py-4" style={{ background: '#1a1a20' }}>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div><span className="text-gray-500 block text-xs uppercase tracking-wider mb-1">E-mail</span><span className="text-white">{lead.email}</span></div>
                              <div><span className="text-gray-500 block text-xs uppercase tracking-wider mb-1">Urgência</span><span className="text-white">{urgenciaLabels[lead.urgencia]}</span></div>
                              <div><span className="text-gray-500 block text-xs uppercase tracking-wider mb-1">Recebido em</span><span className="text-white">{lead.createdAt}</span></div>
                              <div><span className="text-gray-500 block text-xs uppercase tracking-wider mb-1">Área</span><span style={{ color: '#c9a84c' }}>{areaLabels[lead.area]}</span></div>
                            </div>
                            <div className="mt-4 p-4 rounded-lg border" style={{ background: '#141418', borderColor: 'rgba(201,168,76,.1)' }}>
                              <span className="text-gray-500 block text-xs uppercase tracking-wider mb-2">Descrição do Caso</span>
                              <p className="text-gray-300 text-sm leading-relaxed">{lead.caso}</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
