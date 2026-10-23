/** Itens do menu principal, compartilhados pelo cabeçalho e pelo rodapé. */
export interface ItemNavegacao {
  /** Rótulo exibido ao visitante. */
  rotulo: string
  /** Id da seção correspondente na página inicial. */
  id: string
}

export const itensNavegacao: ItemNavegacao[] = [
  { rotulo: 'Início', id: 'inicio' },
  { rotulo: 'A Clínica', id: 'a-clinica' },
  { rotulo: 'Especialidades', id: 'especialidades' },
  { rotulo: 'Diferenciais', id: 'diferenciais' },
  { rotulo: 'Perguntas frequentes', id: 'perguntas-frequentes' },
  { rotulo: 'Contato', id: 'contato' },
]
