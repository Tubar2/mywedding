import { useState, type FormEvent } from 'react'
import './NomeModal.css'

interface NomeModalProps {
  titulo: string
  textoBotao: string
  nomeInicial?: string
  onConfirmar: (nome: string) => void
  onCancelar: () => void
}

function NomeModal({
  titulo,
  textoBotao,
  nomeInicial = '',
  onConfirmar,
  onCancelar,
}: NomeModalProps) {
  const [nome, setNome] = useState(nomeInicial)

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const limpo = nome.trim()
    if (!limpo) return
    onConfirmar(limpo)
  }

  return (
    <div className="nome-modal" onClick={onCancelar}>
      <form
        className="nome-modal__box"
        onClick={(event) => event.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <h3>{titulo}</h3>
        <input
          type="text"
          autoFocus
          maxLength={80}
          value={nome}
          onChange={(event) => setNome(event.target.value)}
          placeholder="Seu nome"
          required
        />
        <div className="nome-modal__acoes">
          <button type="button" onClick={onCancelar}>
            Cancelar
          </button>
          <button type="submit" className="nome-modal__confirmar">
            {textoBotao}
          </button>
        </div>
      </form>
    </div>
  )
}

export default NomeModal
