import { diferenciais } from '@/data/diferenciais'
import { Secao } from '@/components/ui/Secao'
import { CabecalhoSecao } from '@/components/ui/CabecalhoSecao'
import { Revelar } from '@/components/ui/Revelar'

/** Três princípios de atendimento — compromissos da equipe, não garantias. */
export function Diferenciais() {
  return (
    <Secao id="diferenciais" fundo="branco" idTitulo="diferenciais-titulo">
      <Revelar>
        <CabecalhoSecao
          rotulo="Diferenciais"
          titulo="Um atendimento que começa com você."
          subtitulo="Os princípios que orientam a forma como a equipe do Instituto Visage recebe cada paciente."
          alinhamento="centro"
          idTitulo="diferenciais-titulo"
        />
      </Revelar>

      <ul className="mt-14 grid gap-6 md:grid-cols-3">
        {diferenciais.map((item, indice) => {
          const Icone = item.icone

          return (
            <li key={item.id}>
              <Revelar atraso={indice * 110} className="h-full">
                <article className="relative flex h-full flex-col items-center rounded-[1.75rem] bg-neutro-50 px-7 pt-14 pb-9 text-center">
                  {/* Numeração: a ordem não depende apenas da posição visual. */}
                  <span className="absolute top-7 right-7 font-titulo text-xs font-bold tracking-widest text-neutro-500">
                    {String(indice + 1).padStart(2, '0')}
                  </span>

                  <span className="inline-flex size-16 items-center justify-center rounded-2xl bg-white text-laranja-600 shadow-suave">
                    <Icone size={27} aria-hidden="true" />
                  </span>

                  <h3 className="mt-6 text-xl font-bold text-azul-600">{item.titulo}</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-neutro-500">
                    {item.descricao}
                  </p>

                  <span aria-hidden="true" className="mt-7 h-0.5 w-10 rounded-full bg-laranja-400" />
                </article>
              </Revelar>
            </li>
          )
        })}
      </ul>
    </Secao>
  )
}
