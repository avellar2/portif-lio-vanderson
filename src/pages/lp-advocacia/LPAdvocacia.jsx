import { useEffect } from 'react'

export default function LPAdvocacia() {
  useEffect(() => {
    window.location.href = '/lp-advogados/index.html'
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0d0d12' }}>
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-t-transparent rounded-full animate-spin mx-auto mb-4" style={{ borderColor: '#c9a84c', borderTopColor: 'transparent' }} />
        <p className="text-gray-400 text-sm">Carregando...</p>
      </div>
    </div>
  )
}
