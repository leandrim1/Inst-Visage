import fotosDaPasta from 'virtual:casos'

/**
 * Seção "Sorrisos do Instituto Visage".
 *
 * O QUE PODE APARECER AQUI
 * Somente retratos individuais de pacientes. Nada de imagens de "antes e
 * depois" nem de comparações lado a lado: o Código de Ética Odontológica
 * (Res. CFO-118/2012, art. 44) veda esse formato em publicidade
 * odontológica. Retrato isolado é permitido.
 *
 * O QUE AINDA É PRECISO ANTES DE PUBLICAR
 * Autorização de uso de imagem assinada por cada paciente (LGPD e CFO).
 * Confirme com a clínica que todas as autorizações existem antes de o
 * site ir ao ar; na dúvida, desligue `MOSTRAR_CASOS`.
 *
 * ONDE FICAM AS IMAGENS
 * Em `src/assets/casos/`, que está no `.gitignore`: são rostos
 * identificáveis e o repositório é público. Veja
 * `src/assets/casos/LEIA-ME.md`.
 *
 * O módulo `virtual:casos` (definido em `vite/casos.ts`) lê a pasta em
 * tempo de build e já devolve as dimensões de cada arquivo, para a grade
 * reservar o espaço certo e não saltar enquanto as imagens carregam.
 *
 * Com a pasta vazia, `casosDisponiveis` fica vazio e a seção não é
 * renderizada — o resto do site continua funcionando normalmente.
 */

/** Chave única para ligar e desligar a seção inteira. */
export const MOSTRAR_CASOS = true

export interface Caso {
  src: string
  largura: number
  altura: number
  /** Descrição neutra: o site não afirma diagnóstico nem resultado. */
  alt: string
}

export const casosDisponiveis: Caso[] = fotosDaPasta.map((foto, indice) => ({
  ...foto,
  alt: `Retrato de paciente atendido no Instituto Visage (${indice + 1} de ${
    fotosDaPasta.length
  }).`,
}))
