import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Recado } from '../data/recados'
import RecadoForm from '../components/RecadoForm'
import RecadoCard from '../components/RecadoCard'
import './Recados.css'

function Recados() {
  const [recados, setRecados] = useState<Recado[] | null>(null)

  useEffect(() => {
    let ativo = true

    supabase
      .from('recados')
      .select('id, nome, mensagem, aprovado, created_at')
      .eq('aprovado', true)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (ativo) setRecados(data ?? [])
      })

    return () => {
      ativo = false
    }
  }, [])

  return (
    <main className="recados">
      <h1 className="recados__title">Deixe uma mensagem</h1>
      <p className="recados__subtitle">
        Vamos adorar ler cada recadinho de vocês 💛
      </p>

      <RecadoForm />

      <h2 className="recados__lista-title">Mensagens recebidas</h2>

      {recados === null && (
        <p className="recados__estado">Carregando mensagens...</p>
      )}

      {recados !== null && recados.length === 0 && (
        <p className="recados__estado">
          Ainda não há mensagens por aqui. Seja a primeira pessoa a deixar
          uma!
        </p>
      )}

      {recados !== null && recados.length > 0 && (
        <div className="recados__lista">
          {recados.map((recado) => (
            <RecadoCard key={recado.id} recado={recado} />
          ))}
        </div>
      )}
    </main>
  )
}

export default Recados
