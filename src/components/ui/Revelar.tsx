import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { useMovimentoReduzido } from '@/hooks/useMovimentoReduzido'

interface RevelarProps {
  children: ReactNode
  /** Atraso em milissegundos, para escalonar itens de uma mesma grade. */
  atraso?: number
  className?: string
}

/**
 * Transição discreta de entrada quando o bloco aparece na tela.
 * Com `prefers-reduced-motion`, o conteúdo é exibido sem animação.
 */
export function Revelar({ children, atraso = 0, className }: RevelarProps) {
  const referencia = useRef<HTMLDivElement>(null)
  const movimentoReduzido = useMovimentoReduzido()
  const [visto, setVisto] = useState(false)

  // Sem animação quando o sistema pede movimento reduzido: o bloco já nasce visível.
  const visivel = visto || movimentoReduzido

  useEffect(() => {
    if (movimentoReduzido) return

    const elemento = referencia.current
    if (!elemento) return

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada?.isIntersecting) {
          setVisto(true)
          observador.disconnect()
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    )

    observador.observe(elemento)
    return () => observador.disconnect()
  }, [movimentoReduzido])

  return (
    <div
      ref={referencia}
      className={cn(
        'transition-[opacity,transform] duration-700 ease-[var(--ease-marca)] motion-reduce:transition-none',
        visivel ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0',
        className,
      )}
      style={visivel && atraso ? { transitionDelay: `${atraso}ms` } : undefined}
    >
      {children}
    </div>
  )
}
