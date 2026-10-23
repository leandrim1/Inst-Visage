import { Smile, Sparkles, AlignHorizontalDistributeCenter, Stethoscope } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import type { ContextoWhatsApp } from '@/lib/whatsapp'

export interface Especialidade {
  id: string
  nome: string
  /** Rótulo curto usado em listas compactas, como o rodapé. */
  resumo: string
  descricao: string
  icone: LucideIcon
  /** Contexto da mensagem inicial do WhatsApp para esta especialidade. */
  contato: ContextoWhatsApp
}

/**
 * Apenas as quatro especialidades informadas pela clínica. As descrições
 * falam do escopo de cada área, sem prometer resultado, indicar tratamento
 * ou sugerir que o procedimento serve para todos os pacientes.
 */
export const especialidades: Especialidade[] = [
  {
    id: 'implantes-dentarios',
    nome: 'Implantes dentários',
    resumo: 'Reabilitação de dentes ausentes',
    descricao:
      'Uma alternativa para reabilitação de dentes ausentes, com planejamento individualizado e avaliação das necessidades de cada paciente.',
    icone: Smile,
    contato: 'implantes',
  },
  {
    id: 'harmonizacao-orofacial',
    nome: 'Harmonização Orofacial (HOF)',
    resumo: 'Harmonia facial com avaliação profissional',
    descricao:
      'Procedimentos voltados à harmonia facial, considerando as características individuais e a avaliação profissional.',
    icone: Sparkles,
    contato: 'harmonizacao',
  },
  {
    id: 'ortodontia',
    nome: 'Ortodontia',
    resumo: 'Alinhamento dentário e mordida',
    descricao:
      'Cuidados voltados ao alinhamento dos dentes e à correção da posição dentária e da mordida, conforme avaliação odontológica.',
    icone: AlignHorizontalDistributeCenter,
    contato: 'ortodontia',
  },
  {
    id: 'endodontia',
    nome: 'Endodontia',
    resumo: 'Tratamento da polpa dentária',
    descricao:
      'Área da odontologia dedicada ao diagnóstico e ao tratamento de alterações que afetam a polpa dentária e os tecidos ao redor da raiz.',
    icone: Stethoscope,
    contato: 'endodontia',
  },
]
