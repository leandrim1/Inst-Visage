/** Primeiro foco da página: atalho para quem navega por teclado. */
export function PularParaConteudo() {
  return (
    <a
      href="#conteudo"
      className="sr-only rounded-full bg-azul-600 px-5 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50"
    >
      Pular para o conteúdo principal
    </a>
  )
}
