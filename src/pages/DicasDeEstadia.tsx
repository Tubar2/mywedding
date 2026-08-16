import { useMemo, useState } from 'react'
import EstadiaCard from '../components/EstadiaCard'
import { estadias, type CategoriaEstadia } from '../data/estadias'
import './DicasDeEstadia.css'

type Filtro = 'todos' | CategoriaEstadia

const filtros: { valor: Filtro; label: string }[] = [
  { valor: 'todos', label: 'Todos' },
  { valor: 'hotel', label: 'Hotéis' },
  { valor: 'airbnb', label: 'Airbnb' },
]

function DicasDeEstadia() {
  const [filtro, setFiltro] = useState<Filtro>('todos')

  const listaFiltrada = useMemo(
    () =>
      filtro === 'todos'
        ? estadias
        : estadias.filter((estadia) => estadia.categoria === filtro),
    [filtro],
  )

  return (
    <main className="estadia">
      <h1 className="estadia__title">Dicas de Estadia</h1>
      <p className="estadia__subtitle">Hospedagens em Piracaia e arredores</p>

      <div className="estadia__intro">
        <p>
          Como sabemos que o casamento será no interior de São Paulo, muitos
          de vocês virão de outras cidades.
        </p>
        <p>
          Para facilitar, reunimos algumas opções de hospedagem próximas ao
          local do evento.
        </p>
        <p>
          As sugestões abaixo são apenas um guia, fiquem à vontade para
          escolher o que for mais conveniente 💛
        </p>
      </div>

      <div className="estadia__filtros">
        {filtros.map((item) => (
          <button
            key={item.valor}
            className={`estadia__filtro ${
              filtro === item.valor ? 'estadia__filtro--ativo' : ''
            }`}
            onClick={() => setFiltro(item.valor)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="estadia__grid">
        {listaFiltrada.map((estadiaItem) => (
          <EstadiaCard key={estadiaItem.nome} estadia={estadiaItem} />
        ))}
      </div>
    </main>
  )
}

export default DicasDeEstadia
