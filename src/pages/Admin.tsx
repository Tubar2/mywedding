import { useEffect, useState, type FormEvent } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import RecadosPanel from '../components/admin/RecadosPanel'
import FamiliasPanel from '../components/admin/FamiliasPanel'
import './Admin.css'

type Aba = 'recados' | 'familias'

function Admin() {
  const [session, setSession] = useState<Session | null | undefined>(
    undefined,
  )
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erroLogin, setErroLogin] = useState('')
  const [aba, setAba] = useState<Aba>('familias')

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, novaSessao) => setSession(novaSessao),
    )

    return () => listener.subscription.unsubscribe()
  }, [])

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

  if (session === undefined) {
    return <main className="admin" />
  }

  if (!session) {
    return (
      <main className="admin">
        <h1 className="admin__title">Login</h1>
        <form className="admin__login" onSubmit={handleLogin}>
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
          {erroLogin && <p className="admin__erro">{erroLogin}</p>}
        </form>
      </main>
    )
  }

  return (
    <main className="admin">
      <div className="admin__header">
        <h1 className="admin__title">Painel</h1>
        <button className="admin__logout" onClick={handleLogout}>
          Sair
        </button>
      </div>

      <div className="admin__tabs">
        <button
          className={`admin__tab ${aba === 'familias' ? 'admin__tab--ativa' : ''}`}
          onClick={() => setAba('familias')}
        >
          Famílias (RSVP)
        </button>
        <button
          className={`admin__tab ${aba === 'recados' ? 'admin__tab--ativa' : ''}`}
          onClick={() => setAba('recados')}
        >
          Recados
        </button>
      </div>

      {aba === 'familias' ? <FamiliasPanel /> : <RecadosPanel />}
    </main>
  )
}

export default Admin
