import { cn } from '@/lib/utils'
import { clinica } from '@/data/clinica'
import logo128 from '@/assets/marca/logo-visage-128.png'
import logo256 from '@/assets/marca/logo-visage-256.png'
import logo512 from '@/assets/marca/logo-visage-512.png'

interface LogoProps {
  /** Lado do selo circular em pixels. */
  tamanho?: number
  /** Exibe o nome da clínica ao lado do selo. */
  comNome?: boolean
  /** Cor do texto, conforme o fundo em que a logo aparece. */
  tom?: 'claro' | 'escuro'
  className?: string
  /**
   * `true` quando a logo é puramente decorativa (o nome aparece ao lado
   * em texto), para não duplicar a leitura em leitores de tela.
   */
  decorativa?: boolean
  /**
   * Em telas muito estreitas, esconde a linha "Odontologia Especializada".
   * Usado no cabeçalho, onde o espaço disputa com o botão do menu.
   */
  compacto?: boolean
  /**
   * `eager` apenas para a logo do cabeçalho, que está na primeira dobra.
   * As demais ocorrências carregam sob demanda.
   */
  carregamento?: 'eager' | 'lazy'
}

/**
 * Logo oficial do Instituto Visage.
 *
 * A imagem é usada exatamente como fornecida pela clínica: sem recolorir,
 * distorcer ou redesenhar. Para substituir o arquivo, troque os PNGs em
 * `src/assets/marca/` mantendo os mesmos nomes.
 */
export function Logo({
  tamanho = 48,
  comNome = false,
  tom = 'escuro',
  className,
  decorativa = false,
  compacto = false,
  carregamento = 'lazy',
}: LogoProps) {
  const escuro = tom === 'escuro'

  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <img
        src={logo256}
        srcSet={`${logo128} 128w, ${logo256} 256w, ${logo512} 512w`}
        sizes={`${tamanho}px`}
        width={tamanho}
        height={tamanho}
        alt={decorativa || comNome ? '' : `Logo do ${clinica.nome}`}
        aria-hidden={decorativa || comNome ? 'true' : undefined}
        loading={carregamento}
        decoding="async"
        className="shrink-0 rounded-full"
        style={{ width: tamanho, height: tamanho }}
      />

      {comNome && (
        <span className="flex min-w-0 flex-col leading-tight">
          <span
            className={cn(
              'font-titulo text-[0.95rem] font-extrabold tracking-tight whitespace-nowrap sm:text-base',
              escuro ? 'text-azul-600' : 'text-white',
            )}
          >
            Instituto Visage
          </span>
          <span
            className={cn(
              'text-[0.68rem] font-medium tracking-[0.1em] whitespace-nowrap uppercase',
              compacto && 'max-[359px]:hidden',
              escuro ? 'text-laranja-600' : 'text-laranja-200',
            )}
          >
            Odontologia Especializada
          </span>
        </span>
      )}
    </span>
  )
}
