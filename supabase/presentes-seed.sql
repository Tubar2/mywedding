-- Execute depois de presentes.sql. Importa os itens da lista original
-- (iCasei/gift/gift-list.csv), já categorizados, todos como "disponivel".
-- Rode só uma vez — rodar de novo duplica os itens.

insert into public.presentes (nome, categoria, links) values
('Ventilador', 'Eletrodomésticos', ARRAY[
  'https://www.amazon.com.br/Ventilador-Turbo-Velocidades-Mondial-VTX-40-8P/dp/B07YL7P5XY',
  'https://www.amazon.com.br/Ventilador-Turbo-Mondial-Preto-Prata/dp/B07YSS57X5'
]),
('Climatizador', 'Eletrodomésticos', ARRAY[
  'https://www.amazon.com.br/Climatizador-Ar-Midea-Liva-Frio/dp/B08377D9YS'
]),
('Conjunto de Panelas Inox', 'Cozinha', ARRAY[
  'https://www.lecreuset.com.br/cozinhar/3-ply-aco-inox-1/',
  'https://www.tramontina.com.br/jogo-de-panelas-tramontina-solar-em-aco-inox-com-fundo-triplo-e-tampas-de-inox--6-pecas/65510200.html',
  'https://www.amazon.com.br/Panelas-Fundo-Triplo-Tramontina-Solar/dp/B076B9N81Q'
]),
('Máquina de Sorvete', 'Eletrodomésticos', ARRAY[
  'https://www.amazon.com.br/Ninja-Creami-Sorveteira-127v-Milkshakes/dp/B0DHSWL7D6',
  'https://www.mercadolivre.com.br/sorveteira-cuisinart-maquina-de-fazer-sorvete-azul-turquesa/p/MLB66142402'
]),
('Vasos', 'Casa e Decoração', ARRAY[
  'https://www.camicado.com.br/p/vaso-home-style-azure-25-cm/-/A-101417614-br.lc',
  'https://www.camicado.com.br/p/vaso-home-style-caen-15-cm/-/A-101511361-br.lc',
  'https://www.camicado.com.br/c/decoracao/objetos-de-decoracao/vasos-decorativos/-/N-16d7juy',
  'https://www.marrocosforyou.com.br/potes-e-potiches'
]),
('Centro de Mesa', 'Casa e Decoração', ARRAY[
  'https://www.marrocosforyou.com.br/centros-de-mesa'
]),
('Cachepô', 'Casa e Decoração', ARRAY[
  'https://www.marrocosforyou.com.br/cachepots.'
]),
('Abajur', 'Casa e Decoração', ARRAY[
  'https://www.marrocosforyou.com.br/abajours'
]),
('Luminária de chão', 'Casa e Decoração', ARRAY[
  'https://www.mercadolivre.com.br/luminaria-luxo-imperial-tela-sintetica-detalhe-em-dourado-cupula-marrom-sintetica-estrutura-marrom-cdourado/p/MLB61677949'
]),
('Bandeja', 'Casa e Decoração', ARRAY[
  'https://www.marrocosforyou.com.br/www.marrocosforyou.com.br/bandeja-tabua'
]),
('Bowl', 'Cozinha', ARRAY[
  'https://www.marrocosforyou.com.br/bowls'
]),
('Petisqueira', 'Cozinha', ARRAY[
  'https://www.marrocosforyou.com.br/petisqueira-com-prato-ceramica-turquia-verde-e-colorido',
  'https://www.marrocosforyou.com.br/petisqueira-com-prato-ceramica-turquia-verde-laranja-e-colorido',
  'https://www.marrocosforyou.com.br/petisqueira-em/-vitral-turca-pintado-a-mao-laranja-e-dourado',
  'https://www.marrocosforyou.com.br/petisqueira-com-prato-ceramica-tunisia-pintado-a-mao-colorido'
]),
('Saladeira', 'Cozinha', ARRAY[
  'https://www.marrocosforyou.com.br/saladeiras'
]),
('Tábua cerâmica', 'Cozinha', ARRAY[
  'https://www.marrocosforyou.com.br/tabua-turca-ceramica-pequeno-azul-branco-e-amarelo'
]),
('Capa de Almofada', 'Casa e Decoração', ARRAY[
  'https://www.marrocosforyou.com.br/almofadas-bordadas',
  'https://www.marrocosforyou.com.br/almofadas-bordadas-coloridas'
]),
('Aparelho de Jantar', 'Cozinha', ARRAY[
  'https://www.marrocosforyou.com.br/aparelhos-de-jantar'
]),
('Kit de facas', 'Cozinha', ARRAY[
  'https://www.mercadolivre.com.br/electrolux-jogo-de-facas-8-pecas-inox-com-bloco-de-bambu/p/MLB27617925'
]),
('Câmera de Segurança', 'Eletrônicos', ARRAY[
  'https://www.mercadolivre.com.br/camera-de-seguranca-tp-link-tapo-c220-2k-qhd-pantilt/p/MLB2062262472'
]),
('Airfryer', 'Eletrodomésticos', ARRAY[
  'https://shopee.com.br/Air-Fryer-Pocket-1.4L-Gaabor-Fritadeira-AF20M-Off-White-i.342086228.40180819151',
  'https://shopee.com.br/Fritadeira-El%C3%A9trica-Air-Fryer-Gaabor-Sem-%C3%93leo-1-4L-Individual-900w-127v-i.968827688.18499262174'
]),
('Liquidificador Pocket', 'Eletrodomésticos', ARRAY[
  'https://shopee.com.br/Liquidificador-Pocket-Gaabor-Port%C3%A1til-Usb-2-Copos-C-350ml-E-280ml-4-L%C3%A2minas-i.968827688.22393634910'
]),
('Ferro a vapor portátil', 'Eletrodomésticos', ARRAY[
  'https://shopee.com.br/Ferro-a-vapor-port%C3%A1til-Gaabor-aquecimento-r%C3%A1pido-painel-cer%C3%A2mico-engomadoria-dupla-a-seco-e-%C3%BAmido-i.968827688.23198112259'
]),
('Panela de arroz elétrica', 'Eletrodomésticos', ARRAY[
  'https://www.amazon.com.br/Panela-El%C3%A9trica-RCB50-Branco-Electrolux/dp/B076HRRJVZ'
]),
('Roteador wifi mesh (Deco)', 'Eletrônicos', ARRAY[
  'https://www.amazon.com.br/Roteador-Mesh-Wi-Fi-Gigabit-AX3000/dp/B09LVFNMVJ'
]),
('Torradeira elétrica', 'Eletrodomésticos', ARRAY[
  'https://www.amazon.com.br/Torradeira-Solei-Ni%C2%ADveis-Tostagem-Marfim/dp/B08N1L36HT'
]),
('Panelas Le Creuset', 'Cozinha', ARRAY[
  'https://www.lecreuset.com.br/ferro-fundido-esmaltado/'
]),
('Frigideira cerâmica', 'Cozinha', ARRAY[
  'https://www.lecreuset.com.br/frigideira-funda-com-alca-antiaderente-de-ceramica/5131528.html'
]),
('Frigideira inox', 'Cozinha', ARRAY[
  'https://www.lecreuset.com.br/frigideira-rasa-3-ply-signature/96602528000100.html'
]),
('Chaleira', 'Cozinha', ARRAY[
  'https://www.lecreuset.com.br/chaleira-classica/920095.html'
]),
('Chaleira elétrica', 'Eletrodomésticos', ARRAY[
  'https://www.amazon.com.br/gp/product/B0DTW3KSMF'
]),
('Kit canecas', 'Cozinha', ARRAY[
  'https://www.lecreuset.com.br/set-caneca-seattle-400ml-giftcollection/79296408.html',
  'https://www.amazon.com.br/gp/product/B0824B1VZB',
  'https://www.amazon.com.br/WOLFF-Conjunto-Canecas-Borossilicato-Resistente/dp/B0CYMC1JG8'
]),
('Kit mini ramekins', 'Cozinha', ARRAY[
  'https://www.amazon.com.br/gp/product/B08249X9G1'
]),
('Conjunto tigelas inox', 'Cozinha', ARRAY[
  'https://www.amazon.com.br/gp/product/B0C23SFYVZ'
]),
('Conjunto assadeiras cerâmica', 'Cozinha', ARRAY[
  'https://www.amazon.com.br/gp/product/B08VJM9PJC'
]),
('Chapa elétrica', 'Eletrodomésticos', ARRAY[
  'https://www.amazon.com.br/el%C3%A9trica-cer%C3%A2mica-Presto-07062-remov%C3%ADveis/dp/B01G7DM7X6'
]),
('Travesseiro de corpo', 'Cama e Banho', ARRAY[
  'https://fibrasca.com.br/produtos/detalhes/travesseiro-minhocao/'
]),
('Travesseiro boomerang', 'Cama e Banho', ARRAY[
  'https://www.santanaenxovais.com.br/travesseiros/travesseiro-boomerang-v-grande-acompanha-fronha-listrada-de-brinde'
]),
('Caldeirão inox', 'Cozinha', ARRAY[
  'https://www.amazon.com.br/Caldeir%C3%A3o-Triplo-Tramontina-62508280-dimetro/dp/B076M8M5L8'
]),
('Máquina de macarrão', 'Cozinha', ARRAY[
  'https://www.amazon.com.br/Sur-Table-Essential-macarr%C3%A3o-cortadores/dp/B0DLPM91S1'
]),
('Tapete culinário de silicone', 'Cozinha', ARRAY[
  'https://www.amazon.com.br/Culin%C3%A1rio-Silicone-Preparar-Antiaderente-Reutiliz%C3%A1vel/dp/B0F9ZYXL5V',
  'https://www.amazon.com.br/Culin%C3%A1rio-Silicone-Preparar-Antiaderente-Reutiliz%C3%A1vel/dp/B0H12QBJ75'
]),
('Rolo de massa de silicone', 'Cozinha', ARRAY[
  'https://www.amazon.com.br/Silicone-Girat%C3%B3rio-Madeira-Antiaderente-Sortida/dp/B0H6WJC7ZB'
]),
('Cesta com forro', 'Casa e Decoração', ARRAY[
  'https://www.amazon.com.br/LYOR-Cesta-Rattan-Pl%C3%A1stico-Tecido/dp/B0B8G8BZFC'
]),
('Tábua mágica de descongelar carne', 'Cozinha', ARRAY[
  'https://www.amazon.com.br/Tabua-M%C3%A1gica-Descongelar-Alimentos-Cozinha/dp/B082BG2RYW'
]),
('Amassador de batata inox', 'Cozinha', ARRAY[
  'https://www.amazon.com.br/Amassador-Inox-Batata-Marffim-Tramontina/dp/B086YHKQQY'
]),
('Moedor de sal ou pimenta', 'Cozinha', ARRAY[
  'https://www.amazon.com.br/Tramontina-61653000-Moedor-Pimenta-Transparente/dp/B076JFS1CM'
]),
('Espremedor de limão', 'Cozinha', ARRAY[
  'https://www.amazon.com.br/Espremedor-espremedor-c%C3%ADtrico-port%C3%A1til-compacto/dp/B0FR4NZ4LD'
]),
('Refratário de vidro', 'Cozinha', ARRAY[
  'https://www.amazon.com.br/dp/B07QWGTM7P'
]),
('Conjunto de panela elétrica para fondue', 'Eletrodomésticos', ARRAY[
  'https://www.amazon.com.br/dp/B0FBRJ1QF5'
]),
('Prato duplo para doces', 'Cozinha', ARRAY[
  'https://www.amazon.com.br/WOLFF-Prato-Duplo-Doces-Porcelana/dp/B0D5KCHH3B'
]),
('Conjunto de chá', 'Cozinha', ARRAY[
  'https://www.amazon.com.br/WOLFF-Conjunto-Pe%C3%A7as-Porcelana-Branco/dp/B0D5K26N77'
]),
('Xícaras', 'Cozinha', ARRAY[
  'https://www.amazon.com.br/WOLFF-Conjunto-X%C3%ADcaras-Porcelana-Branco/dp/B0D5JRTBJJ',
  'https://www.tokstok.com.br/xicara-cha-kit-c-6-pecas-salvia-argila-finest/p'
]),
('Boleira', 'Cozinha', ARRAY[
  'https://www.mercadolivre.com.br/boleira-em-porcelana-azul-e-branca-colonial/p/MLB36934230',
  'https://www.mercadolivre.com.br/boleira-de-ceramica-premium-decorativa-para-bolos-e-doces/up/MLBU3515071889'
]),
('Jogo de cama', 'Cama e Banho', ARRAY[
  'https://www.casaalmeida.com.br/produto/jogo-de-cama-king-cetim-300-fios-buddemeyer-bud-vision-new-colors-ii-100-algodao-penteado-bege-4-pecas-152740',
  'https://www.casaalmeida.com.br/produto/jogo-de-cama-queen-buddemeyer-luxus-crayon-100-algodao-estampado-4-pecas-152277',
  'https://www.karsten.com.br/jogo-de-cama-queen-100-algodao-luna-3006206/p'
]),
('Pillow top', 'Cama e Banho', ARRAY[
  'https://www.casaalmeida.com.br/produto/pillow-top-casal-buddemeyer-vision-fill-gold-100-algodao-acetinado-151168'
]),
('Travesseiro', 'Cama e Banho', ARRAY[
  'https://www.casaalmeida.com.br/produto/kit-travesseiro-50x70cm-buddemeyer-toque-de-pluma-algodao-2-pecas-151142'
]),
('Jogo de Toalhas', 'Cama e Banho', ARRAY[
  'https://www.casaalmeida.com.br/produto/jogo-de-toalhas-buddemeyer-fio-penteado-canelado-gigante-5-pecas-151252',
  'https://www.casaalmeida.com.br/produto/jogo-de-toalhas-buddemeyer-lollipop-gigante-rosa-5-pecas-100-algodao-151133',
  'https://www.casaalmeida.com.br/produto/jogo-de-toalhas-buddemeyer-luxus-america-algodao-egipcio-banho-5-pecas-152268'
]),
('Colcha', 'Cama e Banho', ARRAY[
  'https://www.karsten.com.br/colcha-queen-com-2-porta-travesseiros-100-algodao-luna-3006290/p'
]),
('Kit bancada de banheiro', 'Casa e Decoração', ARRAY[
  'https://www.tokstok.com.br/bancada-c-4-pecas-mar-e-terra-azul-marrom-kit/p',
  'https://www.tokstok.com.br/bancada-c-2-pecas-tu-tucano-multicor-cromado-kit/p',
  'https://www.tokstok.com.br/bancada-c-3-pecas-alas-mousse-de-jabuticaba-branco-kit/p',
  'https://www.tokstok.com.br/saboneteira-multicor-tu-tucano/p'
]);
