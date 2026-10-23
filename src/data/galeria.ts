import { Building2, Armchair, Microscope, HeartHandshake, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import profissional590 from '@/assets/fotos/profissional-visage-590.jpg'
import profissional320 from '@/assets/fotos/profissional-visage-320.jpg'

export interface Foto {
  /** Caminho importado da imagem em tamanho padrão. */
  src: string
  /** Versão menor, usada no `srcSet` para telas pequenas. */
  srcPequeno?: string
  /** Descrição textual obrigatória, para leitores de tela. */
  alt: string
  largura: number
  altura: number
}

export interface ItemGaleria {
  id: string
  titulo: string
  descricao: string
  icone: LucideIcon
  /**
   * Fotografia oficial do Instituto Visage. Enquanto for `null`, o item
   * não aparece no site — nenhuma imagem ilustrativa é exibida no lugar
   * de uma fotografia real da clínica.
   */
  foto: Foto | null
}

/** Foto do profissional usada na primeira dobra. */
export const fotoHero: Foto = {
  src: profissional590,
  srcPequeno: profissional320,
  alt: 'Profissional do Instituto Odontológico Visage em jaleco, em retrato de estúdio.',
  largura: 590,
  altura: 590,
}

/**
 * Galeria "Experiência na clínica".
 *
 * COMO PUBLICAR AS FOTOS OFICIAIS
 * 1. Coloque os arquivos em `src/assets/fotos/`.
 * 2. Importe cada arquivo no topo deste módulo.
 * 3. Troque o `foto: null` do item correspondente por um objeto `Foto`,
 *    preenchendo `alt`, `largura` e `altura` com os valores reais.
 *
 * A seção monta a grade automaticamente com os itens que já têm foto e
 * some da página enquanto nenhum deles estiver preenchido.
 */
export const galeria: ItemGaleria[] = [
  {
    id: 'fachada',
    titulo: 'Fachada e entrada',
    descricao: 'A chegada ao Instituto Visage, no bairro Sobradinho.',
    icone: Building2,
    foto: null,
  },
  {
    id: 'recepcao',
    titulo: 'Recepção',
    descricao: 'O primeiro contato com a equipe, em um ambiente tranquilo.',
    icone: Armchair,
    foto: null,
  },
  {
    id: 'consultorio',
    titulo: 'Consultório odontológico',
    descricao: 'O espaço onde cada atendimento acontece.',
    icone: Microscope,
    foto: null,
  },
  {
    id: 'atendimento',
    titulo: 'Ambiente de atendimento',
    descricao: 'Cuidado e atenção em cada etapa do tratamento.',
    icone: HeartHandshake,
    foto: null,
  },
  {
    id: 'equipe',
    titulo: 'Equipe',
    descricao: 'Quem acompanha você do início ao fim.',
    icone: Users,
    foto: null,
  },
]

/**
 * Fotografia do ambiente da clínica para a seção institucional. Enquanto
 * for `null`, a seção exibe uma composição com a marca no lugar da imagem.
 */
export const fotoAmbiente: Foto | null = null
