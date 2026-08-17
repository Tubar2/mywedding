import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { nomeLoja, type Presente } from '../data/presentes'
import NomeModal from './NomeModal'
import './PresenteCard.css'

interface PresenteCardProps {
  presente: Presente
  onAtualizado: () => void
}

type Acao = 'reservar' | 'comprar' | 'liberar' | null

const NOME_STORAGE_KEY = 'presentes-nome'

function PresenteCard({ presente, onAtualizado }: PresenteCardProps) {
  const [acaoAberta, setAcaoAberta] = useState<Acao>(null)
  const [erro, setErro] = useState('')
  const [salvando, setSalvando] = useState(false)

  async function executar(acao: Acao, nome: string) {
    if (!acao) return
    setSalvando(true)
    setErro('')

    localStorage.setItem(NOME_STORAGE_KEY, nome)

    const rpc =
      acao === 'reservar'
        ? 'presente_reservar'
        : acao === 'comprar'
          ? 'presente_marcar_comprado'
          : 'presente_liberar'

    const { error } = await supabase.rpc(rpc, {
      p_presente_id: presente.id,
      p_nome: nome,
    })

    setSalvando(false)

    if (error) {
      setErro(
        acao === 'liberar'
          ? 'Nome não confere com quem reservou este presente.'
          : 'Não foi possível concluir. Tente novamente.',
      )
      return
    }

    setAcaoAberta(null)
    onAtualizado()
  }

  const nomeSalvo = localStorage.getItem(NOME_STORAGE_KEY) ?? ''

  return (
    <article className={`presente-card presente-card--${presente.status}`}>
      <span className="presente-card__categoria">{presente.categoria}</span>
      <h3 className="presente-card__nome">{presente.nome}</h3>

      {presente.links.length > 0 && (
        <div className="presente-card__lojas">
          {presente.links.map((link, index) => (
            <a
              key={link}
              href={link}
              target="_blank"
              rel="noreferrer"
              className="presente-card__loja"
            >
              {presente.links.length > 1
                ? `Ver opção ${index + 1} (${nomeLoja(link)})`
                : `Ver na ${nomeLoja(link)}`}
            </a>
          ))}
        </div>
      )}

      <div className="presente-card__status">
        {presente.status === 'disponivel' && (
          <button
            className="presente-card__acao presente-card__acao--principal"
            onClick={() => setAcaoAberta('reservar')}
          >
            Quero dar esse presente
          </button>
        )}

        {presente.status === 'reservado' && (
          <>
            <p className="presente-card__texto-status">
              Reservado por {presente.reservado_por}
            </p>
            <div className="presente-card__acoes">
              <button onClick={() => setAcaoAberta('comprar')}>
                Marcar como comprado
              </button>
              <button onClick={() => setAcaoAberta('liberar')}>
                Desistir da reserva
              </button>
            </div>
          </>
        )}

        {presente.status === 'comprado' && (
          <>
            <p className="presente-card__texto-status">
              Comprado por {presente.reservado_por} 💛
            </p>
            <div className="presente-card__acoes">
              <button onClick={() => setAcaoAberta('liberar')}>
                Foi engano? Remover
              </button>
            </div>
          </>
        )}
      </div>

      {erro && <p className="presente-card__erro">{erro}</p>}

      {acaoAberta && (
        <NomeModal
          titulo={
            acaoAberta === 'reservar'
              ? 'Reservar presente'
              : acaoAberta === 'comprar'
                ? 'Confirmar compra'
                : 'Confirmar seu nome'
          }
          textoBotao={salvando ? 'Enviando...' : 'Confirmar'}
          nomeInicial={nomeSalvo}
          onCancelar={() => {
            setAcaoAberta(null)
            setErro('')
          }}
          onConfirmar={(nome) => executar(acaoAberta, nome)}
        />
      )}
    </article>
  )
}

export default PresenteCard
