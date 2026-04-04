import { useCallback } from 'react'

export function useCard3D() {
  const handleCardMove = useCallback((e, card) => {
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    const rotateX = (0.5 - y) * 18
    const rotateY = (x - 0.5) * 18

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    card.style.setProperty('--mouse-x', `${x * 100}%`)
    card.style.setProperty('--mouse-y', `${y * 100}%`)
  }, [])

  const handleCardLeave = useCallback((card) => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
  }, [])

  return { handleCardMove, handleCardLeave }
}
