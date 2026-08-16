import type { Local } from '../data/locais'
import './InfoSection.css'

interface InfoSectionProps {
  local: Local
  imagem: string
}

function InfoSection({ local, imagem }: InfoSectionProps) {
  const mapaSrc = `https://www.google.com/maps?q=${encodeURIComponent(local.mapaQuery)}&output=embed`
  const mapaLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(local.mapaQuery)}`

  return (
    <article className="info-section">
      <h2 className="info-section__title">{local.titulo}</h2>
      <p className="info-section__intro">{local.introducao}</p>

      <div className="info-section__card">
        <img
          className="info-section__image"
          src={imagem}
          alt={local.nomeLocal}
        />

        <div className="info-section__details">
          <h3 className="info-section__local-name">{local.nomeLocal}</h3>
          <p className="info-section__datetime">{local.dataHora}</p>

          {local.descricao.map((paragrafo) => (
            <p className="info-section__text" key={paragrafo}>
              {paragrafo}
            </p>
          ))}
        </div>
      </div>

      <iframe
        className="info-section__map"
        title={`Mapa - ${local.nomeLocal}`}
        src={mapaSrc}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      <a
        className="info-section__map-link"
        href={mapaLink}
        target="_blank"
        rel="noreferrer"
      >
        Ver no mapa
      </a>
    </article>
  )
}

export default InfoSection
