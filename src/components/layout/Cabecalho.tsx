import { useCallback, useEffect, useState } from 'react'
import { Menu, MessageCircle, Phone } from 'lucide-react'

import { cn, irParaSecao } from '@/lib/utils'
import { clinica } from '@/data/clinica'
import { itensNavegacao } from '@/data/navegacao'
import { whatsapp } from '@/lib/whatsapp'
import { Logo } from '@/components/ui/Logo'
import { LinkBotao } from '@/components/ui/Botao'
import { Container } from '@/components/ui/Container'
import { MenuMobile } from '@/components/layout/MenuMobile'
import { useSecaoAtiva } from '@/hooks/useSecaoAtiva'

const idsSecoes = itensNavegacao.map((item) => item.id)

/**
 * Cabeçalho fixo, branco, com a logo à esquerda, menu horizontal no
 * desktop e menu lateral no mobile.
 */
export function Cabecalho() {
  const [menuAberto, setMenuAberto] = useState(false)
  const [rolou, setRolou] = useState(false)
  const secaoAtiva = useSecaoAtiva(idsSecoes)

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 12)
    aoRolar()
    window.addEventListener('scroll', aoRolar, { passive: true })
    return () => window.removeEventListener('scroll', aoRolar)
  }, [])

  const navegar = useCallback((id: string) => {
    setMenuAberto(false)
    // O menu mobile trava a rolagem do corpo enquanto está aberto. O salto
    // para a seção precisa esperar o React liberar essa trava, por isso roda
    // em uma tarefa separada em vez de logo após o `setState`.
    window.setTimeout(() => irParaSecao(id), 0)
  }, [])

  return (
    <>
      {/* Faixa superior com o contato direto — some ao rolar, no mobile. */}
      <div className="hidden bg-azul-800 text-white lg:block">
        <Container className="flex h-10 items-center justify-between text-[0.8rem]">
          <p className="text-azul-100">{clinica.apresentacao}</p>
          <a
            href={clinica.telefone.linkTelefone}
            className="inline-flex items-center gap-2 font-semibold transition-colors hover:text-laranja-200"
          >
            <Phone size={14} aria-hidden="true" className="text-laranja-300" />
            {clinica.telefone.exibicao}
          </a>
        </Container>
      </div>

      <header
        className={cn(
          'sticky top-0 z-30 border-b bg-white transition-shadow duration-300',
          rolou ? 'border-neutro-100 shadow-suave' : 'border-transparent',
        )}
      >
        <Container className="flex h-18 items-center justify-between gap-4 lg:h-20">
          <a
            href="#inicio"
            onClick={(evento) => {
              evento.preventDefault()
              navegar('inicio')
            }}
            aria-label={`${clinica.nome} — ir para o início`}
            className="flex items-center rounded-xl"
          >
            <Logo tamanho={46} comNome compacto carregamento="eager" />
          </a>

          <nav aria-label="Navegação principal" className="hidden xl:block">
            <ul className="flex items-center gap-0.5">
              {itensNavegacao.map((item) => {
                const ativo = secaoAtiva === item.id
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={ativo ? 'true' : undefined}
                      onClick={(evento) => {
                        evento.preventDefault()
                        navegar(item.id)
                      }}
                      className={cn(
                        'relative flex h-10 items-center rounded-lg px-2.5 text-[0.85rem] font-semibold whitespace-nowrap transition-colors',
                        '2xl:px-3 2xl:text-[0.9rem]',
                        ativo ? 'text-azul-600' : 'text-neutro-600 hover:text-azul-600',
                      )}
                    >
                      {item.rotulo}
                      {/* Sublinhado laranja: reforça o estado ativo além da cor do texto. */}
                      <span
                        aria-hidden="true"
                        className={cn(
                          'absolute inset-x-2.5 bottom-1 h-0.5 rounded-full bg-laranja-400 transition-opacity duration-200 2xl:inset-x-3',
                          ativo ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <LinkBotao
              href={whatsapp('avaliacao')}
              externo
              className="max-sm:hidden"
              aria-label="Agende uma avaliação pelo WhatsApp"
            >
              <MessageCircle size={17} aria-hidden="true" />
              Agende uma avaliação
            </LinkBotao>

            <button
              type="button"
              onClick={() => setMenuAberto(true)}
              aria-label="Abrir menu de navegação"
              aria-expanded={menuAberto}
              aria-controls="menu-mobile"
              className="inline-flex size-11 items-center justify-center rounded-full border border-neutro-200 text-azul-600 transition-colors hover:border-azul-300 hover:bg-neutro-50 xl:hidden"
            >
              <Menu size={22} aria-hidden="true" />
            </button>
          </div>
        </Container>
      </header>

      <div id="menu-mobile">
        <MenuMobile
          aberto={menuAberto}
          aoFechar={() => setMenuAberto(false)}
          aoNavegar={navegar}
          secaoAtiva={secaoAtiva}
        />
      </div>
    </>
  )
}
