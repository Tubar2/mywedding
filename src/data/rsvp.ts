export type StatusConvidado = 'pendente' | 'confirmado' | 'recusado'

export interface Convidado {
  id: string
  nome: string
  status: StatusConvidado
}

export interface Familia {
  id: string
  nome: string
  codigo: string
  created_at: string
}

export interface FamiliaComConvidados extends Familia {
  convidados: Convidado[]
}

const ALFABETO_CODIGO =
  'abcdefghijkmnpqrstuvwxyz23456789' // sem 0/o/1/l/i para evitar confusão visual

export function gerarCodigoFamilia(tamanho = 10): string {
  const valores = new Uint32Array(tamanho)
  crypto.getRandomValues(valores)
  return Array.from(valores, (v) => ALFABETO_CODIGO[v % ALFABETO_CODIGO.length]).join(
    '',
  )
}

export function linkRsvp(codigo: string): string {
  return `${window.location.origin}${window.location.pathname}#/rsvp/${codigo}`
}
