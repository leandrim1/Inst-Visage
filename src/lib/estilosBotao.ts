import { cn } from '@/lib/utils'

export type VarianteBotao = 'primario' | 'secundario' | 'contorno' | 'contornoClaro'
export type TamanhoBotao = 'md' | 'lg' | 'xl'

const variantes: Record<VarianteBotao, string> = {
  /**
   * Ação principal de conversão, no laranja da marca.
   *
   * O texto é azul-marinho, não branco: branco sobre #E98B35 fica em
   * 2.56:1, abaixo do mínimo da WCAG AA, enquanto o azul-marinho alcança
   * 6.46:1. O hover clareia o fundo, mantendo o contraste alto.
   */
  primario: 'bg-laranja-400 text-azul-900 shadow-suave hover:bg-laranja-300 active:bg-laranja-500',
  /** Ação institucional, em azul profundo. */
  secundario: 'bg-azul-600 text-white shadow-suave hover:bg-azul-700 active:bg-azul-800',
  /** Ação secundária sobre fundo claro. */
  contorno: 'border border-azul-200 bg-white text-azul-700 hover:border-azul-400 hover:bg-azul-50',
  /** Ação secundária sobre fundo azul escuro. */
  contornoClaro: 'border border-white/25 text-white hover:border-white/60 hover:bg-white/10',
}

const tamanhos: Record<TamanhoBotao, string> = {
  // Alturas mínimas confortáveis para toque no celular (44px ou mais).
  md: 'min-h-11 px-5 py-2.5 text-sm',
  lg: 'min-h-13 px-7 py-3.5 text-base',
  xl: 'min-h-14 px-8 py-4 text-base',
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap ' +
  'transition-colors duration-200 ease-[var(--ease-marca)] ' +
  'disabled:cursor-not-allowed disabled:opacity-60'

export interface EstiloBotao {
  variante?: VarianteBotao
  tamanho?: TamanhoBotao
  className?: string
}

/** Classes do botão, reaproveitadas por links e por `Link` do React Router. */
export function classesBotao({
  variante = 'primario',
  tamanho = 'md',
  className,
}: EstiloBotao = {}): string {
  return cn(base, variantes[variante], tamanhos[tamanho], className)
}
