export interface LocalExtraCor {
  label: string
  hex: string
}

export type LocalExtraIcone = 'dress-code' | 'estacionamento'

export interface LocalExtra {
  titulo: string
  icone: LocalExtraIcone
  paragrafos: string[]
  cores?: LocalExtraCor[]
}

export interface Local {
  slug: string
  titulo: string
  introducao: string
  imagem: string
  nomeLocal: string
  dataHora: string
  descricao: string[]
  extras: LocalExtra[]
  mapaQuery: string
}

export const locais: Local[] = [
  {
    slug: 'cerimonia',
    titulo: 'Cerimônia',
    introducao:
      'Não percam nossa linda e emocionante cerimônia. Contamos com vocês para tornar esse dia ainda mais especial!',
    imagem: 'cerimonia-local',
    nomeLocal: 'Espaço Araucária Village · Piracaia, SP',
    dataHora: '31 de outubro de 2026 · 15h30',
    descricao: [
      'É aqui que vamos celebrar o nosso casamento e queremos muito ter vocês com a gente nesse momento. 🤍',
      'Após a cerimônia, a comemoração continua no mesmo local. É só chegar e aproveitar com a gente! 💛',
    ],
    extras: [
      {
        titulo: 'Dress Code',
        icone: 'dress-code',
        paragrafos: [
          '*Esporte Fino*',
          'Para quem quiser evitar as cores do nosso cortejo: nossas madrinhas estarão de *Azul Serenity* e os padrinhos usarão *ternos em tons de cinza*.',
        ],
        cores: [
          { label: 'Azul Serenity', hex: '#92A8D1' },
          { label: 'Cinza', hex: '#8C8C8C' },
        ],
      },
      {
        titulo: 'Estacionamento',
        icone: 'estacionamento',
        paragrafos: ['O local conta com *estacionamento para os convidados*.'],
      },
    ],
    mapaQuery:
      'Araucária Village, Estr. Mun. Teizo Murata - Bairro Canedos, Piracaia - SP, 12970-000',
  },
]
