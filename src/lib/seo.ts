import { useEffect } from 'react'

import { clinica, urlSite } from '@/data/clinica'

interface MetaPagina {
  titulo: string
  descricao: string
  /** Caminho da rota, usado no link canônico. */
  caminho: string
  /** Mantém a página fora dos resultados de busca (p. ex. a 404). */
  naoIndexar?: boolean
}

function defineMeta(seletor: string, atributo: string, valor: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(seletor)
  if (!tag) {
    tag = document.createElement('meta')
    const [chave, conteudo] = seletor.replace(/meta\[|\]/g, '').split('=')
    if (chave && conteudo) tag.setAttribute(chave, conteudo.replace(/"/g, ''))
    document.head.appendChild(tag)
  }
  tag.setAttribute(atributo, valor)
}

/** Mantém título, descrição e canônico sincronizados com a rota atual. */
export function useMetaPagina({ titulo, descricao, caminho, naoIndexar }: MetaPagina): void {
  useEffect(() => {
    document.title = titulo

    defineMeta('meta[name="description"]', 'content', descricao)
    defineMeta('meta[property="og:title"]', 'content', titulo)
    defineMeta('meta[property="og:description"]', 'content', descricao)
    defineMeta('meta[property="og:url"]', 'content', `${urlSite}${caminho}`)
    defineMeta('meta[name="twitter:title"]', 'content', titulo)
    defineMeta('meta[name="twitter:description"]', 'content', descricao)

    let canonico = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonico) {
      canonico = document.createElement('link')
      canonico.rel = 'canonical'
      document.head.appendChild(canonico)
    }
    canonico.href = `${urlSite}${caminho}`

    const robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]')
    if (naoIndexar) {
      defineMeta('meta[name="robots"]', 'content', 'noindex, follow')
    } else if (robots) {
      robots.setAttribute('content', 'index, follow')
    }
  }, [titulo, descricao, caminho, naoIndexar])
}

/**
 * Dados estruturados da clínica (schema.org/Dentist).
 *
 * Contém apenas informação oficial: nome, endereço, telefone, horários e
 * áreas de atendimento. Sem avaliações, depoimentos ou dados de
 * profissionais — nada disso foi confirmado pela clínica.
 */
export function dadosEstruturados(especialidadesNomes: string[]) {
  const diasSchema: Record<number, string> = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    name: clinica.nome,
    alternateName: clinica.nomeCurto,
    description: clinica.apresentacao,
    url: urlSite,
    image: `${urlSite}/og-visage.jpg`,
    logo: `${urlSite}/logo-visage-512.png`,
    telephone: `+${clinica.telefone.numerico}`,
    hasMap: clinica.mapa.url,
    address: {
      '@type': 'PostalAddress',
      streetAddress: clinica.endereco.logradouro,
      addressLocality: clinica.endereco.cidade,
      addressRegion: clinica.endereco.estado,
      postalCode: clinica.endereco.cep,
      addressCountry: clinica.endereco.pais,
    },
    areaServed: {
      '@type': 'City',
      name: `${clinica.endereco.cidade} — ${clinica.endereco.estadoExtenso}`,
    },
    availableService: especialidadesNomes.map((nome) => ({
      '@type': 'MedicalProcedure',
      name: nome,
    })),
    openingHoursSpecification: clinica.horarios
      .filter((item) => item.horario !== null)
      .map((item) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: `https://schema.org/${diasSchema[item.diaDaSemana]}`,
        opens: '08:00',
        closes: item.diaDaSemana === 6 ? '12:00' : '18:00',
      })),
  }
}
