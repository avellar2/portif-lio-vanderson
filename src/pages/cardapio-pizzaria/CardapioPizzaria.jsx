import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const MENU = {
  categorias: ['Tradicionais', 'Especiais', 'Calzones', 'Bebidas'],
  itens: {
    Tradicionais: [
      { id: 1, nome: 'Margherita', desc: 'Molho San Marzano, mozzarella di bufala, manjericão fresco e azeite extra virgem', preco: 48, img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&h=375&fit=crop', destaque: true },
      { id: 2, nome: 'Pepperoni', desc: 'Pepperoni artesanal defumado, mozzarella e molho de tomates italianos', preco: 52, img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&h=375&fit=crop' },
      { id: 3, nome: 'Quattro Formaggi', desc: 'Mozzarella, gorgonzola, parmesão e provolone com mel trufado', preco: 56, img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=375&fit=crop' },
      { id: 4, nome: 'Calabresa', desc: 'Calabresa artesanal defumada, cebola roxa caramelizada e orégano', preco: 46, img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&h=375&fit=crop' },
      { id: 5, nome: 'Portuguesa', desc: 'Presunto, ovos, cebola, azeitonas pretas, ervilha e mozzarella', preco: 50, img: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=500&h=375&fit=crop' },
    ],
    Especiais: [
      { id: 6, nome: 'Trufa Negra', desc: 'Creme de trufa, cogumelos porcini, mozzarella e rúcula fresca', preco: 78, img: 'https://images.unsplash.com/photo-1595708684082-a173bb3a06c5?w=500&h=375&fit=crop', destaque: true },
      { id: 7, nome: 'Parma com Burrata', desc: 'Presunto de Parma, burrata cremosa, tomate cereja e pesto de manjericão', preco: 72, img: 'https://images.unsplash.com/photo-1600628421060-939639517883?w=500&h=375&fit=crop' },
      { id: 8, nome: 'Salmão com Dill', desc: 'Salmão defumado, cream cheese, alcaparras, cebola roxa e dill fresco', preco: 68, img: 'https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?w=500&h=375&fit=crop' },
      { id: 9, nome: 'Diavola', desc: 'Nduja calabresa, pimenta jalapeño, mozzarella e mel para equilibrar', preco: 62, img: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=500&h=375&fit=crop' },
    ],
    Calzones: [
      { id: 10, nome: 'Calzone Clássico', desc: 'Mozzarella, presunto, tomate e oregano — a receita original de Napoli', preco: 44, img: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500&h=375&fit=crop' },
      { id: 11, nome: 'Calzone Quatro Queijos', desc: 'Recheio generoso de mozzarella, gorgonzola, ricota e parmesão', preco: 50, img: 'https://images.unsplash.com/photo-1515459961680-58bf0dbab8f5?w=500&h=375&fit=crop', destaque: true },
      { id: 12, nome: 'Calzone Nutella', desc: 'Nutella com morango e açúcar de confeiteiro — doce como deve ser', preco: 38, img: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=500&h=375&fit=crop' },
    ],
    Bebidas: [
      { id: 13, nome: 'Vinho Chianti Riserva', desc: 'Taça de vinho tinto toscano — uvas Sangiovese selecionadas', preco: 38, img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=500&h=375&fit=crop', destaque: true },
      { id: 14, nome: 'Limoncello Spritz', desc: 'Limoncello artesanal, prosecco, soda e folhas de hortelã', preco: 28, img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500&h=375&fit=crop' },
      { id: 15, nome: 'Refrigerante Artesanal', desc: 'Cola, limão-siciliano ou laranja — feito com ingredientes reais', preco: 12, img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=500&h=375&fit=crop' },
      { id: 16, nome: 'Espresso Italiano', desc: 'Blend exclusivo de grãos Arábica e Robusto torrados em Nápoles', preco: 10, img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefda?w=500&h=375&fit=crop' },
    ],
  }
}

function PizzaQRCode({ size = 52 }) {
  const cells = [
    [1,1,1,1,1,1,1,0,0,1,0,1,0,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,0,1,1,1,0,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,1,0,0,1,1,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,0,1,0,0,1,0,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,1,1,0,1,0,0,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0],
    [0,1,0,1,0,0,1,1,0,0,1,1,0,0,1,1,0,1,0,0,1],
    [1,0,1,0,1,1,0,0,1,1,0,0,1,0,1,0,0,1,1,0,0],
    [0,1,0,1,0,0,1,0,0,1,1,0,1,1,0,1,0,0,1,0,1],
    [1,0,1,0,1,1,0,1,1,0,0,1,0,0,1,0,1,0,1,1,0],
    [0,1,0,1,0,0,1,0,0,1,0,1,0,1,0,1,0,1,0,0,1],
    [0,0,0,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,0,1,0],
    [1,1,1,1,1,1,1,0,0,1,1,0,0,1,0,1,1,0,1,0,1],
    [1,0,0,0,0,0,1,0,1,0,0,1,0,1,0,0,1,0,0,1,0],
    [1,0,1,1,1,0,1,0,0,1,0,1,1,0,1,0,1,0,1,0,1],
    [1,0,1,1,1,0,1,0,1,1,0,0,1,0,1,0,1,0,1,1,0],
    [1,0,1,1,1,0,1,0,0,1,1,0,1,0,0,1,0,1,0,1,1],
    [1,0,0,0,0,0,1,0,1,0,1,0,0,1,0,0,1,1,0,0,0],
    [1,1,1,1,1,1,1,0,0,1,0,1,0,1,0,1,0,0,1,0,1],
  ]
  const cs = size / cells.length
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rounded-xl">
      <rect width={size} height={size} fill="#fff" rx="8" />
      <rect x={1} y={1} width={size - 2} height={size - 2} fill="#FEF7F0" rx="7" />
      {cells.map((row, y) =>
        row.map((cell, x) =>
          cell ? (
            <rect
              key={`${x}-${y}`}
              x={x * cs + 0.4}
              y={y * cs + 0.4}
              width={cs - 0.8}
              height={cs - 0.8}
              rx="1.2"
              fill="#B91C1C"
            />
          ) : null
        )
      )}
    </svg>
  )
}

export default function CardapioPizzaria() {
  const [categoriaAtiva, setCategoriaAtiva] = useState('Tradicionais')
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

  const adicionar = (item) => {
    setCarrinho((prev) => {
      const existente = prev.find((i) => i.id === item.id)
      if (existente) return prev.map((i) => (i.id === item.id ? { ...i, qtd: i.qtd + 1 } : i))
      return [...prev, { ...item, qtd: 1 }]
    })
    setAnimacaoItem(item.id)
    setTimeout(() => setAnimacaoItem(null), 600)
  }

  const remover = (id) => {
    setCarrinho((prev) => {
      const item = prev.find((i) => i.id === id)
      if (item && item.qtd > 1) return prev.map((i) => (i.id === id ? { ...i, qtd: i.qtd - 1 } : i))
      return prev.filter((i) => i.id !== id)
    })
  }

  const total = carrinho.reduce((acc, i) => acc + i.preco * i.qtd, 0)
  const totalItens = carrinho.reduce((acc, i) => acc + i.qtd, 0)
  const itensAtuais = MENU.itens[categoriaAtiva] || []

  return (
    <div className="pz-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;0,9..144,800;0,9..144,900;1,9..144,400;1,9..144,500&family=Outfit:wght@300;400;500;600;700&display=swap');

        .pz-page {
          font-family: 'Outfit', sans-serif;
          background: var(--cream, #FBF5EE);
          min-height: 100vh;
          --red: #B91C1C;
          --red-light: #DC2626;
          --red-dark: #7F1D1D;
          --green: #2D6A4F;
          --green-light: #40916C;
          --cream: #FBF5EE;
          --cream-dark: #F0E6D8;
          --charcoal: #2C1810;
          --charcoal-light: #4A3528;
          --paper: #FEF7F0;
          --card: #FFFFFF;
          --card-hover: #FFFCF8;
          --border: rgba(44,24,16,0.08);
        }

        /* Reset for this page */
        .pz-page, .pz-page * { box-sizing: border-box; }

        /* Paper texture noise */
        .pz-noise {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          opacity: 0.3;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
        }

        /* Ambient warm blobs */
        .pz-blob {
          position: fixed;
          pointer-events: none;
          z-index: 0;
          border-radius: 50%;
          filter: blur(80px);
        }
        .pz-blob-1 {
          top: -15%;
          right: -10%;
          width: 50vw;
          height: 40vh;
          background: radial-gradient(ellipse, rgba(185,28,28,0.06) 0%, transparent 70%);
        }
        .pz-blob-2 {
          bottom: -10%;
          left: -10%;
          width: 45vw;
          height: 35vh;
          background: radial-gradient(ellipse, rgba(45,106,79,0.05) 0%, transparent 70%);
        }
        .pz-blob-3 {
          top: 30%;
          left: 20%;
          width: 30vw;
          height: 25vh;
          background: radial-gradient(ellipse, rgba(251,245,238,0.4) 0%, transparent 70%);
        }

        /* Header */
        .pz-header {
          position: sticky;
          top: 0;
          z-index: 40;
          background: rgba(254,247,240,0.92);
          backdrop-filter: blur(24px) saturate(180%);
          border-bottom: 1px solid var(--border);
        }

        .pz-logo {
          font-family: 'Fraunces', serif;
          color: var(--red);
          font-weight: 900;
          letter-spacing: 0.06em;
          font-size: 20px;
        }

        .pz-logo-sub {
          font-family: 'Fraunces', serif;
          font-style: italic;
          color: var(--charcoal-light);
          font-size: 11px;
          opacity: 0.6;
          margin-top: 1px;
          letter-spacing: 0.08em;
        }

        .pz-mesa {
          background: var(--red);
          color: white;
          padding: 7px 16px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.06em;
        }

        /* Categorias */
        .pz-cats {
          display: flex;
          gap: 6px;
          overflow-x: auto;
          scrollbar-width: none;
          padding-bottom: 2px;
        }
        .pz-cats::-webkit-scrollbar { display: none; }

        .pz-cat-btn {
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          font-size: 13px;
          letter-spacing: 0.04em;
          padding: 9px 22px;
          border-radius: 100px;
          white-space: nowrap;
          border: 1.5px solid var(--border);
          background: var(--card);
          color: var(--charcoal-light);
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .pz-cat-btn:hover {
          border-color: rgba(185,28,28,0.2);
          color: var(--red);
        }
        .pz-cat-btn.active {
          background: var(--red);
          color: white;
          border-color: var(--red);
          box-shadow: 0 4px 16px rgba(185,28,28,0.25);
        }

        /* Hero */
        .pz-hero {
          position: relative;
          text-align: center;
          padding: 48px 24px 36px;
          overflow: hidden;
        }
        .pz-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(circle at 20% 50%, rgba(185,28,28,0.04) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(45,106,79,0.03) 0%, transparent 50%);
        }

        /* Decorative pizza circle */
        .pz-pizza-deco {
          position: absolute;
          border: 2px dashed rgba(185,28,28,0.08);
          border-radius: 50%;
          pointer-events: none;
        }
        .pz-pizza-deco-1 {
          width: 300px; height: 300px;
          top: -80px; right: -60px;
        }
        .pz-pizza-deco-2 {
          width: 200px; height: 200px;
          bottom: -40px; left: -30px;
          border-color: rgba(45,106,79,0.06);
        }

        .pz-hero-title {
          font-family: 'Fraunces', serif;
          font-weight: 800;
          color: var(--charcoal);
          font-size: 2.8rem;
          line-height: 1.05;
          margin-bottom: 8px;
          position: relative;
        }

        .pz-hero-accent {
          color: var(--red);
        }

        /* Item cards */
        .pz-item-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 22px;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          opacity: 0;
          transform: translateY(24px) scale(0.97);
          box-shadow: 0 2px 12px rgba(44,24,16,0.04);
        }
        .pz-item-card.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .pz-item-card:hover {
          border-color: rgba(185,28,28,0.12);
          box-shadow: 0 16px 48px rgba(44,24,16,0.08), 0 0 0 1px rgba(185,28,28,0.04);
          transform: translateY(-6px) scale(1);
        }

        .pz-item-img-wrap {
          position: relative;
          overflow: hidden;
        }
        .pz-item-img {
          width: 100%;
          aspect-ratio: 5/4;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .pz-item-card:hover .pz-item-img {
          transform: scale(1.06);
        }
        .pz-item-img-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 50%;
          background: linear-gradient(to top, white, transparent);
          pointer-events: none;
        }

        .pz-destaque {
          position: absolute;
          top: 12px;
          left: 12px;
          background: var(--red);
          color: white;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 5px 14px;
          border-radius: 100px;
          z-index: 2;
          box-shadow: 0 4px 12px rgba(185,28,28,0.3);
        }

        .pz-item-nome {
          font-family: 'Fraunces', serif;
          font-weight: 700;
          color: var(--charcoal);
          font-size: 17px;
          line-height: 1.3;
        }

        .pz-preco {
          font-family: 'Fraunces', serif;
          font-weight: 800;
          color: var(--red);
          font-size: 22px;
        }

        .pz-desc {
          color: rgba(44,24,16,0.5);
          font-size: 13px;
          line-height: 1.6;
        }

        .pz-add-btn {
          background: var(--red);
          color: white;
          border: none;
          border-radius: 14px;
          padding: 10px 22px;
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.3s;
          letter-spacing: 0.02em;
        }
        .pz-add-btn:hover {
          background: var(--red-light);
          box-shadow: 0 6px 20px rgba(185,28,28,0.3);
          transform: translateY(-1px);
        }
        .pz-add-btn.pulse {
          animation: pzPulse 0.5s ease;
        }
        @keyframes pzPulse {
          0% { transform: scale(1); }
          30% { transform: scale(0.9); }
          60% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        .pz-qty-btn {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          border: 1.5px solid var(--border);
          background: var(--cream);
          color: var(--red);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 18px;
          font-weight: 700;
          transition: all 0.2s;
        }
        .pz-qty-btn:hover {
          background: var(--red);
          color: white;
          border-color: var(--red);
        }

        /* FAB */
        .pz-fab {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 50;
          width: 62px;
          height: 62px;
          border-radius: 20px;
          background: var(--red);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 28px rgba(185,28,28,0.35);
          transition: all 0.3s;
        }
        .pz-fab:hover {
          transform: scale(1.06);
          box-shadow: 0 12px 36px rgba(185,28,28,0.4);
        }
        .pz-fab-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background: var(--green);
          color: white;
          width: 22px;
          height: 22px;
          border-radius: 8px;
          font-size: 11px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid var(--cream);
          animation: pzBadgePop 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes pzBadgePop {
          0% { transform: scale(0); }
          100% { transform: scale(1); }
        }

        /* Overlay */
        .pz-overlay {
          position: fixed;
          inset: 0;
          background: rgba(44,24,16,0.3);
          backdrop-filter: blur(6px);
          z-index: 55;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s;
        }
        .pz-overlay.open { opacity: 1; pointer-events: all; }

        /* Cart Panel */
        .pz-cart-panel {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 60;
          background: white;
          border-top: 1px solid var(--border);
          border-radius: 28px 28px 0 0;
          max-height: 85vh;
          overflow-y: auto;
          transform: translateY(100%);
          transition: transform 0.5s cubic-bezier(0.32,0.72,0,1);
          box-shadow: 0 -10px 60px rgba(44,24,16,0.1);
        }
        .pz-cart-panel.open { transform: translateY(0); }

        .pz-cart-handle {
          width: 40px;
          height: 4px;
          background: rgba(44,24,16,0.1);
          border-radius: 100px;
          margin: 12px auto 0;
        }

        .pz-close-btn {
          background: var(--cream);
          border: none;
          border-radius: 12px;
          width: 38px;
          height: 38px;
          color: var(--charcoal);
          cursor: pointer;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .pz-close-btn:hover {
          background: var(--cream-dark);
        }

        .pz-cart-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px;
          background: var(--cream);
          border-radius: 16px;
          border: 1px solid var(--border);
        }

        .pz-total-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 20px;
          background: linear-gradient(135deg, rgba(185,28,28,0.06), rgba(185,28,28,0.02));
          border-radius: 16px;
          border: 1px solid rgba(185,28,28,0.08);
        }

        .pz-checkout-btn {
          background: var(--red);
          color: white;
          font-family: 'Outfit', sans-serif;
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
        .pz-checkout-btn:hover {
          background: var(--red-light);
          box-shadow: 0 8px 28px rgba(185,28,28,0.3);
          transform: translateY(-2px);
        }

        /* Conta Modal */
        .pz-conta-modal {
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
        .pz-conta-modal.open { opacity: 1; pointer-events: all; }
        .pz-conta-bg {
          position: absolute;
          inset: 0;
          background: rgba(44,24,16,0.5);
          backdrop-filter: blur(12px);
        }
        .pz-conta-content {
          position: relative;
          background: white;
          border: 1px solid var(--border);
          border-radius: 28px;
          max-width: 440px;
          width: 100%;
          padding: 36px;
          max-height: 90vh;
          overflow-y: auto;
          transform: scale(0.92) translateY(20px);
          transition: transform 0.4s cubic-bezier(0.32,0.72,0,1);
          box-shadow: 0 24px 80px rgba(44,24,16,0.15);
        }
        .pz-conta-modal.open .pz-conta-content {
          transform: scale(1) translateY(0);
        }

        .pz-conta-divider {
          border: none;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border), transparent);
          margin: 16px 0;
        }

        .pz-secondary-btn {
          width: 100%;
          padding: 14px 32px;
          border-radius: 14px;
          border: 1.5px solid var(--border);
          background: transparent;
          color: var(--charcoal-light);
          cursor: pointer;
          font-family: 'Outfit', sans-serif;
          font-weight: 500;
          font-size: 14px;
          transition: all 0.3s;
        }
        .pz-secondary-btn:hover {
          background: var(--cream);
          border-color: var(--red);
          color: var(--red);
        }

        /* Back button */
        .pz-back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--charcoal-light);
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.2s;
          padding: 8px 0;
        }
        .pz-back:hover { color: var(--red); }

        /* Footer */
        .pz-footer {
          text-align: center;
          padding: 28px 24px;
          border-top: 1px solid var(--border);
          background: var(--cream);
        }

        /* Scrollbar */
        .pz-page ::-webkit-scrollbar { width: 3px; }
        .pz-page ::-webkit-scrollbar-track { background: transparent; }
        .pz-page ::-webkit-scrollbar-thumb { background: rgba(44,24,16,0.08); border-radius: 100px; }

        /* Responsive */
        @media (max-width: 640px) {
          .pz-hero-title { font-size: 2rem !important; }
          .pz-grid { grid-template-columns: 1fr !important; }
          .pz-header-row { flex-wrap: wrap; gap: 12px !important; }
        }
      `}</style>

      {/* Ambient */}
      <div className="pz-noise" />
      <div className="pz-blob pz-blob-1" />
      <div className="pz-blob pz-blob-2" />
      <div className="pz-blob pz-blob-3" />

      {/* Back Button */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px 24px 0' }}>
        <Link to="/" className="pz-back">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Voltar
        </Link>
      </div>

      {/* Header */}
      <div className="pz-header">
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '14px 24px' }}>
          <div className="pz-header-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
            <div>
              <div className="pz-logo">FORNO A LEGNA</div>
              <div className="pz-logo-sub">Pizzeria Napoletana</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div className="pz-mesa">Mesa 12</div>
              <PizzaQRCode size={48} />
            </div>
          </div>

          <div style={{ marginTop: 18 }}>
            <div className="pz-cats">
              {MENU.categorias.map((cat) => (
                <button
                  key={cat}
                  className={`pz-cat-btn ${categoriaAtiva === cat ? 'active' : ''}`}
                  onClick={() => setCategoriaAtiva(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="pz-hero">
        <div className="pz-pizza-deco pz-pizza-deco-1" />
        <div className="pz-pizza-deco pz-pizza-deco-2" />
        <div style={{ position: 'relative' }}>
          <p style={{
            color: 'var(--green)',
            fontSize: 12,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontWeight: 600,
            marginBottom: 10,
          }}>
            Escaneie & Peça
          </p>
          <h2 className="pz-hero-title">
            Pizzas feitas em<br />
            <span className="pz-hero-accent">forno a lenha</span>
          </h2>
          <p style={{
            color: 'rgba(44,24,16,0.45)',
            fontSize: 15,
            maxWidth: 380,
            margin: '10px auto 0',
            lineHeight: 1.6,
          }}>
            Massa fermentada por 72h, ingredientes importados da Itália
          </p>
        </div>
      </div>

      {/* Items Grid */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 120px' }}>
        <div className="pz-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 22,
        }}>
          {itensAtuais.map((item, index) => {
            const noCarrinho = carrinho.find((i) => i.id === item.id)
            return (
              <div
                key={item.id}
                ref={(el) => { itensRef.current[item.id] = el }}
                data-item-id={item.id}
                className={`pz-item-card ${itensVisiveis[item.id] ? 'visible' : ''}`}
                style={{ transitionDelay: `${index * 70}ms` }}
              >
                <div className="pz-item-img-wrap">
                  {item.destaque && <span className="pz-destaque">★ Popular</span>}
                  <img src={item.img} alt={item.nome} className="pz-item-img" loading="lazy" />
                  <div className="pz-item-img-overlay" />
                </div>

                <div style={{ padding: '18px 20px 20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                    <h3 className="pz-item-nome" style={{ flex: 1, marginRight: 12 }}>
                      {item.nome}
                    </h3>
                    <span className="pz-preco">R${item.preco}</span>
                  </div>

                  <p className="pz-desc" style={{ marginBottom: 16 }}>
                    {item.desc}
                  </p>

                  {noCarrinho ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <button className="pz-qty-btn" onClick={() => remover(item.id)}>-</button>
                      <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--red)', minWidth: 24, textAlign: 'center' }}>
                        {noCarrinho.qtd}
                      </span>
                      <button className="pz-qty-btn" onClick={() => adicionar(item)}>+</button>
                    </div>
                  ) : (
                    <button
                      className={`pz-add-btn ${animacaoItem === item.id ? 'pulse' : ''}`}
                      onClick={() => adicionar(item)}
                    >
                      Adicionar
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="pz-footer">
        <p style={{ color: 'rgba(44,24,16,0.25)', fontSize: 12, letterSpacing: '0.1em' }}>
          Powered by <span style={{ color: 'var(--red)', fontWeight: 600 }}>Cardápio Digital QR</span>
        </p>
      </div>

      {/* FAB */}
      {totalItens > 0 && (
        <button className="pz-fab" onClick={() => setCarrinhoAberto(true)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
          </svg>
          <span className="pz-fab-badge">{totalItens}</span>
        </button>
      )}

      {/* Overlay */}
      <div className={`pz-overlay ${carrinhoAberto ? 'open' : ''}`} onClick={() => setCarrinhoAberto(false)} />

      {/* Cart Panel */}
      <div className={`pz-cart-panel ${carrinhoAberto ? 'open' : ''}`}>
        <div className="pz-cart-handle" />
        <div style={{ padding: '24px 24px 32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
            <h3 style={{
              fontFamily: "'Fraunces', serif",
              color: 'var(--charcoal)',
              fontSize: 24,
              fontWeight: 800,
            }}>
              Seu Pedido
            </h3>
            <button className="pz-close-btn" onClick={() => setCarrinhoAberto(false)}>✕</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 22 }}>
            {carrinho.map((item) => (
              <div key={item.id} className="pz-cart-item">
                <img
                  src={item.img}
                  alt={item.nome}
                  style={{ width: 52, height: 52, borderRadius: 12, objectFit: 'cover' }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    color: 'var(--charcoal)',
                    fontSize: 14,
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {item.nome}
                  </p>
                  <p style={{ color: 'var(--red)', fontSize: 13, fontWeight: 700, marginTop: 2 }}>
                    R${(item.preco * item.qtd).toFixed(2)}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button className="pz-qty-btn" onClick={() => remover(item.id)}>-</button>
                  <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--charcoal)', minWidth: 20, textAlign: 'center' }}>
                    {item.qtd}
                  </span>
                  <button className="pz-qty-btn" onClick={() => adicionar(item)}>+</button>
                </div>
              </div>
            ))}
          </div>

          <div className="pz-total-box" style={{ marginBottom: 18 }}>
            <span style={{ color: 'rgba(44,24,16,0.5)', fontSize: 14, fontWeight: 500 }}>Total</span>
            <span style={{
              fontFamily: "'Fraunces', serif",
              color: 'var(--red)',
              fontSize: 28,
              fontWeight: 800,
            }}>
              R${total.toFixed(2)}
            </span>
          </div>

          <button
            className="pz-checkout-btn"
            onClick={() => {
              setCarrinhoAberto(false)
              setContaAberta(true)
            }}
          >
            Fechar Conta
          </button>
        </div>
      </div>

      {/* Conta Modal */}
      <div className={`pz-conta-modal ${contaAberta ? 'open' : ''}`}>
        <div className="pz-conta-bg" onClick={() => setContaAberta(false)} />
        <div className="pz-conta-content">
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div style={{
              width: 56,
              height: 56,
              borderRadius: 18,
              background: 'linear-gradient(135deg, rgba(185,28,28,0.08), rgba(185,28,28,0.03))',
              border: '1px solid rgba(185,28,28,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 14px',
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#B91C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
              </svg>
            </div>
            <h3 style={{
              fontFamily: "'Fraunces', serif",
              color: 'var(--charcoal)',
              fontSize: 26,
              fontWeight: 800,
              marginBottom: 4,
            }}>
              Sua Conta
            </h3>
            <p style={{ color: 'rgba(44,24,16,0.4)', fontSize: 13 }}>
              Mesa 12 — Forno a Legna
            </p>
          </div>

          <hr className="pz-conta-divider" />

          <div style={{ margin: '18px 0' }}>
            {carrinho.map((item) => (
              <div key={item.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 0',
                borderBottom: '1px solid var(--border)',
              }}>
                <div style={{ flex: 1 }}>
                  <span style={{ color: 'var(--charcoal)', fontSize: 14, fontWeight: 500 }}>{item.nome}</span>
                  <span style={{ color: 'rgba(44,24,16,0.3)', fontSize: 12, marginLeft: 8 }}>x{item.qtd}</span>
                </div>
                <span style={{ color: 'var(--red)', fontSize: 14, fontWeight: 700 }}>
                  R${(item.preco * item.qtd).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <hr className="pz-conta-divider" />

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 0',
          }}>
            <span style={{ color: 'var(--charcoal)', fontSize: 16, fontWeight: 600 }}>Total</span>
            <span style={{
              fontFamily: "'Fraunces', serif",
              color: 'var(--red)',
              fontSize: 34,
              fontWeight: 900,
            }}>
              R${total.toFixed(2)}
            </span>
          </div>

          <button className="pz-checkout-btn" onClick={() => setContaAberta(false)} style={{ marginBottom: 10 }}>
            Confirmar Pagamento
          </button>
          <button className="pz-secondary-btn" onClick={() => setContaAberta(false)}>
            Continuar Pedindo
          </button>
        </div>
      </div>
    </div>
  )
}
