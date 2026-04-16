import { useEffect, useState } from 'react'

export default function HoloCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [trail, setTrail] = useState([])
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })

      // Adicionar posição à trilha
      setTrail(prev => {
        const newTrail = [{ x: e.clientX, y: e.clientY, id: Date.now() }, ...prev]
        return newTrail.slice(0, 15) // Manter apenas 15 pontos
      })
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <>
      <style>{`
        * {
          cursor: none !important;
        }
        .holo-cursor {
          position: fixed;
          pointer-events: none;
          z-index: 99999;
          mix-blend-mode: screen;
        }
        .cursor-main {
          width: 20px;
          height: 20px;
          border: 2px solid #00ffff;
          border-radius: 50%;
          box-shadow: 0 0 20px #00ffff, 0 0 40px #00ffff80, inset 0 0 10px #00ffff40;
          transform: translate(-50%, -50%);
          transition: width 0.2s, height 0.2s;
        }
        .cursor-main.clicking {
          width: 12px;
          height: 12px;
          background: #ff00ff;
          border-color: #ff00ff;
          box-shadow: 0 0 30px #ff00ff, 0 0 60px #ff00ff80;
        }
        .cursor-dot {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #fff;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 10px #00ffff;
        }
        .cursor-trail {
          position: absolute;
          width: 8px;
          height: 8px;
          background: radial-gradient(circle, #00ffff80 0%, transparent 70%);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: trail-fade 0.5s ease-out forwards;
        }
        @keyframes trail-fade {
          0% { opacity: 0.8; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(0); }
        }
        .cursor-ring {
          position: absolute;
          width: 40px;
          height: 40px;
          border: 1px solid #ff00ff40;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: ring-pulse 1.5s ease-out infinite;
        }
        @keyframes ring-pulse {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.8; }
          100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
        }
      `}</style>

      <div
        className="holo-cursor cursor-main"
        style={{
          left: position.x,
          top: position.y,
        }}
      >
        <div className={`cursor-dot ${isClicking ? 'hidden' : ''}`} />
        <div className="cursor-ring" />
      </div>

      {trail.map((point, index) => (
        <div
          key={point.id}
          className="holo-cursor cursor-trail"
          style={{
            left: point.x,
            top: point.y,
            animationDelay: `${index * 0.02}s`,
            opacity: 1 - (index / 15),
          }}
        />
      ))}
    </>
  )
}
