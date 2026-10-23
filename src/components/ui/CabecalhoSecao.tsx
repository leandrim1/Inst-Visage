import { cn } from '@/lib/utils'

interface CabecalhoSecaoProps {
  /** Texto curto acima do título, em laranja. */
  rotulo?: string
  titulo: string
  subtitulo?: string
  /** Alinhamento do bloco. Padrão: à esquerda. */
  alinhamento?: 'esquerda' | 'centro'
  /** Usado em seções com fundo azul escuro. */
  tom?: 'claro' | 'escuro'
  className?: string
  /** Id do `h2`, referenciado pelo `aria-labelledby` da seção. */
  idTitulo?: string
}

export function CabecalhoSecao({
  rotulo,
  titulo,
  subtitulo,
  alinhamento = 'esquerda',
  tom = 'claro',
  className,
  idTitulo,
}: CabecalhoSecaoProps) {
  const escuro = tom === 'escuro'

  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        alinhamento === 'centro' ? 'items-center text-center' : 'items-start',
        className,
      )}
    >
      {rotulo && (
        <p
          className={cn(
            'flex items-center gap-2.5 text-xs font-semibold tracking-[0.18em] uppercase',
            escuro ? 'text-laranja-200' : 'text-laranja-600',
          )}
        >
          <span
            aria-hidden="true"
            className={cn('h-px w-7', escuro ? 'bg-laranja-200/70' : 'bg-laranja-400')}
          />
          {rotulo}
        </p>
      )}

      <h2
        id={idTitulo}
        className={cn(
          'max-w-3xl text-3xl leading-[1.15] font-extrabold sm:text-4xl lg:text-[2.75rem]',
          escuro ? 'text-white' : 'text-azul-600',
        )}
      >
        {titulo}
      </h2>

      {subtitulo && (
        <p
          className={cn(
            'max-w-2xl text-base leading-relaxed sm:text-lg',
            escuro ? 'text-azul-100' : 'text-neutro-500',
          )}
        >
          {subtitulo}
        </p>
      )}
    </div>
  )
}
