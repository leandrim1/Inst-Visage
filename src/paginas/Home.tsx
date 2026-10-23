import { useMetaPagina } from '@/lib/seo'
import { Hero } from '@/components/secoes/Hero'
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
      <ChamadaAgendamento />
      <PerguntasFrequentes />
      <Contato />
    </>
  )
}
