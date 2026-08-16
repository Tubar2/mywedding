export interface Local {
  slug: string
  titulo: string
  introducao: string
  imagem: string
  nomeLocal: string
  dataHora: string
  descricao: string[]
  mapaQuery: string
}

export const locais: Local[] = [
  {
    slug: 'cerimonia',
    titulo: 'Cerimônia',
    introducao:
      'Não percam nossa linda e emocionante cerimônia. Contamos com vocês para tornar esse dia ainda mais especial!',
    imagem: 'cerimonia-local',
    nomeLocal: 'Espaço Araucária Village',
    dataHora: '31 de outubro de 2026 às 16:00',
    descricao: [
      'Aqui vamos celebrar o início da nossa nova história, e queremos muito vocês com a gente nesse momento.',
      'Após a cerimônia, a comemoração continua no mesmo local, então é só chegar e aproveitar com a gente 💛',
      'Contamos com vocês!',
    ],
    mapaQuery:
      'Araucária Village, Estr. Mun. Teizo Murata - Bairro Canedos, Piracaia - SP, 12970-000',
  },
]
