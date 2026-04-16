import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'

const SERVICOS = [
  { id: 1, nome: 'Corte Executivo', duracao: 45, preco: 80, desc: 'Corte personalizado com finalização completa', iconType: 'scissors' },
  { id: 2, nome: 'Barba Artesanal', duracao: 30, preco: 50, desc: 'Aparar, modelar e hidratar com produtos premium', iconType: 'razor' },
  { id: 3, nome: 'Corte + Barba', duracao: 60, preco: 120, desc: 'Combo completo com corte e barba artesanal', destaque: true, iconType: 'combo' },
  { id: 4, nome: 'Sobrancelha', duracao: 15, preco: 30, desc: 'Design e modelagem com pinça e navalha', iconType: 'brow' },
  { id: 5, nome: 'Hidratação Capilar', duracao: 40, preco: 65, desc: 'Tratamento profundo com máscara nutritiva', iconType: 'drop' },
  { id: 6, nome: 'Pigmentação', duracao: 50, preco: 90, desc: 'Coloração e pigmentação sob medida', iconType: 'brush' },
]

const ICONS = {
  scissors: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><line x1="20" y1="4" x2="8.12" y2="15.88" /><line x1="14.47" y1="14.48" x2="20" y2="20" /><line x1="8.12" y1="8.12" x2="12" y2="12" />
    </svg>
  ),
  razor: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="2" width="18" height="6" rx="2" /><line x1="12" y1="8" x2="12" y2="22" /><line x1="7" y1="12" x2="17" y2="12" /><line x1="7" y1="16" x2="17" y2="16" />
    </svg>
  ),
  combo: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" /><line x1="9" y1="2" x2="9" y2="6" /><line x1="15" y1="2" x2="15" y2="6" />
    </svg>
  ),
  brow: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
  ),
  drop: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
    </svg>
  ),
  brush: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.04-.23-.29-.38-.63-.38-1.04 0-.84.67-1.5 1.5-1.5H16c3.31 0 6-2.69 6-6 0-5.5-4.5-9.92-10-9.92z" />
      <circle cx="7.5" cy="11.5" r="1.5" /><circle cx="10.5" cy="7.5" r="1.5" /><circle cx="15.5" cy="7.5" r="1.5" /><circle cx="16.5" cy="11.5" r="1.5" />
    </svg>
  ),
}

const HORARIOS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00', '18:30', '19:00',
]
const OCUPADOS = ['10:00', '14:30', '16:00', '18:00']

