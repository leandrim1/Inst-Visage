import { useLayoutEffect } from 'react'

/**
 * Impede a rolagem do fundo enquanto o menu mobile está aberto,
 * compensando a largura da barra de rolagem para o layout não saltar.
 */
export function useTravaRolagem(ativo: boolean): void {
  // Efeito de layout: aplica e remove a trava antes da pintura, para o
  // conteúdo não piscar e para a rolagem programada logo depois funcionar.
  useLayoutEffect(() => {
    if (!ativo) return

    const { body, documentElement } = document
    const estiloAnterior = body.style.cssText
    const larguraBarra = window.innerWidth - documentElement.clientWidth

    body.style.overflow = 'hidden'
    if (larguraBarra > 0) body.style.paddingRight = `${larguraBarra}px`

    return () => {
      body.style.cssText = estiloAnterior
    }
  }, [ativo])
}
