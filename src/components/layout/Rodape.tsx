import { Link } from 'react-router-dom'
import { MapPin, Phone, MessageCircle, Clock, ExternalLink } from 'lucide-react'

import { irParaSecao } from '@/lib/utils'
import { clinica } from '@/data/clinica'
import { itensNavegacao } from '@/data/navegacao'
import { especialidades } from '@/data/especialidades'
import { whatsapp } from '@/lib/whatsapp'
import { Logo } from '@/components/ui/Logo'
import { LinkBotao } from '@/components/ui/Botao'
import { Container } from '@/components/ui/Container'

const anoAtual = new Date().getFullYear()

export function Rodape() {
  return (
    <footer className="bg-azul-800 text-azul-100">
      <Container className="py-14 lg:py-18">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-10">
          {/* Marca e apresentação */}
          <div>
            <Logo tamanho={56} comNome tom="claro" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-azul-200">
              {clinica.apresentacao}
            </p>

            <LinkBotao href={whatsapp('avaliacao')} externo className="mt-6">
              <MessageCircle size={17} aria-hidden="true" />
              Falar pelo WhatsApp
            </LinkBotao>
          </div>

          {/* Navegação */}
          <nav aria-labelledby="rodape-navegacao">
            <h2
              id="rodape-navegacao"
              className="text-xs font-semibold tracking-[0.16em] text-white uppercase"
            >
              Navegação
            </h2>
            <ul className="mt-5 flex flex-col gap-1">
              {itensNavegacao.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(evento) => {
                      evento.preventDefault()
                      irParaSecao(item.id)
                    }}
                    className="inline-flex min-h-9 items-center text-sm text-azul-200 transition-colors hover:text-laranja-200"
                  >
                    {item.rotulo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Especialidades */}
          <nav aria-labelledby="rodape-especialidades">
            <h2
              id="rodape-especialidades"
              className="text-xs font-semibold tracking-[0.16em] text-white uppercase"
            >
              Especialidades
            </h2>
            <ul className="mt-5 flex flex-col gap-1">
              {especialidades.map((item) => (
                <li key={item.id}>
                  <a
                    href={whatsapp(item.contato)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-9 items-center text-sm text-azul-200 transition-colors hover:text-laranja-200"
                  >
                    {item.nome}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contato, endereço e horários */}
          <div>
            <h2 className="text-xs font-semibold tracking-[0.16em] text-white uppercase">
              Atendimento
            </h2>

            <ul className="mt-5 flex flex-col gap-4 text-sm">
              <li>
                <a
                  href={clinica.telefone.linkTelefone}
                  className="inline-flex items-center gap-2.5 font-semibold text-white transition-colors hover:text-laranja-200"
                >
                  <Phone size={16} aria-hidden="true" className="text-laranja-300" />
                  {clinica.telefone.exibicao}
                </a>
              </li>

              <li>
                <a
                  href={clinica.mapa.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-start gap-2.5 text-azul-200 transition-colors hover:text-laranja-200"
                >
                  <MapPin size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-laranja-300" />
                  <span className="not-italic">
                    {clinica.endereco.logradouro}
                    <br />
                    {clinica.endereco.bairro}
                    <br />
                    {clinica.endereco.cidade} — {clinica.endereco.estado}, {clinica.endereco.cep}
                    <span className="mt-1 flex items-center gap-1 text-xs font-semibold text-laranja-200">
                      Ver no Google Maps
                      <ExternalLink size={12} aria-hidden="true" />
                    </span>
                  </span>
                </a>
              </li>

              <li>
                <h3 className="flex items-center gap-2.5 font-semibold text-white">
                  <Clock size={16} aria-hidden="true" className="text-laranja-300" />
                  Horários
                </h3>
                <dl className="mt-2 flex flex-col gap-1 text-[0.82rem] text-azul-200">
                  <div className="flex justify-between gap-4">
                    <dt>Segunda a sexta</dt>
                    <dd className="font-medium text-azul-100">08h às 18h</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt>Sábado</dt>
                    <dd className="font-medium text-laranja-200">08h às 12h</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt>Domingo</dt>
                    <dd className="font-medium text-azul-300">Fechado</dd>
                  </div>
                </dl>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-[0.8rem] text-azul-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {anoAtual} {clinica.nome}. Todos os direitos reservados.
          </p>

          <nav aria-label="Links legais">
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <li>
                <Link to="/politica-de-privacidade" className="transition-colors hover:text-laranja-200">
                  Política de privacidade
                </Link>
              </li>
              <li>
                <a
                  href={clinica.mapa.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-laranja-200"
                >
                  Como chegar
                </a>
              </li>
            </ul>
          </nav>
        </Container>
      </div>
    </footer>
  )
}
