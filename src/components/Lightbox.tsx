import { useEffect } from 'react'
import './Lightbox.css'

interface LightboxProps {
  src: string
  alt: string
  onClose: () => void
  onPrev?: () => void
  onNext?: () => void
  counter?: string
}

function Lightbox({ src, alt, onClose, onPrev, onNext, counter }: LightboxProps) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') onPrev?.()
      if (event.key === 'ArrowRight') onNext?.()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose, onPrev, onNext])

  return (
    <div className="lightbox" onClick={onClose}>
      <button className="lightbox__close" aria-label="Fechar" onClick={onClose}>
        ×
      </button>

      {onPrev && (
        <button
          className="lightbox__nav lightbox__nav--prev"
          aria-label="Foto anterior"
          onClick={(event) => {
            event.stopPropagation()
            onPrev()
          }}
        >
          ‹
        </button>
      )}

      <img className="lightbox__image" src={src} alt={alt} />

      {onNext && (
        <button
          className="lightbox__nav lightbox__nav--next"
          aria-label="Próxima foto"
          onClick={(event) => {
            event.stopPropagation()
            onNext()
          }}
        >
          ›
        </button>
      )}

      {counter && <span className="lightbox__counter">{counter}</span>}
    </div>
  )
}

export default Lightbox
