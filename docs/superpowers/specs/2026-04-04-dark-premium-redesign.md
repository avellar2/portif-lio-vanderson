# Portfólio Dark Premium — Spec de Design

## Direção Estética
Dark mode premium com gradientes sutis indigo/purple/pink, tipografia Sora (geométrica), scroll animations via Intersection Observer e glassmorphism seletivo. Sensação de agência digital de alto padrão.

## Decisões do Usuário
- Estilo: Dark e sofisticado
- Animações: Scroll animations (reveal ao scrollar)
- Escopo: Completo (todas as seções)
- Tipografia: Sans-serif geométrica (Sora)

## Restrições Técnicas
- Sem dependências novas (sem lib de animação)
- Fonte Sora via Google Fonts no index.html
- Tailwind CSS existente + customizações no tailwind.config.js
- Scroll reveal com Intersection Observer nativo + CSS transitions
- Arquivo único App.jsx (monolito mantido)

---

## Mudanças por Seção

### 1. Base Global
- Fundo: `bg-gray-950` como base, seções alternam entre `gray-950` e `gray-900`
- Texto: `text-gray-100` para headings, `text-gray-300`/`text-gray-400` para corpo
- Background decorativo: dot grid pattern sutil + blobs com opacity reduzida
- Scrollbar customizada (dark)

### 2. Fonte Sora
- Adicionar `<link>` do Google Fonts no index.html (pesos 400, 500, 600, 700)
- Configurar `fontFamily: { sans: ['Sora', ...] }` no tailwind.config.js
- Atualizar `lang="pt-BR"` no html

### 3. Navbar
- Fundo escuro translúcido desde o início: `bg-gray-950/80 backdrop-blur-lg`
- Quando scrolled: adicionar borda inferior sutil `border-b border-gray-800`
- Links: `text-gray-300 hover:text-white` com transição de cor
- Hover com gradiente sutil no underline
- Menu hamburger no mobile (hambúrguer icon + drawer simples)

### 4. Hero Section
- Background: dot grid pattern CSS + glow gradiente central sutil
- Foto: borda com gradiente animado (ring gradiente) ao invés de anel branco
- Título: efeito de gradiente animado (background-size animation)
- Badge "Disponível": glow pulsante com box-shadow animado
- Botão primário: gradiente com hover brightness
- Botão WhatsApp: outline glassmorphism (bg-white/10 backdrop-blur border-white/20)

### 5. Sobre Mim
- Cards com efeito glass: `bg-white/5 backdrop-blur-sm border border-white/10`
- Foto em container com gradiente na borda (pseudo-element)
- Stats badges (28 anos, RJ): fundo gradiente com glow sutil
- Info boxes (localização, formação): glass cards menores

### 6. Skills
- Cards: `bg-gray-900 border border-gray-800` base
- Hover: `border-indigo-500/50` + `shadow-lg shadow-indigo-500/10` + translate-y
- Ícones mantidos, hover com scale

### 7. Serviços (O que eu entrego)
- Cards com glassmorphism: `bg-white/5 backdrop-blur border border-white/10`
- Numeração sutil (01, 02, 03) no canto superior em `text-gray-700`
- Ícones: emoji grande com gradiente no hover
- Hover: borda brilha com gradiente + leve translateY

### 8. Projetos
- Cards escuros: `bg-gray-900 border border-gray-800`
- Header do card (área do gradiente): mantido com ícone do projeto
- Hover: borda gradiente + shadow + translateY
- Tags: `bg-gray-800 text-indigo-400` (fundo escuro, texto colorido)
- Link "Ver projeto": `text-indigo-400 hover:text-indigo-300`

### 9. Contato
- Botões: estilo glass com cor de cada rede
  - GitHub: `bg-gray-800 border border-gray-700`
  - WhatsApp: `bg-green-900/50 border border-green-700/50`
  - Instagram: gradiente da marca com opacity
  - Email: `bg-indigo-900/50 border border-indigo-700/50`
- Todos com hover: brightness + scale

### 10. Footer
- Fundo: `bg-gray-950 border-t border-gray-800`
- "Vanderson" com gradiente
- "Avellar Digital" em branco
- Separador: linha gradiente animada (width pulse)
- Copyright: `text-gray-600`

---

## Scroll Animations (Intersection Observer)
- Hook `useScrollReveal` que adiciona classe `.revealed` quando elemento entra no viewport
- CSS: `.reveal-item` com `opacity-0 translate-y-8` → `.revealed` com `opacity-1 translate-y-0 transition-all duration-700`
- Stagger: cada card dentro de uma seção recebe `transition-delay` incremental (100ms, 200ms, 300ms)

## Arquivos Modificados
1. `index.html` — adicionar fonte Sora, lang="pt-BR"
2. `tailwind.config.js` — adicionar fontFamily, ajustar cores dark
3. `src/index.css` — custom scrollbar, dot grid pattern, classes reveal
4. `src/App.jsx` — todas as seções refatoradas para tema dark
