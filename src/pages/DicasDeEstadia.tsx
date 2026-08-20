import { useMemo, useState } from 'react'
import EstadiaCard from '../components/EstadiaCard'
import { estadias, CERIMONIA_ENDERECO, type CategoriaEstadia } from '../data/estadias'
import './DicasDeEstadia.css'

type Filtro = 'todos' | CategoriaEstadia

const filtros: { valor: Filtro; label: string }[] = [
  { valor: 'todos', label: 'Todos' },
  { valor: 'hotel', label: 'Hotéis' },
  { valor: 'airbnb', label: 'Airbnb' },
]

interface Aeroporto {
  nome: string
  sigla: string
  tempoEstimado: string
  origem: string
}

const aeroportos: Aeroporto[] = [
  {
    nome: 'Aeroporto Internacional de Guarulhos',
    sigla: 'GRU',
    tempoEstimado: '≈ 1h a 1h20 sem trânsito',
    origem: 'Aeroporto Internacional de Guarulhos, GRU',
  },
  {
    nome: 'Aeroporto Internacional de Viracopos',
    sigla: 'VCP',
    tempoEstimado: '≈ 1h20 a 1h40 sem trânsito',
    origem: 'Aeroporto Internacional de Viracopos, VCP',
  },
  {
    nome: 'Aeroporto de Congonhas',
    sigla: 'CGH',
    tempoEstimado: '≈ 1h40 a 2h sem trânsito',
    origem: 'Aeroporto de Congonhas, CGH',
  },
]

function linkRota(origem: string) {
  return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
    origem,
  )}&destination=${encodeURIComponent(CERIMONIA_ENDERECO)}&travelmode=driving`
}

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
          local do evento. As sugestões abaixo são apenas um guia, então
          fiquem à vontade para escolher o que for mais conveniente para
          vocês. 💛
        </p>
      </div>

      <div className="estadia__aviao">
        <h2 className="estadia__aviao-title">✈️ Para quem vem de avião</h2>
        <p>Os aeroportos mais indicados são:</p>

        <ul className="estadia__aviao-lista">
          {aeroportos.map((aeroporto) => (
            <li key={aeroporto.sigla} className="estadia__aviao-item">
              <div>
                <span className="estadia__aviao-nome">
                  {aeroporto.nome} ({aeroporto.sigla})
                </span>
                <span className="estadia__aviao-tempo">
                  {aeroporto.tempoEstimado}
                </span>
              </div>
              <a
                className="estadia__aviao-rota"
                href={linkRota(aeroporto.origem)}
                target="_blank"
                rel="noreferrer"
              >
                Ver rota
              </a>
            </li>
          ))}
        </ul>

        <p className="estadia__aviao-obs">
          Tempos estimados sem trânsito — a partir dos aeroportos, é possível
          seguir de carro ou por aplicativo de transporte até Piracaia.
        </p>
        <p>
          Esperamos que essas informações ajudem a tornar a viagem até o
          nosso grande dia mais tranquila! 🤍
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
