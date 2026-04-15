import { useState } from 'react'
import { Link } from 'react-router-dom'

// Dados mockados de agendamentos
const agendamentosMock = [
  {
    id: 1,
    nome: 'Marina Costa',
    whatsapp: '(11) 98765-4321',
    email: 'marina.costa@email.com',
    problema: 'estetica',
    area: 'frontal',
    duracao: 'meses',
    data: '15/04/2026',
    horario: '10:00',
    status: 'confirmado',
    createdAt: '14/04/2026 14:30'
  },
  {
    id: 2,
    nome: 'Ricardo Santos',
    whatsapp: '(11) 97654-3210',
    email: 'ricardo.santos@email.com',
    problema: 'dor',
    area: 'lados',
    duracao: 'agora',
    data: '16/04/2026',
    horario: '14:00',
    status: 'pendente',
    createdAt: '14/04/2026 16:45'
  },
  {
    id: 3,
    nome: 'Ana Luísa',
    whatsapp: '(11) 96543-2109',
    email: 'ana.luiza@email.com',
    problema: 'reposicao',
    area: 'todos',
    duracao: 'semanas',
    data: '17/04/2026',
    horario: '09:00',
    status: 'confirmado',
    createdAt: '14/04/2026 18:20'
  },
  {
    id: 4,
    nome: 'Carlos Mendes',
    whatsapp: '(11) 95432-1098',
    email: 'carlos.mendes@email.com',
    problema: 'checkup',
    area: 'frontal',
    duracao: 'meses',
    data: '18/04/2026',
    horario: '11:00',
    status: 'cancelado',
    createdAt: '14/04/2026 19:10'
  },
]

// Dados mockados de leads
const leadsMock = [
  {
    id: 1,
    nome: 'Fernanda Oliveira',
    whatsapp: '(11) 94321-0987',
    email: 'fernanda.oliveira@email.com',
    interesse: 'Clareamento',
    origem: 'Instagram',
    status: 'novo',
    createdAt: '14/04/2026 12:00'
  },
  {
    id: 2,
    nome: 'Roberto Lima',
    whatsapp: '(11) 93210-9876',
    email: 'roberto.lima@email.com',
    interesse: 'Implantes',
    origem: 'Google',
    status: 'contactado',
    createdAt: '13/04/2026 10:30'
  },
]

const problemLabels = {
  dor: 'Dor ou desconforto',
  estetica: 'Melhorar estética',
  reposicao: 'Repor dente',
  checkup: 'Check-up preventivo'
}

const areaLabels = {
  frontal: 'Dentes da frente',
  lados: 'Dentes dos lados',
  gengiva: 'Gengivas',
  todos: 'Toda a boca'
}

const statusStyles = {
  confirmado: 'bg-green-100 text-green-700',
  pendente: 'bg-yellow-100 text-yellow-700',
  cancelado: 'bg-red-100 text-red-700',
  novo: 'bg-blue-100 text-blue-700',
  contactado: 'bg-purple-100 text-purple-700'
}

// Dados para gráficos
const chartData = {
  agendamentosPorDia: [
    { dia: 'Seg', quantidade: 3 },
    { dia: 'Ter', quantidade: 5 },
    { dia: 'Qua', quantidade: 4 },
    { dia: 'Qui', quantidade: 6 },
    { dia: 'Sex', quantidade: 8 },
  ],
  problemas: [
    { label: 'Estética', valor: 35, cor: '#2A9D8F' },
    { label: 'Dor', valor: 25, cor: '#E76F51' },
    { label: 'Check-up', valor: 20, cor: '#F4A261' },
    { label: 'Reposição', valor: 20, cor: '#264653' },
  ],
  status: [
    { label: 'Confirmados', valor: 2, cor: '#22c55e' },
    { label: 'Pendentes', valor: 1, cor: '#eab308' },
    { label: 'Cancelados', valor: 1, cor: '#ef4444' },
  ],
  leadsPorOrigem: [
    { label: 'Instagram', valor: 45, cor: '#E1306C' },
    { label: 'Google', valor: 30, cor: '#4285F4' },
    { label: 'Indicação', valor: 15, cor: '#34A853' },
    { label: 'Outros', valor: 10, cor: '#9CA3AF' },
  ],
  conversao: [
    { mes: 'Jan', leads: 20, conversoes: 8 },
    { mes: 'Fev', leads: 25, conversoes: 10 },
    { mes: 'Mar', leads: 30, conversoes: 15 },
    { mes: 'Abr', leads: 35, conversoes: 18 },
  ]
}

