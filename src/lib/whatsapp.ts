import { clinica } from '@/data/clinica'

/**
 * Monta o link da API do WhatsApp com uma mensagem inicial.
 *
 * O site não agenda nada: o botão apenas abre uma conversa já escrita para
 * que o visitante fale com a equipe da clínica.
 */
export function linkWhatsApp(mensagem: string): string {
  return `https://wa.me/${clinica.telefone.numerico}?text=${encodeURIComponent(mensagem)}`
}

/**
 * Mensagens iniciais por contexto. Cada botão do site usa a mensagem da
 * seção em que aparece, para que a equipe saiba de onde veio o contato.
 */
export const mensagensWhatsApp = {
  avaliacao:
    'Olá! Vim pelo site do Instituto Visage e gostaria de informações para marcar uma avaliação.',
  implantes:
    'Olá! Vim pelo site do Instituto Visage e gostaria de informações sobre implantes dentários.',
  harmonizacao:
    'Olá! Vim pelo site do Instituto Visage e gostaria de informações sobre Harmonização Orofacial (HOF).',
  ortodontia:
    'Olá! Vim pelo site do Instituto Visage e gostaria de informações sobre ortodontia.',
  endodontia:
    'Olá! Vim pelo site do Instituto Visage e gostaria de informações sobre endodontia.',
  duvidas:
    'Olá! Vim pelo site do Instituto Visage e gostaria de tirar algumas dúvidas sobre os atendimentos.',
  horarios:
    'Olá! Vim pelo site do Instituto Visage e gostaria de saber mais sobre os horários de atendimento.',
  localizacao:
    'Olá! Vim pelo site do Instituto Visage e gostaria de confirmar o endereço da clínica.',
} as const

export type ContextoWhatsApp = keyof typeof mensagensWhatsApp

/** Atalho para os contextos já previstos. */
export function whatsapp(contexto: ContextoWhatsApp): string {
  return linkWhatsApp(mensagensWhatsApp[contexto])
}
