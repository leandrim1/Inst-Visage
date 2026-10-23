import { HeartHandshake, UserRoundCheck, MessagesSquare } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface Diferencial {
  id: string
  titulo: string
  descricao: string
  icone: LucideIcon
}

/**
 * Princípios de atendimento — não são certificações, selos nem garantias
 * de resultado, e por isso são apresentados como compromissos da equipe.
 */
export const diferenciais: Diferencial[] = [
  {
    id: 'atendimento-humanizado',
    titulo: 'Atendimento humanizado',
    descricao: 'Escuta e atenção para compreender as necessidades de cada paciente.',
    icone: HeartHandshake,
  },
  {
    id: 'cuidado-individualizado',
    titulo: 'Cuidado individualizado',
    descricao:
      'Cada plano de tratamento deve considerar as condições e os objetivos de cada pessoa.',
    icone: UserRoundCheck,
  },
  {
    id: 'orientacao-clara',
    titulo: 'Orientação clara',
    descricao:
      'Informações compreensíveis para que o paciente possa conversar com a equipe e tomar decisões com segurança.',
    icone: MessagesSquare,
  },
]
