export interface Recado {
  id: string
  nome: string
  mensagem: string
  aprovado: boolean
  created_at: string
}

export const NOME_MAX_LENGTH = 80
export const MENSAGEM_MAX_LENGTH = 1200
