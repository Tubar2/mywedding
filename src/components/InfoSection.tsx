import type { Local, LocalExtraIcone } from '../data/locais'
import './InfoSection.css'

interface InfoSectionProps {
  local: Local
  imagem: string
}

const icones: Record<LocalExtraIcone, JSX.Element> = {
  'dress-code': (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path
        d="M20 15.5c-1.6-2-4.3-4-8.4-4.3-1.5-.1-2.6 1-2.6 2.5v12.6c0 1.5 1.1 2.6 2.6 2.5 4.1-.3 6.8-2.3 8.4-4.3M20 15.5c1.6-2 4.3-4 8.4-4.3 1.5-.1 2.6 1 2.6 2.5v12.6c0 1.5-1.1 2.6-2.6 2.5-4.1-.3-6.8-2.3-8.4-4.3M20 15.5V24.7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx="20" cy="20" r="1.7" fill="currentColor" />
    </svg>
  ),
  estacionamento: (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect
        x="9"
        y="8"
        width="22"
        height="24"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M16 27V13h5.2a4 4 0 0 1 0 8H16"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  ),
}

function renderComNegrito(texto: string) {
  return texto.split(/(\*[^*]+\*)/g).map((parte, index) =>
    parte.startsWith('*') && parte.endsWith('*') ? (
      <strong key={index}>{parte.slice(1, -1)}</strong>
    ) : (
      parte
    )
  )
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

      {local.extras.length > 0 && (
        <div className="info-section__extras">
          {local.extras.map((extra) => (
            <div className="info-section__extra" key={extra.titulo}>
              <div className="info-section__extra-icon">
                {icones[extra.icone]}
              </div>
              <h3 className="info-section__extra-title">{extra.titulo}</h3>
              {extra.paragrafos.map((paragrafo) => (
                <p className="info-section__text" key={paragrafo}>
                  {renderComNegrito(paragrafo)}
                </p>
              ))}
              {extra.cores && (
                <div className="info-section__swatches">
                  {extra.cores.map((cor) => (
                    <div className="info-section__swatch" key={cor.label}>
                      <span
                        className="info-section__swatch-dot"
                        style={{ backgroundColor: cor.hex }}
                      />
                      {cor.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

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
