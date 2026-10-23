import { ArrowUpRight } from 'lucide-react'

import { cn } from '@/lib/utils'
import { especialidades } from '@/data/especialidades'
import { whatsapp } from '@/lib/whatsapp'
import { Secao } from '@/components/ui/Secao'
import { CabecalhoSecao } from '@/components/ui/CabecalhoSecao'
import { Revelar } from '@/components/ui/Revelar'
import { CurvaDecorativa } from '@/components/ui/CurvaDecorativa'

/**
 * Quatro especialidades em composição variada: o primeiro card ocupa
 * duas colunas e tem fundo azul, para a grade não parecer uma repetição
 * do mesmo bloco.
 */
export function Especialidades() {
  return (
    <Secao id="especialidades" fundo="neutro" idTitulo="especialidades-titulo">
      <Revelar>
        <CabecalhoSecao
          rotulo="Especialidades"
          titulo="Cuidado especializado para o seu sorriso."
          subtitulo="Conheça as áreas de atendimento do Instituto Visage."
          idTitulo="especialidades-titulo"
        />
      </Revelar>

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {especialidades.map((item, indice) => {
          const destaque = indice === 0
          const ultimo = indice === especialidades.length - 1
          const Icone = item.icone

          return (
            <li
              key={item.id}
              className={cn(destaque && 'lg:row-span-2', ultimo && 'lg:col-span-2')}
            >
              <Revelar atraso={indice * 90} className="h-full">
                <article
                  id={item.id}
                  className={cn(
                    'group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] p-7 transition-shadow duration-300 sm:p-8',
                    destaque
                      ? 'bg-azul-600 text-white shadow-cartao'
                      : 'border border-neutro-100 bg-white shadow-suave hover:shadow-cartao',
                  )}
                >
                  {destaque && (
                    <CurvaDecorativa
                      className="absolute -right-14 -bottom-16 w-72 text-white/10"
                    />
                  )}

                  <span
                    className={cn(
                      'inline-flex size-13 items-center justify-center rounded-2xl transition-colors',
                      destaque
                        ? 'bg-white/10 text-laranja-300'
                        : 'bg-laranja-50 text-laranja-600 group-hover:bg-laranja-100',
                    )}
                  >
                    <Icone size={24} aria-hidden="true" />
                  </span>

                  <h3
                    className={cn(
                      'relative mt-6 text-xl font-bold',
                      destaque ? 'text-white sm:text-2xl' : 'text-azul-600',
                    )}
                  >
                    {item.nome}
                  </h3>

                  <p
                    className={cn(
                      'relative mt-3 flex-1 text-[0.95rem] leading-relaxed',
                      destaque ? 'text-azul-100' : 'text-neutro-500',
                    )}
                  >
                    {item.descricao}
                  </p>

                  <a
                    href={whatsapp(item.contato)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Saiba mais sobre ${item.nome} pelo WhatsApp`}
                    className={cn(
                      'relative mt-7 inline-flex min-h-11 w-fit items-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors',
                      destaque
                        ? 'bg-laranja-400 text-azul-900 hover:bg-laranja-300'
                        : 'border border-azul-100 text-azul-600 hover:border-laranja-300 hover:bg-laranja-50 hover:text-laranja-600',
                    )}
                  >
                    Saiba mais
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                </article>
              </Revelar>
            </li>
          )
        })}
      </ul>

      <Revelar>
        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-neutro-500">
          A indicação de qualquer procedimento depende de avaliação odontológica individual.
          Fale com a equipe para entender quais são as possibilidades no seu caso.
        </p>
      </Revelar>
    </Secao>
  )
}
