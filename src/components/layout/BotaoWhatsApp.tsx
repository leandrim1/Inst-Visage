import { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'

import { cn } from '@/lib/utils'
import { whatsapp } from '@/lib/whatsapp'

/**
 * Atalho flutuante para o WhatsApp.
 *
 * Só aparece depois que o visitante rola a primeira dobra, para não cobrir
 * o conteúdo do hero no celular.
 */
export function BotaoWhatsApp() {
  const [visivel, setVisivel] = useState(false)

  useEffect(() => {
    const aoRolar = () => setVisivel(window.scrollY > 520)
    aoRolar()
    window.addEventListener('scroll', aoRolar, { passive: true })
    return () => window.removeEventListener('scroll', aoRolar)
  }, [])

  return (
    <a
      href={whatsapp('duvidas')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com o Instituto Visage pelo WhatsApp"
      tabIndex={visivel ? 0 : -1}
      aria-hidden={!visivel}
      className={cn(
        'fixed right-4 bottom-4 z-30 inline-flex items-center gap-2.5 rounded-full px-4 py-3.5',
        // Verde do WhatsApp escurecido para 5.44:1 com o texto branco.
        'bg-[#0b7a3b] font-semibold text-white shadow-[0_10px_30px_-8px_rgb(11_122_59_/_0.55)]',
        'transition-[opacity,transform] duration-300 ease-[var(--ease-marca)] hover:bg-[#096431]',
        'sm:right-6 sm:bottom-6',
        visivel ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0',
      )}
    >
      <MessageCircle size={22} aria-hidden="true" />
      <span className="hidden text-sm sm:inline">Fale conosco</span>
    </a>
  )
}
