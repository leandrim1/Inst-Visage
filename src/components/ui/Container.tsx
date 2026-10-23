import type { ElementType, ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface ContainerProps {
  children: ReactNode
  className?: string
  /** Elemento HTML renderizado. Padrão: `div`. */
  as?: ElementType
}

/** Largura máxima e respiros laterais usados por todas as seções. */
export function Container({ children, className, as: Tag = 'div' }: ContainerProps) {
  return (
    <Tag className={cn('mx-auto w-full max-w-[76rem] px-5 sm:px-8 lg:px-10', className)}>
      {children}
    </Tag>
  )
}
