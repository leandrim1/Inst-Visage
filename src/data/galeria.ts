import { Building2, Armchair, Microscope, Footprints, ConciergeBell } from 'lucide-react'
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
 * Os itens abaixo correspondem aos ambientes fotografados pela clínica.
 * O texto de `alt` já descreve cada cena; falta apenas apontar o arquivo.
 *
 * COMO PUBLICAR CADA FOTO
 * 1. Salve o arquivo em `src/assets/fotos/` com o nome indicado no item.
 * 2. Importe-o no topo deste módulo.
 * 3. Troque o `foto: null` pelo objeto `Foto`, preenchendo `src`,
 *    `largura` e `altura` com as dimensões reais do arquivo.
 *
 * A grade se monta sozinha com os itens que já têm foto: o primeiro ocupa
 * o bloco maior e os demais seguem em sequência. Enquanto nenhum estiver
 * preenchido, a seção exibe o convite para conhecer a clínica.
 */
export const galeria: ItemGaleria[] = [
  {
    id: 'fachada',
    titulo: 'Fachada e entrada',
    descricao: 'A chegada ao Instituto Visage, no bairro Sobradinho.',
    icone: Building2,
    // Arquivo esperado: fachada-visage.jpg
    foto: null,
  },
  {
    id: 'recepcao',
    titulo: 'Recepção',
    descricao: 'Um espaço tranquilo para esperar com conforto.',
    icone: Armchair,
    // Arquivo esperado: recepcao-visage.jpg
    foto: null,
  },
  {
    id: 'consultorio',
    titulo: 'Consultório odontológico',
    descricao: 'O espaço onde cada atendimento acontece.',
    icone: Microscope,
    // Arquivo esperado: consultorio-visage.jpg
    foto: null,
  },
  {
    id: 'atendimento',
    titulo: 'Balcão de atendimento',
    descricao: 'O primeiro contato com a equipe, logo na entrada.',
    icone: ConciergeBell,
    // Arquivo esperado: balcao-visage.jpg
    foto: null,
  },
  {
    id: 'circulacao',
    titulo: 'Circulação',
    descricao: 'Ambientes claros, ligando a recepção às salas de atendimento.',
    icone: Footprints,
    // Arquivo esperado: circulacao-visage.jpg
    foto: null,
  },
  {
    id: 'sala-atendimento',
    titulo: 'Sala de atendimento',
    descricao: 'Mais um consultório preparado para receber você.',
    icone: Microscope,
    // Arquivo esperado: sala-atendimento-visage.jpg
    foto: null,
  },
]

/**
 * Fotografia do ambiente da clínica para a seção institucional. Enquanto
 * for `null`, a seção exibe uma composição com a marca no lugar da imagem.
 */
export const fotoAmbiente: Foto | null = null
