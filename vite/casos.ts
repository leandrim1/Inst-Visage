import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

import type { Plugin } from 'vite'

/**
 * Expõe as fotos de `src/assets/casos/` como um módulo virtual que já traz
 * as dimensões de cada arquivo.
 *
 * Isso existe porque `import.meta.glob` devolve só a URL do arquivo. Sem
 * `width` e `height`, o navegador não sabe quanta altura reservar e o
 * layout salta enquanto as imagens carregam. Lendo o cabeçalho de cada
 * arquivo em tempo de build, a galeria continua sendo "jogue os arquivos
 * na pasta e pronto", mas sem deslocamento de layout.
 */

const ID_VIRTUAL = 'virtual:casos'
const ID_RESOLVIDO = '\0' + ID_VIRTUAL
const EXTENSOES = /\.(jpe?g|png|webp)$/i

export interface Dimensoes {
  largura: number
  altura: number
}

/** Lê largura e altura do cabeçalho, sem decodificar a imagem inteira. */
export function lerDimensoes(buffer: Buffer): Dimensoes | null {
  // PNG: assinatura de 8 bytes seguida do bloco IHDR.
  if (buffer.length > 24 && buffer.toString('ascii', 12, 16) === 'IHDR') {
    return { largura: buffer.readUInt32BE(16), altura: buffer.readUInt32BE(20) }
  }

  // RIFF/WebP: o formato real vem no bloco seguinte ao cabeçalho.
  if (buffer.length > 30 && buffer.toString('ascii', 0, 4) === 'RIFF') {
    const formato = buffer.toString('ascii', 12, 16)

    if (formato === 'VP8 ') {
      return {
        largura: buffer.readUInt16LE(26) & 0x3fff,
        altura: buffer.readUInt16LE(28) & 0x3fff,
      }
    }

    if (formato === 'VP8L') {
      const bits = buffer.readUInt32LE(21)
      return { largura: (bits & 0x3fff) + 1, altura: ((bits >> 14) & 0x3fff) + 1 }
    }

    if (formato === 'VP8X') {
      return {
        largura: buffer.readUIntLE(24, 3) + 1,
        altura: buffer.readUIntLE(27, 3) + 1,
      }
    }
  }

  // JPEG: percorre os marcadores até achar um SOF, que carrega o tamanho.
  if (buffer.length > 4 && buffer.readUInt16BE(0) === 0xffd8) {
    let posicao = 2
    while (posicao + 9 < buffer.length) {
      if (buffer[posicao] !== 0xff) {
        posicao += 1
        continue
      }

      const marcador = buffer[posicao + 1]!
      const ehSOF =
        marcador >= 0xc0 &&
        marcador <= 0xcf &&
        // Tabela de Huffman, aritmética e marcadores de reinício não contam.
        marcador !== 0xc4 &&
        marcador !== 0xc8 &&
        marcador !== 0xcc
      if (ehSOF) {
        return {
          altura: buffer.readUInt16BE(posicao + 5),
          largura: buffer.readUInt16BE(posicao + 7),
        }
      }

      posicao += 2 + buffer.readUInt16BE(posicao + 2)
    }
  }

  return null
}

export function pluginCasos(pasta: string): Plugin {
  const listar = () => {
    let nomes: string[]
    try {
      nomes = readdirSync(pasta)
    } catch {
      // A pasta pode nem existir num checkout limpo.
      return []
    }

    return nomes
      .filter((nome) => EXTENSOES.test(nome))
      .sort((a, b) => a.localeCompare(b, 'pt-BR', { numeric: true }))
      .flatMap((nome) => {
        const caminho = join(pasta, nome)
        const dimensoes = lerDimensoes(readFileSync(caminho))
        if (!dimensoes) {
          // Sem dimensões não dá para reservar o espaço: melhor avisar e pular.
          console.warn(`[casos] dimensões não reconhecidas, arquivo ignorado: ${nome}`)
          return []
        }
        return [{ caminho, ...dimensoes }]
      })
  }

  return {
    name: 'visage:casos',

    resolveId(id) {
      if (id === ID_VIRTUAL) return ID_RESOLVIDO
      return null
    },

    load(id) {
      if (id !== ID_RESOLVIDO) return null

      const arquivos = listar()
      const importacoes = arquivos
        .map((a, i) => `import src${i} from ${JSON.stringify(a.caminho)}`)
        .join('\n')
      const itens = arquivos
        .map((a, i) => `{ src: src${i}, largura: ${a.largura}, altura: ${a.altura} }`)
        .join(',\n  ')

      return `${importacoes}\n\nexport default [\n  ${itens}\n]\n`
    },

    configureServer(servidor) {
      // Acrescentar ou remover uma foto atualiza a página sem reiniciar.
      servidor.watcher.add(pasta)

      const recarregar = (caminho: string) => {
        if (!caminho.startsWith(pasta) || !EXTENSOES.test(caminho)) return
        const modulo = servidor.moduleGraph.getModuleById(ID_RESOLVIDO)
        if (modulo) servidor.moduleGraph.invalidateModule(modulo)
        servidor.ws.send({ type: 'full-reload' })
      }

      servidor.watcher.on('add', recarregar)
      servidor.watcher.on('unlink', recarregar)
    },
  }
}
