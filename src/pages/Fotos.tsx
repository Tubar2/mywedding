import { useMemo, useState } from 'react'
import Lightbox from '../components/Lightbox'
import './Fotos.css'

interface ParFoto {
  base: string
  thumb: string
  full: string
}

const modulosThumb = import.meta.glob('../assets/images/fotos/*-thumb.webp', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const modulosFull = import.meta.glob('../assets/images/fotos/*-full.webp', {
  eager: true,
  import: 'default',
}) as Record<string, string>

function extrairBase(caminho: string, sufixo: string) {
  const arquivo = caminho.split('/').pop() ?? ''
  return arquivo.replace(sufixo, '')
}

function montarFotos(): ParFoto[] {
  const thumbsPorBase = new Map<string, string>()
  for (const [caminho, url] of Object.entries(modulosThumb)) {
    thumbsPorBase.set(extrairBase(caminho, '-thumb.webp'), url)
  }

  const fullsPorBase = new Map<string, string>()
  for (const [caminho, url] of Object.entries(modulosFull)) {
    fullsPorBase.set(extrairBase(caminho, '-full.webp'), url)
  }

  const bases = [...thumbsPorBase.keys()].filter((base) => fullsPorBase.has(base))
  bases.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

  return bases.map((base) => ({
    base,
    thumb: thumbsPorBase.get(base)!,
    full: fullsPorBase.get(base)!,
  }))
}

function Fotos() {
  const fotos = useMemo(montarFotos, [])
  const [selecionada, setSelecionada] = useState<number | null>(null)

  const total = fotos.length

  return (
    <main className="fotos">
      <h1 className="fotos__title">Fotos</h1>
      <p className="fotos__subtitle">Alguns registros do nosso pré-wedding.</p>

      {total === 0 && (
        <p className="fotos__vazio">As fotos serão adicionadas em breve.</p>
      )}

      <div className="fotos__grid">
        {fotos.map((foto, index) => (
          <button
            key={foto.base}
            className="fotos__photo-button"
            onClick={() => setSelecionada(index)}
            aria-label="Ampliar foto"
          >
            <img
              className="fotos__photo"
              src={foto.thumb}
              alt={`Laiana & Ricardo — foto ${index + 1}`}
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {selecionada !== null && (
        <Lightbox
          src={fotos[selecionada].full}
          alt={`Laiana & Ricardo — foto ${selecionada + 1}`}
          onClose={() => setSelecionada(null)}
          onPrev={() => setSelecionada((selecionada - 1 + total) % total)}
          onNext={() => setSelecionada((selecionada + 1) % total)}
          counter={`${selecionada + 1} / ${total}`}
        />
      )}
    </main>
  )
}

export default Fotos
