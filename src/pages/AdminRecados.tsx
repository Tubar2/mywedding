import { useEffect, useState, type FormEvent } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import type { Recado } from '../data/recados'
import './AdminRecados.css'

function AdminRecados() {
  const [session, setSession] = useState<Session | null | undefined>(
    undefined,
  )
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erroLogin, setErroLogin] = useState('')
  const [recados, setRecados] = useState<Recado[]>([])
  const [carregando, setCarregando] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, novaSessao) => setSession(novaSessao),
    )

    return () => listener.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (session) carregarRecados()
  }, [session])

  async function carregarRecados() {
    setCarregando(true)
    const { data } = await supabase
      .from('recados')
      .select('id, nome, mensagem, aprovado, created_at')
      .order('created_at', { ascending: false })
    setRecados(data ?? [])
    setCarregando(false)
  }

  async function handleLogin(event: FormEvent) {
    event.preventDefault()
    setErroLogin('')
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    })
    if (error) setErroLogin('E-mail ou senha incorretos.')
  }

  async function handleLogout() {
    await supabase.auth.signOut()
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

  if (session === undefined) {
    return <main className="admin-recados" />
  }

  if (!session) {
    return (
      <main className="admin-recados">
        <h1 className="admin-recados__title">Login</h1>
        <form className="admin-recados__login" onSubmit={handleLogin}>
          <label>
            E-mail
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label>
            Senha
            <input
              type="password"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              required
            />
          </label>
          <button type="submit">Entrar</button>
          {erroLogin && <p className="admin-recados__erro">{erroLogin}</p>}
        </form>
      </main>
    )
  }

  const pendentes = recados.filter((recado) => !recado.aprovado)
  const aprovados = recados.filter((recado) => recado.aprovado)

  return (
    <main className="admin-recados">
      <div className="admin-recados__header">
        <h1 className="admin-recados__title">Moderação de recados</h1>
        <button className="admin-recados__logout" onClick={handleLogout}>
          Sair
        </button>
      </div>

      {carregando && <p>Carregando...</p>}

      <section>
        <h2>Pendentes ({pendentes.length})</h2>
        {pendentes.length === 0 && <p>Nenhum recado pendente.</p>}
        {pendentes.map((recado) => (
          <article key={recado.id} className="admin-recados__item">
            <p className="admin-recados__mensagem">{recado.mensagem}</p>
            <p className="admin-recados__nome">
              {recado.nome} ·{' '}
              {new Date(recado.created_at).toLocaleDateString('pt-BR')}
            </p>
            <div className="admin-recados__acoes">
              <button onClick={() => alternarAprovacao(recado)}>
                Aprovar
              </button>
              <button
                className="admin-recados__excluir"
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
          <article key={recado.id} className="admin-recados__item">
            <p className="admin-recados__mensagem">{recado.mensagem}</p>
            <p className="admin-recados__nome">
              {recado.nome} ·{' '}
              {new Date(recado.created_at).toLocaleDateString('pt-BR')}
            </p>
            <div className="admin-recados__acoes">
              <button onClick={() => alternarAprovacao(recado)}>
                Reprovar
              </button>
              <button
                className="admin-recados__excluir"
                onClick={() => excluirRecado(recado)}
              >
                Excluir
              </button>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}

export default AdminRecados
