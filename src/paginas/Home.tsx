import { useMetaPagina } from '@/lib/seo'
import { MOSTRAR_CASOS, casosDisponiveis } from '@/data/casos'
import { Hero } from '@/components/secoes/Hero'
import { Casos } from '@/components/secoes/Casos'
import { SobreClinica } from '@/components/secoes/SobreClinica'
import { Especialidades } from '@/components/secoes/Especialidades'
import { Diferenciais } from '@/components/secoes/Diferenciais'
import { Experiencia } from '@/components/secoes/Experiencia'
import { ChamadaAgendamento } from '@/components/secoes/ChamadaAgendamento'
import { PerguntasFrequentes } from '@/components/secoes/PerguntasFrequentes'
import { Contato } from '@/components/secoes/Contato'

export default function Home() {
  useMetaPagina({
    titulo:
      'Instituto Odontológico Visage | Clínica odontológica em Patos de Minas — MG',
    descricao:
      'Odontologia especializada com atendimento humanizado em Patos de Minas — MG. Implantes dentários, Harmonização Orofacial, ortodontia e endodontia. Agende sua avaliação.',
    caminho: '/',
  })

  return (
    <>
      <Hero />
      <SobreClinica />
      <Especialidades />
      <Diferenciais />
      <Experiencia />
      {/* Seção temporária: some sozinha se a pasta de fotos estiver vazia
          ou se MOSTRAR_CASOS for desligado antes da publicação. */}
      {MOSTRAR_CASOS && casosDisponiveis.length > 0 && <Casos />}
      <ChamadaAgendamento />
      <PerguntasFrequentes />
      <Contato />
    </>
  )
}
