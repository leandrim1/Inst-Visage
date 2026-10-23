import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/Container'

type Fundo = 'branco' | 'neutro' | 'azul' | 'marinho'

const fundos: Record<Fundo, string> = {
  branco: 'bg-white',
  neutro: 'bg-neutro-50',
  azul: 'bg-azul-600',
  marinho: 'bg-azul-800',
}

interface SecaoProps {
  id: string
  children: ReactNode
  fundo?: Fundo
  className?: string
  /** Id do título que nomeia a seção para leitores de tela. */
  idTitulo?: string
  /** Remove o respiro vertical padrão quando a seção controla o próprio espaço. */
  semEspacamento?: boolean
}

/** Casca de seção: âncora de navegação, fundo alternado e respiro vertical. */
export function Secao({
  id,
  children,
  fundo = 'branco',
  className,
  idTitulo,
  semEspacamento = false,
}: SecaoProps) {
  return (
    <section
      id={id}
      aria-labelledby={idTitulo}
      className={cn(
        fundos[fundo],
        !semEspacamento && 'py-18 sm:py-24 lg:py-28',
        // O recuo do cabeçalho fixo vem do `scroll-padding-top` em :root;
        // repetir com `scroll-mt` aqui somaria os dois e passaria do alvo.
        'outline-none',
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  )
}
