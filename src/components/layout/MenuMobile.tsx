import { useEffect, useRef } from 'react'
import { X, MessageCircle, Phone, MapPin } from 'lucide-react'

import { cn } from '@/lib/utils'
import { clinica } from '@/data/clinica'
import { itensNavegacao } from '@/data/navegacao'
import { whatsapp } from '@/lib/whatsapp'
import { Logo } from '@/components/ui/Logo'
import { LinkBotao } from '@/components/ui/Botao'
import { useTravaRolagem } from '@/hooks/useTravaRolagem'

interface MenuMobileProps {
  aberto: boolean
  aoFechar: () => void
  /** Navega até a seção e fecha o menu. */
  aoNavegar: (id: string) => void
  secaoAtiva: string
}

export function MenuMobile({ aberto, aoFechar, aoNavegar, secaoAtiva }: MenuMobileProps) {
  const painel = useRef<HTMLDivElement>(null)
  const botaoFechar = useRef<HTMLButtonElement>(null)

  useTravaRolagem(aberto)

  // Fecha com Esc e mantém o foco dentro do painel enquanto ele está aberto.
  useEffect(() => {
    if (!aberto) return

    botaoFechar.current?.focus()

    const aoTeclar = (evento: KeyboardEvent) => {
      if (evento.key === 'Escape') {
        aoFechar()
        return
      }

      if (evento.key !== 'Tab' || !painel.current) return

      const focaveis = painel.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      )
      const primeiro = focaveis[0]
      const ultimo = focaveis[focaveis.length - 1]
      if (!primeiro || !ultimo) return

      if (evento.shiftKey && document.activeElement === primeiro) {
        evento.preventDefault()
        ultimo.focus()
      } else if (!evento.shiftKey && document.activeElement === ultimo) {
        evento.preventDefault()
        primeiro.focus()
      }
    }

    document.addEventListener('keydown', aoTeclar)
    return () => document.removeEventListener('keydown', aoTeclar)
  }, [aberto, aoFechar])

  return (
    <div
      className={cn('xl:hidden', aberto ? 'pointer-events-auto' : 'pointer-events-none')}
      aria-hidden={!aberto}
    >
      <div
        className={cn(
          'fixed inset-0 z-40 bg-azul-900/55 backdrop-blur-[2px] transition-opacity duration-300',
          aberto ? 'opacity-100' : 'opacity-0',
        )}
        onClick={aoFechar}
      />

      <div
        ref={painel}
        role="dialog"
        aria-modal={aberto || undefined}
        aria-label="Menu de navegação"
        className={cn(
          'fixed inset-y-0 right-0 z-50 flex w-[min(21rem,88vw)] flex-col bg-white shadow-2xl',
          'transition-transform duration-300 ease-[var(--ease-marca)]',
          aberto ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex items-center justify-between border-b border-neutro-100 px-5 py-4">
          <Logo tamanho={40} comNome compacto />
          <button
            ref={botaoFechar}
            type="button"
            onClick={aoFechar}
            aria-label="Fechar menu de navegação"
            className="inline-flex size-11 items-center justify-center rounded-full text-azul-600 transition-colors hover:bg-neutro-50"
          >
            <X size={22} aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Navegação principal (mobile)" className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="flex flex-col gap-1">
            {itensNavegacao.map((item) => {
              const ativo = secaoAtiva === item.id
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={ativo ? 'true' : undefined}
                    onClick={(evento) => {
                      evento.preventDefault()
                      aoNavegar(item.id)
                    }}
                    className={cn(
                      'flex min-h-12 items-center gap-3 rounded-xl px-4 text-[0.95rem] font-semibold transition-colors',
                      ativo
                        ? 'bg-azul-50 text-azul-700'
                        : 'text-azul-800 hover:bg-neutro-50',
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        'h-1.5 w-1.5 rounded-full transition-colors',
                        ativo ? 'bg-laranja-400' : 'bg-neutro-200',
                      )}
                    />
                    {item.rotulo}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="border-t border-neutro-100 px-5 py-5">
          <LinkBotao
            href={whatsapp('avaliacao')}
            externo
            tamanho="lg"
            className="w-full"
            aria-label="Agende uma avaliação pelo WhatsApp"
          >
            <MessageCircle size={19} aria-hidden="true" />
            Agende uma avaliação
          </LinkBotao>

          <div className="mt-4 flex flex-col gap-2 text-sm">
            <a
              href={clinica.telefone.linkTelefone}
              className="inline-flex min-h-10 items-center gap-2.5 text-azul-700 transition-colors hover:text-laranja-500"
            >
              <Phone size={16} aria-hidden="true" className="text-laranja-400" />
              {clinica.telefone.exibicao}
            </a>
            <a
              href={clinica.mapa.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-start gap-2.5 text-neutro-500 transition-colors hover:text-azul-700"
            >
              <MapPin size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-laranja-400" />
              <span>
                {clinica.endereco.logradouro}
                <br />
                {clinica.endereco.bairro}, {clinica.endereco.cidade} — {clinica.endereco.estado}
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
