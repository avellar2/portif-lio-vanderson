import { useState } from 'react'
import { Link } from 'react-router-dom'

const PRODUTOS = [
  { id: 1, nome: 'Nova Pro Headphones', preco: 1299, cat: 'Áudio', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop', badge: 'Novo', specs: { Bateria: '40h', Bluetooth: '5.3', 'ANC': 'Pro', Peso: '250g' }, cores: ['#1A1A1A','#E8E8E8','#8B6F4E'] },
  { id: 2, nome: 'Pulse Smartwatch', preco: 2499, cat: 'Wearables', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop', badge: 'Novo', specs: { Tela: '1.9" AMOLED', Bateria: '7 dias', IP: '68', GPS: 'Dual-band' }, cores: ['#1A1A1A','#C0C0C0','#2D6A4F'] },
  { id: 3, nome: 'Orbit Speaker', preco: 899, cat: 'Áudio', img: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop', specs: { Potência: '30W', Bateria: '12h', BT: '5.2', Peso: '680g' }, cores: ['#1A1A1A','#F5F0EB'] },
  { id: 4, nome: 'Lens Camera X1', preco: 4299, cat: 'Câmera', img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=600&fit=crop', badge: '-20%', badgeColor: 'amber', specs: { Sensor: '61MP FF', Vídeo: '8K', ISO: '51200', Peso: '657g' }, cores: ['#1A1A1A'], precoAntigo: 5399 },
  { id: 5, nome: 'Air Buds Lite', preco: 499, cat: 'Áudio', img: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=600&h=600&fit=crop', specs: { Bateria: '32h total', BT: '5.3', IP: 'X5', Peso: '5.4g' }, cores: ['#F5F0EB','#1A1A1A'] },
  { id: 6, nome: 'Hyper Charger 100W', preco: 349, cat: 'Acessórios', img: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&h=600&fit=crop', specs: { Saída: '100W', Portas: '6', Tech: 'GaN', Peso: '180g' }, cores: ['#1A1A1A','#F5F0EB'] },
  { id: 7, nome: 'View Monitor 4K', preco: 3199, cat: 'Displays', img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&h=600&fit=crop', specs: { Tela: '32" 4K', Hz: '144', HDR: '600', Ports: 'HDMI 2.1' }, cores: ['#1A1A1A','#C0C0C0'] },
  { id: 8, nome: 'Slate Tablet Pro', preco: 5499, cat: 'Wearables', img: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=600&fit=crop', badge: 'Novo', specs: { Tela: '12.9" OLED', Chip: 'M4 Pro', Bateria: '10h', Peso: '682g' }, cores: ['#1A1A1A','#C0C0C0'] },
]

const CATS = ['Todos', 'Áudio', 'Wearables', 'Câmera', 'Displays', 'Acessórios']

// Bento layout positions for each product (col start, col span, row start, row span)
const BENTO = [
  { cs: 1, ce: 7, rs: 1, re: 4 },   // 1 — big left
  { cs: 7, ce: 13, rs: 1, re: 3 },   // 2 — top right
  { cs: 7, ce: 10, rs: 3, re: 5 },   // 3 — mid right top
  { cs: 10, ce: 13, rs: 3, re: 5 },  // 4 — mid right bottom
  { cs: 1, ce: 5, rs: 4, re: 7 },    // 5 — bottom left big
  { cs: 5, ce: 8, rs: 4, re: 7 },    // 6 — bottom mid
  { cs: 8, ce: 13, rs: 5, re: 8 },   // 7 — bottom right wide
  { cs: 1, ce: 8, rs: 7, re: 9 },    // 8 — bottom full
]

export default function LojaTech() {
  const [tela, setTela] = useState('vitrine')
  const [catAtiva, setCatAtiva] = useState('Todos')
  const [carrinho, setCarrinho] = useState([])
  const [carrinhoAberto, setCarrinhoAberto] = useState(false)
  const [produtoAtivo, setProdutoAtivo] = useState(null)
  const [corAtiva, setCorAtiva] = useState(null)
  const [pagamentoOk, setPagamentoOk] = useState(false)

  const produtosFiltrados = catAtiva === 'Todos' ? PRODUTOS : PRODUTOS.filter((p) => p.cat === catAtiva)
  const total = carrinho.reduce((acc, i) => acc + i.preco * i.qtd, 0)
  const totalItens = carrinho.reduce((acc, i) => acc + i.qtd, 0)

  const add = (produto, cor) => {
    const c = cor || produto.cores[0]
    const key = `${produto.id}-${c}`
    setCarrinho((prev) => {
      const ex = prev.find((i) => i.key === key)
      if (ex) return prev.map((i) => i.key === key ? { ...i, qtd: i.qtd + 1 } : i)
      return [...prev, { ...produto, key, cor: c, qtd: 1 }]
    })
    setCarrinhoAberto(true)
  }

  const remove = (key) => {
    setCarrinho((prev) => {
      const item = prev.find((i) => i.key === key)
      if (item?.qtd > 1) return prev.map((i) => i.key === key ? { ...i, qtd: i.qtd - 1 } : i)
      return prev.filter((i) => i.key !== key)
    })
  }

  const verProduto = (p) => {
    setProdutoAtivo(p)
    setCorAtiva(p.cores[0])
    setTela('produto')
  }

  return (
    <div className="vt-page" style={{ background: '#0B0D17', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@300;400;500;600;700&family=Nunito+Sans:opsz,wght@6..12,300;6..12,400;6..12,500;6..12,600;6..12,700;6..12,800&display=swap');

        .vt-page { font-family: 'Nunito Sans', sans-serif; --cyan: #00E5FF; --cyan-dark: #00B8D4; --cyan-soft: rgba(0,229,255,0.08); --amber: #FFAB00; --amber-soft: rgba(255,171,0,0.1); --bg: #0B0D17; --surface: #141829; --surface2: #1C2038; --surface3: #242845; --text: #FFFFFF; --muted: rgba(255,255,255,0.45); --dim: rgba(255,255,255,0.2); --border: rgba(255,255,255,0.06); }
        .vt-page * { box-sizing: border-box; }

        .vt-noise { position: fixed; inset: 0; pointer-events: none; z-index: 1; opacity: 0.2; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E"); }
        .vt-glow { position: fixed; pointer-events: none; z-index: 0; border-radius: 50%; filter: blur(100px); }
        .vt-glow-1 { top: -15%; left: -10%; width: 45vw; height: 40vh; background: radial-gradient(ellipse, rgba(0,229,255,0.05) 0%, transparent 70%); }
        .vt-glow-2 { bottom: -10%; right: -5%; width: 35vw; height: 30vh; background: radial-gradient(ellipse, rgba(255,171,0,0.03) 0%, transparent 70%); }

        /* Nav — minimal, floating */
        .vt-nav {
          position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
          z-index: 50; display: flex; align-items: center; gap: 16px;
          background: rgba(20,24,41,0.8); backdrop-filter: blur(24px);
          border: 1px solid var(--border); border-radius: 20px; padding: '10px 24px';
        }
        .vt-logo { font-family: 'Chakra Petch', sans-serif; font-weight: 700; color: var(--cyan); font-size: 20px; letter-spacing: 0.1em; }
        .vt-nav-sep { width: 1px; height: 24px; background: var(--border); }
        .vt-cart-pill {
          display: flex; align-items: center; gap: 8px;
          background: var(--surface2); border: 1px solid var(--border);
          border-radius: 12px; padding: 8px 14px; color: var(--muted);
          cursor: pointer; transition: all 0.3s; font-size: 13px; font-weight: 600;
        }
        .vt-cart-pill:hover { border-color: var(--cyan); color: var(--cyan); }
        .vt-cart-count { background: var(--amber); color: #0B0D17; width: 20px; height: 20px; border-radius: 6px; font-size: 11px; font-weight: 800; display: flex; align-items: center; justify-content: center; }

        .vt-back { display: inline-flex; align-items: center; gap: 8px; color: var(--muted); font-size: 14px; font-weight: 500; text-decoration: none; transition: color 0.2s; padding: 8px 0; cursor: pointer; background: none; border: none; font-family: 'Nunito Sans', sans-serif; }
        .vt-back:hover { color: var(--cyan); }

        /* Cat tabs — vertical sidebar on left */
        .vt-sidebar-cats {
          position: fixed; left: 20px; top: 50%; transform: translateY(-50%);
          z-index: 40; display: flex; flex-direction: column; gap: 4px;
        }
        .vt-cat-item {
          writing-mode: vertical-rl; text-orientation: mixed;
          font-family: 'Chakra Petch', sans-serif; font-weight: 600;
          font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
          padding: 14px 8px; border-radius: 12px;
          background: transparent; color: var(--dim); border: 1px solid transparent;
          cursor: pointer; transition: all 0.3s;
        }
        .vt-cat-item:hover { color: var(--muted); }
        .vt-cat-item.active {
          background: var(--surface); color: var(--cyan);
          border-color: rgba(0,229,255,0.15);
        }

        /* Bento grid */
        .vt-bento {
          display: grid; grid-template-columns: repeat(12, 1fr);
          grid-template-rows: repeat(8, 90px); gap: 14px;
          padding: 0 24px;
        }

        .vt-bento-item {
          position: relative; overflow: hidden; border-radius: 20px;
          cursor: pointer; background: var(--surface);
          border: 1px solid var(--border);
          transition: all 0.4s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .vt-bento-item:hover {
          border-color: rgba(0,229,255,0.15);
          box-shadow: 0 16px 48px rgba(0,0,0,0.4), 0 0 40px rgba(0,229,255,0.03);
          transform: scale(1.015);
          z-index: 2;
        }
        .vt-bento-img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94);
          opacity: 0.7;
        }
        .vt-bento-item:hover .vt-bento-img { transform: scale(1.08); opacity: 0.9; }

        .vt-bento-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(11,13,23,0.9) 0%, rgba(11,13,23,0.3) 50%, transparent 100%);
          display: flex; flex-direction: column; justify-content: flex-end;
          padding: 20px 22px;
        }

        .vt-bento-specs {
          position: absolute; top: 16px; right: 16px;
          display: flex; gap: 8; flex-wrap: wrap; justify-content: flex-end;
          opacity: 0; transform: translateY(-8px);
          transition: all 0.4s;
        }
        .vt-bento-item:hover .vt-bento-specs { opacity: 1; transform: translateY(0); }

        .vt-spec-pill {
          background: rgba(11,13,23,0.7); backdrop-filter: blur(8px);
          border: 1px solid rgba(0,229,255,0.12); border-radius: 8px;
          padding: 4px 10px; font-size: 10px; color: var(--cyan);
          font-weight: 700; letter-spacing: 0.04em;
        }

        .vt-badge { position: absolute; top: 14px; left: 14px; z-index: 3; font-size: 10px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; padding: 5px 12px; border-radius: 8px; }
        .vt-badge-cyan { background: var(--cyan); color: #0B0D17; }
        .vt-badge-amber { background: var(--amber); color: #0B0D17; }

        /* Detail */
        .vt-spec-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .vt-spec-box { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 16px; transition: all 0.3s; }
        .vt-spec-box:hover { border-color: rgba(0,229,255,0.12); }
        .vt-color-dot { width: 30px; height: 30px; border-radius: 50%; cursor: pointer; transition: all 0.2s; border: 2px solid transparent; }
        .vt-color-dot.active { border-color: var(--cyan); box-shadow: 0 0 0 3px var(--cyan-soft); }
        .vt-btn-amber { background: var(--amber); color: #0B0D17; border: none; border-radius: 14px; padding: 16px 32px; width: 100%; font-family: 'Chakra Petch', sans-serif; font-weight: 700; font-size: 15px; cursor: pointer; transition: all 0.3s; letter-spacing: 0.04em; }
        .vt-btn-amber:hover { box-shadow: 0 8px 24px rgba(255,171,0,0.25); transform: translateY(-2px); }
        .vt-btn-cyan { background: var(--cyan); color: #0B0D17; border: none; border-radius: 14px; padding: 18px 32px; width: 100%; font-family: 'Chakra Petch', sans-serif; font-weight: 700; font-size: 16px; cursor: pointer; transition: all 0.3s; letter-spacing: 0.04em; }
        .vt-btn-cyan:hover { box-shadow: 0 8px 28px rgba(0,229,255,0.3); transform: translateY(-2px); }

        /* Cart sidebar */
        .vt-overlay { position: fixed; inset: 0; z-index: 55; background: rgba(11,13,23,0.5); backdrop-filter: blur(6px); opacity: 0; pointer-events: none; transition: opacity 0.3s; }
        .vt-overlay.open { opacity: 1; pointer-events: all; }
        .vt-drawer { position: fixed; top: 0; right: 0; bottom: 0; width: 420px; max-width: 90vw; z-index: 60; background: var(--surface); border-left: 1px solid var(--border); transform: translateX(100%); transition: transform 0.5s cubic-bezier(0.32,0.72,0,1); display: flex; flex-direction: column; box-shadow: -20px 0 60px rgba(0,0,0,0.3); }
        .vt-drawer.open { transform: translateX(0); }

        .vt-qty-btn { width: 30px; height: 30px; border-radius: 8px; border: 1px solid var(--border); background: var(--surface2); color: var(--cyan); display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 15px; font-weight: 700; transition: all 0.2s; }
        .vt-qty-btn:hover { background: var(--cyan); color: #0B0D17; border-color: var(--cyan); }

        .vt-input { width: 100%; padding: 14px 16px; border: 1px solid var(--border); border-radius: 12px; background: var(--surface2); font-family: 'Nunito Sans', sans-serif; font-size: 14px; color: var(--text); outline: none; transition: border-color 0.3s; }
        .vt-input:focus { border-color: var(--cyan); }
        .vt-input::placeholder { color: var(--dim); }

        .vt-divider { border: none; height: 1px; background: var(--border); margin: 16px 0; }
        .vt-fade { animation: vtFade 0.5s ease both; }
        @keyframes vtFade { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .vt-pop { animation: vtPop 0.5s cubic-bezier(0.34,1.56,0.64,1); }
        @keyframes vtPop { 0% { transform: scale(0); } 100% { transform: scale(1); } }

        .vt-footer { text-align: center; padding: 28px 24px; border-top: 1px solid var(--border); }
        .vt-page ::-webkit-scrollbar { width: 3px; }
        .vt-page ::-webkit-scrollbar-track { background: transparent; }
        .vt-page ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.06); border-radius: 100px; }

        @media (max-width: 768px) {
          .vt-bento { grid-template-columns: 1fr 1fr !important; grid-template-rows: auto !important; }
          .vt-bento > * { grid-column: span 1 !important; grid-row: span 2 !important; }
          .vt-sidebar-cats { display: none !important; }
          .vt-detail-cols, .vt-co-cols { grid-template-columns: 1fr !important; }
          .vt-nav { padding: '8px 16px' !important; }
        }
      `}</style>

      <div className="vt-noise" />
      <div className="vt-glow vt-glow-1" />
      <div className="vt-glow vt-glow-2" />

      {/* Floating Nav */}
      <div className="vt-nav" style={{ padding: '10px 24px' }}>
        <Link to="/" className="vt-back" style={{ padding: 0 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </Link>
        <div className="vt-nav-sep" />
        <div className="vt-logo" style={{ cursor: 'pointer' }} onClick={() => { setTela('vitrine'); setPagamentoOk(false) }}>VOLT</div>
        <div className="vt-nav-sep" />
        <div className="vt-cart-pill" onClick={() => setCarrinhoAberto(true)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
          {totalItens > 0 && <span className="vt-cart-count">{totalItens}</span>}
          {totalItens > 0 && <span style={{ fontFamily: "'Chakra Petch', sans-serif", color: 'var(--cyan)', fontWeight: 700 }}>R${total}</span>}
        </div>
      </div>

      {/* Vertical Category Sidebar */}
      {tela === 'vitrine' && (
        <div className="vt-sidebar-cats">
          {CATS.map((c) => (
            <button key={c} className={`vt-cat-item ${catAtiva === c ? 'active' : ''}`} onClick={() => setCatAtiva(c)} style={{ cursor: 'pointer' }}>
              {c}
            </button>
          ))}
        </div>
      )}

      {/* VITRINE — BENTO GRID */}
      {tela === 'vitrine' && (
        <div className="vt-fade" style={{ paddingTop: 90, paddingBottom: 60, position: 'relative', zIndex: 2 }}>
          {/* Hero — first bento cell */}
          <div className="vt-bento" style={{ maxWidth: 1200, margin: '0 auto' }}>
            {/* Hero cell spanning top */}
            <div style={{
              gridColumn: '1 / 13', gridRow: '1 / 3',
              background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%)',
              borderRadius: 24, border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '32px 48px', position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: -40, right: -20, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,229,255,0.08), transparent 70%)' }} />
              <div style={{ position: 'absolute', bottom: -30, right: 120, width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,171,0,0.05), transparent 70%)' }} />
              <div>
                <p style={{ fontFamily: "'Chakra Petch', sans-serif", color: 'var(--amber)', fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10 }}>
                  Lançamento 2025
                </p>
                <h1 style={{ fontFamily: "'Chakra Petch', sans-serif", fontWeight: 700, color: 'var(--text)', fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.1, letterSpacing: '-0.01em', marginBottom: 8 }}>
                  Tecnologia que <span style={{ color: 'var(--cyan)' }}>impressiona</span>
                </h1>
                <p style={{ color: 'var(--muted)', fontSize: 14 }}>Frete grátis • Entrega em até 2 dias</p>
              </div>
              <div style={{ fontSize: 64, opacity: 0.15, position: 'absolute', right: 48, bottom: 16, fontFamily: "'Chakra Petch', sans-serif", fontWeight: 800, letterSpacing: '0.1em' }}>VOLT</div>
            </div>

            {/* Product bento cells */}
            {produtosFiltrados.map((p, i) => {
              const b = BENTO[i]
              if (!b) return null
              const isBig = (b.ce - b.cs) >= 5 || (b.re - b.rs) >= 3
              return (
                <div
                  key={p.id}
                  className="vt-bento-item"
                  style={{
                    gridColumn: `${b.cs} / ${b.ce}`,
                    gridRow: `${b.rs + 2} / ${b.re + 2}`,
                  }}
                  onClick={() => verProduto(p)}
                >
                  {p.badge && (
                    <span className={`vt-badge ${p.badgeColor === 'amber' ? 'vt-badge-amber' : 'vt-badge-cyan'}`}>
                      {p.badge}
                    </span>
                  )}
                  <img src={p.img} alt={p.nome} className="vt-bento-img" loading="lazy" />
                  <div className="vt-bento-specs">
                    {Object.entries(p.specs).slice(0, 3).map(([k, v]) => (
                      <span key={k} className="vt-spec-pill">{k}: {v}</span>
                    ))}
                  </div>
                  <div className="vt-bento-overlay">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                      <div>
                        <h3 style={{
                          fontFamily: "'Chakra Petch', sans-serif",
                          fontWeight: 600, color: 'var(--text)',
                          fontSize: isBig ? 18 : 15, marginBottom: 4, lineHeight: 1.2,
                        }}>
                          {p.nome}
                        </h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontFamily: "'Chakra Petch', sans-serif", fontWeight: 700, color: 'var(--cyan)', fontSize: isBig ? 22 : 18 }}>
                            R${p.preco}
                          </span>
                          {p.precoAntigo && (
                            <span style={{ color: 'var(--dim)', fontSize: 13, textDecoration: 'line-through' }}>
                              R${p.precoAntigo}
                            </span>
                          )}
                        </div>
                      </div>
                      {isBig && (
                        <div style={{ display: 'flex', gap: 6 }}>
                          {Object.entries(p.specs).slice(0, 2).map(([k, v]) => (
                            <div key={k} style={{
                              background: 'rgba(0,229,255,0.06)', borderRadius: 10,
                              padding: '8px 12px', textAlign: 'center',
                            }}>
                              <div style={{ color: 'var(--dim)', fontSize: 9, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{k}</div>
                              <div style={{ color: 'var(--cyan)', fontSize: 14, fontWeight: 700, marginTop: 2 }}>{v}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* DETALHE */}
      {tela === 'produto' && produtoAtivo && (
        <div className="vt-fade" style={{ maxWidth: 1100, margin: '0 auto', padding: '90px 24px 60px', position: 'relative', zIndex: 2 }}>
          <button className="vt-back" onClick={() => setTela('vitrine')} style={{ marginBottom: 20 }}>
            ← Voltar
          </button>
          <div className="vt-detail-cols" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 40 }}>
            <div style={{ background: 'var(--surface)', borderRadius: 24, border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
              <img src={produtoAtivo.img} alt={produtoAtivo.nome} style={{ width: '85%', maxHeight: 420, objectFit: 'contain' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <p style={{ color: 'var(--dim)', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>{produtoAtivo.cat}</p>
              <h1 style={{ fontFamily: "'Chakra Petch', sans-serif", fontWeight: 700, color: 'var(--text)', fontSize: 30, lineHeight: 1.15, marginBottom: 16 }}>{produtoAtivo.nome}</h1>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 28 }}>
                <span style={{ fontFamily: "'Chakra Petch', sans-serif", fontWeight: 700, color: 'var(--cyan)', fontSize: 32 }}>R${produtoAtivo.preco}</span>
                {produtoAtivo.precoAntigo && <span style={{ color: 'var(--dim)', textDecoration: 'line-through', fontSize: 18 }}>R${produtoAtivo.precoAntigo}</span>}
                <span style={{ color: 'var(--muted)', fontSize: 13 }}>ou 12x de R${(produtoAtivo.preco / 12).toFixed(0).replace('.', ',')}</span>
              </div>
              <div className="vt-spec-grid" style={{ marginBottom: 28 }}>
                {Object.entries(produtoAtivo.specs).map(([k, v]) => (
                  <div key={k} className="vt-spec-box">
                    <div style={{ color: 'var(--dim)', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>{k}</div>
                    <div style={{ color: 'var(--text)', fontSize: 14, fontWeight: 700 }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: 28 }}>
                <p style={{ color: 'var(--muted)', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>Cor</p>
                <div style={{ display: 'flex', gap: 8 }}>
                  {produtoAtivo.cores.map((c) => (
                    <div key={c} className={`vt-color-dot ${corAtiva === c ? 'active' : ''}`} style={{ background: c }} onClick={() => setCorAtiva(c)} />
                  ))}
                </div>
              </div>
              <button className="vt-btn-amber" onClick={() => add(produtoAtivo, corAtiva)}>ADICIONAR AO CARRINHO</button>
              <div style={{ display: 'flex', gap: 24, marginTop: 18, color: 'var(--dim)', fontSize: 13 }}>
                <span>🚚 Frete grátis</span><span>🔒 Compra segura</span><span>↩️ Troca 30d</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CHECKOUT */}
      {tela === 'checkout' && !pagamentoOk && (
        <div className="vt-fade" style={{ maxWidth: 900, margin: '0 auto', padding: '90px 24px 60px', position: 'relative', zIndex: 2 }}>
          <button className="vt-back" onClick={() => setTela('vitrine')} style={{ marginBottom: 20 }}>← Continuar</button>
          <h1 style={{ fontFamily: "'Chakra Petch', sans-serif", fontWeight: 700, color: 'var(--text)', fontSize: 28, marginBottom: 28 }}>Checkout</h1>
          <div className="vt-co-cols" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 28 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, padding: 28 }}>
                <h3 style={{ fontFamily: "'Chakra Petch', sans-serif", fontWeight: 700, color: 'var(--text)', fontSize: 16, marginBottom: 20 }}>Pagamento</h3>
                <div style={{ marginBottom: 14 }}><label style={{ fontSize: 11, fontWeight: 700, color: 'var(--dim)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Nome</label><input className="vt-input" placeholder="Nome no cartão" /></div>
                <div style={{ marginBottom: 14 }}><label style={{ fontSize: 11, fontWeight: 700, color: 'var(--dim)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Número</label><input className="vt-input" placeholder="4242 4242 4242 4242" /></div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div><label style={{ fontSize: 11, fontWeight: 700, color: 'var(--dim)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Validade</label><input className="vt-input" placeholder="MM/AA" /></div>
                  <div><label style={{ fontSize: 11, fontWeight: 700, color: 'var(--dim)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>CVC</label><input className="vt-input" placeholder="123" /></div>
                </div>
              </div>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, padding: 28 }}>
                <h3 style={{ fontFamily: "'Chakra Petch', sans-serif", fontWeight: 700, color: 'var(--text)', fontSize: 16, marginBottom: 20 }}>Endereço</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12, marginBottom: 12 }}>
                  <div><label style={{ fontSize: 11, fontWeight: 700, color: 'var(--dim)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Rua</label><input className="vt-input" placeholder="Rua Augusta, 1200" /></div>
                  <div><label style={{ fontSize: 11, fontWeight: 700, color: 'var(--dim)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>CEP</label><input className="vt-input" placeholder="01304-001" /></div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div><label style={{ fontSize: 11, fontWeight: 700, color: 'var(--dim)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Cidade</label><input className="vt-input" placeholder="São Paulo" /></div>
                  <div><label style={{ fontSize: 11, fontWeight: 700, color: 'var(--dim)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Estado</label><input className="vt-input" placeholder="SP" /></div>
                </div>
              </div>
            </div>
            <div>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, padding: 28 }}>
                <h3 style={{ fontFamily: "'Chakra Petch', sans-serif", fontWeight: 700, color: 'var(--text)', fontSize: 16, marginBottom: 20 }}>Resumo</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
                  {carrinho.map((item) => (
                    <div key={item.key} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <img src={item.img} alt={item.nome} style={{ width: 48, height: 48, borderRadius: 12, objectFit: 'cover', background: 'var(--surface2)' }} />
                      <div style={{ flex: 1 }}><div style={{ color: 'var(--text)', fontSize: 13, fontWeight: 600 }}>{item.nome}</div><div style={{ color: 'var(--muted)', fontSize: 12 }}>x{item.qtd}</div></div>
                      <span style={{ fontFamily: "'Chakra Petch', sans-serif", fontWeight: 700, color: 'var(--cyan)', fontSize: 14 }}>R${(item.preco * item.qtd).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <hr className="vt-divider" />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 8 }}><span style={{ color: 'var(--muted)' }}>Subtotal</span><span style={{ fontWeight: 600 }}>R${total.toFixed(2)}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 8 }}><span style={{ color: 'var(--muted)' }}>Frete</span><span style={{ fontWeight: 600, color: '#2D6A4F' }}>Grátis</span></div>
                <hr className="vt-divider" />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700 }}>Total</span>
                  <span style={{ fontFamily: "'Chakra Petch', sans-serif", fontWeight: 700, color: 'var(--cyan)', fontSize: 28 }}>R${total.toFixed(2)}</span>
                </div>
                <button className="vt-btn-cyan" style={{ marginTop: 20 }} onClick={() => setPagamentoOk(true)}>PAGAR R${total.toFixed(2)}</button>
                <p style={{ textAlign: 'center', color: 'var(--dim)', fontSize: 11, marginTop: 12 }}>🔒 Pagamento seguro • Protegido por Stripe</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRMAÇÃO */}
      {tela === 'checkout' && pagamentoOk && (
        <div className="vt-fade" style={{ maxWidth: 500, margin: '0 auto', padding: '100px 24px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <div className="vt-pop" style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, var(--cyan), var(--cyan-dark))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: '#0B0D17' }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
          </div>
          <h1 style={{ fontFamily: "'Chakra Petch', sans-serif", fontWeight: 700, color: 'var(--text)', fontSize: 28, marginBottom: 8 }}>Pedido Confirmado!</h1>
          <p style={{ color: 'var(--muted)', fontSize: 15, marginBottom: 6 }}>Pedido <strong style={{ color: 'var(--cyan)' }}>#VLT-{Math.floor(Math.random() * 9000) + 1000}</strong></p>
          <p style={{ color: 'var(--dim)', fontSize: 14, marginBottom: 32 }}>Código de rastreio enviado por e-mail.</p>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, padding: 24, textAlign: 'left', marginBottom: 28 }}>
            {carrinho.map((item) => (
              <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '6px 0' }}>
                <span style={{ color: 'var(--muted)' }}>{item.qtd}x {item.nome}</span>
                <span style={{ fontWeight: 600 }}>R${(item.preco * item.qtd).toFixed(2)}</span>
              </div>
            ))}
            <hr className="vt-divider" />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 700 }}>Total</span>
              <span style={{ fontFamily: "'Chakra Petch', sans-serif", fontWeight: 700, color: 'var(--cyan)', fontSize: 22 }}>R${total.toFixed(2)}</span>
            </div>
          </div>
          <button className="vt-btn-amber" onClick={() => { setPagamentoOk(false); setTela('vitrine'); setCarrinho([]) }}>CONTINUAR COMPRANDO</button>
        </div>
      )}

      {/* Cart overlay + drawer */}
      <div className={`vt-overlay ${carrinhoAberto ? 'open' : ''}`} onClick={() => setCarrinhoAberto(false)} />
      <div className={`vt-drawer ${carrinhoAberto ? 'open' : ''}`}>
        <div style={{ padding: '24px 24px 16px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontFamily: "'Chakra Petch', sans-serif", fontWeight: 700, color: 'var(--text)', fontSize: 22 }}>Carrinho</h2>
          <button onClick={() => setCarrinhoAberto(false)} style={{ background: 'var(--surface2)', border: 'none', borderRadius: 10, width: 36, height: 36, fontSize: 16, cursor: 'pointer', color: 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
        </div>
        <div style={{ flex: 1, overflow: 'auto', padding: '20px 24px' }}>
          {carrinho.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--dim)' }}><p style={{ fontSize: 36, marginBottom: 12 }}>🛒</p><p>Carrinho vazio</p></div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {carrinho.map((item) => (
                <div key={item.key} style={{ display: 'flex', gap: 14, padding: 14, background: 'var(--surface2)', borderRadius: 16 }}>
                  <img src={item.img} alt={item.nome} style={{ width: 52, height: 52, borderRadius: 12, objectFit: 'cover', background: 'var(--surface3)' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ color: 'var(--text)', fontSize: 13, fontWeight: 600 }}>{item.nome}</div>
                    <div style={{ fontFamily: "'Chakra Petch', sans-serif", fontWeight: 700, color: 'var(--cyan)', fontSize: 14, marginTop: 2 }}>R${(item.preco * item.qtd).toFixed(2)}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
                      <button className="vt-qty-btn" onClick={() => remove(item.key)}>-</button>
                      <span style={{ fontWeight: 700, fontSize: 13, color: 'var(--text)', minWidth: 18, textAlign: 'center' }}>{item.qtd}</span>
                      <button className="vt-qty-btn" onClick={() => add(item, item.cor)}>+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {carrinho.length > 0 && (
          <div style={{ padding: '20px 24px', borderTop: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span style={{ color: 'var(--muted)' }}>Total</span>
              <span style={{ fontFamily: "'Chakra Petch', sans-serif", fontWeight: 700, color: 'var(--cyan)', fontSize: 26 }}>R${total.toFixed(2)}</span>
            </div>
            <button className="vt-btn-amber" onClick={() => { setCarrinhoAberto(false); setTela('checkout'); setPagamentoOk(false) }}>FINALIZAR COMPRA</button>
          </div>
        )}
      </div>

      <div className="vt-footer">
        <p style={{ color: 'var(--dim)', fontSize: 12, letterSpacing: '0.1em' }}>Powered by <span style={{ color: 'var(--cyan)', fontWeight: 700 }}>VOLT Store</span></p>
      </div>
    </div>
  )
}
