import { MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react'

import { irParaSecao } from '@/lib/utils'
import { clinica } from '@/data/clinica'
import { fotoHero } from '@/data/galeria'
import { whatsapp } from '@/lib/whatsapp'
import { Botao, LinkBotao } from '@/components/ui/Botao'
import { Container } from '@/components/ui/Container'
import { CurvaDecorativa } from '@/components/ui/CurvaDecorativa'

/**
 * Primeira dobra: composição assimétrica, fundo branco, título em azul
 * profundo e uma única ação principal em laranja.
 */
export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-titulo" className="relative overflow-hidden bg-white">
      {/* Elementos gráficos discretos, inspirados nas curvas da logo. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-32 size-[34rem] rounded-full bg-azul-50/70" />
        <div className="absolute top-24 -left-40 size-80 rounded-full bg-bege-100/60" />
        <CurvaDecorativa className="absolute -right-10 bottom-[-6rem] w-[26rem] text-azul-100 lg:right-[42%]" />
      </div>

      <Container className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
        <div className="max-w-xl">
          <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-laranja-600 uppercase">
            <span aria-hidden="true" className="h-px w-8 bg-laranja-400" />
            {clinica.nome}
          </p>

          <h1
            id="hero-titulo"
            className="mt-6 text-[2.1rem] leading-[1.1] font-extrabold text-azul-600 sm:text-5xl lg:text-[3.4rem]"
          >
            Cuidar do seu sorriso é cuidar de você.
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-neutro-500">
            Odontologia especializada com atendimento humanizado, atenção aos detalhes e cuidado
            em cada etapa.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <LinkBotao
              href={whatsapp('avaliacao')}
              externo
              tamanho="lg"
              aria-label="Agende uma avaliação pelo WhatsApp"
            >
              <MessageCircle size={19} aria-hidden="true" />
              Agende uma avaliação
            </LinkBotao>

            <Botao
              variante="contorno"
              tamanho="lg"
              onClick={() => irParaSecao('especialidades')}
            >
              Conheça nossas especialidades
              <ArrowRight size={18} aria-hidden="true" />
            </Botao>
          </div>

          <p className="mt-9 inline-flex max-w-full items-start gap-2.5 rounded-2xl border border-neutro-100 bg-neutro-50 px-4 py-2.5 text-[0.82rem] font-medium text-azul-700 sm:items-center sm:rounded-full">
            <ShieldCheck
              size={16}
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-laranja-400 sm:mt-0"
            />
            <span className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
              <span>Odontologia especializada</span>
              {/* O separador só aparece quando as duas frases cabem na mesma linha. */}
              <span aria-hidden="true" className="hidden text-laranja-400 sm:inline">
                •
              </span>
              <span>Atendimento humanizado</span>
            </span>
          </p>
        </div>

        {/* Fotografia: moldura em curva, com detalhe em laranja. */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute -top-4 -right-4 hidden size-28 rounded-full border-[3px] border-laranja-200/80 sm:block"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-5 -left-5 hidden size-36 rounded-full bg-azul-50 sm:block"
          />

          <figure className="relative">
            <img
              src={fotoHero.src}
              srcSet={
                fotoHero.srcPequeno
                  ? `${fotoHero.srcPequeno} 320w, ${fotoHero.src} 590w`
                  : undefined
              }
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 28rem, 30rem"
              width={fotoHero.largura}
              height={fotoHero.altura}
              alt={fotoHero.alt}
              /* Primeira dobra: carrega cedo, sem lazy loading. */
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="aspect-square w-full rounded-[2.5rem] object-cover shadow-cartao"
            />

            <figcaption className="absolute -bottom-6 left-1/2 w-[min(20rem,90%)] -translate-x-1/2 rounded-2xl border border-neutro-100 bg-white px-5 py-4 text-center shadow-suave">
              <span className="font-titulo block text-sm font-extrabold text-azul-600">
                Instituto Visage
              </span>
              <span className="mt-0.5 block text-[0.75rem] font-medium tracking-[0.08em] text-laranja-600 uppercase">
                {clinica.chamada}
              </span>
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  )
}
