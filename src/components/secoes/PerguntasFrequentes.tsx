import { useId, useState } from 'react'
import { ChevronDown, ArrowUpRight } from 'lucide-react'

import { cn, irParaSecao } from '@/lib/utils'
import { perguntasFrequentes } from '@/data/faq'
import type { Pergunta } from '@/data/faq'
import { Secao } from '@/components/ui/Secao'
import { CabecalhoSecao } from '@/components/ui/CabecalhoSecao'
import { Revelar } from '@/components/ui/Revelar'

interface ItemAcordeaoProps {
  item: Pergunta
  aberto: boolean
  aoAlternar: () => void
}

function ItemAcordeao({ item, aberto, aoAlternar }: ItemAcordeaoProps) {
  const idBase = useId()
  const idBotao = `${idBase}-botao`
  const idPainel = `${idBase}-painel`

  return (
    <li className="overflow-hidden rounded-2xl border border-neutro-100 bg-white">
      <h3>
        <button
          type="button"
          id={idBotao}
          aria-expanded={aberto}
          aria-controls={idPainel}
          onClick={aoAlternar}
          className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-neutro-50 sm:px-7"
        >
          <span
            className={cn(
              'font-titulo text-base font-bold transition-colors sm:text-lg',
              aberto ? 'text-azul-600' : 'text-azul-800',
            )}
          >
            {item.pergunta}
          </span>

          <span
            aria-hidden="true"
            className={cn(
              'inline-flex size-9 shrink-0 items-center justify-center rounded-full transition-all duration-300',
              aberto ? 'rotate-180 bg-laranja-400 text-azul-900' : 'bg-neutro-50 text-azul-600',
            )}
          >
            <ChevronDown size={18} />
          </span>
        </button>
      </h3>

      <div
        id={idPainel}
        role="region"
        aria-labelledby={idBotao}
        hidden={!aberto}
        className="px-5 pb-6 sm:px-7"
      >
        <div className="flex flex-col gap-3 border-t border-neutro-100 pt-5 text-[0.95rem] leading-relaxed text-neutro-500">
          {item.resposta.map((paragrafo) => (
            <p key={paragrafo}>{paragrafo}</p>
          ))}

          {item.lista && (
            <ul className="mt-1 flex flex-col gap-2">
              {item.lista.map((linha) => (
                <li key={linha} className="flex items-start gap-2.5">
                  <span
                    aria-hidden="true"
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-laranja-400"
                  />
                  <span>{linha}</span>
                </li>
              ))}
            </ul>
          )}

          {item.acao && (
            <a
              href={item.acao.href}
              {...(item.acao.externo
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {
                    onClick: (evento) => {
                      evento.preventDefault()
                      irParaSecao(item.acao!.href.replace('#', ''))
                    },
                  })}
              className="mt-2 inline-flex min-h-10 w-fit items-center gap-1.5 text-sm font-semibold text-azul-600 transition-colors hover:text-laranja-500"
            >
              {item.acao.rotulo}
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </li>
  )
}

export function PerguntasFrequentes() {
  // A primeira pergunta começa aberta para mostrar o padrão de interação.
  const [abertas, setAbertas] = useState<string[]>([perguntasFrequentes[0]?.id ?? ''])

  const alternar = (id: string) =>
    setAbertas((atuais) =>
      atuais.includes(id) ? atuais.filter((item) => item !== id) : [...atuais, id],
    )

  return (
    <Secao id="perguntas-frequentes" fundo="branco" idTitulo="faq-titulo">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Revelar>
          <CabecalhoSecao
            rotulo="Perguntas frequentes"
            titulo="Dúvidas sobre o atendimento?"
            subtitulo="Reunimos as perguntas que mais chegam até a equipe. Se a sua não estiver aqui, fale com a gente."
            idTitulo="faq-titulo"
            className="lg:sticky lg:top-28"
          />
        </Revelar>

        <Revelar atraso={100}>
          <ul className="flex flex-col gap-3">
            {perguntasFrequentes.map((item) => (
              <ItemAcordeao
                key={item.id}
                item={item}
                aberto={abertas.includes(item.id)}
                aoAlternar={() => alternar(item.id)}
              />
            ))}
          </ul>
        </Revelar>
      </div>
    </Secao>
  )
}
