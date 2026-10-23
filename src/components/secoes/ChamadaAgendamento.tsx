import { MessageCircle, Phone } from 'lucide-react'

import { clinica } from '@/data/clinica'
import { whatsapp } from '@/lib/whatsapp'
import { LinkBotao } from '@/components/ui/Botao'
import { Container } from '@/components/ui/Container'
import { Revelar } from '@/components/ui/Revelar'
import { CurvaDecorativa } from '@/components/ui/CurvaDecorativa'

/** Seção de conversão entre as especialidades e o contato. */
export function ChamadaAgendamento() {
  return (
    <section
      id="agendamento"
      aria-labelledby="agendamento-titulo"
      className="relative overflow-hidden bg-azul-600 py-18 sm:py-24"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <CurvaDecorativa className="absolute -top-24 -left-20 w-[26rem] text-white/[0.07]" />
        <div className="absolute -right-24 -bottom-28 size-96 rounded-full bg-white/[0.05]" />
      </div>

      <Container className="relative">
        <Revelar>
          <div className="mx-auto max-w-3xl text-center">
            <p className="flex items-center justify-center gap-3 text-xs font-semibold tracking-[0.2em] text-laranja-200 uppercase">
              <span aria-hidden="true" className="h-px w-8 bg-laranja-300" />
              Agende sua avaliação
              <span aria-hidden="true" className="h-px w-8 bg-laranja-300" />
            </p>

            <h2
              id="agendamento-titulo"
              className="mt-6 text-3xl leading-[1.15] font-extrabold text-white sm:text-4xl lg:text-[2.75rem]"
            >
              Seu próximo passo começa com uma conversa.
            </h2>

            <p className="mt-5 text-base leading-relaxed text-azul-100 sm:text-lg">
              Entre em contato com o Instituto Visage para conhecer as opções de atendimento e
              esclarecer suas dúvidas.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <LinkBotao
                href={whatsapp('avaliacao')}
                externo
                tamanho="xl"
                className="w-full sm:w-auto"
              >
                <MessageCircle size={20} aria-hidden="true" />
                Falar pelo WhatsApp
              </LinkBotao>

              <LinkBotao
                href={clinica.telefone.linkTelefone}
                variante="contornoClaro"
                tamanho="xl"
                className="w-full sm:w-auto"
              >
                <Phone size={19} aria-hidden="true" />
                {clinica.telefone.exibicao}
              </LinkBotao>
            </div>

            <p className="mt-7 text-[0.82rem] text-azul-200">
              O contato é atendido pela equipe da clínica — o site não confirma agendamentos
              automaticamente.
            </p>
          </div>
        </Revelar>
      </Container>
    </section>
  )
}
