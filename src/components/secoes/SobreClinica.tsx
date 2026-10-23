import { Clock, MapPin, Quote } from 'lucide-react'

import { clinica } from '@/data/clinica'
import { fotoAmbiente } from '@/data/galeria'
import { Secao } from '@/components/ui/Secao'
import { CabecalhoSecao } from '@/components/ui/CabecalhoSecao'
import { Revelar } from '@/components/ui/Revelar'
import { Logo } from '@/components/ui/Logo'
import { CurvaDecorativa } from '@/components/ui/CurvaDecorativa'

/**
 * Painel ao lado do texto institucional.
 *
 * Quando a clínica fornecer uma fotografia do ambiente, ela entra aqui
 * (basta preencher `fotoAmbiente` em `src/data/galeria.ts`). Até lá, o
 * espaço recebe uma composição com a marca — e não uma imagem ilustrativa
 * apresentada como se fosse a clínica.
 */
function PainelVisual() {
  if (fotoAmbiente) {
    return (
      <img
        src={fotoAmbiente.src}
        srcSet={
          fotoAmbiente.srcPequeno
            ? `${fotoAmbiente.srcPequeno} 480w, ${fotoAmbiente.src} ${fotoAmbiente.largura}w`
            : undefined
        }
        sizes="(max-width: 1024px) 92vw, 30rem"
        width={fotoAmbiente.largura}
        height={fotoAmbiente.altura}
        alt={fotoAmbiente.alt}
        loading="lazy"
        decoding="async"
        className="aspect-4/5 w-full rounded-[2rem] object-cover shadow-cartao"
      />
    )
  }

  return (
    <div className="relative flex aspect-4/5 w-full flex-col items-center justify-center overflow-hidden rounded-[2rem] bg-azul-600 px-8 text-center shadow-cartao">
      <CurvaDecorativa
        className="absolute -right-16 -bottom-20 w-[22rem] text-white/10"
      />
      <div
        aria-hidden="true"
        className="absolute -top-20 -left-16 size-56 rounded-full bg-white/[0.07]"
      />

      <Logo tamanho={116} decorativa className="relative" />

      <Quote size={28} aria-hidden="true" className="relative mt-8 text-laranja-300" />
      <p className="font-titulo relative mt-4 text-xl leading-snug font-bold text-white sm:text-2xl">
        Trabalhando de forma humanizada e transformando sorrisos.
      </p>
      <p className="relative mt-4 text-sm font-medium tracking-[0.14em] text-laranja-200 uppercase">
        {clinica.chamada}
      </p>
    </div>
  )
}

export function SobreClinica() {
  return (
    <Secao id="a-clinica" fundo="branco" idTitulo="a-clinica-titulo">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
        <Revelar>
          <CabecalhoSecao
            rotulo="Conheça a Visage"
            titulo="Mais do que cuidar dos dentes, cuidar de pessoas."
            idTitulo="a-clinica-titulo"
          />

          <div className="mt-7 flex flex-col gap-5 text-base leading-relaxed text-neutro-500 sm:text-lg">
            <p>
              No Instituto Odontológico Visage, acreditamos que cada sorriso merece atenção
              individual. Nosso propósito é oferecer um atendimento humanizado, com cuidado,
              escuta e orientação em cada etapa do tratamento odontológico.
            </p>
            <p>
              Queremos que cada paciente se sinta acolhido, compreenda as possibilidades de
              tratamento e tenha segurança para conversar com a equipe sobre suas necessidades.
            </p>
          </div>

          {/* Dois fatos objetivos, sem afirmar nada que não foi informado. */}
          <dl className="mt-9 grid gap-4 sm:grid-cols-2">
            <div className="flex gap-3.5 rounded-2xl border border-neutro-100 bg-neutro-50 p-5">
              <MapPin size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-laranja-400" />
              <div>
                <dt className="font-titulo text-sm font-bold text-azul-600">Onde estamos</dt>
                <dd className="mt-1 text-sm leading-relaxed text-neutro-500">
                  {clinica.endereco.bairro}, {clinica.endereco.cidade} — {clinica.endereco.estado}
                </dd>
              </div>
            </div>

            <div className="flex gap-3.5 rounded-2xl border border-neutro-100 bg-neutro-50 p-5">
              <Clock size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-laranja-400" />
              <div>
                <dt className="font-titulo text-sm font-bold text-azul-600">Atendimento</dt>
                <dd className="mt-1 text-sm leading-relaxed text-neutro-500">
                  Segunda a sexta, 08h às 18h
                  <br />
                  Sábado, 08h às 12h
                </dd>
              </div>
            </div>
          </dl>
        </Revelar>

        <Revelar atraso={120}>
          <PainelVisual />
        </Revelar>
      </div>
    </Secao>
  )
}
