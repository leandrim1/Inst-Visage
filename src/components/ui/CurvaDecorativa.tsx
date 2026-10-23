import { cn } from '@/lib/utils'

interface CurvaDecorativaProps {
  className?: string
}

/**
 * Elemento gráfico discreto inspirado nas curvas da logo — o contorno do
 * dente e o arco do perfil. É puramente decorativo e original: não é um
 * recorte nem uma alteração da logo oficial.
 */
export function CurvaDecorativa({ className }: CurvaDecorativaProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn('pointer-events-none select-none', className)}
    >
      <path
        d="M61 28c16 0 20 11 39 11s23-11 39-11c21 0 32 18 32 41 0 27-13 38-19 63-5 22-9 46-24 46-13 0-13-20-16-36-2-12-6-19-12-19s-10 7-12 19c-3 16-3 36-16 36-15 0-19-24-24-46C42 107 29 96 29 69c0-23 11-41 32-41Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
        opacity="0.55"
      />
      <path
        d="M122 46c23 7 38 28 38 53 0 20-10 38-25 49"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.3"
      />
    </svg>
  )
}
