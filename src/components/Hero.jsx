import { useCard3D } from '../hooks/useCard3D.jsx'

export default function Hero() {
  const { handleCardMove, handleCardLeave } = useCard3D()

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-center">

          {/* Texto — 7 colunas */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="reveal-item">
              <span className="inline-flex items-center gap-2.5 glass-strong px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase text-indigo-300 border border-indigo-500/10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                </span>
                Disponivel para projetos
              </span>
            </div>

            <h1 className="reveal-item font-display">
              <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-extrabold text-white/70 tracking-tight leading-none">
                Olá, eu sou
              </span>
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-7xl font-extrabold gradient-text-animated tracking-tighter leading-none mt-1">
                Vanderson
              </span>
            </h1>

            <p className="text-base md:text-lg text-gray-400 leading-relaxed max-w-lg reveal-item">
              Crio <span className="text-white font-semibold">Landing Pages</span> que geram agendamentos e capturam leads qualificados para clinicas, consultorios e escritorios na Baixada Fluminense e regiao.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 reveal-item">
              <a href="#projects" className="group relative glass-strong rounded-2xl px-7 py-4 font-bold text-white transition-all duration-300 hover:scale-[1.03] bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20 border border-indigo-500/15 hover:border-indigo-400/30 flex items-center gap-3 justify-center shimmer-sweep">
                <span>Ver Projetos</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
              <a href="https://wa.me/5521968410983" target="_blank" rel="noopener noreferrer" className="group glass-strong rounded-2xl px-7 py-4 font-bold text-gray-300 hover:text-white transition-all duration-300 hover:scale-[1.03] flex items-center gap-3 justify-center border border-white/[0.06] hover:border-green-500/20">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Foto card — 5 colunas */}
          <div className="lg:col-span-5 reveal-item">
            <div
              className="relative group card-3d"
              onMouseMove={(e) => handleCardMove(e, e.currentTarget)}
              onMouseLeave={(e) => handleCardLeave(e.currentTarget)}
            >
              {/* Foto PNG grande — cabeça sai pra fora */}
              <div className="relative flex justify-center">
                <img
                  src="/foto-transparente.png"
                  alt="Vanderson"
                  className="w-[380px] sm:w-[440px] lg:w-[500px] xl:w-[560px] h-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.7)] group-hover:scale-[1.03] group-hover:-translate-y-3 transition-all duration-700 ease-out relative z-10"
                />

                {/* Badge 28 anos */}
                <div className="absolute top-12 right-0 z-20 bg-gradient-to-r from-indigo-600 to-purple-600 px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg shadow-indigo-500/30 border border-white/20">
                  28 anos
                </div>

                {/* Stats flutuando sobre o abdomen */}
                <div className="absolute bottom-0 left-0 right-0 z-20 bg-[#0c0c1a]/90 backdrop-blur-xl rounded-b-2xl p-4 border border-white/[0.08] border-t-0">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">📍</span>
                      <div>
                        <p className="text-white text-[11px] font-semibold">Rio de Janeiro</p>
                        <p className="text-gray-500 text-[9px]">Duque de Caxias</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">🎓</span>
                      <div>
                        <p className="text-white text-[11px] font-semibold">Analise e Dev</p>
                        <p className="text-gray-500 text-[9px]">de Sistemas</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
