import { clinica } from '@/data/clinica'
import { especialidades } from '@/data/especialidades'
import { whatsapp } from '@/lib/whatsapp'

export interface Pergunta {
  id: string
  pergunta: string
  /** Parágrafos da resposta, na ordem em que aparecem. */
  resposta: string[]
  /** Itens listados após os parágrafos, quando fizer sentido. */
  lista?: string[]
  /** Ação opcional ao final da resposta. */
  acao?: { rotulo: string; href: string; externo?: boolean }
}

/**
 * As respostas usam exclusivamente os dados oficiais informados pela
 * clínica. Valores, convênios, formas de pagamento, duração de tratamento
 * e disponibilidade de profissionais não são respondidos aqui — nesses
 * casos o visitante é orientado a falar com a equipe.
 */
export const perguntasFrequentes: Pergunta[] = [
  {
    id: 'especialidades',
    pergunta: 'Quais especialidades o Instituto Visage oferece?',
    resposta: ['O Instituto Visage atende nas seguintes áreas:'],
    lista: especialidades.map((e) => e.nome),
    acao: { rotulo: 'Ver as especialidades', href: '#especialidades' },
  },
  {
    id: 'avaliacao',
    pergunta: 'Como posso solicitar uma avaliação?',
    resposta: [
      `Entre em contato com a equipe pelo WhatsApp ou pelo telefone ${clinica.telefone.exibicao}. A conversa é o primeiro passo: a equipe orienta sobre os próximos passos e confirma com você o melhor momento para o atendimento.`,
      'O site não realiza agendamentos automáticos — todo contato é atendido diretamente pela equipe da clínica.',
    ],
    acao: {
      rotulo: 'Falar pelo WhatsApp',
      href: whatsapp('avaliacao'),
      externo: true,
    },
  },
  {
    id: 'localizacao',
    pergunta: 'Onde fica a clínica?',
    resposta: [
      `O Instituto Odontológico Visage fica na ${clinica.endereco.logradouro}, bairro ${clinica.endereco.bairro}, em ${clinica.endereco.cidade} — ${clinica.endereco.estado}, CEP ${clinica.endereco.cep}.`,
    ],
    acao: {
      rotulo: 'Abrir no Google Maps',
      href: clinica.mapa.url,
      externo: true,
    },
  },
  {
    id: 'horarios',
    pergunta: 'Qual é o horário de funcionamento?',
    resposta: ['A clínica atende nos seguintes horários:'],
    lista: clinica.horarios.map((h) => `${h.dia}: ${h.horario ?? 'fechado'}`),
  },
  {
    id: 'informacoes-tratamentos',
    pergunta: 'Como posso obter informações sobre os tratamentos?',
    resposta: [
      'Cada caso é avaliado individualmente, por isso as orientações sobre tratamentos são dadas pela equipe durante o atendimento.',
      'Para tirar dúvidas antes de vir à clínica, fale com a equipe pelo WhatsApp: é possível explicar sua situação e entender quais são os próximos passos.',
    ],
    acao: {
      rotulo: 'Tirar dúvidas pelo WhatsApp',
      href: whatsapp('duvidas'),
      externo: true,
    },
  },
  {
    id: 'valores-convenios',
    pergunta: 'Como funcionam valores, convênios e formas de pagamento?',
    resposta: [
      'Essas informações dependem da avaliação de cada caso e são tratadas diretamente pela equipe da clínica.',
      `Fale com o Instituto Visage pelo WhatsApp ou pelo telefone ${clinica.telefone.exibicao} para consultar valores, convênios, formas de pagamento, duração de tratamento e disponibilidade de profissionais.`,
    ],
    acao: {
      rotulo: 'Falar com a equipe',
      href: whatsapp('duvidas'),
      externo: true,
    },
  },
]
