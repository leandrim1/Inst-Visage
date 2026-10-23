/** Junta classes condicionais sem depender de biblioteca externa. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}

/**
 * Rola até uma seção da página inicial respeitando o cabeçalho fixo e a
 * preferência do sistema por movimento reduzido.
 */
export function irParaSecao(id: string): void {
  const alvo = document.getElementById(id)
  if (!alvo) return

  const movimentoReduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  alvo.scrollIntoView({
    behavior: movimentoReduzido ? 'auto' : 'smooth',
    block: 'start',
  })

  // Mantém a seção acessível para leitores de tela e navegação por teclado.
  alvo.setAttribute('tabindex', '-1')
  alvo.focus({ preventScroll: true })
}

/**
 * Aplica a máscara de telefone brasileira enquanto o visitante digita.
 * Aceita números fixos (10 dígitos) e celulares (11 dígitos).
 */
export function mascaraTelefone(valor: string): string {
  const digitos = valor.replace(/\D/g, '').slice(0, 11)

  if (digitos.length <= 2) return digitos
  if (digitos.length <= 6) return `(${digitos.slice(0, 2)}) ${digitos.slice(2)}`
  if (digitos.length <= 10) {
    return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 6)}-${digitos.slice(6)}`
  }
  return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 7)}-${digitos.slice(7)}`
}

/** Valida telefone brasileiro: DDD válido e 10 ou 11 dígitos no total. */
export function telefoneValido(valor: string): boolean {
  const digitos = valor.replace(/\D/g, '')
  if (digitos.length !== 10 && digitos.length !== 11) return false

  const ddd = Number(digitos.slice(0, 2))
  if (ddd < 11 || ddd > 99) return false

  // Celular brasileiro sempre começa com 9 após o DDD.
  if (digitos.length === 11 && digitos[2] !== '9') return false

  return true
}
