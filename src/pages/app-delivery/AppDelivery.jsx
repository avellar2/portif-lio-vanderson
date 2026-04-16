import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'

const MENU = [
  { id: 1, nome: 'Smash Burger Clássico', desc: 'Blend 180g, queijo cheddar, cebola caramelizada, molho especial da casa', preco: 32, img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=600&fit=crop', cat: 'Burgers', desconto: 15, tempo: '15 min' },
  { id: 2, nome: 'Burger Trufado', desc: 'Blend wagyu, queijo brie, cogumelos salteados, maionese trufada', preco: 48, img: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&h=600&fit=crop', cat: 'Burgers', destaque: true, tempo: '20 min' },
  { id: 3, nome: 'Chicken Crispy', desc: 'Frango empanado crocante, salada fresca, molho ranch defumado', preco: 36, img: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600&h=600&fit=crop', cat: 'Burgers', tempo: '18 min' },
  { id: 4, nome: 'Batata Supreme', desc: 'Batata frita crocante com cheddar derretido, bacon e cebolinha', preco: 22, img: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=600&h=600&fit=crop', cat: 'Combos', tempo: '10 min' },
  { id: 5, nome: 'Combo Smash + Batata', desc: 'Smash Clássico + Batata Supreme + Refrigerante 400ml', preco: 49, img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&h=600&fit=crop', cat: 'Combos', desconto: 10, destaque: true, tempo: '20 min' },
  { id: 6, nome: 'Milkshake Ovomaltine', desc: 'Milkshake cremoso com Ovomaltine, calda de chocolate e chantilly', preco: 20, img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&h=600&fit=crop', cat: 'Bebidas', tempo: '5 min' },
  { id: 7, nome: 'Limonada Siciliana', desc: 'Limão siciliano espremido na hora com hortelã e gelo', preco: 14, img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&h=600&fit=crop', cat: 'Bebidas', tempo: '5 min' },
  { id: 8, nome: 'Brownie com Sorvete', desc: 'Brownie quente com sorvete de baunilha, calda de chocolate', preco: 26, img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&h=600&fit=crop', cat: 'Sobremesas', destaque: true, tempo: '12 min' },
]

const CATEGORIES = [
  { nome: 'Burgers', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=120&h=120&fit=crop' },
  { nome: 'Combos', img: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=120&h=120&fit=crop' },
  { nome: 'Bebidas', img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=120&h=120&fit=crop' },
  { nome: 'Sobremesas', img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=120&h=120&fit=crop' },
]

const STATUS_PEDIDO = [
  { label: 'Pedido recebido', icon: '📋', tempo: 'agora' },
  { label: 'Preparando', icon: '👨‍🍳', tempo: '5 min' },
  { label: 'Saiu para entrega', icon: '🏍️', tempo: '15 min' },
  { label: 'Entregue!', icon: '✅', tempo: '25 min' },
]

const ENTREGADOR = {
  nome: 'Carlos Silva',
  veiculo: 'Moto • HON-4521',
  img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
  rating: '4.9',
}

export default function AppDelivery() {
  const [tela, setTela] = useState('menu')
  const [catAtiva, setCatAtiva] = useState('Todos')
  const [carrinho, setCarrinho] = useState([])
  const [statusIndex, setStatusIndex] = useState(0)
  const [showNotif, setShowNotif] = useState(false)
  const [notifText, setNotifText] = useState('')
  const [animItem, setAnimItem] = useState(null)
  const [itemExpandido, setItemExpandido] = useState(null)
  const timerRef = useRef(null)
  const phoneScrollRef = useRef(null)
  const mobileScrollRef = useRef(null)

  const total = carrinho.reduce((acc, i) => acc + i.preco * i.qtd, 0)
  const totalItens = carrinho.reduce((acc, i) => acc + i.qtd, 0)
  const itensFiltrados = catAtiva === 'Todos' ? MENU : MENU.filter((i) => i.cat === catAtiva)

  const add = useCallback((item) => {
    setCarrinho((prev) => {
      const ex = prev.find((i) => i.id === item.id)
      if (ex) return prev.map((i) => i.id === item.id ? { ...i, qtd: i.qtd + 1 } : i)
      return [...prev, { ...item, qtd: 1 }]
    })
    setAnimItem(item.id)
    setTimeout(() => setAnimItem(null), 500)
  }, [])

  const remove = (id) => {
    setCarrinho((prev) => {
      const item = prev.find((i) => i.id === id)
      if (item?.qtd > 1) return prev.map((i) => i.id === id ? { ...i, qtd: i.qtd - 1 } : i)
      return prev.filter((i) => i.id !== id)
    })
  }

  const notificar = (text) => {
    setNotifText(text)
    setShowNotif(true)
    setTimeout(() => setShowNotif(false), 4000)
  }

  const fazerPedido = () => {
    setTela('tracking')
    setStatusIndex(0)
    notificar('Pedido confirmado! Preparando...')
  }

  useEffect(() => {
    if (tela !== 'tracking') return
    timerRef.current = setInterval(() => {
      setStatusIndex((prev) => {
        if (prev < 3) {
          const msgs = ['Seu lanche está sendo preparado!', 'O entregador saiu! Rastreie agora.', 'Entregue! Bom apetite! 🎉']
          setTimeout(() => notificar(msgs[prev]), 300)
          return prev + 1
        }
        clearInterval(timerRef.current)
        return prev
      })
    }, 5000)
    return () => clearInterval(timerRef.current)
  }, [tela])

  const resetar = () => { setTela('menu'); setCarrinho([]); setStatusIndex(0); clearInterval(timerRef.current) }

  // Scroll phone to top when screen changes
  useEffect(() => {
    if (phoneScrollRef.current) phoneScrollRef.current.scrollTop = 0
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [tela])

  return (
    <>
    {/* ===== DESKTOP LAYOUT — Phone Mockup ===== */}
    <div className="dy-desktop-only">
      <div className="dy-desktop-shell">
        <div className="dy-desktop-left">
          <Link to="/" className="dy-back" style={{ marginBottom: 24, display: 'inline-flex' }}>← Voltar ao portfolio</Link>
          <h1 className="dy-desktop-title">
            Peça pelo<br /><span style={{ color: 'var(--lime)' }}>celular</span>,<br />receba em minutos
          </h1>
          <p className="dy-desktop-sub">
            Aplicativo completo de delivery com rastreamento em tempo real, pedidos pela mesa e notificações automáticas.
          </p>
          <div className="dy-desktop-features">
            <div className="dy-desktop-feat">
              <div className="dy-desktop-feat-icon">📱</div>
              <div>
                <h4 style={{ fontSize: 15 }}>Cardápio interativo</h4>
                <p style={{ fontSize: 13 }}>Navegue por categorias com stories e slides imersivos</p>
              </div>
            </div>
            <div className="dy-desktop-feat">
              <div className="dy-desktop-feat-icon">🏍️</div>
              <div>
                <h4 style={{ fontSize: 15 }}>Rastreamento ao vivo</h4>
                <p style={{ fontSize: 13 }}>Acompanhe o entregador no mapa em tempo real</p>
              </div>
            </div>
            <div className="dy-desktop-feat">
              <div className="dy-desktop-feat-icon">⚡</div>
              <div>
                <h4 style={{ fontSize: 15 }}>Checkout expresso</h4>
                <p style={{ fontSize: 13 }}>Pagamento em um toque com PIX ou cartão salvo</p>
              </div>
            </div>
            <div className="dy-desktop-feat">
              <div className="dy-desktop-feat-icon">🔔</div>
              <div>
                <h4 style={{ fontSize: 15 }}>Notificações push</h4>
                <p style={{ fontSize: 13 }}>Saiba cada etapa do seu pedido em tempo real</p>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 32, padding: 16, background: 'var(--surface)', borderRadius: 16, border: '1px solid var(--border)' }}>
            <p style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>Tecnologias</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['React', 'Socket.io', 'Maps API', 'Node.js'].map((t) => (
                <span key={t} style={{ background: 'var(--lime-soft)', color: 'var(--lime)', padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 700 }}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="dy-phone-frame">
          <div className="dy-phone-notch" />
          <div className="dy-phone-content" ref={phoneScrollRef}>
    {/* Phone content starts here — same as mobile */}
    <div className="dy-page" style={{ background: '#0A0A0B', minHeight: '100vh' }}>
      <div className="dy-noise" />
      {showNotif && (
        <div className="dy-toast">
          <div style={{ width: 32, height: 32, borderRadius: 10, background: 'var(--lime-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>🛵</div>
          <div><div style={{ fontWeight: 700, color: 'var(--text)', fontSize: 12 }}>Atualização</div><div style={{ color: 'var(--muted)', fontSize: 11, marginTop: 2 }}>{notifText}</div></div>
        </div>
      )}

      {tela === 'menu' && (
        <>
          <div style={{ padding: '40px 24px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 2 }}>
            <div>
              <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, color: 'var(--lime)', fontSize: 22, letterSpacing: '-0.02em' }}>FLASH BURGER</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--lime)', animation: 'dyPulse 2s infinite' }} />
                <span style={{ color: 'var(--muted)', fontSize: 12 }}>R. da Assembleia, 45</span>
              </div>
            </div>
          </div>
          <div className="dy-stories">
            <div className="dy-story" onClick={() => setCatAtiva('Todos')}>
              <div className={`dy-story-ring ${catAtiva === 'Todos' ? 'active' : ''}`}>
                <img src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=120&h=120&fit=crop" className="dy-story-img" alt="Todos" />
              </div>
              <span className="dy-story-label">Todos</span>
            </div>
            {CATEGORIES.map((c) => (
              <div key={c.nome} className="dy-story" onClick={() => setCatAtiva(c.nome)}>
                <div className={`dy-story-ring ${catAtiva === c.nome ? 'active' : ''}`}>
                  <img src={c.img} className="dy-story-img" alt={c.nome} />
                </div>
                <span className="dy-story-label">{c.nome}</span>
              </div>
            ))}
          </div>
          <div className="dy-slides" style={{ paddingBottom: 90 }}>
            {itensFiltrados.map((item) => {
              const noCart = carrinho.find((i) => i.id === item.id)
              const expanded = itemExpandido === item.id
              return (
                <div key={item.id} className={`dy-slide ${expanded ? 'expanded' : ''}`} onClick={() => setItemExpandido(expanded ? null : item.id)}>
                  <img src={item.img} alt={item.nome} className="dy-slide-img" loading="lazy" />
                  <div className="dy-slide-gradient" />
                  {item.desconto && <span className="dy-sale-tag">-{item.desconto}%</span>}
                  {item.destaque && <span className="dy-hot-tag">★ Popular</span>}
                  <div className="dy-slide-content">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                      <div>
                        <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, color: 'var(--text)', fontSize: 22, lineHeight: 1.2, marginBottom: 4 }}>{item.nome}</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, color: 'var(--lime)', fontSize: 24 }}>R${item.desconto ? (item.preco * (1 - item.desconto / 100)).toFixed(0) : item.preco}</span>
                          {item.desconto && <span style={{ color: 'var(--dim)', fontSize: 14, textDecoration: 'line-through' }}>R${item.preco}</span>}
                          <span style={{ color: 'var(--muted)', fontSize: 12 }}>⏱ {item.tempo}</span>
                        </div>
                      </div>
                      <div style={{ flexShrink: 0 }} onClick={(e) => e.stopPropagation()}>
                        {noCart ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <button className="dy-qty-btn" onClick={() => remove(item.id)}>-</button>
                            <span style={{ fontWeight: 800, fontSize: 16, color: 'var(--lime)', minWidth: 24, textAlign: 'center' }}>{noCart.qtd}</span>
                            <button className="dy-qty-btn" onClick={() => add(item)}>+</button>
                          </div>
                        ) : (
                          <button className={`dy-add-btn ${animItem === item.id ? 'pulse' : ''}`} onClick={() => add(item)}>+</button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="dy-slide-expanded-content">
                    <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6, marginBottom: 0 }}>{item.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}

      {tela === 'cart' && (
        <div style={{ minHeight: '100vh' }}>
          <div className="dy-cart-header">
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, color: 'var(--text)', fontSize: 24 }}>Seu Pedido</h2>
            <button onClick={() => setTela('menu')} style={{ background: 'var(--surface2)', border: 'none', borderRadius: 10, width: 38, height: 38, color: 'var(--muted)', cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
          </div>
          <div style={{ padding: '8px 24px' }}>
            {carrinho.map((item) => (
              <div key={item.id} className="dy-cart-item">
                <img src={item.img} alt={item.nome} style={{ width: 60, height: 60, borderRadius: 14, objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>{item.nome}</div>
                  <div style={{ color: 'var(--lime)', fontSize: 13, fontWeight: 700, marginTop: 2 }}>R${(item.preco * item.qtd).toFixed(2)}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <button className="dy-qty-btn" onClick={() => remove(item.id)}>-</button>
                  <span style={{ fontWeight: 800, color: 'var(--text)', fontSize: 14, minWidth: 20, textAlign: 'center' }}>{item.qtd}</span>
                  <button className="dy-qty-btn" onClick={() => add(item)}>+</button>
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: '20px 24px' }}>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 18, padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}><span style={{ color: 'var(--muted)' }}>Subtotal</span><span style={{ fontWeight: 600 }}>R${total.toFixed(2)}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}><span style={{ color: 'var(--muted)' }}>Entrega</span><span style={{ fontWeight: 600, color: 'var(--lime)' }}>Grátis</span></div>
              <hr className="dy-divider" />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700 }}>Total</span>
                <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, color: 'var(--lime)', fontSize: 24 }}>R${total.toFixed(2)}</span>
              </div>
            </div>
            <button onClick={fazerPedido} style={{ width: '100%', marginTop: 16, padding: 16, borderRadius: 16, background: 'var(--lime)', color: '#0A0A0B', border: 'none', fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>
              Confirmar Pedido
            </button>
          </div>
        </div>
      )}

      {tela === 'tracking' && (
        <div className="dy-fade" style={{ minHeight: '100vh', paddingBottom: 20 }}>
          <div className="dy-map-area" style={{ height: '32vh' }}>
            <div className="dy-map-grid" />
            <div className="dy-map-route" />
            <div className="dy-map-rider">🏍</div>
            <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(10,10,11,0.7)', backdropFilter: 'blur(8px)', padding: '6px 12px', borderRadius: 10, zIndex: 5 }}>
              <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, color: 'var(--lime)', fontSize: 15 }}>~25 min</span>
            </div>
          </div>
          <div style={{ padding: 20 }}>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 18, padding: 16, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 14 }}>
              <img src={ENTREGADOR.img} alt={ENTREGADOR.nome} style={{ width: 48, height: 48, borderRadius: 14, objectFit: 'cover', border: '2px solid var(--lime)' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>{ENTREGADOR.nome}</div>
                <div style={{ color: 'var(--muted)', fontSize: 12, marginTop: 2 }}>{ENTREGADOR.veiculo}</div>
              </div>
              <div style={{ background: 'var(--lime-soft)', borderRadius: 10, padding: '6px 12px', color: 'var(--lime)', fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 14 }}>★ {ENTREGADOR.rating}</div>
            </div>
            <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, color: 'var(--text)', fontSize: 16, marginBottom: 16 }}>Status</h3>
            <div className="dy-tl">
              <div className="dy-tl-line" />
              <div className="dy-tl-fill" style={{ height: `${(statusIndex / (STATUS_PEDIDO.length - 1)) * 100}%` }} />
              {STATUS_PEDIDO.map((s, i) => (
                <div key={i} style={{ position: 'relative', paddingBottom: 20 }}>
                  <div className={`dy-tl-dot ${i < statusIndex ? 'done' : i === statusIndex ? 'current' : 'pending'}`}>
                    {i < statusIndex ? '✓' : i === statusIndex ? s.icon : ''}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: i <= statusIndex ? 'var(--text)' : 'var(--dim)', fontSize: 13 }}>{s.label}</div>
                    <div style={{ color: 'var(--muted)', fontSize: 11, marginTop: 2 }}>{i <= statusIndex ? s.tempo : 'Aguardando...'}</div>
                  </div>
                </div>
              ))}
            </div>
            {statusIndex >= 3 && (
              <button onClick={resetar} style={{ width: '100%', marginTop: 12, padding: 14, borderRadius: 14, background: 'var(--lime)', color: '#0A0A0B', border: 'none', fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 14, cursor: 'pointer' }}>
                Novo Pedido
              </button>
            )}
          </div>
        </div>
      )}

    </div>{/* end dy-page inside phone */}
          </div>{/* end dy-phone-content */}

      {/* Bottom bar — fixed at bottom of phone frame */}
      <div className="dy-bottom-bar" style={{ position: 'relative', flexShrink: 0 }}>
        <button className={`dy-bar-item ${tela === 'menu' ? 'active' : ''}`} onClick={() => setTela('menu')} style={{ cursor: 'pointer' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          Início
        </button>
        <button className="dy-bar-item" style={{ cursor: 'pointer' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          Buscar
        </button>
        <button className={`dy-bar-item dy-bar-cart ${tela === 'cart' ? 'active' : ''}`} onClick={() => totalItens > 0 ? setTela('cart') : null} style={{ cursor: 'pointer' }}>
          {totalItens > 0 && <div className="dy-bar-total" style={{ fontSize: 11, padding: '6px 14px' }}>R${total}</div>}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
          {totalItens > 0 && <span className="dy-bar-badge">{totalItens}</span>}
          Carrinho
        </button>
        <button className="dy-bar-item" style={{ cursor: 'pointer' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          Perfil
        </button>
      </div>
    </div>{/* end dy-phone-frame */}
      </div>{/* end dy-desktop-shell */}
    </div>{/* end dy-desktop-only */}

    {/* ===== MOBILE LAYOUT — original ===== */}
    <div className="dy-page mobile-only" style={{ background: '#0A0A0B', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

        .dy-page { font-family: 'Plus Jakarta Sans', sans-serif; --lime: #BEFF00; --lime-dark: #9ACC00; --lime-soft: rgba(190,255,0,0.08); --coral: #FF4757; --coral-soft: rgba(255,71,87,0.1); --bg: #0A0A0B; --surface: #141416; --surface2: #1A1A1E; --surface3: #222226; --text: #FFF; --muted: rgba(255,255,255,0.4); --dim: rgba(255,255,255,0.2); --border: rgba(255,255,255,0.06); }
        .dy-page * { box-sizing: border-box; }
        .dy-noise { position: fixed; inset: 0; pointer-events: none; z-index: 1; opacity: 0.2; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E"); }

        /* Stories row */
        .dy-stories { display: flex; gap: 20px; overflow-x: auto; scrollbar-width: none; padding: 20px 24px; }
        .dy-stories::-webkit-scrollbar { display: none; }
        .dy-story {
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          cursor: pointer; flex-shrink: 0;
        }
        .dy-story-ring {
          width: 72px; height: 72px; border-radius: 50%;
          padding: 3px; transition: all 0.3s;
          background: var(--surface3);
        }
        .dy-story-ring.active {
          background: linear-gradient(135deg, var(--lime), var(--lime-dark));
          box-shadow: 0 0 20px rgba(190,255,0,0.2);
        }
        .dy-story-img {
          width: 100%; height: 100%; border-radius: 50%;
          object-fit: cover; border: 3px solid var(--bg);
        }
        .dy-story-label {
          font-size: 11px; font-weight: 600; color: var(--muted);
          letter-spacing: 0.02em; max-width: 72px; text-align: center;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .dy-story-ring.active + .dy-story-label, .dy-story:hover .dy-story-label { color: var(--lime); }

        /* Full-screen item slides */
        .dy-slides { display: flex; flex-direction: column; gap: 0; }

        .dy-slide {
          position: relative; width: 100%; overflow: hidden;
          transition: max-height 0.5s cubic-bezier(0.32,0.72,0,1);
        }
        .dy-slide.expanded { z-index: 5; }

        .dy-slide-img {
          width: 100%; aspect-ratio: 16/10; object-fit: cover;
          display: block;
        }
        .dy-slide.expanded .dy-slide-img { aspect-ratio: 16/8; }

        .dy-slide-gradient {
          position: absolute; bottom: 0; left: 0; right: 0; height: 70%;
          background: linear-gradient(to top, #0A0A0B 0%, rgba(10,10,11,0.7) 50%, transparent 100%);
          pointer-events: none;
        }

        .dy-slide-content {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 0 24px 24px;
        }

        .dy-slide-expanded-content {
          max-height: 0; overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.32,0.72,0,1), padding 0.4s;
          padding: 0 24px;
        }
        .dy-slide.expanded .dy-slide-expanded-content {
          max-height: 300px; padding: 0 24px 20px;
        }

        .dy-sale-tag {
          position: absolute; top: 16px; left: 16px; z-index: 3;
          background: var(--coral); color: white;
          font-size: 12px; font-weight: 800; padding: 6px 14px;
          border-radius: 10px; animation: dyPulse 2s infinite;
        }
        .dy-hot-tag {
          position: absolute; top: 16px; right: 16px; z-index: 3;
          background: rgba(10,10,11,0.6); backdrop-filter: blur(8px);
          color: var(--lime); font-size: 10px; font-weight: 700;
          padding: 6px 12px; border-radius: 8px;
          border: 1px solid rgba(190,255,0,0.15);
          text-transform: uppercase; letter-spacing: 0.08em;
        }

        .dy-add-btn {
          background: var(--lime); color: #0A0A0B; border: none;
          border-radius: 14px; padding: 12px 24px;
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 800; font-size: 14px; cursor: pointer;
          transition: all 0.25s; letter-spacing: 0.01em;
        }
        .dy-add-btn:hover { box-shadow: 0 6px 20px rgba(190,255,0,0.3); transform: translateY(-1px); }
        .dy-add-btn.pulse { animation: dyBtnPulse 0.4s ease; }
        @keyframes dyBtnPulse { 0% { transform: scale(1); } 40% { transform: scale(0.9); } 70% { transform: scale(1.1); } 100% { transform: scale(1); } }

        .dy-qty-btn {
          width: 36px; height: 36px; border-radius: 12px;
          border: 1px solid rgba(190,255,0,0.15); background: rgba(190,255,0,0.06);
          color: var(--lime); display: flex; align-items: center;
          justify-content: center; cursor: pointer; font-size: 18px;
          font-weight: 700; transition: all 0.2s;
        }
        .dy-qty-btn:hover { background: var(--lime); color: #0A0A0B; }

        /* Bottom bar — app style */
        .dy-bottom-bar {
          position: fixed; bottom: 0; left: 0; right: 0; z-index: 50;
          background: rgba(20,20,22,0.92); backdrop-filter: blur(20px);
          border-top: 1px solid var(--border);
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 20px;
        }
        .dy-bar-item {
          display: flex; flex-direction: column; align-items: center; gap: 4px;
          background: none; border: none; cursor: pointer;
          color: var(--dim); font-size: 10px; font-weight: 600;
          font-family: 'Plus Jakarta Sans', sans-serif;
          transition: color 0.2s; padding: 4px 12px;
        }
        .dy-bar-item.active { color: var(--lime); }
        .dy-bar-cart {
          position: relative;
        }
        .dy-bar-badge {
          position: absolute; top: -6px; right: -6px;
          background: var(--lime); color: #0A0A0B;
          width: 18px; height: 18px; border-radius: 6px;
          font-size: 10px; font-weight: 800;
          display: flex; align-items: center; justify-content: center;
        }
        .dy-bar-total {
          position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%);
          background: var(--lime); color: #0A0A0B;
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 800; font-size: 13px;
          padding: 8px 20px; border-radius: 14px 14px 0 0;
          white-space: nowrap;
          box-shadow: 0 -4px 20px rgba(190,255,0,0.2);
        }

        /* Cart full-screen */
        .dy-cart-screen {
          position: fixed; inset: 0; z-index: 60;
          background: var(--bg); transform: translateY(100%);
          transition: transform 0.5s cubic-bezier(0.32,0.72,0,1);
          overflow-y: auto;
        }
        .dy-cart-screen.open { transform: translateY(0); }
        .dy-cart-header {
          position: sticky; top: 0; z-index: 2;
          background: rgba(10,10,11,0.9); backdrop-filter: blur(20px);
          padding: 20px 24px; border-bottom: 1px solid var(--border);
          display: flex; justify-content: space-between; align-items: center;
        }
        .dy-cart-item {
          display: flex; gap: 16px; padding: 18px 0;
          border-bottom: 1px solid var(--border);
        }

        /* Tracking */
        .dy-map-area {
          position: relative; height: 45vh; overflow: hidden;
          background: var(--surface);
        }
        .dy-map-grid {
          position: absolute; inset: 0;
          background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 28px 28px;
        }
        .dy-map-route {
          position: absolute; top: 45%; left: 12%; width: 76%; height: 3px;
          background: var(--lime); border-radius: 100px;
          box-shadow: 0 0 20px rgba(190,255,0,0.3); z-index: 2;
        }
        .dy-map-rider {
          position: absolute; top: 45%; left: 12%; z-index: 4;
          transform: translateY(-50%);
          width: 36px; height: 36px; border-radius: 50%;
          background: var(--lime); display: flex; align-items: center;
          justify-content: center; font-size: 18px;
          box-shadow: 0 4px 16px rgba(190,255,0,0.4);
          animation: riderMove 25s linear forwards;
        }
        @keyframes riderMove { 0% { left: 12%; } 100% { left: 85%; } }

        .dy-tl { position: relative; padding-left: 36px; }
        .dy-tl-line { position: absolute; left: 13px; top: 16px; bottom: 16px; width: 2px; background: var(--surface3); border-radius: 100px; }
        .dy-tl-fill { position: absolute; left: 13px; top: 16px; width: 2px; background: var(--lime); border-radius: 100px; transition: height 0.8s; box-shadow: 0 0 8px rgba(190,255,0,0.3); }
        .dy-tl-dot {
          position: absolute; left: -28px; top: 2px;
          width: 18px; height: 18px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 9px; transition: all 0.4s;
        }
        .dy-tl-dot.done { background: var(--lime); box-shadow: 0 0 12px rgba(190,255,0,0.3); }
        .dy-tl-dot.current { background: var(--lime); animation: dyPulse 1.5s infinite; box-shadow: 0 0 20px rgba(190,255,0,0.4); }
        .dy-tl-dot.pending { background: var(--surface3); border: 2px solid var(--dim); }

        @keyframes dyPulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.6; transform:scale(1.3); } }

        /* Toast */
        .dy-toast {
          position: fixed; top: 16px; left: 50%; transform: translateX(-50%);
          z-index: 100; background: var(--surface); border: 1px solid rgba(190,255,0,0.15);
          border-radius: 16px; padding: 14px 20px;
          display: flex; align-items: center; gap: 12px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.5);
          animation: toastIn 0.4s cubic-bezier(0.34,1.56,0.64,1);
          max-width: 360px;
        }
        @keyframes toastIn { from { transform: translateX(-50%) translateY(-120%); opacity: 0; } to { transform: translateX(-50%) translateY(0); opacity: 1; } }

        .dy-fade { animation: dyFade 0.4s ease both; }
        @keyframes dyFade { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

        .dy-back { display: inline-flex; align-items: center; gap: 8px; color: var(--muted); font-size: 14px; font-weight: 500; text-decoration: none; transition: color 0.2s; padding: 8px 0; }
        .dy-back:hover { color: var(--lime); }
        .dy-divider { border: none; height: 1px; background: var(--border); margin: 16px 0; }
        .dy-footer { text-align: center; padding: 20px 24px; border-top: 1px solid var(--border); }

        /* Desktop wrapper — phone mockup */
        .dy-desktop-shell {
          display: flex; min-height: 100vh;
          width: 100%;
          background: linear-gradient(135deg, #0A0A0B 0%, #111115 50%, #0A0A0B 100%);
          align-items: center; justify-content: center; gap: 80px;
          padding: 40px;
        }
        .dy-desktop-left { max-width: 380px; }
        .dy-desktop-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 800; color: var(--text); font-size: 42px;
          line-height: 1.1; letter-spacing: -0.03em; margin-bottom: 16px;
        }
        .dy-desktop-sub { color: var(--muted); font-size: 16px; line-height: 1.6; margin-bottom: 32px; }
        .dy-desktop-features { display: flex; flex-direction: column; gap: 20px; }
        .dy-desktop-feat {
          display: flex; gap: 16px; align-items: flex-start;
        }
        .dy-desktop-feat-icon {
          width: 44px; height: 44px; border-radius: 14px;
          background: var(--lime-soft); flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-size: 20px;
        }
        .dy-desktop-feat h4 { font-weight: 700; color: var(--text); font-size: 15; margin-bottom: 2px; }
        .dy-desktop-feat p { color: var(--muted); font-size: 13; line-height: 1.5; }

        .dy-phone-frame {
          width: 375px; height: 780px;
          border-radius: 44px; overflow: hidden;
          border: 3px solid var(--surface3);
          box-shadow: 0 0 80px rgba(190,255,0,0.06), 0 40px 80px rgba(0,0,0,0.5);
          position: relative; background: var(--bg);
          flex-shrink: 0; display: flex; flex-direction: column;
        }
        .dy-phone-notch {
          position: absolute; top: 8px; left: 50%; transform: translateX(-50%);
          width: 120px; height: 28px; background: #000;
          border-radius: 20px; z-index: 100;
        }
        .dy-phone-content {
          width: 100%; flex: 1; overflow-y: auto;
          scrollbar-width: none;
        }
        .dy-phone-content::-webkit-scrollbar { display: none; }

        .dy-page.mobile-only { display: block; }
        .dy-desktop-only { display: none; }

        @media (min-width: 1024px) {
          .dy-page.mobile-only { display: none; }
          .dy-desktop-only { display: flex; }
        }

        @media (max-width: 640px) {
          .dy-slide-img { aspect-ratio: 4/3 !important; }
          .dy-slide.expanded .dy-slide-img { aspect-ratio: 16/9 !important; }
          .dy-map-area { height: 35vh; }
        }

        @media (min-width: 1024px) and (max-width: 1200px) {
          .dy-desktop-shell { gap: 40px; padding: 40px 24px; }
          .dy-desktop-left { max-width: 320px; }
          .dy-phone-frame { width: 340px; height: 700px; }
        }
      `}</style>

      <div className="dy-noise" />

      {/* Toast */}
      {showNotif && (
        <div className="dy-toast">
          <div style={{ width: 32, height: 32, borderRadius: 10, background: 'var(--lime-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>🛵</div>
          <div><div style={{ fontWeight: 700, color: 'var(--text)', fontSize: 12 }}>Atualização</div><div style={{ color: 'var(--muted)', fontSize: 11, marginTop: 2 }}>{notifText}</div></div>
        </div>
      )}

      {/* Back + Logo — only when not in menu */}
      {tela !== 'menu' && (
        <div style={{ position: 'fixed', top: 16, left: 16, zIndex: 55 }}>
          <Link to="/" className="dy-back">← Voltar</Link>
        </div>
      )}

      {/* ===== MENU SCREEN ===== */}
      {tela === 'menu' && (
        <>
          {/* Top bar — minimal */}
          <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 2 }}>
            <div>
              <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, color: 'var(--lime)', fontSize: 22, letterSpacing: '-0.02em' }}>FLASH BURGER</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--lime)', animation: 'dyPulse 2s infinite' }} />
                <span style={{ color: 'var(--muted)', fontSize: 12 }}>R. da Assembleia, 45</span>
              </div>
            </div>
            <Link to="/" style={{ color: 'var(--dim)', fontSize: 12, textDecoration: 'none' }}>← Sair</Link>
          </div>

          {/* Stories */}
          <div className="dy-stories">
            <div className="dy-story" onClick={() => setCatAtiva('Todos')}>
              <div className={`dy-story-ring ${catAtiva === 'Todos' ? 'active' : ''}`}>
                <img src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=120&h=120&fit=crop" className="dy-story-img" alt="Todos" />
              </div>
              <span className="dy-story-label">Todos</span>
            </div>
            {CATEGORIES.map((c) => (
              <div key={c.nome} className="dy-story" onClick={() => setCatAtiva(c.nome)}>
                <div className={`dy-story-ring ${catAtiva === c.nome ? 'active' : ''}`}>
                  <img src={c.img} className="dy-story-img" alt={c.nome} />
                </div>
                <span className="dy-story-label">{c.nome}</span>
              </div>
            ))}
          </div>

          {/* Slides — full-width items */}
          <div className="dy-slides" style={{ paddingBottom: 90 }}>
            {itensFiltrados.map((item) => {
              const noCart = carrinho.find((i) => i.id === item.id)
              const expanded = itemExpandido === item.id
              return (
                <div
                  key={item.id}
                  className={`dy-slide ${expanded ? 'expanded' : ''}`}
                  onClick={() => setItemExpandido(expanded ? null : item.id)}
                >
                  <img src={item.img} alt={item.nome} className="dy-slide-img" loading="lazy" />
                  <div className="dy-slide-gradient" />
                  {item.desconto && <span className="dy-sale-tag">-{item.desconto}%</span>}
                  {item.destaque && <span className="dy-hot-tag">★ Popular</span>}

                  <div className="dy-slide-content">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                      <div>
                        <h3 style={{
                          fontFamily: "'Bricolage Grotesque', sans-serif",
                          fontWeight: 700, color: 'var(--text)', fontSize: 22, lineHeight: 1.2, marginBottom: 4,
                        }}>
                          {item.nome}
                        </h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, color: 'var(--lime)', fontSize: 24 }}>
                            R${item.desconto ? (item.preco * (1 - item.desconto / 100)).toFixed(0) : item.preco}
                          </span>
                          {item.desconto && (
                            <span style={{ color: 'var(--dim)', fontSize: 14, textDecoration: 'line-through' }}>R${item.preco}</span>
                          )}
                          <span style={{ color: 'var(--muted)', fontSize: 12 }}>⏱ {item.tempo}</span>
                        </div>
                      </div>
                      <div style={{ flexShrink: 0 }} onClick={(e) => e.stopPropagation()}>
                        {noCart ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <button className="dy-qty-btn" onClick={() => remove(item.id)}>-</button>
                            <span style={{ fontWeight: 800, fontSize: 16, color: 'var(--lime)', minWidth: 24, textAlign: 'center' }}>{noCart.qtd}</span>
                            <button className="dy-qty-btn" onClick={() => add(item)}>+</button>
                          </div>
                        ) : (
                          <button
                            className={`dy-add-btn ${animItem === item.id ? 'pulse' : ''}`}
                            onClick={() => add(item)}
                          >
                            + Adicionar
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="dy-slide-expanded-content">
                    <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6, marginBottom: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}

      {/* ===== CART SCREEN ===== */}
      {tela === 'cart' && (
        <div className="dy-cart-screen" style={{ transform: 'translateY(0)', position: 'relative', minHeight: '100vh' }}>
          <div className="dy-cart-header">
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, color: 'var(--text)', fontSize: 24 }}>Seu Pedido</h2>
            <button onClick={() => setTela('menu')} style={{ background: 'var(--surface2)', border: 'none', borderRadius: 10, width: 38, height: 38, color: 'var(--muted)', cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
          </div>

          <div style={{ padding: '8px 24px' }}>
            {carrinho.map((item) => (
              <div key={item.id} className="dy-cart-item">
                <img src={item.img} alt={item.nome} style={{ width: 72, height: 72, borderRadius: 16, objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: 15 }}>{item.nome}</div>
                  <div style={{ color: 'var(--lime)', fontSize: 14, fontWeight: 700, marginTop: 4 }}>R${(item.preco * item.qtd).toFixed(2)}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button className="dy-qty-btn" onClick={() => remove(item.id)}>-</button>
                  <span style={{ fontWeight: 800, color: 'var(--text)', fontSize: 15, minWidth: 24, textAlign: 'center' }}>{item.qtd}</span>
                  <button className="dy-qty-btn" onClick={() => add(item)}>+</button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: '20px 24px 100px' }}>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 8 }}>
                <span style={{ color: 'var(--muted)' }}>Subtotal</span><span style={{ fontWeight: 600 }}>R${total.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 8 }}>
                <span style={{ color: 'var(--muted)' }}>Entrega</span><span style={{ fontWeight: 600, color: 'var(--lime)' }}>Grátis</span>
              </div>
              <hr className="dy-divider" />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700 }}>Total</span>
                <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, color: 'var(--lime)', fontSize: 28 }}>R${total.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={fazerPedido}
              style={{
                width: '100%', marginTop: 20, padding: 18, borderRadius: 18,
                background: 'var(--lime)', color: '#0A0A0B', border: 'none',
                fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800,
                fontSize: 16, cursor: 'pointer', transition: 'all 0.3s',
              }}
            >
              Confirmar Pedido
            </button>
          </div>
        </div>
      )}

      {/* ===== TRACKING SCREEN ===== */}
      {tela === 'tracking' && (
        <div className="dy-fade" style={{ position: 'relative', zIndex: 2, minHeight: '100vh', paddingBottom: 80 }}>
          {/* Map area — top half */}
          <div className="dy-map-area">
            <div className="dy-map-grid" />
            {[20,45,70].map((l, i) => (
              [30,55,75].map((t, j) => (
                <div key={`${i}-${j}`} style={{ position: 'absolute', left: `${l}%`, top: `${t}%`, width: 14+i*6, height: 10+j*4, background: 'var(--surface2)', borderRadius: 3, opacity: 0.4 }} />
              ))
            ))}
            <div className="dy-map-route" />
            <div className="dy-map-rider">🏍</div>
            <div style={{ position: 'absolute', bottom: 14, left: 14, background: 'rgba(10,10,11,0.7)', backdropFilter: 'blur(8px)', padding: '6px 14px', borderRadius: 8, fontSize: 10, fontWeight: 700, color: 'var(--lime)', letterSpacing: '0.08em', textTransform: 'uppercase', zIndex: 5 }}>
              restaurante
            </div>
            <div style={{ position: 'absolute', bottom: 14, right: 14, background: 'rgba(10,10,11,0.7)', backdropFilter: 'blur(8px)', padding: '6px 14px', borderRadius: 8, fontSize: 10, fontWeight: 700, color: 'var(--text)', letterSpacing: '0.08em', textTransform: 'uppercase', zIndex: 5 }}>
              sua casa
            </div>
            <div style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(10,10,11,0.7)', backdropFilter: 'blur(8px)', padding: '8px 16px', borderRadius: 12, zIndex: 5 }}>
              <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, color: 'var(--lime)', fontSize: 18 }}>~25 min</span>
            </div>
          </div>

          {/* Info area — bottom half */}
          <div style={{ padding: '24px', position: 'relative', zIndex: 2 }}>
            {/* Rider card */}
            <div style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 20, padding: 20, marginBottom: 24,
              display: 'flex', alignItems: 'center', gap: 16,
            }}>
              <img src={ENTREGADOR.img} alt={ENTREGADOR.nome} style={{ width: 56, height: 56, borderRadius: 16, objectFit: 'cover', border: '2px solid var(--lime)' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: 16 }}>{ENTREGADOR.nome}</div>
                <div style={{ color: 'var(--muted)', fontSize: 13, marginTop: 2 }}>{ENTREGADOR.veiculo}</div>
              </div>
              <div style={{ background: 'var(--lime-soft)', borderRadius: 12, padding: '8px 14px', color: 'var(--lime)', fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 16 }}>
                ★ {ENTREGADOR.rating}
              </div>
            </div>

            {/* Timeline */}
            <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, color: 'var(--text)', fontSize: 18, marginBottom: 20 }}>Status</h3>
            <div className="dy-tl">
              <div className="dy-tl-line" />
              <div className="dy-tl-fill" style={{ height: `${(statusIndex / (STATUS_PEDIDO.length - 1)) * 100}%` }} />
              {STATUS_PEDIDO.map((s, i) => (
                <div key={i} style={{ position: 'relative', paddingBottom: 24 }}>
                  <div className={`dy-tl-dot ${i < statusIndex ? 'done' : i === statusIndex ? 'current' : 'pending'}`}>
                    {i < statusIndex ? '✓' : i === statusIndex ? s.icon : ''}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: i <= statusIndex ? 'var(--text)' : 'var(--dim)', fontSize: 14 }}>{s.label}</div>
                    <div style={{ color: 'var(--muted)', fontSize: 12, marginTop: 2 }}>{i <= statusIndex ? s.tempo : 'Aguardando...'}</div>
                  </div>
                </div>
              ))}
            </div>

            {statusIndex >= 3 && (
              <button onClick={resetar} style={{
                width: '100%', marginTop: 16, padding: 16, borderRadius: 16,
                background: 'var(--lime)', color: '#0A0A0B', border: 'none',
                fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800,
                fontSize: 15, cursor: 'pointer',
              }}>
                Novo Pedido
              </button>
            )}
          </div>
        </div>
      )}

      {/* ===== BOTTOM BAR ===== */}
      <div className="dy-bottom-bar">
        <button className={`dy-bar-item ${tela === 'menu' ? 'active' : ''}`} onClick={() => setTela('menu')} style={{ cursor: 'pointer' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          Início
        </button>

        <button className="dy-bar-item" style={{ cursor: 'pointer' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          Buscar
        </button>

        <button className={`dy-bar-item dy-bar-cart ${tela === 'cart' ? 'active' : ''}`} onClick={() => totalItens > 0 ? setTela('cart') : null} style={{ cursor: 'pointer' }}>
          {totalItens > 0 && <div className="dy-bar-total">R${total} • {totalItens} {totalItens === 1 ? 'item' : 'itens'}</div>}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
          {totalItens > 0 && <span className="dy-bar-badge">{totalItens}</span>}
          Carrinho
        </button>

        <button className="dy-bar-item" style={{ cursor: 'pointer' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          Perfil
        </button>
      </div>
    </div>
    </>
  )
}
