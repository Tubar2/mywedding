import InfoSection from '../components/InfoSection'
import { locais } from '../data/locais'
import cerimoniaLocal from '../assets/images/cerimonia-local.jpg'
import './Informacoes.css'

const imagens: Record<string, string> = {
  'cerimonia-local': cerimoniaLocal,
}

function Informacoes() {
  return (
    <main className="informacoes">
      {locais.map((local) => (
        <InfoSection
          key={local.slug}
          local={local}
          imagem={imagens[local.imagem]}
        />
      ))}
    </main>
  )
}

export default Informacoes
