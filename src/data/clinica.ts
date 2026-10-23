/**
 * Dados institucionais oficiais do Instituto Odontológico Visage.
 *
 * Esta é a única fonte de verdade do site: endereço, telefone, horários e
 * especialidades são lidos daqui por todas as seções. Para atualizar uma
 * informação, altere apenas este arquivo.
 *
 * Nada aqui pode ser preenchido com dado presumido. Campos ainda não
 * confirmados pela clínica ficam vazios e as seções que dependem deles
 * simplesmente não são renderizadas.
 */

export interface HorarioDia {
  /** Nome do dia como aparece na interface. */
  dia: string
  /** Faixa de atendimento ou `null` quando a clínica não abre. */
  horario: string | null
  /** Índice do dia na semana usado por `Date.getDay()` (0 = domingo). */
  diaDaSemana: number
  /** Marca o dia com destaque visual (sábado tem horário reduzido). */
  destaque?: boolean
}

export const clinica = {
  nome: 'Instituto Odontológico Visage',
  nomeCurto: 'Instituto Visage',
  categoria: 'Clínica odontológica',
  chamada: 'Odontologia Especializada',
  apresentacao:
    'Instituto Visage — Odontologia Especializada. Trabalhando de forma humanizada e transformando sorrisos.',

  endereco: {
    logradouro: 'Avenida Padre Almir Neves de Medeiros, 225',
    bairro: 'Sobradinho',
    cidade: 'Patos de Minas',
    estado: 'MG',
    estadoExtenso: 'Minas Gerais',
    cep: '38701-118',
    pais: 'BR',
    /** Linha única, usada em metadados e em botões de cópia. */
    get completo(): string {
      return `${this.logradouro}, ${this.bairro}, ${this.cidade} — ${this.estado}, CEP ${this.cep}`
    },
  },

  telefone: {
    exibicao: '(34) 99714-5055',
    /** Formato E.164 sem símbolos, usado em `tel:` e na API do WhatsApp. */
    numerico: '5534997145055',
    get linkTelefone(): string {
      return `tel:+${this.numerico}`
    },
  },

  mapa: {
    /** Link oficial informado pela clínica. */
    url: 'https://www.google.com/maps/search/?api=1&query=Av.%20Padre%20Almir%20Neves%20de%20Medeiros%2C%20225%2C%20Sobradinho%2C%20Patos%20de%20Minas%20-%20MG',
    /** Incorporação leve, carregada sob demanda pela seção de contato. */
    embedUrl:
      'https://www.google.com/maps?q=Av.+Padre+Almir+Neves+de+Medeiros,+225,+Sobradinho,+Patos+de+Minas+-+MG&output=embed',
  },

  horarios: [
    { dia: 'Segunda-feira', horario: '08h às 18h', diaDaSemana: 1 },
    { dia: 'Terça-feira', horario: '08h às 18h', diaDaSemana: 2 },
    { dia: 'Quarta-feira', horario: '08h às 18h', diaDaSemana: 3 },
    { dia: 'Quinta-feira', horario: '08h às 18h', diaDaSemana: 4 },
    { dia: 'Sexta-feira', horario: '08h às 18h', diaDaSemana: 5 },
    { dia: 'Sábado', horario: '08h às 12h', diaDaSemana: 6, destaque: true },
    { dia: 'Domingo', horario: null, diaDaSemana: 0 },
  ] satisfies HorarioDia[],

  /**
   * Campos que dependem de confirmação da clínica. Enquanto estiverem
   * vazios, o site não exibe nome de profissional, CRO nem redes sociais —
   * nenhuma dessas informações pode ser presumida.
   */
  pendentes: {
    /** Responsável técnico: preencha nome e CRO juntos, nunca só um deles. */
    responsavelTecnico: { nome: '', cro: '' },
    /** Razão social e CNPJ para o rodapé e para a política de privacidade. */
    razaoSocial: '',
    cnpj: '',
    /** E-mail institucional de contato e de encarregado de dados (LGPD). */
    email: '',
    redesSociais: {
      instagram: '',
      facebook: '',
    },
  },
} as const

/** Horário formatado em uma linha, p. ex. "Segunda a sexta, 08h às 18h". */
export const resumoHorario = 'Segunda a sexta, 08h às 18h • Sábado, 08h às 12h'

/** URL canônica usada em metadados de SEO e em dados estruturados. */
export const urlSite = 'https://institutovisage.com.br'
