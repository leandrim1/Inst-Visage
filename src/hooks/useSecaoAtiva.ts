import { useEffect, useState } from 'react'

/**
 * Indica qual seção está visível, para destacar o item correspondente
 * no menu. Usa `IntersectionObserver` para não observar o scroll a cada
 * quadro.
 */
export function useSecaoAtiva(ids: string[]): string {
  const [ativa, setAtiva] = useState('')

  useEffect(() => {
    const secoes = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (secoes.length === 0) return

    const visiveis = new Map<string, number>()

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) {
            visiveis.set(entrada.target.id, entrada.intersectionRatio)
          } else {
            visiveis.delete(entrada.target.id)
          }
        }

        // A seção ativa é a primeira (na ordem do menu) que está visível.
        const primeira = ids.find((id) => visiveis.has(id))
        if (primeira) setAtiva(primeira)
      },
      {
        // Ignora a faixa coberta pelo cabeçalho fixo.
        rootMargin: '-96px 0px -55% 0px',
        threshold: [0, 0.25, 0.5],
      },
    )

    secoes.forEach((secao) => observador.observe(secao))
    return () => observador.disconnect()
  }, [ids])

  return ativa
}
