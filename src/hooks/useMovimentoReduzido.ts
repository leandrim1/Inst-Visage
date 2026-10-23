import { useSyncExternalStore } from 'react'

const CONSULTA = '(prefers-reduced-motion: reduce)'

function inscrever(aoMudar: () => void): () => void {
  const consulta = window.matchMedia(CONSULTA)
  consulta.addEventListener('change', aoMudar)
  return () => consulta.removeEventListener('change', aoMudar)
}

function lerCliente(): boolean {
  return window.matchMedia(CONSULTA).matches
}

/** Observa a preferência do sistema por movimento reduzido. */
export function useMovimentoReduzido(): boolean {
  return useSyncExternalStore(inscrever, lerCliente, () => false)
}
