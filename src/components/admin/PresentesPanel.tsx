import { useEffect, useState, type FormEvent } from 'react'
import { supabase } from '../../lib/supabase'
import { CATEGORIAS, type Presente, type StatusPresente } from '../../data/presentes'
import './PresentesPanel.css'

function PresentesPanel() {
  const [presentes, setPresentes] = useState<Presente[]>([])
  const [carregando, setCarregando] = useState(true)
  const [mostrarForm, setMostrarForm] = useState(false)
  const [nome, setNome] = useState('')
  const [categoria, setCategoria] = useState<string>(CATEGORIAS[0])
  const [linksTexto, setLinksTexto] = useState('')

  useEffect(() => {
    carregar()
  }, [])

  async function carregar() {
    setCarregando(true)
    const { data } = await supabase
      .from('presentes')
      .select('id, nome, categoria, links, status, reservado_por')
      .order('nome')
    setPresentes(data ?? [])
    setCarregando(false)
  }

  async function criarPresente(event: FormEvent) {
    event.preventDefault()
    if (!nome.trim()) return

    const links = linksTexto
      .split('\n')
      .map((linha) => linha.trim())
      .filter(Boolean)

    await supabase.from('presentes').insert({
      nome: nome.trim(),
      categoria,
      links,
    })

    setNome('')
    setLinksTexto('')
    setMostrarForm(false)
    carregar()
  }

  async function excluirPresente(presente: Presente) {
    if (!confirm(`Excluir "${presente.nome}" da lista?`)) return
    await supabase.from('presentes').delete().eq('id', presente.id)
    carregar()
  }

  async function alterarStatus(presente: Presente, status: StatusPresente) {
    await supabase
      .from('presentes')
      .update({
        status,
        reservado_por: status === 'disponivel' ? null : presente.reservado_por,
      })
      .eq('id', presente.id)
    carregar()
  }

  return (
    <div className="presentes-panel">
      <button
        className="presentes-panel__nova-btn"
        onClick={() => setMostrarForm((v) => !v)}
      >
        {mostrarForm ? 'Cancelar' : '+ Novo presente'}
      </button>

      {mostrarForm && (
        <form className="presentes-panel__form" onSubmit={criarPresente}>
          <label>
            Nome do presente
            <input
              type="text"
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              required
            />
          </label>
          <label>
            Categoria
            <select
              value={categoria}
              onChange={(event) => setCategoria(event.target.value)}
            >
              {CATEGORIAS.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </label>
          <label>
            Links de lojas (um por linha, opcional)
            <textarea
              value={linksTexto}
              onChange={(event) => setLinksTexto(event.target.value)}
              rows={3}
            />
          </label>
          <button type="submit">Adicionar</button>
        </form>
      )}

      {carregando && <p>Carregando...</p>}

      <div className="presentes-panel__lista">
        {presentes.map((presente) => (
          <article key={presente.id} className="presentes-panel__item">
            <div>
              <p className="presentes-panel__nome">{presente.nome}</p>
              <p className="presentes-panel__meta">
                {presente.categoria}
                {presente.reservado_por &&
                  ` · ${presente.status === 'comprado' ? 'Comprado' : 'Reservado'} por ${presente.reservado_por}`}
              </p>
            </div>
            <div className="presentes-panel__acoes">
              <select
                value={presente.status}
                onChange={(event) =>
                  alterarStatus(
                    presente,
                    event.target.value as StatusPresente,
                  )
                }
              >
                <option value="disponivel">Disponível</option>
                <option value="reservado">Reservado</option>
                <option value="comprado">Comprado</option>
              </select>
              <button
                className="presentes-panel__excluir"
                onClick={() => excluirPresente(presente)}
              >
                Excluir
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default PresentesPanel