const PROFISSIONAIS = [
  { id: 1, nome: 'Rafael Mendes', especialidade: 'Corte & Barba', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' },
  { id: 2, nome: 'Lucas Ferreira', especialidade: 'Coloração', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face' },
]

function CalendarGrid({ selectedDay, onSelect }) {
  const hoje = new Date()
  const ano = hoje.getFullYear()
  const mes = hoje.getMonth()
  const diasNoMes = new Date(ano, mes + 1, 0).getDate()
  const primeiroDia = new Date(ano, mes, 1).getDay()
  const nomesMeses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
  const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

  const dias = []
  for (let i = 0; i < primeiroDia; i++) dias.push(null)
  for (let d = 1; d <= diasNoMes; d++) {
    const date = new Date(ano, mes, d)
    const isPast = date < new Date(ano, mes, hoje.getDate())
    const isSunday = date.getDay() === 0
    dias.push({ day: d, disabled: isPast || isSunday })
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span style={{ fontFamily: "'Libre Baskerville', serif", fontWeight: 700, color: 'var(--ag-charcoal)', fontSize: 18 }}>
          {nomesMeses[mes]} {ano}
        </span>
        <div style={{
          background: 'var(--ag-sage)',
          padding: '6px 14px',
          borderRadius: 10,
          fontSize: 12,
          color: 'var(--ag-gold)',
          fontWeight: 600,
        }}>
          Horário de Brasília
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: 4,
        marginBottom: 8,
      }}>
        {diasSemana.map((d) => (
          <div key={d} style={{ textAlign: 'center', fontSize: 11, fontWeight: 600, color: 'var(--ag-gold)', opacity: 0.6, padding: '8px 0', letterSpacing: '0.05em' }}>
            {d}
          </div>
        ))}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: 4,
      }}>
        {dias.map((d, i) => (
          <div key={i} style={{ aspectRatio: '1' }}>
            {d && (
              <button
                disabled={d.disabled}
                onClick={() => !d.disabled && onSelect(d.day)}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 12,
                  border: selectedDay === d.day ? '2px solid var(--ag-gold)' : '1.5px solid var(--ag-border)',
                  background: selectedDay === d.day
                    ? 'var(--ag-gold)'
                    : d.disabled ? 'transparent' : 'var(--ag-card)',
                  color: selectedDay === d.day
                    ? '#121010'
                    : d.disabled ? 'rgba(245,237,228,0.15)' : 'var(--ag-charcoal)',
                  fontWeight: selectedDay === d.day ? 700 : 500,
                  fontSize: 14,
                  cursor: d.disabled ? 'default' : 'pointer',
                  transition: 'all 0.25s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Karla', sans-serif",
                  opacity: d.disabled ? 0.4 : 1,
                }}
              >
                {d.day}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function SistemaAgendamento() {
  const [step, setStep] = useState(1)
  const [servicoSelecionado, setServicoSelecionado] = useState(null)
  const [profissionalSelecionado, setProfissionalSelecionado] = useState(null)
  const [diaSelecionado, setDiaSelecionado] = useState(null)
  const [horarioSelecionado, setHorarioSelecionado] = useState(null)
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [confirmado, setConfirmado] = useState(false)

  const servico = SERVICOS.find((s) => s.id === servicoSelecionado)
  const prof = PROFISSIONAIS.find((p) => p.id === profissionalSelecionado)
  const hoje = new Date()
  const dataFormatada = diaSelecionado
    ? `${diaSelecionado} de ${['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'][hoje.getMonth()]}`
    : ''

  const podeAvancar = useMemo(() => {
    if (step === 1) return servicoSelecionado && profissionalSelecionado
    if (step === 2) return diaSelecionado && horarioSelecionado
    if (step === 3) return nome.length >= 2 && telefone.length >= 10
    return false
  }, [step, servicoSelecionado, profissionalSelecionado, diaSelecionado, horarioSelecionado, nome, telefone])

  const avancar = () => {
    if (podeAvancar && step < 3) setStep(step + 1)
  }
  const voltar = () => { if (step > 1) setStep(step - 1) }

  const stepsLabels = ['Serviço', 'Agenda', 'Confirmar']

  return (
    <div className="ag-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Karla:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');

        .ag-page {
          font-family: 'Karla', sans-serif;
          background: var(--ag-bg);
          min-height: 100vh;
          --ag-gold: #C9A96E;
          --ag-gold-light: #D4B87A;
          --ag-gold-soft: rgba(201,169,110,0.08);
          --ag-gold-glow: rgba(201,169,110,0.15);
          --ag-red: #8B2020;
          --ag-red-light: #A63030;
          --ag-bg: #121010;
          --ag-surface: #1A1616;
          --ag-card: #1E1A1A;
          --ag-card-hover: #252020;
          --ag-cream: #F5EDE4;
          --ag-charcoal: #F5EDE4;
          --ag-muted: rgba(245,237,228,0.4);
          --ag-border: rgba(201,169,110,0.1);
          --ag-sage: rgba(201,169,110,0.06);
        }

        .ag-page * { box-sizing: border-box; }

        .ag-noise {
          position: fixed; inset: 0; pointer-events: none; z-index: 1; opacity: 0.25;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
        }

        .ag-blob {
          position: fixed; pointer-events: none; z-index: 0; border-radius: 50%; filter: blur(90px);
        }
        .ag-blob-1 { top: -10%; right: -5%; width: 40vw; height: 35vh; background: radial-gradient(ellipse, rgba(201,169,110,0.06) 0%, transparent 70%); }
        .ag-blob-2 { bottom: -8%; left: -8%; width: 35vw; height: 30vh; background: radial-gradient(ellipse, rgba(139,32,32,0.05) 0%, transparent 70%); }

        .ag-back {
          display: inline-flex; align-items: center; gap: 8px;
          color: var(--ag-muted); font-size: 14px; font-weight: 500;
          text-decoration: none; transition: color 0.2s; padding: 8px 0;
        }
        .ag-back:hover { color: var(--ag-gold); }

        /* Progress */
        .ag-progress-wrap {
          display: flex; align-items: center; justify-content: center; gap: 0;
          margin-bottom: 40px;
        }
        .ag-step-dot {
          width: 40px; height: 40px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 14px; transition: all 0.4s;
          position: relative; z-index: 2;
          font-family: 'Karla', sans-serif;
        }
        .ag-step-dot.active {
          background: var(--ag-gold); color: #121010;
          box-shadow: 0 4px 16px rgba(201,169,110,0.3);
        }
        .ag-step-dot.done {
          background: var(--ag-gold-light); color: #121010;
        }
        .ag-step-dot.pending {
          background: var(--ag-sage); color: var(--ag-muted);
        }
        .ag-step-line {
          width: 80px; height: 3px; border-radius: 100px;
          background: var(--ag-border); position: relative; z-index: 1;
        }
        .ag-step-line.done { background: var(--ag-teal-light); }
        .ag-step-label {
          font-size: 11px; font-weight: 600; color: var(--ag-muted);
          letter-spacing: 0.06em; text-transform: uppercase;
          margin-top: 8px; text-align: center;
          transition: color 0.3s;
        }
        .ag-step-label.active { color: var(--ag-gold); }

        /* Service cards */
        .ag-serv-card {
          background: var(--ag-card); border: 1.5px solid var(--ag-border);
          border-radius: 18px; padding: 20px;
          cursor: pointer; transition: all 0.35s cubic-bezier(0.25,0.46,0.45,0.94);
          position: relative; overflow: hidden;
        }
        .ag-serv-card:hover {
          border-color: rgba(201,169,110,0.2);
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
          transform: translateY(-3px);
        }
        .ag-serv-card.selected {
          border-color: var(--ag-gold);
          background: linear-gradient(135deg, rgba(201,169,110,0.06), rgba(201,169,110,0.02));
          box-shadow: 0 8px 28px rgba(201,169,110,0.1);
        }
        .ag-serv-card.selected::after {
          content: '✓';
          position: absolute; top: 12px; right: 14px;
          background: var(--ag-gold); color: #121010;
          width: 24px; height: 24px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 700;
        }
        .ag-serv-destaque {
          position: absolute; top: 12px; left: 14px;
          background: var(--ag-red); color: white;
          font-size: 9px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; padding: 4px 12px; border-radius: 100px;
        }

        /* Professional cards */
        .ag-prof-card {
          display: flex; align-items: center; gap: 14px;
          background: var(--ag-card); border: 1.5px solid var(--ag-border);
          border-radius: 16px; padding: 14px 18px;
          cursor: pointer; transition: all 0.3s;
        }
        .ag-prof-card:hover { border-color: rgba(201,169,110,0.15); }
        .ag-prof-card.selected {
          border-color: var(--ag-gold);
          background: rgba(201,169,110,0.04);
        }

        /* Time slots */
        .ag-time-btn {
          padding: 10px 8px; border-radius: 12px;
          border: 1.5px solid var(--ag-border);
          background: var(--ag-card); color: var(--ag-charcoal);
          font-family: 'Karla', sans-serif; font-weight: 600; font-size: 14px;
          cursor: pointer; transition: all 0.25s; text-align: center;
        }
        .ag-time-btn:hover:not(:disabled) {
          border-color: var(--ag-gold); color: var(--ag-gold);
        }
        .ag-time-btn.selected {
          background: var(--ag-gold); color: #121010; border-color: var(--ag-gold);
          box-shadow: 0 4px 12px rgba(201,169,110,0.25);
        }
        .ag-time-btn:disabled {
          opacity: 0.25; cursor: default; text-decoration: line-through;
        }

        /* Buttons */
        .ag-btn-primary {
          background: var(--ag-gold); color: #121010;
          border: none; border-radius: 14px;
          padding: 14px 32px; font-family: 'Karla', sans-serif;
          font-weight: 700; font-size: 15px; cursor: pointer;
          transition: all 0.3s; letter-spacing: 0.02em;
        }
        .ag-btn-primary:hover:not(:disabled) {
          background: var(--ag-gold-light);
          box-shadow: 0 6px 20px rgba(201,169,110,0.3);
          transform: translateY(-2px);
        }
        .ag-btn-primary:disabled {
          opacity: 0.35; cursor: default;
        }
        .ag-btn-secondary {
          background: transparent; color: var(--ag-muted);
          border: 1.5px solid var(--ag-border); border-radius: 14px;
          padding: 14px 28px; font-family: 'Karla', sans-serif;
          font-weight: 600; font-size: 14px; cursor: pointer;
          transition: all 0.3s;
        }
        .ag-btn-secondary:hover { border-color: var(--ag-gold); color: var(--ag-gold); }

        /* WhatsApp mockup */
        .ag-wa-mockup {
          background: #DCF8C6; border-radius: 14px;
          padding: 14px 18px; max-width: 320px;
          position: relative; margin-left: auto;
        }
        .ag-wa-mockup::before {
          content: ''; position: absolute; top: 0; right: -6px;
          width: 0; height: 0;
          border-left: 8px solid #DCF8C6;
          border-bottom: 8px solid transparent;
        }
        .ag-wa-mockup-time {
          font-size: 10px; color: rgba(0,0,0,0.35);
          text-align: right; margin-top: 6px;
        }

        /* Input */
        .ag-input {
          width: 100%; padding: 14px 18px;
          border: 1.5px solid var(--ag-border);
          border-radius: 14px; background: var(--ag-card);
          font-family: 'Karla', sans-serif; font-size: 15px;
          color: var(--ag-charcoal); outline: none;
          transition: border-color 0.3s;
        }
        .ag-input:focus { border-color: var(--ag-gold); }
        .ag-input::placeholder { color: var(--ag-muted); }

        .ag-label {
          font-size: 12px; font-weight: 700; color: var(--ag-gold);
          letter-spacing: 0.08em; text-transform: uppercase;
          margin-bottom: 8px; display: block;
        }

        /* Success */
        .ag-success-check {
          width: 80px; height: 80px; border-radius: 50%;
          background: linear-gradient(135deg, var(--ag-gold), var(--ag-gold-light));
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 24px;
          animation: agPopIn 0.5s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes agPopIn {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        .ag-divider {
          border: none; height: 1px;
          background: linear-gradient(90deg, transparent, var(--ag-border), transparent);
          margin: 24px 0;
        }

        /* Fade-in animation */
        .ag-fade-in {
          animation: agFadeIn 0.5s ease both;
        }
        @keyframes agFadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .ag-footer {
          text-align: center; padding: 28px 24px;
          border-top: 1px solid var(--ag-border);
          background: var(--ag-bg);
        }

        /* Scrollbar */
        .ag-page ::-webkit-scrollbar { width: 3px; }
        .ag-page ::-webkit-scrollbar-track { background: transparent; }
        .ag-page ::-webkit-scrollbar-thumb { background: rgba(45,52,54,0.08); border-radius: 100px; }

        @media (max-width: 640px) {
          .ag-step-line { width: 40px !important; }
          .ag-serv-grid { grid-template-columns: 1fr !important; }
          .ag-two-col { grid-template-columns: 1fr !important; }
          .ag-main-wrap { padding: 16px !important; }
        }
      `}</style>

      {/* Ambient */}
      <div className="ag-noise" />
      <div className="ag-blob ag-blob-1" />
      <div className="ag-blob ag-blob-2" />

      {/* Back */}
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '16px 24px 0' }}>
        <Link to="/" className="ag-back">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Voltar
        </Link>
      </div>

      {/* Main Content */}
      <div className="ag-main-wrap" style={{ maxWidth: 720, margin: '0 auto', padding: '16px 24px 40px', position: 'relative', zIndex: 2 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 12, marginTop: 8 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ag-red)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>
            Studio Barber
          </p>
          <h1 style={{
            fontFamily: "'Libre Baskerville', serif",
            fontWeight: 700,
            color: 'var(--ag-charcoal)',
            fontSize: 32,
            lineHeight: 1.15,
            marginBottom: 6,
          }}>
            Agende seu horário
          </h1>
          <p style={{ color: 'var(--ag-muted)', fontSize: 15 }}>
            Selecione o serviço, escolha a data e confirme
          </p>
        </div>

        {!confirmado ? (
          <>
            {/* Progress Steps */}
            <div className="ag-progress-wrap">
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className={`ag-step-dot ${
                      step === i + 1 ? 'active' : step > i + 1 ? 'done' : 'pending'
                    }`}>
                      {step > i + 1 ? '✓' : i + 1}
                    </div>
                    <span className={`ag-step-label ${step === i + 1 ? 'active' : ''}`}>
                      {stepsLabels[i]}
                    </span>
                  </div>
                  {i < 2 && (
                    <div className={`ag-step-line ${step > i + 1 ? 'done' : ''}`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Serviço + Profissional */}
            {step === 1 && (
              <div className="ag-fade-in">
                <h2 style={{
                  fontFamily: "'Libre Baskerville', serif",
                  color: 'var(--ag-charcoal)',
                  fontSize: 22,
                  fontWeight: 700,
                  marginBottom: 20,
                }}>
                  Escolha o serviço
                </h2>

                <div className="ag-serv-grid" style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 14,
                  marginBottom: 32,
                }}>
                  {SERVICOS.map((s) => (
                    <div
                      key={s.id}
                      className={`ag-serv-card ${servicoSelecionado === s.id ? 'selected' : ''}`}
                      onClick={() => setServicoSelecionado(s.id)}
                    >
                      {s.destaque && <span className="ag-serv-destaque">Popular</span>}
                      <div style={{ marginBottom: 10, color: 'var(--ag-gold)', opacity: 0.8 }}>{ICONS[s.iconType]}</div>
                      <div style={{ fontWeight: 700, color: 'var(--ag-charcoal)', fontSize: 15, marginBottom: 4 }}>
                        {s.nome}
                      </div>
                      <div style={{ color: 'var(--ag-muted)', fontSize: 12, marginBottom: 10, lineHeight: 1.5 }}>
                        {s.desc}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontFamily: "'Libre Baskerville', serif", fontWeight: 700, color: 'var(--ag-gold)', fontSize: 18 }}>
                          R${s.preco}
                        </span>
                        <span style={{ fontSize: 11, color: 'var(--ag-muted)', fontWeight: 500 }}>
                          {s.duracao}min
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Profissional */}
                <h2 style={{
                  fontFamily: "'Libre Baskerville', serif",
                  color: 'var(--ag-charcoal)',
                  fontSize: 22,
                  fontWeight: 700,
                  marginBottom: 16,
                }}>
                  Com quem?
                </h2>

                <div style={{ display: 'flex', gap: 14, marginBottom: 32 }}>
                  {PROFISSIONAIS.map((p) => (
                    <div
                      key={p.id}
                      className={`ag-prof-card ${profissionalSelecionado === p.id ? 'selected' : ''}`}
                      onClick={() => setProfissionalSelecionado(p.id)}
                      style={{ flex: 1 }}
                    >
                      <img
                        src={p.img}
                        alt={p.nome}
                        style={{
                          width: 48, height: 48, borderRadius: 14, objectFit: 'cover',
                          border: profissionalSelecionado === p.id ? '2px solid var(--ag-gold)' : '2px solid var(--ag-border)',
                          transition: 'border-color 0.3s',
                        }}
                      />
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--ag-charcoal)', fontSize: 14 }}>{p.nome}</div>
                        <div style={{ color: 'var(--ag-muted)', fontSize: 12 }}>{p.especialidade}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button className="ag-btn-primary" onClick={avancar} disabled={!podeAvancar}>
                    Continuar →
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Data + Horário */}
            {step === 2 && (
              <div className="ag-fade-in">
                <div className="ag-two-col" style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 24,
                  marginBottom: 32,
                }}>
                  {/* Calendar */}
                  <div style={{
                    background: 'var(--ag-card)',
                    border: '1px solid var(--ag-border)',
                    borderRadius: 20,
                    padding: 20,
                  }}>
                    <CalendarGrid selectedDay={diaSelecionado} onSelect={setDiaSelecionado} />
                  </div>

                  {/* Time Slots */}
                  <div>
                    <div style={{
                      fontFamily: "'Libre Baskerville', serif",
                      fontWeight: 700, color: 'var(--ag-charcoal)',
                      fontSize: 16, marginBottom: 16,
                    }}>
                      Horários disponíveis
                    </div>

                    {diaSelecionado ? (
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: 8,
                      }}>
                        {HORARIOS.map((h) => {
                          const ocupado = OCUPADOS.includes(h)
                          return (
                            <button
                              key={h}
                              className={`ag-time-btn ${horarioSelecionado === h ? 'selected' : ''}`}
                              disabled={ocupado}
                              onClick={() => setHorarioSelecionado(h)}
                            >
                              {h}
                            </button>
                          )
                        })}
                      </div>
                    ) : (
                      <div style={{
                        textAlign: 'center',
                        padding: '48px 20px',
                        color: 'var(--ag-muted)',
                        fontSize: 14,
                        background: 'var(--ag-sage)',
                        borderRadius: 16,
                      }}>
                        <div style={{ fontSize: 28, marginBottom: 12, color: 'var(--ag-gold)', opacity: 0.6 }}>📅</div>
                        Selecione uma data<br />para ver os horários
                      </div>
                    )}

                    {/* Resumo rápido */}
                    {servico && (
                      <div style={{
                        marginTop: 20,
                        padding: '14px 16px',
                        background: 'var(--ag-sage)',
                        borderRadius: 14,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                      }}>
                        <span style={{ color: 'var(--ag-gold)', display: 'flex' }}>{ICONS[servico.iconType]}</span>
                        <div>
                          <div style={{ fontWeight: 700, color: 'var(--ag-charcoal)', fontSize: 14 }}>
                            {servico.nome}
                          </div>
                          <div style={{ color: 'var(--ag-muted)', fontSize: 12 }}>
                            {servico.duracao}min • R${servico.preco} • {prof?.nome}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <button className="ag-btn-secondary" onClick={voltar}>← Voltar</button>
                  <button className="ag-btn-primary" onClick={avancar} disabled={!podeAvancar}>
                    Continuar →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Confirmar */}
            {step === 3 && (
              <div className="ag-fade-in">
                <div style={{
                  background: 'var(--ag-card)',
                  border: '1px solid var(--ag-border)',
                  borderRadius: 24,
                  padding: 32,
                  marginBottom: 24,
                }}>
                  <h2 style={{
                    fontFamily: "'Libre Baskerville', serif",
                    color: 'var(--ag-charcoal)',
                    fontSize: 22,
                    fontWeight: 700,
                    marginBottom: 24,
                  }}>
                    Seus dados
                  </h2>

                  <div style={{ marginBottom: 18 }}>
                    <label className="ag-label">Nome completo</label>
                    <input
                      className="ag-input"
                      placeholder="Digite seu nome"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="ag-label">WhatsApp</label>
                    <input
                      className="ag-input"
                      placeholder="(21) 99999-9999"
                      value={telefone}
                      onChange={(e) => setTelefone(e.target.value)}
                    />
                  </div>
                </div>

                {/* Resumo do agendamento */}
                <div style={{
                  background: 'var(--ag-card)',
                  border: '1px solid var(--ag-border)',
                  borderRadius: 24,
                  padding: 28,
                  marginBottom: 24,
                }}>
                  <h3 style={{
                    fontFamily: "'Libre Baskerville', serif",
                    color: 'var(--ag-charcoal)',
                    fontSize: 18,
                    fontWeight: 700,
                    marginBottom: 20,
                  }}>
                    Resumo
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: 'var(--ag-muted)', fontSize: 14 }}>Serviço</span>
                      <span style={{ fontWeight: 700, color: 'var(--ag-charcoal)', fontSize: 14 }}>
                        {servico?.nome}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: 'var(--ag-muted)', fontSize: 14 }}>Profissional</span>
                      <span style={{ fontWeight: 700, color: 'var(--ag-charcoal)', fontSize: 14 }}>
                        {prof?.nome}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: 'var(--ag-muted)', fontSize: 14 }}>Data</span>
                      <span style={{ fontWeight: 700, color: 'var(--ag-charcoal)', fontSize: 14 }}>
                        {dataFormatada}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: 'var(--ag-muted)', fontSize: 14 }}>Horário</span>
                      <span style={{ fontWeight: 700, color: 'var(--ag-gold)', fontSize: 14 }}>
                        {horarioSelecionado}
                      </span>
                    </div>

                    <hr className="ag-divider" />

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 600, color: 'var(--ag-charcoal)', fontSize: 15 }}>Total</span>
                      <span style={{
                        fontFamily: "'Libre Baskerville', serif",
                        fontWeight: 700,
                        color: 'var(--ag-gold)',
                        fontSize: 26,
                      }}>
                        R${servico?.preco}
                      </span>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Preview */}
                <div style={{
                  background: '#ECE5DD',
                  borderRadius: 20,
                  padding: 20,
                  marginBottom: 24,
                }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    marginBottom: 14, color: 'rgba(0,0,0,0.4)',
                    fontSize: 12, fontWeight: 600,
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Você receberá esta confirmação:
                  </div>

                  <div className="ag-wa-mockup">
                    <div style={{ fontSize: 14, color: '#1B1B1B', lineHeight: 1.6 }}>
                      <strong>Studio Barber</strong><br /><br />
                      ✅ Agendamento confirmado!<br /><br />
                      📋 {servico?.nome}<br />
                      👤 {prof?.nome}<br />
                      📅 {dataFormatada}<br />
                      🕐 {horarioSelecionado}<br />
                      💰 R${servico?.preco}<br /><br />
                      Enviaremos um lembrete 1h antes do seu horário. Até logo! ✂️
                    </div>
                    <div className="ag-wa-mockup-time">09:41 ✓✓</div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <button className="ag-btn-secondary" onClick={voltar}>← Voltar</button>
                  <button
                    className="ag-btn-primary"
                    disabled={!podeAvancar}
                    onClick={() => setConfirmado(true)}
                    style={{ background: podeAvancar ? 'var(--ag-red)' : undefined }}
                  >
                    Confirmar Agendamento
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          /* Tela de Sucesso */
          <div className="ag-fade-in" style={{ textAlign: 'center', padding: '48px 0' }}>
            <div className="ag-success-check">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>

            <h2 style={{
              fontFamily: "'Libre Baskerville', serif",
              color: 'var(--ag-charcoal)',
              fontSize: 28,
              fontWeight: 700,
              marginBottom: 8,
            }}>
              Agendamento Confirmado!
            </h2>
            <p style={{ color: 'var(--ag-muted)', fontSize: 15, marginBottom: 32, maxWidth: 360, margin: '0 auto 32px' }}>
              Enviamos a confirmação para seu WhatsApp. Você receberá um lembrete 1h antes.
            </p>

            <div style={{
              background: 'var(--ag-card)',
              border: '1px solid var(--ag-border)',
              borderRadius: 24,
              padding: 28,
              maxWidth: 400,
              margin: '0 auto',
              textAlign: 'left',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--ag-muted)', fontSize: 13 }}>Serviço</span>
                  <span style={{ fontWeight: 700, color: 'var(--ag-charcoal)', fontSize: 13 }}>{servico?.icon} {servico?.nome}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--ag-muted)', fontSize: 13 }}>Profissional</span>
                  <span style={{ fontWeight: 700, color: 'var(--ag-charcoal)', fontSize: 13 }}>{prof?.nome}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--ag-muted)', fontSize: 13 }}>Data</span>
                  <span style={{ fontWeight: 700, color: 'var(--ag-charcoal)', fontSize: 13 }}>{dataFormatada}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--ag-muted)', fontSize: 13 }}>Horário</span>
                  <span style={{ fontWeight: 700, color: 'var(--ag-gold)', fontSize: 14 }}>{horarioSelecionado}</span>
                </div>
              </div>
            </div>

            <button
              className="ag-btn-primary"
              onClick={() => {
                setConfirmado(false)
                setStep(1)
                setServicoSelecionado(null)
                setProfissionalSelecionado(null)
                setDiaSelecionado(null)
                setHorarioSelecionado(null)
                setNome('')
                setTelefone('')
              }}
              style={{ marginTop: 32 }}
            >
              Novo Agendamento
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="ag-footer">
        <p style={{ color: 'rgba(245,237,228,0.2)', fontSize: 12, letterSpacing: '0.1em' }}>
          Powered by <span style={{ color: 'var(--ag-gold)', fontWeight: 600 }}>Sistema de Agendamento</span>
        </p>
      </div>
    </div>
  )
}
