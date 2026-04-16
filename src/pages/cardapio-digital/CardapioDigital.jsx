import { useState, useEffect, useRef } from 'react'
import Layout from '../../components/Layout.jsx'

const MENU_DATA = {
  categorias: ['Entradas', 'Pratos', 'Sobremesas', 'Bebidas'],
  itens: {
    Entradas: [
      { id: 1, nome: 'Bruschetta de Tomate Confit', desc: 'Pão artesanal, tomate confit, manjericão fresco e azeite trufado', preco: 32, img: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&h=300&fit=crop', destaque: true },
      { id: 2, nome: 'Ceviche de Peixe Branco', desc: 'Marinado em limão siciliano, pimenta dedo-de-moça e coentro', preco: 45, img: 'https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=400&h=300&fit=crop' },
      { id: 3, nome: 'Bolinho de Mandioca', desc: 'Recheado com carne seca desfiada, acompanha geleia de pimenta', preco: 28, img: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&h=300&fit=crop' },
      { id: 4, nome: 'Carpaccio de Filet Mignon', desc: 'Finas fatias com rúcula, parmesão e alcaparras', preco: 42, img: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=400&h=300&fit=crop' },
    ],
    Pratos: [
      { id: 5, nome: 'Risoto de Cogumelos Selvagens', desc: 'Arborio cremoso com mix de shiitake, shimeji e cogumelo paris', preco: 68, img: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop', destaque: true },
      { id: 6, nome: 'Salmão Grelhado com Molho de Maracujá', desc: 'Posta de salmão com purê de batata baroa e legumes grelhados', preco: 78, img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop' },
      { id: 7, nome: 'Picanha na Brasa', desc: '300g com farofa crocante, vinagrete e batatas rústicas', preco: 89, img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop' },
      { id: 8, nome: 'Gnocchi de Batata ao Ragù', desc: 'Massa artesanal com ragù de cordeiro lentamente cozido', preco: 62, img: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop' },
      { id: 9, nome: 'Frango Caipira com Polenta', desc: 'Coxa e sobrecoxa desossada com polenta cremosa e agrião', preco: 55, img: 'https://images.unsplash.com/photo-1598103442097-8b74f4ff5b8e?w=400&h=300&fit=crop' },
    ],
    Sobremesas: [
      { id: 10, nome: 'Petit Gâteau', desc: 'Bolo de chocolate com centro derretido, sorvete de baunilha', preco: 35, img: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop', destaque: true },
      { id: 11, nome: 'Crème Brûlée', desc: 'Creme de baunilha com crosta caramelizada e frutas vermelhas', preco: 28, img: 'https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?w=400&h=300&fit=crop' },
      { id: 12, nome: 'Cheesecake de Frutas da Estação', desc: 'Base crocante de amêndoas com calda de frutas frescas', preco: 32, img: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=300&fit=crop' },
      { id: 13, nome: 'Tiramisù', desc: 'Receita tradicional italiana com mascarpone e café espresso', preco: 30, img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop' },
    ],
    Bebidas: [
      { id: 14, nome: 'Cocktail Signature "Ouro"', desc: 'Whisky, mel, limão siciliano e angostura — exclusivo da casa', preco: 38, img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop', destaque: true },
      { id: 15, nome: 'Vinho Tinto Reserva', desc: 'Taça de vinho Malbec argentino — uvas selecionadas', preco: 42, img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop' },
      { id: 16, nome: 'Suco Natural da Estação', desc: 'Preparado na hora com frutas frescas selecionadas', preco: 18, img: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop' },
      { id: 17, nome: 'Espresso Duplo', desc: 'Grãos especiais torrados artesanalmente', preco: 14, img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefda?w=400&h=300&fit=crop' },
    ],
  }
}

function QRCodeSVG({ size = 80 }) {
  const cells = [
    [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,0,1,0,1,0,0,1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,0,1,0,1,0,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,0,1,0,1,0,0,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,0,0,0],
    [1,0,1,0,1,1,1,1,0,0,1,0,0,1,1,0,1,0,1,0,1],
    [0,1,0,1,0,0,0,1,1,0,1,0,1,0,1,0,1,0,1,0,0],
    [1,0,1,0,1,1,1,0,0,1,0,1,0,1,0,1,0,1,0,1,0],
    [0,1,0,1,0,0,0,1,1,0,1,0,1,0,1,0,1,0,1,0,1],
    [1,0,1,0,1,1,1,0,1,0,1,0,0,1,1,0,1,0,1,0,0],
    [0,0,0,0,0,0,0,0,1,0,1,1,0,1,0,1,1,0,0,1,0],
    [1,1,1,1,1,1,1,0,0,1,0,1,0,0,1,0,1,0,1,0,1],
    [1,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1,0],
    [1,0,1,1,1,0,1,0,0,1,0,1,0,1,0,0,1,1,0,1,0],
    [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,0,1,0,1,1],
    [1,0,1,1,1,0,1,0,0,1,0,1,0,1,0,1,0,1,0,0,1],
    [1,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0],
    [1,1,1,1,1,1,1,0,1,0,0,1,0,1,1,0,1,1,0,1,1],
  ]
  const cellSize = size / cells.length
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rounded-lg">
      <rect width={size} height={size} fill="#1a1410" rx="6" />
      {cells.map((row, y) =>
        row.map((cell, x) =>
          cell ? (
            <rect
              key={`${x}-${y}`}
              x={x * cellSize + 0.5}
              y={y * cellSize + 0.5}
              width={cellSize - 1}
              height={cellSize - 1}
              rx="1"
              fill="#d4a574"
            />
          ) : null
        )
      )}
    </svg>
  )
}

export default function CardapioDigital() {
  const [categoriaAtiva, setCategoriaAtiva] = useState('Entradas')
  const [carrinho, setCarrinho] = useState([])
  const [carrinhoAberto, setCarrinhoAberto] = useState(false)
  const [contaAberta, setContaAberta] = useState(false)
  const [animacaoItem, setAnimacaoItem] = useState(null)
  const [itensVisiveis, setItensVisiveis] = useState({})
  const itensRef = useRef({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.dataset.itemId
            setItensVisiveis((prev) => ({ ...prev, [id]: true }))
          }
        })
      },
      { threshold: 0.1 }
    )

    Object.values(itensRef.current).forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [categoriaAtiva])

  const adicionarAoCarrinho = (item) => {
    setCarrinho((prev) => {
      const existente = prev.find((i) => i.id === item.id)
      if (existente) {
        return prev.map((i) => (i.id === item.id ? { ...i, qtd: i.qtd + 1 } : i))
      }
      return [...prev, { ...item, qtd: 1 }]
    })
    setAnimacaoItem(item.id)
    setTimeout(() => setAnimacaoItem(null), 600)
  }

  const removerDoCarrinho = (id) => {
    setCarrinho((prev) => {
      const item = prev.find((i) => i.id === id)
      if (item && item.qtd > 1) {
        return prev.map((i) => (i.id === id ? { ...i, qtd: i.qtd - 1 } : i))
      }
      return prev.filter((i) => i.id !== id)
    })
  }

  const totalCarrinho = carrinho.reduce((acc, item) => acc + item.preco * item.qtd, 0)
  const totalItens = carrinho.reduce((acc, item) => acc + item.qtd, 0)
  const itensAtuais = MENU_DATA.itens[categoriaAtiva] || []

  return (
    <Layout>
      <div className="cardapio-page">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');

          .cardapio-page {
            font-family: 'DM Sans', sans-serif;
            --gold: #d4a574;
            --gold-light: #e8c9a0;
            --gold-dark: #b8864e;
            --terra: #c47a5a;
            --cream: #f5ede4;
            --cream-dark: #e8ddd0;
            --bg-dark: #0f0b08;
            --bg-card: #1a1410;
            --bg-card-hover: #231c14;
            --surface: #151010;
          }

          .cd-header {
            background: linear-gradient(180deg, var(--bg-dark) 0%, rgba(15,11,8,0.95) 100%);
            border-bottom: 1px solid rgba(212,165,116,0.1);
            position: sticky;
            top: 0;
            z-index: 40;
            backdrop-filter: blur(20px);
          }

          .cd-logo-text {
            font-family: 'Playfair Display', serif;
            color: var(--gold);
            letter-spacing: 0.15em;
          }

          .cd-mesa-badge {
            background: linear-gradient(135deg, rgba(212,165,116,0.12), rgba(212,165,116,0.05));
            border: 1px solid rgba(212,165,116,0.15);
            color: var(--gold-light);
          }

          .cd-categorias {
            display: flex;
            gap: 4px;
            overflow-x: auto;
            scrollbar-width: none;
            -ms-overflow-style: none;
            padding-bottom: 4px;
          }
          .cd-categorias::-webkit-scrollbar { display: none; }

          .cd-cat-btn {
            font-family: 'DM Sans', sans-serif;
            font-weight: 500;
            font-size: 13px;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            padding: 10px 24px;
            border-radius: 100px;
            white-space: nowrap;
            border: 1px solid transparent;
            background: transparent;
            color: rgba(245,237,228,0.4);
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }

          .cd-cat-btn:hover {
            color: rgba(245,237,228,0.7);
            background: rgba(212,165,116,0.05);
          }

          .cd-cat-btn.active {
            color: var(--bg-dark);
            background: linear-gradient(135deg, var(--gold), var(--gold-dark));
            border-color: var(--gold-light);
            box-shadow: 0 4px 20px rgba(212,165,116,0.25);
          }

          .cd-item-card {
            background: var(--bg-card);
            border: 1px solid rgba(212,165,116,0.06);
            border-radius: 20px;
            overflow: hidden;
            transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            opacity: 0;
            transform: translateY(30px);
          }

          .cd-item-card.visible {
            opacity: 1;
            transform: translateY(0);
          }

          .cd-item-card:hover {
            border-color: rgba(212,165,116,0.2);
            background: var(--bg-card-hover);
            transform: translateY(-4px);
            box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(212,165,116,0.05);
          }

          .cd-item-card.visible:hover {
            transform: translateY(-4px);
          }

          .cd-item-img {
            width: 100%;
            aspect-ratio: 4/3;
            object-fit: cover;
            transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }

          .cd-item-card:hover .cd-item-img {
            transform: scale(1.08);
          }

          .cd-destaque-tag {
            position: absolute;
            top: 12px;
            left: 12px;
            background: linear-gradient(135deg, var(--gold), var(--terra));
            color: var(--bg-dark);
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            padding: 5px 14px;
            border-radius: 100px;
            z-index: 2;
          }

          .cd-preco {
            font-family: 'Playfair Display', serif;
            color: var(--gold);
            font-weight: 600;
          }

          .cd-add-btn {
            background: linear-gradient(135deg, rgba(212,165,116,0.15), rgba(212,165,116,0.08));
            border: 1px solid rgba(212,165,116,0.2);
            color: var(--gold-light);
            border-radius: 14px;
            padding: 10px 20px;
            font-family: 'DM Sans', sans-serif;
            font-weight: 600;
            font-size: 13px;
            cursor: pointer;
            transition: all 0.3s;
            letter-spacing: 0.02em;
          }

          .cd-add-btn:hover {
            background: linear-gradient(135deg, var(--gold), var(--gold-dark));
            color: var(--bg-dark);
            border-color: var(--gold);
            box-shadow: 0 4px 20px rgba(212,165,116,0.3);
          }

          .cd-add-btn.pulse {
            animation: btnPulse 0.6s ease;
          }

          @keyframes btnPulse {
            0% { transform: scale(1); }
            30% { transform: scale(0.92); }
            60% { transform: scale(1.08); }
            100% { transform: scale(1); }
          }

          .cd-cart-fab {
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 50;
            width: 64px;
            height: 64px;
            border-radius: 20px;
            background: linear-gradient(135deg, var(--gold), var(--terra));
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 8px 32px rgba(212,165,116,0.35), 0 0 60px rgba(212,165,116,0.1);
            transition: all 0.3s;
          }

          .cd-cart-fab:hover {
            transform: scale(1.08);
            box-shadow: 0 12px 40px rgba(212,165,116,0.45);
          }

          .cd-cart-badge {
            position: absolute;
            top: -6px;
            right: -6px;
            background: #ef4444;
            color: white;
            width: 24px;
            height: 24px;
            border-radius: 8px;
            font-size: 12px;
            font-weight: 700;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid var(--bg-dark);
            animation: badgePop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          }

          @keyframes badgePop {
            0% { transform: scale(0); }
            100% { transform: scale(1); }
          }

          /* Carrinho Overlay */
          .cd-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.6);
            backdrop-filter: blur(8px);
            z-index: 55;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s;
          }
          .cd-overlay.open { opacity: 1; pointer-events: all; }

          .cd-cart-panel {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 60;
            background: linear-gradient(180deg, #1a1410, #0f0b08);
            border-top: 1px solid rgba(212,165,116,0.15);
            border-radius: 28px 28px 0 0;
            max-height: 85vh;
            overflow-y: auto;
            transform: translateY(100%);
            transition: transform 0.5s cubic-bezier(0.32, 0.72, 0, 1);
          }
          .cd-cart-panel.open { transform: translateY(0); }

          .cd-cart-handle {
            width: 40px;
            height: 4px;
            background: rgba(212,165,116,0.2);
            border-radius: 100px;
            margin: 12px auto 0;
          }

          .cd-qty-btn {
            width: 32px;
            height: 32px;
            border-radius: 10px;
            border: 1px solid rgba(212,165,116,0.15);
            background: rgba(212,165,116,0.06);
            color: var(--gold-light);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
            transition: all 0.2s;
          }
          .cd-qty-btn:hover {
            background: rgba(212,165,116,0.15);
            border-color: rgba(212,165,116,0.3);
          }

          .cd-fechar-conta-btn {
            background: linear-gradient(135deg, var(--gold), var(--terra));
            color: var(--bg-dark);
            font-family: 'DM Sans', sans-serif;
            font-weight: 700;
            font-size: 15px;
            letter-spacing: 0.04em;
            padding: 18px 32px;
            border-radius: 18px;
            border: none;
            cursor: pointer;
            width: 100%;
            transition: all 0.3s;
          }
          .cd-fechar-conta-btn:hover {
            box-shadow: 0 8px 32px rgba(212,165,116,0.35);
            transform: translateY(-2px);
          }

          /* Conta Modal */
          .cd-conta-modal {
            position: fixed;
            inset: 0;
            z-index: 70;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s;
          }
          .cd-conta-modal.open { opacity: 1; pointer-events: all; }

          .cd-conta-bg {
            position: absolute;
            inset: 0;
            background: rgba(0,0,0,0.75);
            backdrop-filter: blur(12px);
          }

          .cd-conta-content {
            position: relative;
            background: linear-gradient(180deg, #1e1710, #0f0b08);
            border: 1px solid rgba(212,165,116,0.15);
            border-radius: 28px;
            max-width: 440px;
            width: 100%;
            padding: 36px;
            max-height: 90vh;
            overflow-y: auto;
            transform: scale(0.9) translateY(20px);
            transition: transform 0.4s cubic-bezier(0.32, 0.72, 0, 1);
          }
          .cd-conta-modal.open .cd-conta-content {
            transform: scale(1) translateY(0);
          }

          .cd-conta-divider {
            border: none;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(212,165,116,0.2), transparent);
            margin: 16px 0;
          }

          /* Noise overlay */
          .cd-noise {
            position: fixed;
            inset: 0;
            pointer-events: none;
            z-index: 1;
            opacity: 0.4;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          }

          /* Ambient glow */
          .cd-glow {
            position: fixed;
            pointer-events: none;
            z-index: 0;
          }
          .cd-glow-1 {
            top: -20%;
            left: -10%;
            width: 60%;
            height: 50%;
            background: radial-gradient(ellipse, rgba(212,165,116,0.06) 0%, transparent 70%);
          }
          .cd-glow-2 {
            bottom: -10%;
            right: -10%;
            width: 50%;
            height: 40%;
            background: radial-gradient(ellipse, rgba(196,122,90,0.04) 0%, transparent 70%);
          }

          /* Scrollbar */
          .cardapio-page ::-webkit-scrollbar { width: 3px; }
          .cardapio-page ::-webkit-scrollbar-track { background: transparent; }
          .cardapio-page ::-webkit-scrollbar-thumb { background: rgba(212,165,116,0.15); border-radius: 100px; }

          /* Responsive */
          @media (max-width: 640px) {
            .cd-hero-title { font-size: 2rem !important; }
            .cd-item-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>

        {/* Ambient */}
        <div className="cd-noise" />
        <div className="cd-glow cd-glow-1" />
        <div className="cd-glow cd-glow-2" />

        {/* Hero / Header */}
        <div className="cd-header" style={{ position: 'sticky', top: 0, zIndex: 40 }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              {/* Logo */}
              <div>
                <h1 className="cd-logo-text" style={{ fontSize: '22px', fontWeight: 700 }}>
                  TERRA & FOGO
                </h1>
                <p style={{ color: 'rgba(245,237,228,0.3)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 2 }}>
                  Alta Gastronomia
                </p>
              </div>

              {/* Mesa + QR */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div className="cd-mesa-badge" style={{ padding: '8px 18px', borderRadius: 14, fontSize: 13, fontWeight: 600 }}>
                  Mesa 07
                </div>
                <QRCodeSVG size={48} />
              </div>
            </div>

            {/* Categorias */}
            <div style={{ marginTop: 20 }}>
              <div className="cd-categorias">
                {MENU_DATA.categorias.map((cat) => (
                  <button
                    key={cat}
                    className={`cd-cat-btn ${categoriaAtiva === cat ? 'active' : ''}`}
                    onClick={() => setCategoriaAtiva(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Hero Banner */}
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          padding: '60px 24px 40px',
          textAlign: 'center',
          background: 'linear-gradient(180deg, rgba(212,165,116,0.03) 0%, transparent 100%)',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(rgba(212,165,116,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(212,165,116,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
          <div style={{ position: 'relative' }}>
            <p style={{
              color: 'var(--gold)',
              fontSize: 12,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              fontWeight: 600,
              marginBottom: 12,
            }}>
              Escaneie o QR Code para pedir
            </p>
            <h2 className="cd-hero-title" style={{
              fontFamily: "'Playfair Display', serif",
              color: 'var(--cream)',
              fontSize: '3rem',
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: 8,
            }}>
              Nosso Cardápio
            </h2>
            <p style={{
              color: 'rgba(245,237,228,0.35)',
              fontSize: 15,
              maxWidth: 400,
              margin: '0 auto',
              lineHeight: 1.6,
            }}>
              Selecione seus pratos favoritos e faça seu pedido diretamente pelo celular
            </p>
          </div>
        </div>

        {/* Grid de Itens */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 120px' }}>
          <div
            className="cd-item-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 24,
            }}
          >
            {itensAtuais.map((item, index) => {
              const noCarrinho = carrinho.find((i) => i.id === item.id)
              return (
                <div
                  key={item.id}
                  ref={(el) => { itensRef.current[item.id] = el }}
                  data-item-id={item.id}
                  className={`cd-item-card ${itensVisiveis[item.id] ? 'visible' : ''}`}
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  {/* Imagem */}
                  <div style={{ position: 'relative', overflow: 'hidden' }}>
                    {item.destaque && <span className="cd-destaque-tag">Chef Suggest</span>}
                    <img
                      src={item.img}
                      alt={item.nome}
                      className="cd-item-img"
                      loading="lazy"
                    />
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '60%',
                      background: 'linear-gradient(to top, var(--bg-card), transparent)',
                      pointerEvents: 'none',
                    }} />
                  </div>

                  {/* Info */}
                  <div style={{ padding: '20px 22px 22px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                      <h3 style={{
                        fontFamily: "'Playfair Display', serif",
                        color: 'var(--cream)',
                        fontSize: 17,
                        fontWeight: 600,
                        lineHeight: 1.3,
                        flex: 1,
                        marginRight: 12,
                      }}>
                        {item.nome}
                      </h3>
                      <span className="cd-preco" style={{ fontSize: 20, whiteSpace: 'nowrap' }}>
                        R${item.preco}
                      </span>
                    </div>

                    <p style={{
                      color: 'rgba(245,237,228,0.35)',
                      fontSize: 13,
                      lineHeight: 1.6,
                      marginBottom: 18,
                    }}>
                      {item.desc}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      {noCarrinho ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <button className="cd-qty-btn" onClick={() => removerDoCarrinho(item.id)}>-</button>
                          <span style={{ color: 'var(--gold)', fontWeight: 700, fontSize: 15, minWidth: 24, textAlign: 'center' }}>
                            {noCarrinho.qtd}
                          </span>
                          <button className="cd-qty-btn" onClick={() => adicionarAoCarrinho(item)}>+</button>
                        </div>
                      ) : (
                        <button
                          className={`cd-add-btn ${animacaoItem === item.id ? 'pulse' : ''}`}
                          onClick={() => adicionarAoCarrinho(item)}
                        >
                          Adicionar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          padding: '32px 24px',
          borderTop: '1px solid rgba(212,165,116,0.08)',
          background: 'var(--bg-dark)',
        }}>
          <p style={{ color: 'rgba(245,237,228,0.2)', fontSize: 12, letterSpacing: '0.1em' }}>
            Powered by <span style={{ color: 'var(--gold)', fontWeight: 600 }}>Cardápio Digital QR</span>
          </p>
        </div>

        {/* FAB Carrinho */}
        {totalItens > 0 && (
          <button className="cd-cart-fab" onClick={() => setCarrinhoAberto(true)}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0f0b08" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            <span className="cd-cart-badge">{totalItens}</span>
          </button>
        )}

        {/* Overlay */}
        <div
          className={`cd-overlay ${carrinhoAberto ? 'open' : ''}`}
          onClick={() => setCarrinhoAberto(false)}
        />

        {/* Painel Carrinho */}
        <div className={`cd-cart-panel ${carrinhoAberto ? 'open' : ''}`}>
          <div className="cd-cart-handle" />

          <div style={{ padding: '24px 24px 32px' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                color: 'var(--cream)',
                fontSize: 24,
                fontWeight: 700,
              }}>
                Seu Pedido
              </h3>
              <button
                onClick={() => setCarrinhoAberto(false)}
                style={{
                  background: 'rgba(212,165,116,0.08)',
                  border: 'none',
                  borderRadius: 12,
                  width: 40,
                  height: 40,
                  color: 'var(--gold)',
                  cursor: 'pointer',
                  fontSize: 18,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ✕
              </button>
            </div>

            {/* Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
              {carrinho.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    padding: 14,
                    background: 'rgba(212,165,116,0.04)',
                    borderRadius: 16,
                    border: '1px solid rgba(212,165,116,0.06)',
                  }}
                >
                  <img
                    src={item.img}
                    alt={item.nome}
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 12,
                      objectFit: 'cover',
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      color: 'var(--cream)',
                      fontSize: 14,
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      {item.nome}
                    </p>
                    <p style={{ color: 'var(--gold)', fontSize: 13, fontWeight: 600, marginTop: 2 }}>
                      R${(item.preco * item.qtd).toFixed(2)}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <button className="cd-qty-btn" onClick={() => removerDoCarrinho(item.id)}>-</button>
                    <span style={{ color: 'var(--cream)', fontWeight: 600, fontSize: 14, minWidth: 20, textAlign: 'center' }}>
                      {item.qtd}
                    </span>
                    <button className="cd-qty-btn" onClick={() => adicionarAoCarrinho(item)}>+</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '18px 20px',
              background: 'linear-gradient(135deg, rgba(212,165,116,0.08), rgba(212,165,116,0.03))',
              borderRadius: 16,
              border: '1px solid rgba(212,165,116,0.1)',
              marginBottom: 20,
            }}>
              <span style={{ color: 'rgba(245,237,228,0.5)', fontSize: 14, fontWeight: 500 }}>Total</span>
              <span style={{
                fontFamily: "'Playfair Display', serif",
                color: 'var(--gold)',
                fontSize: 26,
                fontWeight: 700,
              }}>
                R${totalCarrinho.toFixed(2)}
              </span>
            </div>

            <button
              className="cd-fechar-conta-btn"
              onClick={() => {
                setCarrinhoAberto(false)
                setContaAberta(true)
              }}
            >
              Fechar Conta
            </button>
          </div>
        </div>

        {/* Modal Conta */}
        <div className={`cd-conta-modal ${contaAberta ? 'open' : ''}`}>
          <div className="cd-conta-bg" onClick={() => setContaAberta(false)} />
          <div className="cd-conta-content">
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <div style={{
                width: 56,
                height: 56,
                borderRadius: 18,
                background: 'linear-gradient(135deg, rgba(212,165,116,0.15), rgba(212,165,116,0.05))',
                border: '1px solid rgba(212,165,116,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d4a574" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                  <line x1="1" y1="10" x2="23" y2="10" />
                </svg>
              </div>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                color: 'var(--cream)',
                fontSize: 26,
                fontWeight: 700,
                marginBottom: 4,
              }}>
                Sua Conta
              </h3>
              <p style={{ color: 'rgba(245,237,228,0.35)', fontSize: 13 }}>
                Mesa 07 — Terra & Fogo
              </p>
            </div>

            <hr className="cd-conta-divider" />

            {/* Items da conta */}
            <div style={{ margin: '20px 0' }}>
              {carrinho.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 0',
                    borderBottom: '1px solid rgba(212,165,116,0.05)',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <span style={{ color: 'var(--cream)', fontSize: 14, fontWeight: 500 }}>{item.nome}</span>
                    <span style={{ color: 'rgba(245,237,228,0.3)', fontSize: 12, marginLeft: 8 }}>x{item.qtd}</span>
                  </div>
                  <span style={{ color: 'var(--gold)', fontSize: 14, fontWeight: 600 }}>
                    R${(item.preco * item.qtd).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <hr className="cd-conta-divider" />

            {/* Total */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '20px 0',
            }}>
              <span style={{ color: 'var(--cream)', fontSize: 16, fontWeight: 600 }}>Total</span>
              <span style={{
                fontFamily: "'Playfair Display', serif",
                color: 'var(--gold)',
                fontSize: 32,
                fontWeight: 700,
              }}>
                R${totalCarrinho.toFixed(2)}
              </span>
            </div>

            {/* Botão */}
            <button
              className="cd-fechar-conta-btn"
              onClick={() => setContaAberta(false)}
              style={{ marginBottom: 12 }}
            >
              Confirmar Pagamento
            </button>
            <button
              onClick={() => setContaAberta(false)}
              style={{
                width: '100%',
                padding: '14px 32px',
                borderRadius: 14,
                border: '1px solid rgba(212,165,116,0.15)',
                background: 'transparent',
                color: 'rgba(245,237,228,0.4)',
                cursor: 'pointer',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                fontSize: 14,
                transition: 'all 0.3s',
              }}
            >
              Continuar Pedindo
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