// Componente de gráfico de barras simples
function BarChart({ data, title, color }) {
  const maxValor = Math.max(...data.map(d => d.valor))

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">{title}</h3>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <span className="text-xs text-gray-600 w-20 truncate">{item.label}</span>
            <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(item.valor / maxValor) * 100}%`,
                  backgroundColor: item.cor || color
                }}
              />
            </div>
            <span className="text-xs font-semibold text-gray-700 w-8 text-right">{item.valor}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Componente de gráfico de linha simples
function LineChart({ data, title }) {
  const maxValor = Math.max(...data.flatMap(d => [d.leads, d.conversoes]))

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">{title}</h3>
      <div className="h-48 flex items-end gap-2">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col gap-1">
            <div className="flex gap-1 items-end h-32">
              <div
                className="flex-1 bg-teal-500 rounded-t transition-all duration-500 hover:bg-teal-600"
                style={{ height: `${(item.leads / maxValor) * 100}%` }}
                title={`Leads: ${item.leads}`}
              />
              <div
                className="flex-1 bg-emerald-600 rounded-t transition-all duration-500 hover:bg-emerald-700"
                style={{ height: `${(item.conversoes / maxValor) * 100}%` }}
                title={`Conversões: ${item.conversoes}`}
              />
            </div>
            <span className="text-xs text-gray-500 text-center">{item.mes}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-teal-500 rounded" />
          <span className="text-xs text-gray-600">Leads</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-emerald-600 rounded" />
          <span className="text-xs text-gray-600">Conversões</span>
        </div>
      </div>
    </div>
  )
}

// Componente de gráfico de rosca simples
function DoughnutChart({ data, title }) {
  const total = data.reduce((sum, item) => sum + item.valor, 0)
  let currentAngle = 0

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">{title}</h3>
      <div className="flex items-center gap-6">
        <div className="relative w-32 h-32">
          <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
            {data.map((item, index) => {
              const percentage = (item.valor / total) * 100
              const dashArray = `${percentage} ${100 - percentage}`
              const offset = 100 - currentAngle
              currentAngle += percentage

              return (
                <circle
                  key={index}
                  cx="18"
                  cy="18"
                  r="15.9"
                  fill="none"
                  stroke={item.cor}
                  strokeWidth="3"
                  strokeDasharray={dashArray}
                  strokeDashoffset={offset}
                  className="transition-all duration-500"
                />
              )
            })}
            <text x="18" y="20" textAnchor="middle" className="text-xs font-bold" fill="#374151">
              {total}
            </text>
          </svg>
        </div>
        <div className="flex-1 space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.cor }}
              />
              <span className="text-xs text-gray-600">{item.label}</span>
              <span className="text-xs font-semibold text-gray-700 ml-auto">{item.valor}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function PainelLPDentista() {
  const [abaAtiva, setAbaAtiva] = useState('dashboard')
  const [filtroStatus, setFiltroStatus] = useState('todos')

  const agendamentosFiltrados = agendamentosMock.filter(
    ag => filtroStatus === 'todos' || ag.status === filtroStatus
  )

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Voltar
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <div>
                <h1 className="text-lg font-bold text-gray-900">Painel Administrativo</h1>
                <p className="text-xs text-gray-500">LP Odontologia</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-2 text-sm text-gray-600">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Online
              </span>
              <Link
                to="/projeto/lp-odontologia"
                className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors"
              >
                Ver LP
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Abas */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
          <nav className="flex gap-8 px-6" aria-label="Tabs">
            <button
              onClick={() => setAbaAtiva('dashboard')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                abaAtiva === 'dashboard'
                  ? 'border-teal-600 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              📊 Dashboard
            </button>
            <button
              onClick={() => setAbaAtiva('agendamentos')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                abaAtiva === 'agendamentos'
                  ? 'border-teal-600 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              📅 Agendamentos ({agendamentosMock.length})
            </button>
            <button
              onClick={() => setAbaAtiva('leads')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                abaAtiva === 'leads'
                  ? 'border-teal-600 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              👥 Leads ({leadsMock.length})
            </button>
          </nav>
        </div>

        {/* Conteúdo Dashboard */}
        {abaAtiva === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">📅</span>
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+12%</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{agendamentosMock.length}</p>
                <p className="text-sm text-gray-500">Agendamentos</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">✅</span>
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">75%</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {agendamentosMock.filter(a => a.status === 'confirmado').length}
                </p>
                <p className="text-sm text-gray-500">Confirmados</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">👥</span>
                  <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">+8</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{leadsMock.length}</p>
                <p className="text-sm text-gray-500">Leads</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">💬</span>
                  <a
                    href="https://wa.me/5521968410983"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full hover:bg-green-100 transition-colors"
                  >
                    Abrir WhatsApp
                  </a>
                </div>
                <p className="text-2xl font-bold text-gray-900">Rápido</p>
                <p className="text-sm text-gray-500">Contato direto</p>
              </div>
            </div>

            {/* Gráficos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <BarChart data={chartData.problemas} title="Tipos de Problema" />
              <DoughnutChart data={chartData.status} title="Status dos Agendamentos" />
              <DoughnutChart data={chartData.leadsPorOrigem} title="Origem dos Leads" />
              <LineChart data={chartData.conversao} title="Leads vs Conversões" className="md:col-span-2" />
              <BarChart
                data={chartData.agendamentosPorDia.map(d => ({ label: d.dia, valor: d.quantidade * 10 }))}
                title="Agendamentos por Dia da Semana"
                color="#2A9D8F"
              />
            </div>
          </div>
        )}

        {/* Conteúdo Agendamentos */}
        {abaAtiva === 'agendamentos' && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-gray-700">Filtrar por status:</label>
                <select
                  value={filtroStatus}
                  onChange={(e) => setFiltroStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="todos">Todos</option>
                  <option value="confirmado">Confirmados</option>
                  <option value="pendente">Pendentes</option>
                  <option value="cancelado">Cancelados</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paciente</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Problema</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data/Hora</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {agendamentosFiltrados.map((agendamento) => (
                    <tr key={agendamento.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{agendamento.nome}</p>
                          <p className="text-xs text-gray-500">{agendamento.whatsapp}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <p className="text-gray-900">{problemLabels[agendamento.problema]}</p>
                          <p className="text-gray-500">{areaLabels[agendamento.area]}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <p className="text-gray-900">{agendamento.data}</p>
                          <p className="text-gray-500">{agendamento.horario}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[agendamento.status]}`}>
                          {agendamento.status.charAt(0).toUpperCase() + agendamento.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <a
                            href={`https://wa.me/55${agendamento.whatsapp.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs font-medium hover:bg-green-700 transition-colors"
                          >
                            WhatsApp
                          </a>
                          <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors">
                            Detalhes
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Conteúdo Leads */}
        {abaAtiva === 'leads' && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interesse</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Origem</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leadsMock.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{lead.nome}</p>
                          <p className="text-xs text-gray-500">{lead.whatsapp}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900">{lead.interesse}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                          {lead.origem}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[lead.status]}`}>
                          {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <a
                            href={`https://wa.me/55${lead.whatsapp.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs font-medium hover:bg-green-700 transition-colors"
                          >
                            WhatsApp
                          </a>
                          <button className="px-3 py-1.5 bg-teal-600 text-white rounded-lg text-xs font-medium hover:bg-teal-700 transition-colors">
                            Converter
                          </button>
                        </div>
                      </td>
                    </tr>
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
