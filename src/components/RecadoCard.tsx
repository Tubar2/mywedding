import type { Recado } from '../data/recados'
import './RecadoCard.css'

interface RecadoCardProps {
  recado: Recado
}

function formatarData(dataIso: string) {
  return new Date(dataIso).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

function RecadoCard({ recado }: RecadoCardProps) {
  return (
    <article className="recado-card">
      <p className="recado-card__mensagem">&ldquo;{recado.mensagem}&rdquo;</p>
      <p className="recado-card__assinatura">
        {recado.nome} · {formatarData(recado.created_at)}
      </p>
    </article>
  )
}

export default RecadoCard
