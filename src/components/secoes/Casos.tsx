import { useEffect, useRef, useState } from 'react'
import { X, ChevronLeft, ChevronRight, Expand } from 'lucide-react'

import { cn } from '@/lib/utils'
import { casosDisponiveis } from '@/data/casos'
import type { Caso } from '@/data/casos'
import { Secao } from '@/components/ui/Secao'
import { CabecalhoSecao } from '@/components/ui/CabecalhoSecao'
import { Revelar } from '@/components/ui/Revelar'
import { useTravaRolagem } from '@/hooks/useTravaRolagem'

interface AmpliadorProps {
  casos: Caso[]
  indice: number
  aoFechar: () => void
  aoTrocar: (indice: number) => void
}

/** Visualização ampliada, navegável por teclado. */
function Ampliador({ casos, indice, aoFechar, aoTrocar }: AmpliadorProps) {
  const painel = useRef<HTMLDivElement>(null)
  const botaoFechar = useRef<HTMLButtonElement>(null)

  useTravaRolagem(true)

  useEffect(() => {
    botaoFechar.current?.focus()
  }, [])

  useEffect(() => {
    const aoTeclar = (evento: KeyboardEvent) => {
      if (evento.key === 'Escape') {
        aoFechar()
        return
      }
      if (evento.key === 'ArrowLeft') {
        evento.preventDefault()
        aoTrocar((indice - 1 + casos.length) % casos.length)
        return
      }
      if (evento.key === 'ArrowRight') {
        evento.preventDefault()
        aoTrocar((indice + 1) % casos.length)
        return
      }

      if (evento.key !== 'Tab' || !painel.current) return

      // Mantém o foco dentro da janela enquanto ela está aberta.
      const focaveis = painel.current.querySelectorAll<HTMLElement>('button:not([disabled])')
      const primeiro = focaveis[0]
      const ultimo = focaveis[focaveis.length - 1]
      if (!primeiro || !ultimo) return

      if (evento.shiftKey && document.activeElement === primeiro) {
        evento.preventDefault()
        ultimo.focus()
      } else if (!evento.shiftKey && document.activeElement === ultimo) {
        evento.preventDefault()
        primeiro.focus()
      }
    }

    document.addEventListener('keydown', aoTeclar)
    return () => document.removeEventListener('keydown', aoTeclar)
  }, [casos.length, indice, aoFechar, aoTrocar])

  const caso = casos[indice]
  if (!caso) return null

  const controle =
    'inline-flex size-12 items-center justify-center rounded-full border border-white/20 ' +
    'bg-azul-900/70 text-white transition-colors hover:border-white/50 hover:bg-azul-800'

  return (
    <div
      ref={painel}
      role="dialog"
      aria-modal="true"
      aria-label={`Caso ${indice + 1} de ${casos.length}, em tamanho ampliado`}
      className="fixed inset-0 z-50 flex flex-col bg-azul-900/95 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between px-4 py-4 sm:px-6">
        <p className="text-sm font-semibold text-azul-100" aria-hidden="true">
          {indice + 1} / {casos.length}
        </p>
        <button ref={botaoFechar} type="button" onClick={aoFechar} className={controle}>
          <X size={22} aria-hidden="true" />
          <span className="sr-only">Fechar a visualização ampliada</span>
        </button>
      </div>

      {/* Clicar no fundo também fecha; a imagem no centro não é afetada. */}
      <div
        className="flex min-h-0 flex-1 items-center justify-center px-4 pb-4 sm:px-6"
        onClick={(evento) => {
          if (evento.target === evento.currentTarget) aoFechar()
        }}
      >
        <img
          src={caso.src}
          alt={caso.alt}
          width={caso.largura}
          height={caso.altura}
          decoding="async"
          className="max-h-full w-auto max-w-full rounded-2xl object-contain"
        />
      </div>

      <div className="flex items-center justify-center gap-4 px-4 pb-6 sm:pb-8">
        <button
          type="button"
          onClick={() => aoTrocar((indice - 1 + casos.length) % casos.length)}
          className={controle}
        >
          <ChevronLeft size={22} aria-hidden="true" />
          <span className="sr-only">Caso anterior</span>
        </button>
        <button
          type="button"
          onClick={() => aoTrocar((indice + 1) % casos.length)}
          className={controle}
        >
          <ChevronRight size={22} aria-hidden="true" />
          <span className="sr-only">Próximo caso</span>
        </button>
      </div>
    </div>
  )
}

/**
 * Galeria de casos atendidos.
 *
 * As fotos têm proporções diferentes (quadradas e em retrato), por isso a
 * grade usa colunas CSS: cada imagem mantém o próprio formato, sem corte
 * nem distorção. As dimensões vêm do módulo `virtual:casos`, que lê o
 * cabeçalho de cada arquivo no build — assim o espaço já fica reservado e
 * o layout não salta enquanto as imagens carregam.
 */
export function Casos() {
  const [ampliado, setAmpliado] = useState<number | null>(null)
  const focoAnterior = useRef<HTMLElement | null>(null)

  const abrir = (indice: number) => {
    focoAnterior.current = document.activeElement as HTMLElement
    setAmpliado(indice)
  }

  // Sem useCallback: o React Compiler memoriza estas funções sozinho.
  const fechar = () => {
    setAmpliado(null)
    // Devolve o foco ao item que abriu a visualização.
    focoAnterior.current?.focus()
  }

  const trocar = (indice: number) => setAmpliado(indice)

  return (
    <Secao id="casos" fundo="branco" idTitulo="casos-titulo">
      <Revelar>
        <CabecalhoSecao
          rotulo="Registros da clínica"
          titulo="Sorrisos do Instituto Visage."
          subtitulo="Retratos de pacientes atendidos na clínica."
          idTitulo="casos-titulo"
        />
      </Revelar>

      <Revelar>
        <ul className="mt-12 gap-5 sm:columns-2 lg:columns-3">
          {casosDisponiveis.map((caso, indice) => (
            <li key={caso.src} className="mb-5 break-inside-avoid">
              <button
                type="button"
                onClick={() => abrir(indice)}
                className={cn(
                  'group relative block w-full overflow-hidden rounded-2xl bg-neutro-100',
                  'transition-shadow duration-300 hover:shadow-cartao',
                )}
              >
                <img
                  src={caso.src}
                  alt={caso.alt}
                  width={caso.largura}
                  height={caso.altura}
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 44vw, 24rem"
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full transition-transform duration-500 ease-[var(--ease-marca)] motion-safe:group-hover:scale-[1.03]"
                />
                <span
                  aria-hidden="true"
                  className="absolute right-3 bottom-3 inline-flex size-10 items-center justify-center rounded-full bg-azul-900/75 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  <Expand size={18} />
                </span>
                <span className="sr-only">Ver o caso {indice + 1} em tamanho ampliado</span>
              </button>
            </li>
          ))}
        </ul>
      </Revelar>

      <Revelar>
        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-neutro-500">
          Cada caso é avaliado individualmente. As imagens registram atendimentos realizados na
          clínica e não representam resultado previsto para outros pacientes.
        </p>
      </Revelar>

      {ampliado !== null && (
        <Ampliador
          casos={casosDisponiveis}
          indice={ampliado}
          aoFechar={fechar}
          aoTrocar={trocar}
        />
      )}
    </Secao>
  )
}
