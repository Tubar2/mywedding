import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import type { Recado } from '../../data/recados'
import './RecadosPanel.css'

function RecadosPanel() {
  const [recados, setRecados] = useState<Recado[]>([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    carregarRecados()
  }, [])

  async function carregarRecados() {
    setCarregando(true)
    const { data } = await supabase
      .from('recados')
      .select('id, nome, mensagem, aprovado, created_at')
      .order('created_at', { ascending: false })
    setRecados(data ?? [])
    setCarregando(false)
  }

  async function alternarAprovacao(recado: Recado) {
    await supabase
      .from('recados')
      .update({ aprovado: !recado.aprovado })
      .eq('id', recado.id)
    carregarRecados()
  }

  async function excluirRecado(recado: Recado) {
    if (!confirm(`Excluir a mensagem de ${recado.nome}?`)) return
    await supabase.from('recados').delete().eq('id', recado.id)
    carregarRecados()
  }

  const pendentes = recados.filter((recado) => !recado.aprovado)
  const aprovados = recados.filter((recado) => recado.aprovado)

  return (
    <div className="recados-panel">
      {carregando && <p>Carregando...</p>}

      <section>
        <h2>Pendentes ({pendentes.length})</h2>
        {pendentes.length === 0 && <p>Nenhum recado pendente.</p>}
        {pendentes.map((recado) => (
          <article key={recado.id} className="recados-panel__item">
            <p className="recados-panel__mensagem">{recado.mensagem}</p>
            <p className="recados-panel__nome">
              {recado.nome} ·{' '}
              {new Date(recado.created_at).toLocaleDateString('pt-BR')}
            </p>
            <div className="recados-panel__acoes">
              <button onClick={() => alternarAprovacao(recado)}>
                Aprovar
              </button>
              <button
                className="recados-panel__excluir"
                onClick={() => excluirRecado(recado)}
              >
                Excluir
              </button>
            </div>
          </article>
        ))}
      </section>

      <section>
        <h2>Aprovados ({aprovados.length})</h2>
        {aprovados.map((recado) => (
          <article key={recado.id} className="recados-panel__item">
            <p className="recados-panel__mensagem">{recado.mensagem}</p>
            <p className="recados-panel__nome">
              {recado.nome} ·{' '}
              {new Date(recado.created_at).toLocaleDateString('pt-BR')}
            </p>
            <div className="recados-panel__acoes">
              <button onClick={() => alternarAprovacao(recado)}>
                Reprovar
              </button>
              <button
                className="recados-panel__excluir"
                onClick={() => excluirRecado(recado)}
              >
                Excluir
              </button>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}

export default RecadosPanel
