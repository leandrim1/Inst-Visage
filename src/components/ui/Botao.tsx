import type { ButtonHTMLAttributes, ReactNode } from 'react'

import { classesBotao } from '@/lib/estilosBotao'
import type { EstiloBotao } from '@/lib/estilosBotao'

interface BotaoProps extends ButtonHTMLAttributes<HTMLButtonElement>, EstiloBotao {
  children: ReactNode
}

export function Botao({ variante, tamanho, className, children, ...props }: BotaoProps) {
  return (
    <button className={classesBotao({ variante, tamanho, className })} {...props}>
      {children}
    </button>
  )
}

interface LinkBotaoProps extends EstiloBotao {
  href: string
  children: ReactNode
  /** Abre em nova aba com `rel` seguro — usado para WhatsApp e Google Maps. */
  externo?: boolean
  'aria-label'?: string
}

export function LinkBotao({
  href,
  children,
  externo = false,
  variante,
  tamanho,
  className,
  ...props
}: LinkBotaoProps) {
  return (
    <a
      href={href}
      className={classesBotao({ variante, tamanho, className })}
      {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...props}
    >
      {children}
    </a>
  )
}
