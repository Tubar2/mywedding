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

export const PIX_KEY = 'b17190c8-f302-4022-8bf6-b897f44a5d25'

export function nomeLoja(url: string): string {
  try {
    const host = new URL(url).hostname.replace(/^www\./, '')
    return host.replace(/\.com\.br$|\.com$/, '')
  } catch {
    return 'Ver loja'
  }
}
