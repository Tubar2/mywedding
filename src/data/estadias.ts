export type CategoriaEstadia = 'hotel' | 'airbnb'

export interface Estadia {
  nome: string
  categoria: CategoriaEstadia
  valor: string
  detalhe: string
  distancia?: string
  descricao?: string
  obs?: string
  site: string
  mapaQuery?: string
}

export const CERIMONIA_ENDERECO =
  'Araucária Village, Estr. Mun. Teizo Murata - Bairro Canedos, Piracaia - SP, 12970-000'

export const estadias: Estadia[] = [
  {
    nome: 'Casa Amarela',
    categoria: 'hotel',
    valor: 'A partir de R$ 383,00',
    detalhe: 'Inclui café da manhã',
    distancia: '20 a 24 min (18,2 km) do local',
    site: 'https://www.pousadacasaamarela.com.br/',
    mapaQuery: 'Pousada Casa Amarela, Atibaia - SP',
  },
  {
    nome: 'Hotel Fazenda Hípica Atibaia',
    categoria: 'hotel',
    valor: 'A partir de R$ 2.044,80',
    detalhe: 'Inclui café da manhã, almoço e jantar',
    distancia: '14 a 18 min (7,2 km) do local',
    obs: 'Não faz locação de 1 diária — só finais de semana (sábado e domingo).',
    site: 'https://hotelfazendaatibaia.com.br/',
    mapaQuery: 'Hotel Fazenda Hípica Atibaia, Atibaia - SP',
  },
  {
    nome: 'Villa Verde Pousada Gastronômica',
    categoria: 'hotel',
    valor: 'A partir de R$ 1.010,00',
    detalhe: 'Inclui café da manhã',
    distancia: '14 min (9,3 km) do local',
    obs: 'Não faz locação de 1 diária — só finais de semana (sábado e domingo).',
    site: 'https://villaverdechales.com.br/',
    mapaQuery: 'Villa Verde Pousada Gastronômica, Atibaia - SP',
  },
  {
    nome: 'Batholo Plaza Hotel',
    categoria: 'hotel',
    valor: 'A partir de R$ 270,00',
    detalhe: 'Inclui café da manhã',
    distancia: '10 a 16 min (9,8 km) do local',
    site: 'https://www.instagram.com/bartholohotelatibaia/',
    mapaQuery: 'Bartholo Plaza Hotel, Atibaia - SP',
  },
  {
    nome: 'Faro Hotel Atibaia',
    categoria: 'hotel',
    valor: 'A partir de R$ 583,00',
    detalhe: 'Inclui café da manhã',
    distancia: '12 a 18 min (12,8 km) do local',
    obs: 'Aceita locação de 1 diária.',
    site: 'https://www.farohoteis.com.br/faro-hotel-atibaia',
    mapaQuery: 'Faro Hotel Atibaia, Atibaia - SP',
  },
  {
    nome: 'Bourbon Resort Atibaia',
    categoria: 'hotel',
    valor: 'A partir de R$ 3.706,88',
    detalhe: 'Inclui café da manhã, almoço e jantar',
    distancia: '16 a 22 min (15,4 km) do local',
    obs: 'Não faz locação de 1 diária — só finais de semana (sábado e domingo).',
    site: 'https://www.bourbon.com.br/hotel/bourbon-atibaia',
    mapaQuery: 'Bourbon Resort Atibaia, Atibaia - SP',
  },
  {
    nome: 'Atibaia Residence Hotel e Resort',
    categoria: 'hotel',
    valor: 'A partir de R$ 1.334,08',
    detalhe: 'Inclui café da manhã, almoço, chá da tarde e jantar',
    distancia: '20 a 26 min (22,2 km) do local',
    site: 'https://atibaiaresidence.com.br/',
    mapaQuery: 'Atibaia Residence Hotel e Resort, Atibaia - SP',
  },
  {
    nome: 'Pousada Bezerra',
    categoria: 'hotel',
    valor: 'A partir de R$ 1.510,60',
    detalhe: 'Inclui café da manhã, almoço e jantar',
    distancia: '30 min (22,9 km) do local',
    obs: 'Não faz locação de 1 diária — só finais de semana (sábado e domingo).',
    site: 'https://www.pousadabezerra.com.br/',
    mapaQuery: 'Pousada Bezerra, Atibaia - SP',
  },
  {
    nome: 'Recanto dos Oliveiras',
    categoria: 'airbnb',
    valor: 'R$ 5.630 (total) · R$ 1.400/diária',
    detalhe: 'Mínimo de 3 noites (30/10 a 02/11)',
    descricao: 'Casa inteira · 10 hóspedes · 4 quartos · 5 camas · 4 banheiros',
    obs: 'Localização exata disponível somente após reserva.',
    site: 'https://www.airbnb.com.br/rooms/1235527446632723539',
  },
  {
    nome: 'Cond. Reg de Atibaia Spa',
    categoria: 'airbnb',
    valor: 'R$ 3.993 (total) · R$ 1.330/diária',
    detalhe: '2 noites (30/10 a 01/11)',
    descricao: 'Casa inteira · 8 hóspedes · 3 quartos · 6 camas · 5 banheiros',
    obs: 'Localização exata disponível somente após reserva.',
    site: 'https://www.airbnb.com.br/rooms/42045811',
  },
  {
    nome: 'Chácara ao lado Atibaia Top',
    categoria: 'airbnb',
    valor: 'R$ 2.786 (total) · R$ 930/diária',
    detalhe: '2 noites (30/10 a 01/11)',
    descricao: 'Casa inteira · 14 hóspedes · 3 quartos · 4 camas · 3 banheiros',
    obs: 'Localização exata disponível somente após reserva.',
    site: 'https://www.airbnb.com.br/rooms/1348810334337990563',
  },
  {
    nome: 'Natureza, Represa e Paz',
    categoria: 'airbnb',
    valor: 'R$ 4.639 (total) · R$ 1.900/diária',
    detalhe: 'Consultar disponibilidade de datas',
    obs: 'Localização exata disponível somente após reserva.',
    site: 'https://www.airbnb.com.br/rooms/719553558253700010',
  },
  {
    nome: 'Chácara dos Sonhos (piscina climatizada)',
    categoria: 'airbnb',
    valor: 'R$ 4.845 (total) · R$ 1.700/diária',
    detalhe: 'Consultar disponibilidade de datas',
    obs: 'Localização exata disponível somente após reserva.',
    site: 'https://www.airbnb.com.br/rooms/804349784119262636',
  },
  {
    nome: 'Encanto de Canedos',
    categoria: 'airbnb',
    valor: 'R$ 685 (total) · R$ 228/diária',
    detalhe: '2 noites (30/10 a 01/11)',
    descricao: 'Casa inteira · 5 hóspedes · 1 quarto · 4 camas · 1 banheiro',
    obs: 'Localização exata disponível somente após reserva.',
    site: 'https://www.airbnb.com.br/rooms/1199262466519423259',
  },
]
