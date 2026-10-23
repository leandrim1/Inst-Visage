import { Building2, Armchair, Microscope, Footprints, ConciergeBell } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import profissional590 from '@/assets/fotos/profissional-visage-590.jpg'
import profissional320 from '@/assets/fotos/profissional-visage-320.jpg'
import fachada from '@/assets/fotos/fachada-visage.webp'
import recepcao from '@/assets/fotos/recepcao-visage.webp'
import consultorio from '@/assets/fotos/consultorio-visage.webp'
import balcao from '@/assets/fotos/balcao-visage.webp'
import circulacao from '@/assets/fotos/circulacao-visage.webp'
import salaAtendimento from '@/assets/fotos/sala-atendimento-visage.webp'

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
 * Galeria "Experiência na clínica" — fotografias reais do Instituto Visage.
 *
 * Todas estão em retrato 382x510; a grade usa a mesma proporção para não
 * cortar nem esticar nenhuma delas.
 *
 * COMO TROCAR OU ACRESCENTAR UMA FOTO
 * 1. Salve o arquivo em `src/assets/fotos/`.
 * 2. Importe-o no topo deste módulo.
 * 3. Aponte `src` para ele e atualize `alt`, `largura` e `altura`.
 *
 * A grade se monta com os itens que têm foto. Um item com `foto: null`
 * simplesmente não aparece — nenhuma imagem ilustrativa entra no lugar.
 */
export const galeria: ItemGaleria[] = [
  {
    id: 'fachada',
    titulo: 'Fachada e entrada',
    descricao: 'A chegada ao Instituto Visage, no bairro Sobradinho.',
    icone: Building2,
    foto: {
      src: fachada,
      alt: 'Fachada do Instituto Visage: prédio com painel azul, totem vertical com a marca e vagas de estacionamento em frente à entrada.',
      largura: 382,
      altura: 510,
    },
  },
  {
    id: 'recepcao',
    titulo: 'Recepção',
    descricao: 'Um espaço tranquilo para esperar com conforto.',
    icone: Armchair,
    foto: {
      src: recepcao,
      alt: 'Sala de espera do Instituto Visage, com poltronas claras, mesa de centro com arranjo de flores, espelho redondo e quadros na parede.',
      largura: 382,
      altura: 510,
    },
  },
  {
    id: 'consultorio',
    titulo: 'Consultório odontológico',
    descricao: 'O espaço onde cada atendimento acontece.',
    icone: Microscope,
    foto: {
      src: consultorio,
      alt: 'Consultório odontológico com cadeira, refletor e equipo, e a marca do Instituto Visage aplicada na parede.',
      largura: 382,
      altura: 510,
    },
  },
  {
    id: 'atendimento',
    titulo: 'Balcão de atendimento',
    descricao: 'O primeiro contato com a equipe, logo na entrada.',
    icone: ConciergeBell,
    foto: {
      src: balcao,
      alt: 'Balcão de atendimento do Instituto Visage, com a marca na parede, espelho redondo e aparador ao fundo.',
      largura: 382,
      altura: 510,
    },
  },
  {
    id: 'circulacao',
    titulo: 'Circulação',
    descricao: 'Ambientes claros, ligando a recepção às salas de atendimento.',
    icone: Footprints,
    foto: {
      src: circulacao,
      alt: 'Área de circulação da clínica, com escada, poltronas de espera e mesa lateral com flores.',
      largura: 382,
      altura: 510,
    },
  },
  {
    id: 'sala-atendimento',
    titulo: 'Sala de atendimento',
    descricao: 'Mais um consultório preparado para receber você.',
    icone: Microscope,
    foto: {
      src: salaAtendimento,
      alt: 'Segundo consultório odontológico, com cadeira, equipo e janela com luz natural.',
      largura: 382,
      altura: 510,
    },
  },
]

/**
 * Fotografia do ambiente da clínica para a seção institucional. Enquanto
 * for `null`, a seção exibe uma composição com a marca no lugar da imagem.
 */
export const fotoAmbiente: Foto | null = null
