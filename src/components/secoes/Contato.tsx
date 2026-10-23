import { useState } from 'react'
import { MapPin, Phone, MessageCircle, Clock, ExternalLink, Map } from 'lucide-react'

import { cn } from '@/lib/utils'
import { clinica } from '@/data/clinica'
import { whatsapp } from '@/lib/whatsapp'
import { Botao, LinkBotao } from '@/components/ui/Botao'
import { Secao } from '@/components/ui/Secao'
import { CabecalhoSecao } from '@/components/ui/CabecalhoSecao'
import { Revelar } from '@/components/ui/Revelar'
import { FormularioContato } from '@/components/secoes/FormularioContato'

/** Dia da semana atual, para destacar o horário de hoje. */
const hoje = new Date().getDay()

export function Contato() {
  // O mapa só é carregado quando o visitante pede: mantém a página leve.
  const [mapaVisivel, setMapaVisivel] = useState(false)

  return (
    <Secao id="contato" fundo="neutro" idTitulo="contato-titulo">
      <Revelar>
        <CabecalhoSecao
          rotulo="Contato e localização"
          titulo="Fale com o Instituto Visage."
          subtitulo="Estamos no bairro Sobradinho, em Patos de Minas. Escolha o canal mais confortável para você."
          idTitulo="contato-titulo"
        />
      </Revelar>

      <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
        {/* Informações da clínica */}
        <Revelar>
          <div className="flex h-full flex-col gap-6 rounded-[1.75rem] border border-neutro-100 bg-white p-7 shadow-suave sm:p-8">
            <div>
              <h3 className="font-titulo text-xl font-bold text-azul-600">{clinica.nome}</h3>
              <p className="mt-1.5 text-sm text-neutro-500">{clinica.categoria}</p>
            </div>

            <ul className="flex flex-col gap-5">
              <li className="flex gap-3.5">
                <Phone size={19} aria-hidden="true" className="mt-0.5 shrink-0 text-laranja-400" />
                <div>
                  <h4 className="text-sm font-semibold text-azul-700">Telefone e WhatsApp</h4>
                  <a
                    href={clinica.telefone.linkTelefone}
                    className="mt-1 inline-flex min-h-8 items-center text-[0.95rem] text-neutro-500 transition-colors hover:text-laranja-600"
                  >
                    {clinica.telefone.exibicao}
                  </a>
                </div>
              </li>

              <li className="flex gap-3.5">
                <MapPin size={19} aria-hidden="true" className="mt-0.5 shrink-0 text-laranja-400" />
                <div>
                  <h4 className="text-sm font-semibold text-azul-700">Endereço</h4>
                  <address className="mt-1 text-[0.95rem] leading-relaxed text-neutro-500 not-italic">
                    {clinica.endereco.logradouro}
                    <br />
                    {clinica.endereco.bairro} — {clinica.endereco.cidade}/{clinica.endereco.estado}
                    <br />
                    CEP {clinica.endereco.cep}
                  </address>
                  <a
                    href={clinica.mapa.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex min-h-9 items-center gap-1.5 text-sm font-semibold text-azul-600 transition-colors hover:text-laranja-600"
                  >
                    Abrir no Google Maps
                    <ExternalLink size={14} aria-hidden="true" />
                  </a>
                </div>
              </li>

              <li className="flex gap-3.5">
                <Clock size={19} aria-hidden="true" className="mt-0.5 shrink-0 text-laranja-400" />
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-semibold text-azul-700">Horário de funcionamento</h4>

                  <dl className="mt-2.5 flex flex-col">
                    {clinica.horarios.map((item) => {
                      const ehHoje = item.diaDaSemana === hoje
                      const fechado = item.horario === null

                      return (
                        <div
                          key={item.dia}
                          className={cn(
                            'flex items-center justify-between gap-4 border-b border-neutro-100 py-2 text-sm last:border-b-0',
                            ehHoje && 'font-semibold',
                          )}
                        >
                          <dt className={cn(ehHoje ? 'text-azul-700' : 'text-neutro-500')}>
                            {item.dia}
                            {ehHoje && (
                              <span className="ml-2 rounded-full bg-azul-50 px-2 py-0.5 text-[0.65rem] font-bold tracking-wide text-azul-600 uppercase">
                                Hoje
                              </span>
                            )}
                          </dt>
                          <dd
                            className={cn(
                              'shrink-0',
                              fechado
                                ? 'text-neutro-500'
                                : item.destaque
                                  ? 'text-laranja-600'
                                  : 'text-azul-700',
                            )}
                          >
                            {item.horario ?? 'Fechado'}
                          </dd>
                        </div>
                      )
                    })}
                  </dl>

                  <p className="mt-3 rounded-xl bg-laranja-50 px-4 py-3 text-xs leading-relaxed text-laranja-700">
                    <strong className="font-semibold">Atendemos aos sábados</strong>, das 08h às
                    12h.
                  </p>
                </div>
              </li>
            </ul>

            <div className="mt-auto flex flex-col gap-3 pt-2 sm:flex-row">
              <LinkBotao href={whatsapp('duvidas')} externo className="flex-1">
                <MessageCircle size={18} aria-hidden="true" />
                Falar pelo WhatsApp
              </LinkBotao>
              <LinkBotao href={clinica.mapa.url} externo variante="contorno" className="flex-1">
                <Map size={18} aria-hidden="true" />
                Como chegar
              </LinkBotao>
            </div>
          </div>
        </Revelar>

        {/* Formulário demonstrativo */}
        <Revelar atraso={100}>
          <div className="flex h-full flex-col rounded-[1.75rem] border border-neutro-100 bg-white p-7 shadow-suave sm:p-8">
            <h3 className="font-titulo text-xl font-bold text-azul-600">Envie uma mensagem</h3>
            <p className="mt-1.5 mb-6 text-sm leading-relaxed text-neutro-500">
              Preencha os campos e continue a conversa pelo WhatsApp com a mensagem já escrita.
            </p>

            <FormularioContato />
          </div>
        </Revelar>
      </div>

      {/* Mapa sob demanda */}
      <Revelar>
        <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-neutro-100 bg-white shadow-suave lg:mt-8">
          {mapaVisivel ? (
            <iframe
              src={clinica.mapa.embedUrl}
              title={`Mapa com a localização do ${clinica.nome}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[22rem] w-full border-0 sm:h-[26rem]"
            />
          ) : (
            <div className="flex flex-col items-center gap-5 px-6 py-12 text-center sm:py-16">
              <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-azul-50 text-azul-600">
                <Map size={26} aria-hidden="true" />
              </span>

              <div>
                <h3 className="font-titulo text-lg font-bold text-azul-600">
                  Ver a clínica no mapa
                </h3>
                <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-neutro-500">
                  O mapa é carregado só quando você pede, para a página abrir mais rápido.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Botao variante="secundario" onClick={() => setMapaVisivel(true)}>
                  Carregar o mapa
                </Botao>
                <LinkBotao href={clinica.mapa.url} externo variante="contorno">
                  Abrir no Google Maps
                  <ExternalLink size={15} aria-hidden="true" />
                </LinkBotao>
              </div>
            </div>
          )}
        </div>
      </Revelar>
    </Secao>
  )
}
