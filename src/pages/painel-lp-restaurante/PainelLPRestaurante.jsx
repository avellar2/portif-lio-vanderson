import { useState } from 'react'
import { Link } from 'react-router-dom'

const reservationsMock = [
  { id: 1, nome: 'Camila Reis', whatsapp: '(21) 98765-4321', email: 'camila@email.com', data: '18/04/2026', horario: '20:00', pessoas: '2', ocasiao: 'Aniversário', status: 'confirmado', createdAt: '15/04/2026 19:30' },
  { id: 2, nome: 'Pedro Alcantara', whatsapp: '(21) 97654-3210', email: 'pedro@email.com', data: '17/04/2026', horario: '19:30', pessoas: '4', ocasiao: 'Jantar de negócios', status: 'novo', createdAt: '15/04/2026 15:45' },
  { id: 3, nome: 'Fernanda Lima', whatsapp: '(21) 96543-2109', email: 'fernanda@email.com', data: '19/04/2026', horario: '21:00', pessoas: '6', ocasiao: 'Comemoração casamento', status: 'pendente', createdAt: '15/04/2026 11:20' },
  { id: 4, nome: 'Ricardo Souza', whatsapp: '(21) 95432-1098', email: 'ricardo@email.com', data: '18/04/2026', horario: '19:00', pessoas: '2', ocasiao: '', status: 'confirmado', createdAt: '15/04/2026 10:15' },
  { id: 5, nome: 'Ana Beatriz Costa', whatsapp: '(21) 94321-0987', email: 'ana@email.com', data: '20/04/2026', horario: '20:30', pessoas: '3', ocasiao: 'Alergia a frutos do mar', status: 'novo', createdAt: '14/04/2026 22:10' },
  { id: 6, nome: 'Lucas Mendes', whatsapp: '(21) 93210-9876', email: 'lucas@email.com', data: '17/04/2026', horario: '22:00', pessoas: '2', ocasiao: '', status: 'contatado', createdAt: '14/04/2026 16:40' },
  { id: 7, nome: 'Juliana Santos', whatsapp: '(21) 92109-8765', email: 'juliana@email.com', data: '18/04/2026', horario: '21:30', pessoas: '5', ocasiao: 'Menu degustação', status: 'confirmado', createdAt: '14/04/2026 14:25' },
  { id: 8, nome: 'Marcos Vinicius', whatsapp: '(21) 91098-7654', email: 'marcos@email.com', data: '25/04/2026', horario: '19:30', pessoas: '2', ocasiao: 'Aniversário de casamento', status: 'novo', createdAt: '14/04/2026 12:00' },
]

const statusStyles = {
  confirmado: 'bg-green-900/30 text-green-400 border-green-800',
  pendente: 'bg-yellow-900/30 text-yellow-400 border-yellow-800',
  novo: 'bg-blue-900/30 text-blue-400 border-blue-800',
  contatado: 'bg-purple-900/30 text-purple-400 border-purple-800',
  cancelado: 'bg-red-900/30 text-red-400 border-red-800',
}

const statusLabels = {
  confirmado: '✅ Confirmado',
  pendente: '⏳ Pendente',
  novo: '🆕 Novo',
  contatado: '📞 Contatado',
  cancelado: '❌ Cancelado',
}

