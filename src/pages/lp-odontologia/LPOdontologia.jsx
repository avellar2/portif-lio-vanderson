import { Link } from 'react-router-dom'

export default function LPOdontologia() {
  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      {/* Botão voltar fixo */}
      <Link
        to="/"
        style={{
          position: 'fixed',
          top: '1rem',
          left: '1rem',
          zIndex: 9999,
          padding: '0.6rem 1.2rem',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          borderRadius: '100px',
          color: '#1B1B1B',
          textDecoration: 'none',
          fontSize: '0.85rem',
          fontWeight: '600',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s',
        }}
        onMouseEnter={(e) => {
          e.target.style.background = '#2A9D8F'
          e.target.style.color = '#fff'
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.95)'
          e.target.style.color = '#1B1B1B'
        }}
      >
        ← Voltar ao Portfolio
      </Link>

      {/* Iframe com a LP completa */}
      <iframe
        src="/lp-dentista/index.html"
        style={{
          width: '100%',
          height: '100vh',
          border: 'none',
          position: 'fixed',
          top: 0,
          left: 0,
        }}
        title="LP Odontologia"
      />
    </div>
  )
}
