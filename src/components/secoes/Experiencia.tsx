import { MapPin, Clock, MessageCircle, ExternalLink } from 'lucide-react'

import { cn } from '@/lib/utils'
import { clinica } from '@/data/clinica'
import { galeria } from '@/data/galeria'
import { whatsapp } from '@/lib/whatsapp'
import { LinkBotao } from '@/components/ui/Botao'
import { Secao } from '@/components/ui/Secao'
import { CabecalhoSecao } from '@/components/ui/CabecalhoSecao'
import { Revelar } from '@/components/ui/Revelar'
import { CurvaDecorativa } from '@/components/ui/CurvaDecorativa'

/**
 * Seção "Experiência na clínica".
 *
 * Mostra apenas as fotografias reais já disponíveis: enquanto a clínica
 * não enviar as imagens oficiais, a seção apresenta um convite para
 * conhecer o espaço pessoalmente, em vez de fotos ilustrativas de
 * consultórios que não são os do Instituto Visage.
 */
export function Experiencia() {
  const comFoto = galeria.filter((item) => item.foto !== null)

  return (
    <Secao id="experiencia" fundo="neutro" idTitulo="experiencia-titulo">
      <Revelar>
        <CabecalhoSecao
          rotulo="A experiência Visage"
          titulo="Um espaço pensado para o seu conforto."
          subtitulo="Conheça o ambiente onde cada atendimento acontece, no bairro Sobradinho, em Patos de Minas."
          idTitulo="experiencia-titulo"
        />
      </Revelar>

      {comFoto.length > 0 ? (
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {comFoto.map((item, indice) => {
            const foto = item.foto!
            // Primeiro item ocupa mais espaço, evitando uma grade monótona.
            const largo = indice === 0

            return (
              <li key={item.id} className={cn(largo && 'sm:col-span-2 lg:row-span-2')}>
                <Revelar atraso={indice * 80} className="h-full">
                  <figure className="group relative h-full overflow-hidden rounded-[1.75rem] bg-azul-800 shadow-suave">
                    <img
                      src={foto.src}
                      srcSet={
                        foto.srcPequeno ? `${foto.srcPequeno} 480w, ${foto.src} ${foto.largura}w` : undefined
                      }
                      sizes={largo ? '(max-width: 640px) 92vw, 44rem' : '(max-width: 640px) 92vw, 22rem'}
                      width={foto.largura}
                      height={foto.altura}
                      alt={foto.alt}
                      loading="lazy"
                      decoding="async"
                      className={cn(
                        'w-full object-cover transition-transform duration-500 ease-[var(--ease-marca)] motion-safe:group-hover:scale-[1.03]',
                        largo ? 'aspect-4/3 lg:h-full' : 'aspect-4/3',
                      )}
                    />
                    <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-azul-900/85 to-transparent px-6 pt-12 pb-5">
                      <span className="font-titulo block text-base font-bold text-white">
                        {item.titulo}
                      </span>
                      <span className="mt-0.5 block text-[0.82rem] text-azul-100">
                        {item.descricao}
                      </span>
                    </figcaption>
                  </figure>
                </Revelar>
              </li>
            )
          })}
        </ul>
      ) : (
        <Revelar>
          <div className="relative mt-12 overflow-hidden rounded-[2rem] border border-neutro-100 bg-white p-8 shadow-suave sm:p-12">
            <CurvaDecorativa className="absolute -right-16 -bottom-24 w-[24rem] text-azul-50" />

            <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <h3 className="text-2xl font-bold text-azul-600 sm:text-3xl">
                  Venha conhecer o Instituto Visage pessoalmente.
                </h3>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-neutro-500">
                  A melhor forma de conhecer o espaço, a recepção e a equipe é visitando a
                  clínica. Fale com a gente pelo WhatsApp e combine o melhor horário para a
                  sua primeira conversa.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <LinkBotao href={whatsapp('avaliacao')} externo tamanho="lg">
                    <MessageCircle size={19} aria-hidden="true" />
                    Falar pelo WhatsApp
                  </LinkBotao>
                  <LinkBotao href={clinica.mapa.url} externo variante="contorno" tamanho="lg">
                    Ver no mapa
                    <ExternalLink size={16} aria-hidden="true" />
                  </LinkBotao>
                </div>
              </div>

              <dl className="flex flex-col gap-4">
                <div className="flex gap-3.5 rounded-2xl bg-neutro-50 p-5">
                  <MapPin size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-laranja-400" />
                  <div>
                    <dt className="font-titulo text-sm font-bold text-azul-600">Endereço</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-neutro-500">
                      {clinica.endereco.logradouro}
                      <br />
                      {clinica.endereco.bairro}, {clinica.endereco.cidade} —{' '}
                      {clinica.endereco.estado}
                    </dd>
                  </div>
                </div>

                <div className="flex gap-3.5 rounded-2xl bg-neutro-50 p-5">
                  <Clock size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-laranja-400" />
                  <div>
                    <dt className="font-titulo text-sm font-bold text-azul-600">
                      Horário de funcionamento
                    </dt>
                    <dd className="mt-1 text-sm leading-relaxed text-neutro-500">
                      Segunda a sexta, 08h às 18h
                      <br />
                      Sábado, 08h às 12h
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
          </div>
        </Revelar>
      )}
    </Secao>
  )
}
