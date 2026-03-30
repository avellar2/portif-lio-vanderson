import { useState, useEffect } from 'react'

function App() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const SkillIcon = ({ name }) => {
    const icons = {
      "Next.js": (
        <svg viewBox="0 0 180 180" fill="currentColor" className="w-full h-full">
          <mask id="mask0_408_134" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
            <circle cx="90" cy="90" r="90" fill="black"/>
          </mask>
          <g mask="url(#mask0_408_134)">
            <circle cx="90" cy="90" r="87" fill="black" stroke="white" strokeWidth="6"/>
            <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#paint0_linear_408_134)"/>
            <rect x="115" y="54" width="12" height="72" fill="url(#paint1_linear_408_134)"/>
          </g>
          <defs>
            <linearGradient id="paint0_linear_408_134" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="white"/>
              <stop offset="1" stopColor="white" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="paint1_linear_408_134" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
              <stop stopColor="white"/>
              <stop offset="1" stopColor="white" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>
      ),
      "React": (
        <svg viewBox="-11.5 -10.23174 23 20.46348" fill="#61DAFB" className="w-full h-full">
          <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
          <g stroke="#61DAFB" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
          </g>
        </svg>
      ),
      "TypeScript": (
        <svg viewBox="0 0 256 256" fill="none" className="w-full h-full">
          <rect width="256" height="256" fill="#3178C6"/>
          <path d="M56.612 128.85h33.903v94.495h27.309v-94.495h33.902v-25.844H56.612v25.844zm96.578-25.844v118.339h27.308v-45.817h31.468c28.117 0 46.785-17.07 46.785-41.776 0-24.706-18.668-41.776-46.785-41.776h-58.776zm27.308 23.305h27.745c13.19 0 20.634 7.444 20.634 18.071s-7.444 18.071-20.634 18.071h-27.745v-36.142z" fill="white"/>
        </svg>
      ),
      "Node.js": (
        <svg viewBox="0 0 256 289" className="w-full h-full">
          <path d="M127.999 288.463c-3.975 0-7.685-1.06-11.13-2.915l-35.247-20.936c-5.3-2.915-2.65-3.975-1.06-4.505 7.155-2.385 8.48-2.915 15.9-7.156.795-.53 1.59-.265 2.385.265l27.032 16.166c1.06.53 2.385.53 3.18 0l105.739-61.217c1.06-.53 1.59-1.59 1.59-2.915V83.08c0-1.325-.53-2.385-1.59-2.915l-105.74-60.953c-1.059-.53-2.385-.53-3.18 0L20.405 80.166c-1.06.53-1.59 1.855-1.59 2.915v122.17c0 1.06.53 2.385 1.59 2.915l28.887 16.695c15.636 7.95 25.44-1.325 25.44-10.6V93.68c0-1.59 1.326-3.18 3.181-3.18h13.516c1.59 0 3.18 1.325 3.18 3.18v120.58c0 20.936-11.396 33.126-31.272 33.126-6.095 0-10.865 0-24.38-6.625L10.3 223.202c-6.889-3.975-11.13-11.395-11.13-19.346V81.686c0-7.95 4.241-15.371 11.13-19.346L115.869 1.06C122.758-2.915 132.24-2.915 139.129 1.06l105.74 61.217c6.889 3.975 11.13 11.395 11.13 19.346v122.17c0 7.95-4.241 15.371-11.13 19.346L139.129 284.488c-3.445 1.59-7.42 2.915-11.13 2.915zm32.596-84.009c-46.377 0-55.917-21.2-55.917-39.221 0-1.59 1.325-3.18 3.18-3.18h13.78c1.59 0 2.916 1.06 2.916 2.65 2.12 14.045 8.215 20.936 36.306 20.936 22.35 0 31.801-5.035 31.801-17.49 0-7.155-2.915-12.191-37.366-15.636-28.886-2.915-46.907-9.275-46.907-32.331 0-21.466 18.021-34.186 48.232-34.186 33.921 0 50.617 11.66 52.737 37.101 0 .795-.265 1.59-.795 2.385-.53.53-1.325 1.06-2.12 1.06h-13.78c-1.326 0-2.65-1.06-2.916-2.385-3.18-14.575-11.395-19.346-33.126-19.346-24.38 0-27.296 8.48-27.296 14.84 0 7.95 3.445 10.335 36.041 14.84 32.331 4.506 48.232 10.866 48.232 32.862 0 22.88-19.08 36.571-52.472 36.571z" fill="#539E43"/>
        </svg>
      ),
      "Tailwind CSS": (
        <svg viewBox="0 0 256 154" className="w-full h-full">
          <defs>
            <linearGradient x1="-2.778%" y1="32%" x2="100%" y2="67.556%" id="gradient">
              <stop stopColor="#2298BD" offset="0%"/>
              <stop stopColor="#0ED7B5" offset="100%"/>
            </linearGradient>
          </defs>
          <path d="M128 0C93.867 0 72.533 17.067 64 51.2 76.8 34.133 91.733 27.733 108.8 32c9.737 2.434 16.697 9.499 24.401 17.318C145.751 62.057 160.275 76.8 192 76.8c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C174.249 14.743 159.725 0 128 0zM64 76.8C29.867 76.8 8.533 93.867 0 128c12.8-17.067 27.733-23.467 44.8-19.2 9.737 2.434 16.697 9.499 24.401 17.318C81.751 138.857 96.275 153.6 128 153.6c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C110.249 91.543 95.725 76.8 64 76.8z" fill="url(#gradient)"/>
        </svg>
      ),
      "Prisma": (
        <svg viewBox="0 0 256 310" className="w-full h-full">
          <defs>
            <linearGradient x1="49.998%" y1="1.471%" x2="49.998%" y2="100%" id="prismaGradient">
              <stop stopColor="#FFF" offset="0%"/>
              <stop stopColor="#FFF" stopOpacity="0" offset="100%"/>
            </linearGradient>
          </defs>
          <path d="M254.313 235.519L148 9.749A17.063 17.063 0 00133.473.037a16.87 16.87 0 00-15.533 8.052L2.633 194.848a17.465 17.465 0 00.193 18.747L59.2 300.896a18.13 18.13 0 0020.363 7.489l163.599-48.392a17.929 17.929 0 0011.26-9.722 17.542 17.542 0 00-.109-14.752zm-23.802 9.683l-138.823 41.05c-4.235 1.252-8.738-1.017-10.304-5.189L27.919 192.75a3.245 3.245 0 01.037-3.478L123.117 24.28a3.145 3.145 0 012.897-1.85 3.234 3.234 0 012.897 1.696l90.286 208.393a3.355 3.355 0 01.017 2.746 3.38 3.38 0 01-2.124 1.837l-85.19 25.191a3.248 3.248 0 01-3.91-2.169 3.247 3.247 0 012.169-3.91l75.022-22.175a3.245 3.245 0 002.169-3.91 3.248 3.248 0 00-3.91-2.169l-85.19 25.191z" fill="#FFF"/>
          <path d="M230.511 245.202l-138.823 41.05c-4.235 1.252-8.738-1.017-10.304-5.189L27.919 192.75a3.245 3.245 0 01.037-3.478L123.117 24.28a3.145 3.145 0 012.897-1.85 3.234 3.234 0 012.897 1.696l90.286 208.393a3.355 3.355 0 01.017 2.746 3.38 3.38 0 01-2.124 1.837l-85.19 25.191a3.248 3.248 0 01-3.91-2.169 3.247 3.247 0 012.169-3.91l75.022-22.175a3.245 3.245 0 002.169-3.91 3.248 3.248 0 00-3.91-2.169l-85.19 25.191" fill="url(#prismaGradient)" fillOpacity=".5"/>
        </svg>
      ),
      "PostgreSQL": (
        <svg viewBox="0 0 256 264" className="w-full h-full">
          <path d="M255.008 158.086c-1.535-4.649-5.556-7.887-10.756-8.664-2.452-.366-5.26-.21-8.583.475-5.792 1.195-10.089 1.65-13.225 1.738 11.837-19.985 21.462-42.775 27.003-64.228 8.96-34.689 4.172-50.492-1.423-57.64C233.217 10.847 211.614.683 185.552.372c-13.903-.17-26.108 2.575-32.475 4.549-5.928-1.046-12.302-1.63-18.99-1.738-12.537-.2-23.614 2.533-33.555 8.044-3.181-2.225-7.368-4.002-12.622-5.29C78.833 3.443 68.915 2.725 59.566 3.8 39.431 6.087 26.395 14.947 19.632 29.837c-6.701 14.763-1.573 30.548 6.147 45.916 8.593 17.103 18.487 30.703 11.836 55.83-15.279 57.644 3.827 82.95 8.846 88.59 11.54 12.96 27.24 19.992 44.45 19.992 34.92 0 58.61-20.179 72.004-30.337 9.02-6.848 13.622-7.938 17.942-8.221 0 0 1.536-.103 2.725-.103 4.56 0 15.9 1.708 21.142 7.077 3.43 3.512 5.076 8.322 4.896 14.29-.255 8.562-5.272 15.472-13.898 19.094-2.12.89-3.952 1.667-11.438 3.648-3.89.94-8.313 2.052-12.926 3.512-21.667 6.848-39.802 17.566-50.688 29.488-10.561 11.549-13.785 23.407-9.757 35.208 5.11 14.958 17.655 25.344 32.353 26.797 1.61.159 3.24.239 4.852.239 13.615 0 26.876-6.078 37.981-17.449 12.661-12.969 21.103-31.958 24.585-55.309 1.833-12.35 5.709-16.228 9.159-18.9 4.456-3.442 10.436-5.15 18.64-5.284l.58-.019c7.106-.11 11.998-1.938 15.875-5.932 6.111-6.289 6.927-16.657 7.02-28.04.039-4.579.073-9.096.621-13.266 2.48-18.866-4.062-34.761-9.81-43.737zm-4.744 43.002c-.508 3.855-.54 8.275-.579 12.788-.096 11.499-.793 20.493-5.354 25.218-2.566 2.659-5.818 3.902-11.085 3.992l-.604.02c-9.708.146-16.81 2.542-22.354 7.548-4.857 4.387-9.015 10.496-11.275 26.438-3.193 22.48-11.018 39.96-22.716 50.761-9.584 9.845-20.794 15.128-31.558 14.876-10.875-1.075-20.682-9.562-24.592-21.277-3.21-9.616-.735-18.844 7.854-28.026 9.822-10.5 26.509-20.188 46.297-26.442 4.495-1.423 8.838-2.503 12.651-3.424 7.727-1.87 9.707-2.706 12.198-3.803 10.462-4.396 16.746-12.949 17.066-23.278.244-7.877-2.04-14.415-6.8-19.441-7.528-7.93-21.587-9.923-27.336-9.923-1.389 0-2.869.105-2.966.11-5.293.369-10.97 1.779-21.486 9.595-12.827 9.724-35.553 28.759-68.008 28.759-14.917 0-28.741-6.056-38.966-17.077-4.042-4.355-21.518-27.184-6.876-83.018 7.087-27.036-3.07-41.926-11.966-59.627-6.908-13.739-12.315-28.628-6.295-41.866 5.555-12.213 16.472-19.47 34.44-21.467 8.423-1.027 17.627-.235 25.901 2.074 9.29 2.591 11.615 5.694 11.883 6.178-4.104 5.516-7.734 11.504-10.652 17.76-4.74 10.168-7.421 20.622-7.896 31.391-.44 9.97.465 19.002 2.78 27.826 2.411 9.205 6.964 14.184 8.649 15.714 6.198 5.638 13.2 8.398 21.381 8.398h.099c14.655-.117 27.982-9.136 35.303-23.891 7.244-14.593 7.797-30.922 1.613-47.538-1.768-4.754-4.086-8.935-6.843-12.674 8.654-5.22 18.38-7.712 29.694-7.539 6.302.097 12.291.64 17.8 1.595 2.052.355 3.952.733 5.685 1.123 3.426 10.784 8.999 19.798 16.662 27.334 9.987 9.827 21.913 15.613 33.467 16.344 11.21.716 22-3.176 30.378-10.964 12.768-11.868 16.128-28.844 8.764-44.233-1.475-3.087-3.283-5.972-5.44-8.63 5.531-1.505 15.618-4.036 26.914-4.036.331 0 .657.004.98.01 22.873.274 41.995 9.363 54.193 25.68 4.516 6.049 8.452 20.537.007 53.169-5.905 22.831-17.074 48.107-31.382 71.039-2.496 4.001-5.21 7.87-8.14 11.57-6.894 8.717-14.565 16.355-23.226 23.156.792.061 1.588.107 2.385.135 2.017.07 4.108.106 6.236.106 3.534 0 7.16-.142 10.784-.424 6.717-1.004 12.248-2.315 16.911-4.008 3.684 5.084 6.547 10.954 8.451 17.558 9.013 31.25-2.015 56.326-10.091 73.528-2.565 5.464-4.609 9.82-5.611 12.671-1.423 4.047-2.071 7.983-1.953 11.838.152 4.98 1.647 9.551 4.258 13.307 3.486 5.016 8.561 8.489 14.085 9.943 1.514-1.401 3.004-2.922 4.458-4.585 6.205-7.097 11.085-15.286 14.502-24.345 4.707-12.474 6.634-25.551 5.726-38.866z" fill="#000"/>
          <path d="M237.906 160.722c-29.74 6.135-31.785-3.934-31.785-3.934 31.4-46.593 44.527-105.736 33.2-120.211-30.904-39.485-84.399-20.811-85.292-20.327l-.287.052c-5.876-1.22-12.451-1.946-19.842-2.067-13.456-.22-23.664 3.528-31.41 9.402 0 0-95.43-39.314-90.991 49.444.944 18.882 27.064 142.873 58.218 105.422 11.387-13.695 22.39-25.274 22.39-25.274 5.464 3.63 12.006 5.482 18.864 4.817l.533-.452c-.166 1.7-.09 3.363.213 5.332-8.026 8.967-5.667 10.541-21.711 13.844-16.235 3.346-6.698 9.302-.471 10.86 7.549 1.887 25.013 4.561 36.813-11.958l-.47 1.885c3.144 2.519 2.947 16.562 3.734 25.376.788 8.813 1.573 17.194 4.006 22.136 2.434 4.942 5.59 26.335 18.892 20.862 11.26-4.638 11.826-13.936 12.43-23.538.407-6.468 1.159-2.838 1.159-12.484v-17.06c0-11.24-.336-14.544 3.504-19.894 2.566-3.576 10.059-5.128 9.655-26.955-.098-5.36 14.928-.76 15.051-.165 1.065 5.16 2.53 14.754 1.839 32.946-.716 18.854-2.474 24.488-1.948 26.335 1.158 4.067 3.505 12.648 18.332 10.049 12.29-2.157 16.754-8.646 17.069-18.572.18-5.67.646-3.166 1.339-21.467.396-10.438-1.057-16.982 2.962-20.303a20.54 20.54 0 016.255-3.757c2.98-1.094 9.527-1.565 12.378-.838 6.573 1.668 10.045 5.318 10.032 11.858-.014 7.229-3.993 13.224-11.925 15.398-2.053.564-3.924 1.634-2.23 3.704 1.693 2.07 4.987 2.302 7.018 1.8 12.965-3.206 19.382-12.045 18.644-21.86-.952-12.664-11.397-18.555-23.307-18.634-14.137-.092-16.645 1.565-16.645 1.565z" fill="#336791"/>
        </svg>
      ),
      "Firebase": (
        <svg viewBox="0 0 256 351" className="w-full h-full">
          <defs>
            <linearGradient x1="49.998%" y1="0%" x2="49.998%" y2="100%" id="firebaseGradient">
              <stop stopColor="#FFC24A" offset="0%"/>
              <stop stopColor="#F57C00" offset="100%"/>
            </linearGradient>
          </defs>
          <path d="M1.253 280.732l1.605-3.131 99.353-188.518-44.15-83.475C54.392-1.283 45.074.474 43.87 8.188L1.253 280.732z" fill="#FFC24A"/>
          <g>
            <path d="M134.417 148.974l32.039-32.812-32.039-61.007c-3.042-5.791-10.433-6.398-13.443-.59l-17.705 34.109-.53 1.744 31.678 58.556z" fill="#FFA712"/>
          </g>
          <path d="M134.417 148.974L102.1 183.312 122.662 0l12.156 25.355-.4 123.619z" fill="#F4BD62"/>
          <path d="M139.46 208.126L122.663.032l-54.45 102.92L1.254 280.726l134.366 79.216 119.124-68.582-115.284-83.234z" fill="url(#firebaseGradient)"/>
        </svg>
      ),
      "Chart.js": (
        <svg viewBox="0 0 256 256" className="w-full h-full">
          <rect width="256" height="256" fill="#FF6384" rx="28"/>
          <path d="M128 32c-53.02 0-96 42.98-96 96s42.98 96 96 96 96-42.98 96-96-42.98-96-96-96zm0 176c-44.183 0-80-35.817-80-80s35.817-80 80-80 80 35.817 80 80-35.817 80-80 80z" fill="#FFF"/>
          <path d="M128 64c-35.346 0-64 28.654-64 64s28.654 64 64 64 64-28.654 64-64-28.654-64-64-64zm0 112c-26.51 0-48-21.49-48-48s21.49-48 48-48 48 21.49 48 48-21.49 48-48 48z" fill="#FFF" opacity=".6"/>
          <path d="M172 128c0-24.3-19.7-44-44-44v88c24.3 0 44-19.7 44-44z" fill="#FFF" opacity=".3"/>
        </svg>
      ),
      "Git": (
        <svg viewBox="0 0 256 256" className="w-full h-full">
          <path d="M251.172 116.594L139.4 4.828c-6.433-6.437-16.873-6.437-23.314 0l-23.21 23.21 29.443 29.443c6.842-2.312 14.688-.761 20.142 4.693 5.48 5.489 7.02 13.402 4.652 20.266l28.375 28.376c6.865-2.365 14.786-.835 20.269 4.657 7.663 7.66 7.663 20.075 0 27.74-7.665 7.666-20.08 7.666-27.749 0-5.764-5.77-7.188-14.235-4.27-21.336l-26.462-26.462-.003 69.637a19.82 19.82 0 015.188 3.71c7.663 7.66 7.663 20.076 0 27.747-7.665 7.662-20.086 7.662-27.74 0-7.663-7.671-7.663-20.086 0-27.746a19.654 19.654 0 016.421-4.281V94.196a19.378 19.378 0 01-6.421-4.281c-5.806-5.798-7.202-14.317-4.227-21.446L81.47 39.442l-76.64 76.635c-6.44 6.443-6.44 16.884 0 23.322l111.774 111.768c6.435 6.438 16.873 6.438 23.316 0l111.251-111.249c6.438-6.44 6.438-16.887 0-23.324" fill="#DE4C36"/>
        </svg>
      )
    };

    return icons[name] || null;
  };

  const skills = [
    { name: "Next.js" },
    { name: "React" },
    { name: "TypeScript" },
    { name: "Node.js" },
    { name: "Tailwind CSS" },
    { name: "Prisma" },
    { name: "PostgreSQL" },
    { name: "Firebase" },
    { name: "Chart.js" },
    { name: "Git" }
  ]

  const projects = [
    {
      title: "Sistema CSDT",
      description: "Sistema de gerenciamento escolar desenvolvido com Next.js. Inclui funcionalidades para gestão de alunos, escolas e impressoras, com processamento de dados e geração de relatórios.",
      tags: ["Next.js", "TypeScript", "Prisma", "Tailwind"],
      link: "https://github.com/avellar2/CSDT-2",
      gradient: "from-blue-500 to-cyan-500",
      icon: "💻"
    },
    {
      title: "LP JL Odontologia",
      description: "Landing Page completa com simulador de tratamento, agendamento online e painel administrativo para gestão de leads e consultas da semana.",
      tags: ["React", "Next.js", "Tailwind", "Firebase"],
      link: "#",
      gradient: "from-blue-500 to-green-500",
      icon: "🦷"
    },
    {
      title: "Modelo Advocacia (Demo)",
      description: "Landing Page para escritórios de advocacia com formulário de triagem do caso, agendamento de consulta inicial e painel de gestão de clientes.",
      tags: ["React", "Next.js", "Tailwind", "PostgreSQL"],
      link: "#",
      gradient: "from-blue-900 to-yellow-600",
      icon: "⚖️"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Background decorativo */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a href="#home" className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Vanderson
            </a>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">Home</a>
              <a href="#about" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">Sobre</a>
              <a href="#skills" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">Skills</a>
              <a href="#services" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">Serviços</a>
              <a href="#projects" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">Projetos</a>
              <a href="#contact" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">Contato</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Foto */}
            <div className="md:w-1/2 flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full blur-2xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                <div className="relative">
                  <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-2xl ring-4 ring-indigo-200">
                    <img
                      src="/foto.jpg"
                      alt="Vanderson"
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg font-semibold">
                    28 anos 🎉
                  </div>
                </div>
              </div>
            </div>

            {/* Texto */}
            <div className="md:w-1/2 text-center md:text-left">
              <div className="inline-block mb-4">
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  Disponível para projetos
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Olá, eu sou
                <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mt-2">
                  Vanderson
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                Crio Landing Pages que geram agendamentos e capturam leads qualificados para clínicas, consultórios e escritórios na Baixada Fluminense e região 🚀
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a href="#projects" className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white rounded-full overflow-hidden shadow-2xl transition-all duration-300 hover:scale-105">
                  <span className="absolute w-full h-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></span>
                  <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-full group-hover:h-56 opacity-10"></span>
                  <span className="relative">Ver Projetos</span>
                </a>
                <a href="https://wa.me/5521968410983" target="_blank" rel="noopener noreferrer" className="px-8 py-4 border-2 border-green-600 text-green-600 rounded-full font-bold hover:bg-green-600 hover:text-white transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2 justify-center">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Entre em Contato
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-indigo-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Sobre Mim
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Card com foto e info */}
            <div className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <div className="aspect-square rounded-2xl overflow-hidden mb-6 shadow-lg">
                  <img
                    src="/foto.jpg"
                    alt="Vanderson"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl">
                    <span className="text-2xl">📍</span>
                    <div>
                      <p className="font-semibold text-gray-900">Localização</p>
                      <p className="text-gray-600">Rio de Janeiro, RJ</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
                    <span className="text-2xl">🎓</span>
                    <div>
                      <p className="font-semibold text-gray-900">Formação</p>
                      <p className="text-gray-600">Análise e Desenvolvimento de Sistemas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Texto sobre */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-3xl">👋</span>
                  Prazer!
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Tenho <span className="font-bold text-indigo-600">28 anos</span> e sou <span className="font-bold text-indigo-600">carioca</span>.
                  Sou formado em <span className="font-bold text-purple-600">Análise e Desenvolvimento de Sistemas</span> e sou um verdadeiro
                  <span className="font-bold text-pink-600"> amante de tecnologia</span>.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Sou <span className="font-bold text-indigo-600">desenvolvedor web freelancer</span> especializado em criar
                  <span className="font-bold text-purple-600"> Landing Pages de alta conversão</span>. Entrego não só o site, mas um
                  <span className="font-bold text-pink-600"> sistema completo</span> com agendamento online e painel administrativo para você acompanhar seus leads e consultas em tempo real. 🚀
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-2xl shadow-xl text-white text-center transform hover:scale-105 transition-transform">
                  <div className="text-4xl font-bold mb-2">28</div>
                  <div className="text-sm opacity-90">Anos</div>
                </div>
                <div className="bg-gradient-to-br from-purple-600 to-pink-500 p-6 rounded-2xl shadow-xl text-white text-center transform hover:scale-105 transition-transform">
                  <div className="text-4xl font-bold mb-2">RJ</div>
                  <div className="text-sm opacity-90">Rio de Janeiro</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Minhas Skills
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-indigo-50 p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 text-center group cursor-pointer"
              >
                <div className="w-16 h-16 mx-auto mb-3 group-hover:scale-125 transition-transform duration-300">
                  <SkillIcon name={skill.name} />
                </div>
                <p className="font-semibold text-gray-900">{skill.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                O que eu entrego
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full mb-4"></div>
            <p className="text-gray-600 text-lg">
              Um sistema completo, do site ao painel de gestão
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500 text-center">
              <div className="text-6xl mb-6 transform group-hover:scale-125 transition-transform duration-300">🎯</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors">
                Landing Page de Alta Conversão
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Design profissional, rápido e otimizado para converter visitantes em clientes.
              </p>
            </div>

            <div className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500 text-center">
              <div className="text-6xl mb-6 transform group-hover:scale-125 transition-transform duration-300">📅</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors">
                Agendamento Online
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Sistema integrado para seus clientes agendarem diretamente pelo site, 24h por dia.
              </p>
            </div>

            <div className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500 text-center">
              <div className="text-6xl mb-6 transform group-hover:scale-125 transition-transform duration-300">📊</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors">
                Painel Administrativo
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Visualize seus leads, agendamentos da semana e histórico de contatos em um só lugar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Meus Projetos
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full mb-4"></div>
            <p className="text-gray-600 text-lg">
              Alguns dos trabalhos que tenho orgulho de compartilhar
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500"
              >
                <div className={`h-56 bg-gradient-to-br ${project.gradient} flex items-center justify-center text-white text-7xl relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  <span className="relative z-10 transform group-hover:scale-125 transition-transform duration-500">{project.icon}</span>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    className="inline-flex items-center text-indigo-600 font-bold hover:text-purple-600 transition-colors group-hover:gap-3 gap-2"
                  >
                    Ver projeto
                    <span className="transform group-hover:translate-x-2 transition-transform">→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Vamos Conversar?
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full mb-4"></div>
            <p className="text-gray-600 text-lg">
              Entre em contato comigo através das redes sociais
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="https://github.com/avellar2"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-gray-900 text-white px-10 py-5 rounded-2xl font-bold hover:scale-110 transition-all duration-300 shadow-xl flex items-center gap-3 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <svg className="relative w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <span className="relative">GitHub</span>
            </a>
            <a
              href="https://wa.me/5521968410983"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-green-600 text-white px-10 py-5 rounded-2xl font-bold hover:scale-110 transition-all duration-300 shadow-xl flex items-center gap-3 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <svg className="relative w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span className="relative">WhatsApp</span>
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative text-white px-10 py-5 rounded-2xl font-bold hover:scale-110 transition-all duration-300 shadow-xl flex items-center gap-3 overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)' }}
            >
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(135deg, #fcb045, #fd1d1d, #833ab4)' }}></span>
              <svg className="relative w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span className="relative">Instagram</span>
            </a>
            <a
              href="mailto:vandersonavellar1997@gmail.com"
              className="group relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-10 py-5 rounded-2xl font-bold hover:scale-110 transition-all duration-300 shadow-xl flex items-center gap-3 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <span className="relative text-3xl">✉️</span>
              <span className="relative">Email</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Vanderson
            </h3>
            <p className="text-gray-400 mb-4">
              Desenvolvedor Full Stack • Rio de Janeiro, RJ
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-500 text-sm">
              © 2026 Vanderson. Feito com React + Vite + Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
