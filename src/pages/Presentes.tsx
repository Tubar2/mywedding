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

  async function copiarPix() {
    await navigator.clipboard.writeText(PIX_KEY)
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
          Hoje em casa já temos tudo o que precisamos, e o mais importante
          pra gente é ter você com a gente nesse dia 💛
        </p>
        <p>
          Mesmo assim, sabemos que muita gente gosta de dar um presente, e
          separamos algumas coisinhas que combinam com a gente para ajudar
          na escolha.
        </p>
        <p>
          Também aceitamos qualquer valor via Pix, com o maior carinho. E se
          quiser dar algo que não está na lista, fica à vontade — é só
          entrar em contato com a gente. A lista é só uma sugestão!
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
