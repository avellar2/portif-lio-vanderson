import { useState } from 'react'
import { Link } from 'react-router-dom'

const PRODUTOS = [
  { id: 1, nome: 'Blazer Linho Natural', preco: 489, cat: 'Masculino', img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=650&fit=crop', destaque: true, badge: 'Novo', tamanhos: ['P','M','G','GG'], cores: ['#C4B59A','#2C2C2C','#F5F0EB'] },
  { id: 2, nome: 'Camiseta Oversized Terra', preco: 159, cat: 'Masculino', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=650&fit=crop', tamanhos: ['P','M','G','GG'], cores: ['#8B6F4E','#1A1A1A','#F5F0EB'] },
  { id: 3, nome: 'Calça Alfaiataria Wide', preco: 349, cat: 'Feminino', img: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=650&fit=crop', destaque: true, tamanhos: ['36','38','40','42'], cores: ['#1A1A1A','#C4B59A'] },
  { id: 4, nome: 'Vestido Midi Linho', preco: 399, cat: 'Feminino', img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=650&fit=crop', badge: 'Sale', badgeColor: '#C4573A', tamanhos: ['P','M','G'], cores: ['#E8DDD0','#1A1A1A','#8B6F4E'], precoAntigo: 529 },
  { id: 5, nome: 'Têster Minimal Leather', preco: 599, cat: 'Acessórios', img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=650&fit=crop', tamanhos: ['38','39','40','41','42','43'], cores: ['#C4B59A','#1A1A1A'] },
  { id: 6, nome: 'Bolsa Estruturada Camel', preco: 459, cat: 'Acessórios', img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=650&fit=crop', destaque: true, tamanhos: ['Único'], cores: ['#C4B59A','#1A1A1A'] },
  { id: 7, nome: 'Jaqueta Bomber Suede', preco: 689, cat: 'Masculino', img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=650&fit=crop', badge: 'Novo', tamanhos: ['P','M','G','GG'], cores: ['#8B6F4E','#1A1A1A'] },
  { id: 8, nome: 'Saia Plissada Champagne', preco: 279, cat: 'Feminino', img: 'https://images.unsplash.com/photo-1592301933927-35b597393c0a?w=500&h=650&fit=crop', badge: 'Sale', badgeColor: '#C4573A', tamanhos: ['P','M','G'], cores: ['#E8DDD0','#1A1A1A'], precoAntigo: 419 },
]

const CATEGORIAS = ['Todos', 'Masculino', 'Feminino', 'Acessórios']

export default function LojaVirtual() {
  const [tela, setTela] = useState('vitrine')
  const [catAtiva, setCatAtiva] = useState('Todos')
  const [carrinho, setCarrinho] = useState([])
  const [carrinhoAberto, setCarrinhoAberto] = useState(false)
  const [produtoAtivo, setProdutoAtivo] = useState(null)
  const [tamanhoAtivo, setTamanhoAtivo] = useState(null)
  const [corAtiva, setCorAtiva] = useState(null)
  const [pagamentoOk, setPagamentoOk] = useState(false)

  const produtosFiltrados = catAtiva === 'Todos' ? PRODUTOS : PRODUTOS.filter((p) => p.cat === catAtiva)
  const total = carrinho.reduce((acc, i) => acc + i.preco * i.qtd, 0)
  const totalItens = carrinho.reduce((acc, i) => acc + i.qtd, 0)

  const addAoCarrinho = (produto, tamanho, cor) => {
    if (!tamanho) return
    const key = `${produto.id}-${tamanho}-${cor || 'default'}`
    setCarrinho((prev) => {
      const ex = prev.find((i) => i.key === key)
      if (ex) return prev.map((i) => i.key === key ? { ...i, qtd: i.qtd + 1 } : i)
      return [...prev, { ...produto, key, tamanho, cor: cor || produto.cores[0], qtd: 1 }]
    })
    setCarrinhoAberto(true)
  }

  const removerItem = (key) => {
    setCarrinho((prev) => {
      const item = prev.find((i) => i.key === key)
      if (item?.qtd > 1) return prev.map((i) => i.key === key ? { ...i, qtd: i.qtd - 1 } : i)
      return prev.filter((i) => i.key !== key)
    })
  }

  const verProduto = (p) => {
    setProdutoAtivo(p)
    setTamanhoAtivo(null)
    setCorAtiva(p.cores[0])
    setTela('produto')
  }

  const parcelamento = (v) => `ou 3x de R$${(v / 3).toFixed(0).replace('.', ',')}`

  return (
    <div className="lv-page" style={{ background: '#F8F6F3', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Manrope:wght@300;400;500;600;700;800&display=swap');

        .lv-page {
          font-family: 'Manrope', sans-serif;
          background: #F8F6F3;
          min-height: 100vh;
          --terra: #C4573A;
          --terra-light: #D4704E;
          --ink: #1A1A1A;
          --muted: #9A9590;
          --cream: #F8F6F3;
          --card: #FFFFFF;
          --border: rgba(26,26,26,0.08);
          --shadow: 0 2px 20px rgba(26,26,26,0.04);
        }
        .lv-page * { box-sizing: border-box; }

        .lv-noise {
          position: fixed; inset: 0; pointer-events: none; z-index: 1; opacity: 0.2;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
        }

        .lv-header {
          position: sticky; top: 0; z-index: 40;
          background: rgba(248,246,243,0.92); backdrop-filter: blur(24px);
          border-bottom: 1px solid var(--border);
        }
        .lv-logo {
          font-family: 'Instrument Serif', serif;
          color: var(--ink); font-size: 26px;
          letter-spacing: -0.02em;
        }
        .lv-logo em { font-style: italic; }

        .lv-cat-link {
          font-size: 13px; font-weight: 500; color: var(--muted);
          text-decoration: none; transition: color 0.3s;
          letter-spacing: 0.03em; cursor: pointer;
          background: none; border: none; font-family: 'Satoshi', sans-serif;
        }
        .lv-cat-link:hover, .lv-cat-link.active { color: var(--ink); }

        .lv-cart-icon {
          position: relative; width: 44px; height: 44px;
          border-radius: 50%; background: var(--ink);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.3s; border: none;
        }
        .lv-cart-icon:hover { background: var(--terra); }
        .lv-cart-badge {
          position: absolute; top: -4px; right: -4px;
          background: var(--terra); color: white;
          width: 20px; height: 20px; border-radius: 50%;
          font-size: 11px; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          border: 2px solid var(--cream);
        }

        /* Product grid - editorial asymmetric */
        .lv-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 20px;
        }

        .lv-product {
          position: relative; overflow: hidden;
          border-radius: 16px; cursor: pointer;
          background: var(--card);
          transition: all 0.4s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .lv-product:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(26,26,26,0.08); }
        .lv-product-img {
          width: 100%; aspect-ratio: 4/5; object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .lv-product:hover .lv-product-img { transform: scale(1.04); }

        .lv-product-overlay {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 20px;
          background: linear-gradient(to top, rgba(26,26,26,0.6), transparent);
          opacity: 0; transition: opacity 0.4s;
          display: flex; justify-content: space-between; align-items: flex-end;
        }
        .lv-product:hover .lv-product-overlay { opacity: 1; }

        .lv-badge {
          position: absolute; top: 14px; left: 14px; z-index: 2;
          font-size: 10px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; padding: 5px 12px; border-radius: 6px;
        }
        .lv-badge-new { background: var(--ink); color: white; }
        .lv-badge-sale { background: var(--terra); color: white; }

        /* Product detail */
        .lv-detail-img {
          width: 100%; aspect-ratio: 3/4; object-fit: cover;
          border-radius: 20px;
        }

        .lv-size-btn {
          width: 48px; height: 48px; border-radius: 12px;
          border: 1.5px solid var(--border); background: var(--card);
          color: var(--ink); font-weight: 600; font-size: 13px;
          cursor: pointer; transition: all 0.25s;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Satoshi', sans-serif;
        }
        .lv-size-btn:hover { border-color: var(--ink); }
        .lv-size-btn.active {
          background: var(--ink); color: white; border-color: var(--ink);
        }

        .lv-color-dot {
          width: 28px; height: 28px; border-radius: 50%;
          cursor: pointer; transition: all 0.2s;
          border: 2px solid transparent;
        }
        .lv-color-dot:hover { transform: scale(1.15); }
        .lv-color-dot.active { border-color: var(--ink); box-shadow: 0 0 0 3px var(--cream), 0 0 0 5px var(--ink); }

        .lv-add-cart-btn {
          background: var(--terra); color: white; border: none;
          border-radius: 14px; padding: 16px 32px; width: 100%;
          font-family: 'Satoshi', sans-serif; font-weight: 700;
          font-size: 15px; cursor: pointer; transition: all 0.3s;
          letter-spacing: 0.02em;
        }
        .lv-add-cart-btn:hover:not(:disabled) {
          background: var(--terra-light);
          box-shadow: 0 8px 24px rgba(196,87,58,0.25);
          transform: translateY(-2px);
        }
        .lv-add-cart-btn:disabled { opacity: 0.3; cursor: default; }

        /* Cart sidebar */
        .lv-cart-overlay {
          position: fixed; inset: 0; z-index: 55;
          background: rgba(26,26,26,0.25); backdrop-filter: blur(6px);
          opacity: 0; pointer-events: none; transition: opacity 0.3s;
        }
        .lv-cart-overlay.open { opacity: 1; pointer-events: all; }

        .lv-cart-sidebar {
          position: fixed; top: 0; right: 0; bottom: 0;
          width: 420px; max-width: 90vw; z-index: 60;
          background: var(--card); border-left: 1px solid var(--border);
          transform: translateX(100%);
          transition: transform 0.5s cubic-bezier(0.32,0.72,0,1);
          display: flex; flex-direction: column;
          box-shadow: -20px 0 60px rgba(26,26,26,0.06);
        }
        .lv-cart-sidebar.open { transform: translateX(0); }

        .lv-qty-btn {
          width: 30px; height: 30px; border-radius: 8px;
          border: 1px solid var(--border); background: var(--cream);
          color: var(--ink); display: flex; align-items: center;
          justify-content: center; cursor: pointer; font-size: 15px;
          font-weight: 600; transition: all 0.2s;
        }
        .lv-qty-btn:hover { background: var(--ink); color: white; border-color: var(--ink); }

        /* Checkout */
        .lv-input {
          width: 100%; padding: 14px 16px;
          border: 1.5px solid var(--border); border-radius: 12px;
          background: var(--card); font-family: 'Satoshi', sans-serif;
          font-size: 14px; color: var(--ink); outline: none;
          transition: border-color 0.3s;
        }
        .lv-input:focus { border-color: var(--ink); }
        .lv-input::placeholder { color: var(--muted); }

        .lv-pay-btn {
          background: var(--ink); color: white; border: none;
          border-radius: 14px; padding: 18px 32px; width: 100%;
          font-family: 'Satoshi', sans-serif; font-weight: 700;
          font-size: 16px; cursor: pointer; transition: all 0.3s;
        }
        .lv-pay-btn:hover { background: #333; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(26,26,26,0.15); }

        .lv-back {
          display: inline-flex; align-items: center; gap: 8px;
          color: var(--muted); font-size: 14px; font-weight: 500;
          text-decoration: none; transition: color 0.2s; padding: 8px 0;
        }
        .lv-back:hover { color: var(--ink); }

        .lv-divider {
          border: none; height: 1px;
          background: var(--border); margin: 20px 0;
        }

        .lv-fade-in { animation: lvFade 0.5s ease both; }
        @keyframes lvFade {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .lv-success-check {
          width: 72px; height: 72px; border-radius: 50%;
          background: linear-gradient(135deg, var(--terra), var(--terra-light));
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 20px;
          animation: lvPop 0.5s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes lvPop {
          0% { transform: scale(0); }
          100% { transform: scale(1); }
        }

        .lv-footer {
          text-align: center; padding: 28px 24px;
          border-top: 1px solid var(--border); background: var(--cream);
        }

        .lv-page ::-webkit-scrollbar { width: 3px; }
        .lv-page ::-webkit-scrollbar-track { background: transparent; }
        .lv-page ::-webkit-scrollbar-thumb { background: rgba(26,26,26,0.06); border-radius: 100px; }

        @media (max-width: 768px) {
          .lv-grid { grid-template-columns: 1fr 1fr !important; }
          .lv-grid > * { grid-column: span 6 !important; }
          .lv-detail-cols { grid-template-columns: 1fr !important; }
          .lv-checkout-cols { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .lv-grid { grid-template-columns: 1fr !important; }
          .lv-grid > * { grid-column: span 1 !important; }
        }
      `}</style>

      <div className="lv-noise" />

      {/* Header */}
      <div className="lv-header">
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '14px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to="/" className="lv-back" style={{ marginRight: 16 }}>←</Link>
            <div className="lv-logo" style={{ cursor: 'pointer' }} onClick={() => { setTela('vitrine'); setPagamentoOk(false) }}>
              atelier<em>.</em>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div className="lv-grid-cats" style={{ display: 'flex', gap: 20 }}>
                {CATEGORIAS.map((c) => (
                  <button
                    key={c}
                    className={`lv-cat-link ${catAtiva === c ? 'active' : ''}`}
                    onClick={() => { setCatAtiva(c); setTela('vitrine') }}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <button className="lv-cart-icon" onClick={() => setCarrinhoAberto(true)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                {totalItens > 0 && <span className="lv-cart-badge">{totalItens}</span>}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* VITRINE */}
      {tela === 'vitrine' && (
        <div className="lv-fade-in" style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px 60px', position: 'relative', zIndex: 2 }}>
          {/* Hero */}
          <div style={{
            textAlign: 'center', padding: '48px 0 56px',
            borderBottom: '1px solid var(--border)', marginBottom: 40,
          }}>
            <p style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: 'var(--terra)', fontSize: 18, marginBottom: 12 }}>
              Coleção Outono 2025
            </p>
            <h1 style={{
              fontFamily: "'Instrument Serif', serif",
              fontWeight: 400, color: 'var(--ink)',
              fontSize: 'clamp(36px, 6vw, 64px)', lineHeight: 1.05,
              letterSpacing: '-0.03em',
            }}>
              Estilo que<br />não precisa gritar
            </h1>
          </div>

          {/* Grid */}
          <div className="lv-grid">
            {produtosFiltrados.map((p, i) => {
              const isWide = p.destaque
              const badgeClass = p.badge === 'Sale' ? 'lv-badge lv-badge-sale' : p.badge === 'Novo' ? 'lv-badge lv-badge-new' : ''
              return (
                <div
                  key={p.id}
                  className="lv-product"
                  onClick={() => verProduto(p)}
                  style={{
                    gridColumn: isWide ? 'span 6' : 'span 4',
                    transitionDelay: `${i * 60}ms`,
                  }}
                >
                  <div style={{ position: 'relative', overflow: 'hidden' }}>
                    {p.badge && <span className={badgeClass}>{p.badge}</span>}
                    <img src={p.img} alt={p.nome} className="lv-product-img" loading="lazy" />
                    <div className="lv-product-overlay">
                      <div>
                        <div style={{ color: 'white', fontWeight: 600, fontSize: 15 }}>{p.nome}</div>
                        <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 2 }}>
                          R${p.preco}
                        </div>
                      </div>
                      <div style={{
                        background: 'white', color: 'var(--ink)',
                        padding: '8px 18px', borderRadius: 10,
                        fontSize: 12, fontWeight: 700,
                      }}>
                        Ver
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: '14px 4px 8px' }}>
                    <div style={{ fontWeight: 600, color: 'var(--ink)', fontSize: 14 }}>{p.nome}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                      <span style={{ color: 'var(--ink)', fontWeight: 700, fontSize: 15 }}>R${p.preco}</span>
                      {p.precoAntigo && (
                        <span style={{ color: 'var(--muted)', fontSize: 13, textDecoration: 'line-through' }}>
                          R${p.precoAntigo}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* DETALHE DO PRODUTO */}
      {tela === 'produto' && produtoAtivo && (
        <div className="lv-fade-in" style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px 60px', position: 'relative', zIndex: 2 }}>
          <button className="lv-back" onClick={() => setTela('vitrine')} style={{ marginBottom: 20 }}>
            ← Voltar
          </button>

          <div className="lv-detail-cols" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
            <div>
              <img src={produtoAtivo.img} alt={produtoAtivo.nome} className="lv-detail-img" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <p style={{ color: 'var(--muted)', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
                {produtoAtivo.cat}
              </p>
              <h1 style={{
                fontFamily: "'Instrument Serif', serif",
                fontWeight: 400, color: 'var(--ink)',
                fontSize: 32, lineHeight: 1.2, marginBottom: 8,
              }}>
                {produtoAtivo.nome}
              </h1>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 24 }}>
                <span style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontWeight: 400, color: 'var(--ink)', fontSize: 28,
                }}>
                  R${produtoAtivo.preco}
                </span>
                {produtoAtivo.precoAntigo && (
                  <span style={{ color: 'var(--muted)', textDecoration: 'line-through', fontSize: 16 }}>
                    R${produtoAtivo.precoAntigo}
                  </span>
                )}
                <span style={{ color: 'var(--muted)', fontSize: 13 }}>
                  {parcelamento(produtoAtivo.preco)}
                </span>
              </div>

              {/* Cores */}
              <div style={{ marginBottom: 24 }}>
                <p style={{ fontWeight: 600, fontSize: 12, color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>
                  Cor
                </p>
                <div style={{ display: 'flex', gap: 8 }}>
                  {produtoAtivo.cores.map((c) => (
                    <div
                      key={c}
                      className={`lv-color-dot ${corAtiva === c ? 'active' : ''}`}
                      style={{ background: c }}
                      onClick={() => setCorAtiva(c)}
                    />
                  ))}
                </div>
              </div>

              {/* Tamanhos */}
              <div style={{ marginBottom: 32 }}>
                <p style={{ fontWeight: 600, fontSize: 12, color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>
                  Tamanho
                </p>
                <div style={{ display: 'flex', gap: 8 }}>
                  {produtoAtivo.tamanhos.map((t) => (
                    <button
                      key={t}
                      className={`lv-size-btn ${tamanhoAtivo === t ? 'active' : ''}`}
                      onClick={() => setTamanhoAtivo(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <button
                className="lv-add-cart-btn"
                disabled={!tamanhoAtivo}
                onClick={() => addAoCarrinho(produtoAtivo, tamanhoAtivo, corAtiva)}
              >
                {tamanhoAtivo ? 'Adicionar ao Carrinho' : 'Selecione um tamanho'}
              </button>

              <div style={{ marginTop: 32, color: 'var(--muted)', fontSize: 13, lineHeight: 1.7 }}>
                <p>Peça confeccionada em tecido premium com acabamento artesanal. Enviamos para todo o Brasil com frete grátis acima de R$299.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CHECKOUT */}
      {tela === 'checkout' && !pagamentoOk && (
        <div className="lv-fade-in" style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px 60px', position: 'relative', zIndex: 2 }}>
          <button className="lv-back" onClick={() => setTela('vitrine')} style={{ marginBottom: 20 }}>
            ← Continuar comprando
          </button>

          <h1 style={{
            fontFamily: "'Instrument Serif', serif",
            fontWeight: 400, color: 'var(--ink)',
            fontSize: 32, marginBottom: 32,
          }}>
            Checkout
          </h1>

          <div className="lv-checkout-cols" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 32 }}>
            {/* Payment Form */}
            <div>
              <div style={{
                background: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: 20, padding: 28, marginBottom: 20,
              }}>
                <h3 style={{ fontWeight: 700, color: 'var(--ink)', fontSize: 16, marginBottom: 20 }}>
                  Informações de pagamento
                </h3>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', letterSpacing: '0.05em', display: 'block', marginBottom: 6 }}>
                    Nome no cartão
                  </label>
                  <input className="lv-input" placeholder="Nome como está no cartão" />
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', letterSpacing: '0.05em', display: 'block', marginBottom: 6 }}>
                    Número do cartão
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input className="lv-input" placeholder="4242 4242 4242 4242" style={{ paddingRight: 60 }} />
                    <div style={{
                      position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                      display: 'flex', gap: 4,
                    }}>
                      <div style={{ width: 28, height: 18, borderRadius: 3, background: '#1A1F71', color: 'white', fontSize: 7, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>VISA</div>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', letterSpacing: '0.05em', display: 'block', marginBottom: 6 }}>
                      Validade
                    </label>
                    <input className="lv-input" placeholder="MM/AA" />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', letterSpacing: '0.05em', display: 'block', marginBottom: 6 }}>
                      CVC
                    </label>
                    <input className="lv-input" placeholder="123" />
                  </div>
                </div>
              </div>

              <div style={{
                background: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: 20, padding: 28,
              }}>
                <h3 style={{ fontWeight: 700, color: 'var(--ink)', fontSize: 16, marginBottom: 20 }}>
                  Endereço de entrega
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12, marginBottom: 12 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', letterSpacing: '0.05em', display: 'block', marginBottom: 6 }}>Rua</label>
                    <input className="lv-input" placeholder="Rua Augusta, 1200" />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', letterSpacing: '0.05em', display: 'block', marginBottom: 6 }}>CEP</label>
                    <input className="lv-input" placeholder="01304-001" />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', letterSpacing: '0.05em', display: 'block', marginBottom: 6 }}>Cidade</label>
                    <input className="lv-input" placeholder="São Paulo" />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', letterSpacing: '0.05em', display: 'block', marginBottom: 6 }}>Estado</label>
                    <input className="lv-input" placeholder="SP" />
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div style={{
                background: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: 20, padding: 28,
              }}>
                <h3 style={{ fontWeight: 700, color: 'var(--ink)', fontSize: 16, marginBottom: 20 }}>
                  Resumo
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
                  {carrinho.map((item) => (
                    <div key={item.key} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <img src={item.img} alt={item.nome} style={{ width: 52, height: 65, borderRadius: 10, objectFit: 'cover' }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 600, color: 'var(--ink)', fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.nome}
                        </div>
                        <div style={{ color: 'var(--muted)', fontSize: 12, marginTop: 2 }}>
                          {item.tamanho} • x{item.qtd}
                        </div>
                        <div style={{ fontWeight: 700, color: 'var(--ink)', fontSize: 13, marginTop: 2 }}>
                          R${(item.preco * item.qtd).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <hr className="lv-divider" />

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                    <span style={{ color: 'var(--muted)' }}>Subtotal</span>
                    <span style={{ fontWeight: 600 }}>R${total.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                    <span style={{ color: 'var(--muted)' }}>Frete</span>
                    <span style={{ fontWeight: 600, color: '#2D6A4F' }}>Grátis</span>
                  </div>
                </div>

                <hr className="lv-divider" />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, fontSize: 15 }}>Total</span>
                  <span style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontWeight: 400, color: 'var(--ink)', fontSize: 26,
                  }}>
                    R${total.toFixed(2)}
                  </span>
                </div>

                <button className="lv-pay-btn" style={{ marginTop: 24 }} onClick={() => setPagamentoOk(true)}>
                  Pagar R${total.toFixed(2)}
                </button>

                <div style={{
                  display: 'flex', justifyContent: 'center', gap: 16,
                  marginTop: 16, color: 'var(--muted)', fontSize: 11,
                }}>
                  <span>🔒 Pagamento seguro</span>
                  <span>•</span>
                  <span>Protegido por Stripe</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRMAÇÃO */}
      {tela === 'checkout' && pagamentoOk && (
        <div className="lv-fade-in" style={{ maxWidth: 500, margin: '0 auto', padding: '80px 24px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <div className="lv-success-check">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>

          <h1 style={{
            fontFamily: "'Instrument Serif', serif",
            fontWeight: 400, color: 'var(--ink)',
            fontSize: 32, marginBottom: 8,
          }}>
            Pedido confirmado
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 15, marginBottom: 8 }}>
            Seu pedido <strong style={{ color: 'var(--ink)' }}>#ATL-{Math.floor(Math.random() * 9000) + 1000}</strong> foi recebido
          </p>
          <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 32 }}>
            Você receberá a confirmação por e-mail e WhatsApp com o código de rastreio.
          </p>

          <div style={{
            background: 'var(--card)', border: '1px solid var(--border)',
            borderRadius: 20, padding: 24, textAlign: 'left', marginBottom: 28,
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {carrinho.map((item) => (
                <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: 'var(--muted)' }}>{item.qtd}x {item.nome} ({item.tamanho})</span>
                  <span style={{ fontWeight: 600, color: 'var(--ink)' }}>R${(item.preco * item.qtd).toFixed(2)}</span>
                </div>
              ))}
              <hr className="lv-divider" />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 700 }}>Total</span>
                <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 20, fontWeight: 400 }}>R${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <button
            className="lv-add-cart-btn"
            onClick={() => {
              setPagamentoOk(false)
              setTela('vitrine')
              setCarrinho([])
            }}
          >
            Continuar comprando
          </button>
        </div>
      )}

      {/* Cart Overlay */}
      <div className={`lv-cart-overlay ${carrinhoAberto ? 'open' : ''}`} onClick={() => setCarrinhoAberto(false)} />

      {/* Cart Sidebar */}
      <div className={`lv-cart-sidebar ${carrinhoAberto ? 'open' : ''}`}>
        <div style={{
          padding: '24px 24px 16px',
          borderBottom: '1px solid var(--border)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <h2 style={{
            fontFamily: "'Instrument Serif', serif",
            fontWeight: 400, color: 'var(--ink)', fontSize: 24,
          }}>
            Carrinho
          </h2>
          <button
            onClick={() => setCarrinhoAberto(false)}
            style={{
              background: 'var(--cream)', border: 'none', borderRadius: 10,
              width: 36, height: 36, fontSize: 16, cursor: 'pointer',
              color: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ flex: 1, overflow: 'auto', padding: '20px 24px' }}>
          {carrinho.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--muted)' }}>
              <p style={{ fontSize: 40, marginBottom: 12 }}>🛒</p>
              <p style={{ fontSize: 14 }}>Seu carrinho está vazio</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {carrinho.map((item) => (
                <div key={item.key} style={{
                  display: 'flex', gap: 14, padding: 14,
                  background: 'var(--cream)', borderRadius: 16,
                }}>
                  <img src={item.img} alt={item.nome} style={{ width: 56, height: 70, borderRadius: 10, objectFit: 'cover' }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, color: 'var(--ink)', fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.nome}
                    </div>
                    <div style={{ color: 'var(--muted)', fontSize: 11, marginTop: 2 }}>
                      {item.tamanho}
                    </div>
                    <div style={{ fontWeight: 700, color: 'var(--ink)', fontSize: 14, marginTop: 4 }}>
                      R${(item.preco * item.qtd).toFixed(2)}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
                      <button className="lv-qty-btn" onClick={() => removerItem(item.key)}>-</button>
                      <span style={{ fontWeight: 600, fontSize: 13, minWidth: 18, textAlign: 'center' }}>{item.qtd}</span>
                      <button className="lv-qty-btn" onClick={() => addAoCarrinho(item, item.tamanho, item.cor)}>+</button>
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
              <span style={{ color: 'var(--muted)', fontSize: 14 }}>Total</span>
              <span style={{
                fontFamily: "'Instrument Serif', serif",
                color: 'var(--ink)', fontSize: 26,
              }}>
                R${total.toFixed(2)}
              </span>
            </div>
            <button
              className="lv-add-cart-btn"
              onClick={() => { setCarrinhoAberto(false); setTela('checkout'); setPagamentoOk(false) }}
            >
              Finalizar Compra
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="lv-footer">
        <p style={{ color: 'rgba(26,26,26,0.2)', fontSize: 12, letterSpacing: '0.1em' }}>
          Powered by <span style={{ color: 'var(--terra)', fontWeight: 700 }}>Loja Virtual</span>
        </p>
      </div>
    </div>
  )
}
