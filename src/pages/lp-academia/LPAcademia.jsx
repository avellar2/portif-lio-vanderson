import { useEffect } from 'react'

export default function LPAcademia() {
  useEffect(() => {
    window.location.href = '/lp-academia/index.html'
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0A0A0A' }}>
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-t-transparent rounded-full animate-spin mx-auto mb-4" style={{ borderColor: '#E63946', borderTopColor: 'transparent' }} />
        <p className="text-gray-400 text-sm">Carregando...</p>
      </div>
    </div>
  )
}
