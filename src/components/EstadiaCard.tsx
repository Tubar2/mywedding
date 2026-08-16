import { CERIMONIA_ENDERECO, type Estadia } from '../data/estadias'
import './EstadiaCard.css'

interface EstadiaCardProps {
  estadia: Estadia
}

function EstadiaCard({ estadia }: EstadiaCardProps) {
  const rotaLink = estadia.mapaQuery
    ? `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
        estadia.mapaQuery,
      )}&destination=${encodeURIComponent(CERIMONIA_ENDERECO)}&travelmode=driving`
    : null

  return (
    <article className="estadia-card">
      <span className="estadia-card__tag">
        {estadia.categoria === 'hotel' ? 'Hotel' : 'Airbnb'}
      </span>

      <h3 className="estadia-card__nome">{estadia.nome}</h3>
      <p className="estadia-card__valor">{estadia.valor}</p>
      <p className="estadia-card__detalhe">{estadia.detalhe}</p>

      {estadia.descricao && (
        <p className="estadia-card__descricao">{estadia.descricao}</p>
      )}

      {estadia.distancia && (
        <p className="estadia-card__distancia">{estadia.distancia}</p>
      )}

      {estadia.obs && <p className="estadia-card__obs">{estadia.obs}</p>}

      <div className="estadia-card__links">
        <a
          className="estadia-card__link"
          href={estadia.site}
          target="_blank"
          rel="noreferrer"
        >
          {estadia.categoria === 'hotel' ? 'Ver site' : 'Ver no Airbnb'}
        </a>

        {rotaLink && (
          <a
            className="estadia-card__link estadia-card__link--rota"
            href={rotaLink}
            target="_blank"
            rel="noreferrer"
          >
            Rota até a cerimônia
          </a>
        )}
      </div>
    </article>
  )
}

export default EstadiaCard
