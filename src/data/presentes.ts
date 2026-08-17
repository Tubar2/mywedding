export type StatusPresente = 'disponivel' | 'reservado' | 'comprado'

export interface Presente {
  id: string
  nome: string
  categoria: string
  links: string[]
  status: StatusPresente
  reservado_por: string | null
}

export const CATEGORIAS = [
  'Cozinha',
  'Eletrodomésticos',
  'Casa e Decoração',
  'Cama e Banho',
  'Eletrônicos',
] as const

export const PIX_KEY = '453d8b3f-8abb-4e03-9743-038221b07494'

export function nomeLoja(url: string): string {
  try {
    const host = new URL(url).hostname.replace(/^www\./, '')
    return host.replace(/\.com\.br$|\.com$/, '')
  } catch {
    return 'Ver loja'
  }
}
