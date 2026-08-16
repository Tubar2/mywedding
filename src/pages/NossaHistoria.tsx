import { useState } from 'react'
import Lightbox from '../components/Lightbox'
import { historiaParagrafos } from '../data/historia'
import foto1 from '../assets/images/historia/foto-1.jpg'
import foto2 from '../assets/images/historia/foto-2.jpg'
import foto3 from '../assets/images/historia/foto-3.jpg'
import foto4 from '../assets/images/historia/foto-4.jpg'
import './NossaHistoria.css'

const fotos = [foto1, foto2, foto3, foto4]

function NossaHistoria() {
  const [selecionada, setSelecionada] = useState<number | null>(null)

  return (
    <main className="historia">
      <h1 className="historia__title">Nossa História</h1>

      <div className="historia__text">
        {historiaParagrafos.map((paragrafo) => (
          <p key={paragrafo}>{paragrafo}</p>
        ))}
      </div>

      <div className="historia__gallery">
        {fotos.map((foto, index) => (
          <button
            key={foto}
            className="historia__photo-button"
            onClick={() => setSelecionada(index)}
            aria-label="Ampliar foto"
          >
            <img
              className="historia__photo"
              src={foto}
              alt={`Laiana & Ricardo ${index + 1}`}
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {selecionada !== null && (
        <Lightbox
          src={fotos[selecionada]}
          alt={`Laiana & Ricardo ${selecionada + 1}`}
          onClose={() => setSelecionada(null)}
        />
      )}
    </main>
  )
}

export default NossaHistoria
