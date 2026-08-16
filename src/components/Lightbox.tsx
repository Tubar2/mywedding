import { useEffect } from 'react'
import './Lightbox.css'

interface LightboxProps {
  src: string
  alt: string
  onClose: () => void
}

function Lightbox({ src, alt, onClose }: LightboxProps) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <div className="lightbox" onClick={onClose}>
      <button className="lightbox__close" aria-label="Fechar" onClick={onClose}>
        ×
      </button>
      <img className="lightbox__image" src={src} alt={alt} />
    </div>
  )
}

export default Lightbox