export default function PainelLPRestaurante() {
  const [abaAtiva, setAbaAtiva] = useState('dashboard')
  const [filtroStatus, setFiltroStatus] = useState('todos')
  const [filtroData, setFiltroData] = useState('todos')
  const [reservaExpandida, setReservaExpandida] = useState(null)

  const reservasFiltradas = reservationsMock.filter(r =>
    (filtroStatus === 'todos' || r.status === filtroStatus) &&
    (filtroData === 'todos' || r.data === filtroData)
  )

  const stats = {
    total: reservationsMock.length,
    novos: reservationsMock.filter(r => r.status === 'novo').length,
    confirmados: reservationsMock.filter(r => r.status === 'confirmado').length,
    pendentes: reservationsMock.filter(r => r.status === 'pendente').length,
  }

  // Data única para hoje, amanhã, etc.
  const datasUnicas = [...new Set(reservationsMock.map(r => r.data))]

  // Stats por data
  const porData = datasUnicas.map(data => ({
    data,
    total: reservationsMock.filter(r => r.data === data).length,
    pessoas: reservationsMock.filter(r => r.data === data).reduce((acc, r) => acc + parseInt(r.pessoas) || 0, 0),
  }))

  return (
    <div className="min-h-screen" style={{ background: '#0a0a08', fontFamily: "'Karla', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Karla:wght@300;400;500;600;700&display=swap');
      `}</style>

      {/* Header */}
      <header className="border-b sticky top-0 z-50" style={{ background: '#111110', borderColor: 'rgba(176,125,86,.12)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                Voltar
              </Link>
              <div className="h-6 w-px" style={{ background: 'rgba(176,125,86,.2)' }} />
              <div>
                <h1 className="text-lg font-bold text-white">Painel Administrativo</h1>
                <p className="text-xs" style={{ color: '#b07d56' }}>TERRA - Cozinha Autoral</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-2 text-sm text-gray-400">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Online
              </span>
              <a href="/lp-restaurante/" target="_blank" className="px-4 py-2 text-sm font-medium text-black rounded-lg transition-colors" style={{ background: '#b07d56' }}>
                Ver LP
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Abas */}
        <div className="rounded-xl border overflow-hidden mb-8" style={{ background: '#111110', borderColor: 'rgba(176,125,86,.12)' }}>
          <nav className="flex gap-8 px-6">
            {['dashboard', 'reservas'].map(aba => (
              <button key={aba} onClick={() => setAbaAtiva(aba)}
                className="py-4 px-1 border-b-2 font-medium text-sm transition-colors"
                style={{
                  borderColor: abaAtiva === aba ? '#b07d56' : 'transparent',
                  color: abaAtiva === aba ? '#b07d56' : '#6a6a6a',
                }}
              >
                {aba === 'dashboard' ? '📊 Dashboard' : `🍽️ Reservas (${reservationsMock.length})`}
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
                { icon: '🍽️', label: 'Total Reservas', value: stats.total, badge: `${stats.total} próximas`, badgeColor: 'text-blue-400' },
                { icon: '🆕', label: 'Novas', value: stats.novos, badge: 'Aguardando contato', badgeColor: 'text-yellow-400' },
                { icon: '✅', label: 'Confirmadas', value: stats.confirmados, badge: 'Mesas garantidas', badgeColor: 'text-green-400' },
                { icon: '⏳', label: 'Pendentes', value: stats.pendentes, badge: 'Confirmar urgente', badgeColor: 'text-orange-400' },
              ].map((stat, i) => (
                <div key={i} className="rounded-xl p-6 border" style={{ background: '#111110', borderColor: 'rgba(176,125,86,.12)' }}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{stat.icon}</span>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${stat.badgeColor} bg-opacity-10`}>{stat.badge}</span>
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Gráfico de Barras */}
            <div className="rounded-xl p-6 border" style={{ background: '#111110', borderColor: 'rgba(176,125,86,.12)' }}>
              <h3 className="text-lg font-semibold text-white mb-4">📅 Reservas por Data</h3>
              <div className="space-y-3">
                {porData.map((d, i) => {
                  const maxPessoas = Math.max(...porData.map(pd => pd.pessoas))
                  const width = (d.pessoas / maxPessoas) * 100
                  return (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-24 text-sm text-gray-400">{d.data}</div>
                      <div className="flex-1 h-8 rounded-lg overflow-hidden" style={{ background: '#181814' }}>
                        <div className="h-full rounded-lg flex items-center justify-end pr-3 transition-all duration-500" style={{ width: `${width}%`, background: 'linear-gradient(90deg, #b07d56, #c99a72)' }}>
                          <span className="text-sm font-bold text-white">{d.pessoas} pessoas</span>
                        </div>
                      </div>
                      <div className="w-16 text-sm text-gray-500 text-right">{d.total} reservas</div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Reservas Recentes */}
            <div className="rounded-xl p-6 border" style={{ background: '#111110', borderColor: 'rgba(176,125,86,.12)' }}>
              <h3 className="text-lg font-semibold text-white mb-4">⏰ Reservas Recentes</h3>
              <div className="space-y-3">
                {reservationsMock.slice(0, 5).map((res, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer" onClick={() => { setAbaAtiva('reservas'); setReservaExpandida(res.id) }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold text-white" style={{ background: '#b07d56' }}>
                        {res.nome.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-white">{res.nome}</div>
                        <div className="text-sm text-gray-500">{res.data} às {res.horario} · {res.pessoas} pessoas</div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusStyles[res.status]}`}>
                      {statusLabels[res.status]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Reservas */}
        {abaAtiva === 'reservas' && (
          <div className="space-y-6">
            {/* Filtros */}
            <div className="flex flex-wrap gap-3">
              <select
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value)}
                className="px-4 py-2 rounded-lg text-sm font-medium border bg-white/5 text-white"
                style={{ borderColor: 'rgba(176,125,86,.2)', background: '#111110' }}
              >
                <option value="todos">Todos os Status</option>
                <option value="novo">🆕 Novos</option>
                <option value="pendente">⏳ Pendentes</option>
                <option value="confirmado">✅ Confirmados</option>
                <option value="contatado">📞 Contatados</option>
                <option value="cancelado">❌ Cancelados</option>
              </select>
              <select
                value={filtroData}
                onChange={(e) => setFiltroData(e.target.value)}
                className="px-4 py-2 rounded-lg text-sm font-medium border bg-white/5 text-white"
                style={{ borderColor: 'rgba(176,125,86,.2)', background: '#111110' }}
              >
                <option value="todos">Todas as Datas</option>
                {datasUnicas.map(data => (
                  <option key={data} value={data}>{data}</option>
                ))}
              </select>
            </div>

            {/* Tabela */}
            <div className="rounded-xl border overflow-hidden" style={{ background: '#111110', borderColor: 'rgba(176,125,86,.12)' }}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ background: '#181814' }}>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Cliente</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Data/Hora</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Pessoas</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Ocasiação</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{ borderColor: 'rgba(176,125,86,.1)' }}>
                    {reservasFiltradas.map((res) => (
                      <>
                        <tr key={res.id} className="hover:bg-white/5 transition-colors cursor-pointer" onClick={() => setReservaExpandida(reservaExpandida === res.id ? null : res.id)}>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold" style={{ background: 'rgba(176,125,86,.2)', color: '#b07d56' }}>
                                {res.nome.charAt(0)}
                              </div>
                              <div>
                                <div className="font-medium text-white">{res.nome}</div>
                                <div className="text-sm text-gray-500">{res.whatsapp}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-white">{res.data}</div>
                            <div className="text-sm text-gray-500">{res.horario}</div>
                          </td>
                          <td className="px-6 py-4 text-white">{res.pessoas}</td>
                          <td className="px-6 py-4 text-gray-400 text-sm">{res.ocasiao || '-'}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusStyles[res.status]}`}>
                              {statusLabels[res.status]}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button className="text-gray-400 hover:text-white">
                              {reservaExpandida === res.id ? '▲' : '▼'}
                            </button>
                          </td>
                        </tr>
                        {reservaExpandida === res.id && (
                          <tr>
                            <td colSpan={6} className="px-6 py-4" style={{ background: '#181814' }}>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <h4 className="text-sm font-medium text-gray-400 mb-2">📧 Contato</h4>
                                  <p className="text-white">{res.email}</p>
                                  <p className="text-white">{res.whatsapp}</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium text-gray-400 mb-2">📝 Detalhes</h4>
                                  <p className="text-white">{res.ocasiao || 'Sem observações especiais'}</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium text-gray-400 mb-2">⏰ Criado em</h4>
                                  <p className="text-white">{res.createdAt}</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium text-gray-400 mb-2">⚡ Ações Rápidas</h4>
                                  <div className="flex gap-2">
                                    <a href={`https://wa.me/55${res.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                      WhatsApp
                                    </a>
                                    <button onClick={() => alert('Email enviado para ' + res.email)} className="px-3 py-1 text-sm border rounded-lg hover:bg-white/5 transition-colors" style={{ borderColor: 'rgba(176,125,86,.3)', color: '#b07d56' }}>
                                      Email
                                    </button>
                                  </div>
                                </div>
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

            {/* Stats */}
            <div className="text-center text-sm text-gray-500">
              Mostrando {reservasFiltradas.length} de {reservationsMock.length} reservas
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
