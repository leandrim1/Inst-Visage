import { Link } from 'react-router-dom'
import { ArrowLeft, MessageCircle } from 'lucide-react'

import { useMetaPagina } from '@/lib/seo'
import { whatsapp } from '@/lib/whatsapp'
import { classesBotao } from '@/lib/estilosBotao'
import { LinkBotao } from '@/components/ui/Botao'
import { Container } from '@/components/ui/Container'
import { Logo } from '@/components/ui/Logo'

export default function NaoEncontrada() {
  useMetaPagina({
    titulo: 'Página não encontrada | Instituto Odontológico Visage',
    descricao: 'A página que você procura não existe ou foi movida.',
    caminho: '/404',
    naoIndexar: true,
  })

  return (
    <Container className="flex min-h-[64vh] flex-col items-center justify-center py-20 text-center">
      <Logo tamanho={80} decorativa />

      <p className="font-titulo mt-8 text-sm font-bold tracking-[0.2em] text-laranja-600 uppercase">
        Erro 404
      </p>
      <h1 className="mt-3 text-3xl font-extrabold text-azul-600 sm:text-4xl">
        Página não encontrada
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-neutro-500">
        O endereço que você acessou não existe ou foi movido. Volte ao início para conhecer o
        Instituto Visage.
      </p>

      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <Link to="/" className={classesBotao({ variante: 'secundario', tamanho: 'lg' })}>
          <ArrowLeft size={18} aria-hidden="true" />
          Voltar ao início
        </Link>
        <LinkBotao href={whatsapp('duvidas')} externo variante="contorno" tamanho="lg">
          <MessageCircle size={18} aria-hidden="true" />
          Falar pelo WhatsApp
        </LinkBotao>
      </div>
    </Container>
  )
}
