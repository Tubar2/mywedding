import sharp from 'sharp'
import { readdirSync, statSync, unlinkSync } from 'fs'
import { join, extname, basename } from 'path'

const ORIGEM = new URL('../iCasei/fotos/', import.meta.url).pathname
const DESTINO = new URL('../src/assets/images/fotos/', import.meta.url).pathname

const EXTENSOES_VALIDAS = ['.jpg', '.jpeg', '.png', '.heic', '.webp']

const THUMB = { width: 700, quality: 78 }
const FULL = { width: 1920, quality: 82 }

function listarOrigens() {
  return readdirSync(ORIGEM)
    .filter((nome) => EXTENSOES_VALIDAS.includes(extname(nome).toLowerCase()))
    .sort()
}

function nomeBase(nomeArquivo) {
  return basename(nomeArquivo, extname(nomeArquivo))
}

async function processar(nomeArquivo) {
  const origem = join(ORIGEM, nomeArquivo)
  const base = nomeBase(nomeArquivo)

  const destinoThumb = join(DESTINO, `${base}-thumb.webp`)
  const destinoFull = join(DESTINO, `${base}-full.webp`)

  await sharp(origem)
    .resize({ width: THUMB.width })
    .webp({ quality: THUMB.quality })
    .toFile(destinoThumb)

  await sharp(origem)
    .resize({ width: FULL.width, withoutEnlargement: true })
    .webp({ quality: FULL.quality })
    .toFile(destinoFull)

  return [destinoThumb, destinoFull]
}

function removerOrfaos(basesValidas) {
  const existentes = readdirSync(DESTINO).filter((nome) => nome.endsWith('.webp'))

  for (const nome of existentes) {
    const base = nome.replace(/-thumb\.webp$|-full\.webp$/, '')
    if (!basesValidas.has(base)) {
      unlinkSync(join(DESTINO, nome))
      console.log(`Removido órfão: ${nome}`)
    }
  }
}

async function main() {
  const origens = listarOrigens()

  if (origens.length === 0) {
    console.log(`Nenhuma foto encontrada em ${ORIGEM}`)
    console.log('Coloque as fotos originais lá e rode este script de novo.')
    return
  }

  const basesValidas = new Set(origens.map(nomeBase))
  removerOrfaos(basesValidas)

  let totalBytes = 0
  const gerados = []

  for (const nomeArquivo of origens) {
    const arquivos = await processar(nomeArquivo)
    for (const arquivo of arquivos) {
      totalBytes += statSync(arquivo).size
      gerados.push(arquivo)
    }
    console.log(`✓ ${nomeArquivo}`)
  }

  console.log(`\n${origens.length} fotos processadas, ${gerados.length} arquivos gerados.`)
  console.log(`Tamanho total: ${(totalBytes / 1024 / 1024).toFixed(2)} MB`)
}

main()
