import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { Convidado, StatusConvidado } from '../data/rsvp'
import './Rsvp.css'

type Estado = 'carregando' | 'encontrada' | 'nao-encontrada'

interface LinhaRpc {
  familia_id: string
  familia_nome: string
  convidado_id: string
  convidado_nome: string
  status: StatusConvidado
}

const OPCOES: { status: StatusConvidado; label: string }[] = [
  { status: 'confirmado', label: 'Vou! 🎉' },
  { status: 'recusado', label: 'Não vou poder' },
  { status: 'pendente', label: 'Ainda não sei' },
]

function Rsvp() {
  const { codigo } = useParams<{ codigo: string }>()
  const [estado, setEstado] = useState<Estado>('carregando')
  const [nomeFamilia, setNomeFamilia] = useState('')
  const [convidados, setConvidados] = useState<Convidado[]>([])
  const [salvandoId, setSalvandoId] = useState<string | null>(null)

  useEffect(() => {
    if (!codigo) return

    supabase
      .rpc('rsvp_buscar_familia', { p_codigo: codigo })
      .then(({ data, error }: { data: LinhaRpc[] | null; error: unknown }) => {
        if (error || !data || data.length === 0) {
          setEstado('nao-encontrada')
          return
        }

        setNomeFamilia(data[0].familia_nome)
        setConvidados(
          data.map((linha) => ({
            id: linha.convidado_id,
            nome: linha.convidado_nome,
            status: linha.status,
          })),
        )
        setEstado('encontrada')
      })
  }, [codigo])

  async function atualizarStatus(
    convidadoId: string,
    status: StatusConvidado,
  ) {
    if (!codigo) return
    setSalvandoId(convidadoId)

    const { error } = await supabase.rpc('rsvp_atualizar_status', {
      p_codigo: codigo,
      p_convidado_id: convidadoId,
      p_status: status,
    })

    if (!error) {
      setConvidados((atual) =>
        atual.map((c) => (c.id === convidadoId ? { ...c, status } : c)),
      )
    }

    setSalvandoId(null)
  }

  if (estado === 'carregando') {
    return <main className="rsvp" />
  }

  if (estado === 'nao-encontrada') {
    return (
      <main className="rsvp">
        <h1 className="rsvp__title">Convite não encontrado</h1>
        <p className="rsvp__subtitle">
          Este link não é válido. Verifique se copiou o endereço completo do
          convite.
        </p>
      </main>
    )
  }

  return (
    <main className="rsvp">
      <h1 className="rsvp__title">Confirmação de presença</h1>
      <p className="rsvp__subtitle">Família {nomeFamilia}</p>
      <p className="rsvp__instrucao">
        Marque abaixo quem vai poder comparecer. Qualquer pessoa da família
        pode usar este link para atualizar as respostas.
      </p>

      <div className="rsvp__lista">
        {convidados.map((convidado) => (
          <div className="rsvp__convidado" key={convidado.id}>
            <span className="rsvp__nome">{convidado.nome}</span>
            <div className="rsvp__opcoes">
              {OPCOES.map((opcao) => (
                <button
                  key={opcao.status}
                  className={`rsvp__opcao ${
                    convidado.status === opcao.status
                      ? 'rsvp__opcao--ativa'
                      : ''
                  }`}
                  disabled={salvandoId === convidado.id}
                  onClick={() => atualizarStatus(convidado.id, opcao.status)}
                >
                  {opcao.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

export default Rsvp
