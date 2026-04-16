import { useEffect } from 'react'

export default function LPRestaurante() {
  useEffect(() => {
    window.location.href = '/lp-restaurante/index.html'
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0a08' }}>
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-t-transparent rounded-full animate-spin mx-auto mb-4" style={{ borderColor: '#b07d56', borderTopColor: 'transparent' }} />
        <p className="text-gray-400 text-sm">Carregando...</p>
      </div>
    </div>
  )
}
