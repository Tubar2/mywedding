import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { CATEGORIAS, PIX_KEY, type Presente } from '../data/presentes'
import PresenteCard from '../components/PresenteCard'
import './Presentes.css'

function Presentes() {
  const [presentes, setPresentes] = useState<Presente[] | null>(null)
  const [categoria, setCategoria] = useState<string>('Todas')
  const [pixCopiado, setPixCopiado] = useState(false)

  useEffect(() => {
    carregarPresentes()
  }, [])

  async function carregarPresentes() {
    const { data } = await supabase
      .from('presentes')
      .select('id, nome, categoria, links, status, reservado_por')
      .order('nome')
    setPresentes(data ?? [])
  }

  function copiarComFallback(texto: string) {
    const textarea = document.createElement('textarea')
    textarea.value = texto
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.focus()
    textarea.select()
    try {
      document.execCommand('copy')
    } finally {
      document.body.removeChild(textarea)
    }
  }

  async function copiarPix() {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(PIX_KEY)
      } else {
        copiarComFallback(PIX_KEY)
      }
    } catch {
      copiarComFallback(PIX_KEY)
    }

    setPixCopiado(true)
    setTimeout(() => setPixCopiado(false), 2000)
  }

  const listaFiltrada =
    presentes && categoria !== 'Todas'
      ? presentes.filter((p) => p.categoria === categoria)
      : presentes

  return (
    <main className="presentes">
      <h1 className="presentes__title">Lista de Presentes</h1>

      <div className="presentes__intro">
        <p>
          Hoje, nossa casa já tem tudo o que precisamos, e o mais importante
          para nós é ter você com a gente nesse dia tão especial. 💛
        </p>
        <p className="presentes__intro-italico">
          Mas, para quem quiser nos presentear, separamos algumas opções que
          têm a nossa cara e que podem ajudar na escolha.
        </p>
        <p>
          Para quem preferir nos presentear de uma forma mais livre, também
          deixaremos nossa <em>chave Pix</em>. Toda contribuição será
          recebida com muito carinho e fará parte dos nossos próximos
          capítulos juntos. 💛
        </p>
        <p>
          E, claro, se você quiser nos presentear com algo que não esteja na
          lista, fique à vontade! O mais importante é o carinho por trás do
          presente.
        </p>
      </div>

      {PIX_KEY && (
        <div className="presentes__pix">
          <p className="presentes__pix-label">Chave Pix</p>
          <div className="presentes__pix-linha">
            <code>{PIX_KEY}</code>
            <button onClick={copiarPix}>
              {pixCopiado ? 'Copiado!' : 'Copiar'}
            </button>
          </div>
        </div>
      )}

      <div className="presentes__info">
        <h2 className="presentes__info-title">
          Algumas informações que podem ajudar
        </h2>
        <ul className="presentes__info-lista">
          <li>
            🏠 <strong>Voltagem:</strong> 110V — também temos uma tomada 220V
            na lavanderia
          </li>
          <li>
            🛏️ <strong>Quarto do casal:</strong> cama Queen
          </li>
          <li>
            🛏️ <strong>Quarto de hóspedes:</strong> duas camas de solteiro
          </li>
        </ul>
      </div>

      <p className="presentes__sugestao">
        A lista é apenas uma sugestão — escolha o que fizer sentido para
        você! 💛
      </p>

      <div className="presentes__filtros">
        <button
          className={`presentes__filtro ${categoria === 'Todas' ? 'presentes__filtro--ativo' : ''}`}
          onClick={() => setCategoria('Todas')}
        >
          Todas
        </button>
        {CATEGORIAS.map((cat) => (
          <button
            key={cat}
            className={`presentes__filtro ${categoria === cat ? 'presentes__filtro--ativo' : ''}`}
            onClick={() => setCategoria(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {listaFiltrada === null && (
        <p className="presentes__estado">Carregando presentes...</p>
      )}

      {listaFiltrada !== null && listaFiltrada.length === 0 && (
        <p className="presentes__estado">
          Nenhum presente encontrado nessa categoria.
        </p>
      )}

      {listaFiltrada !== null && listaFiltrada.length > 0 && (
        <div className="presentes__grid">
          {listaFiltrada.map((presente) => (
            <PresenteCard
              key={presente.id}
              presente={presente}
              onAtualizado={carregarPresentes}
            />
          ))}
        </div>
      )}
    </main>
  )
}

export default Presentes
