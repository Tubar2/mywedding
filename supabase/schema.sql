-- Execute este script inteiro no SQL Editor do Supabase (Project > SQL Editor > New query).
-- Ele cria a tabela de recados, ativa Row Level Security (RLS), define quem pode
-- fazer o quê, e limita quantos recados pendentes podem existir ao mesmo tempo
-- (proteção simples contra spam/flood consumindo espaço no banco).

create extension if not exists "pgcrypto";

create table if not exists public.recados (
  id uuid primary key default gen_random_uuid(),
  nome text not null check (char_length(nome) between 1 and 80),
  mensagem text not null check (char_length(mensagem) between 1 and 1200),
  aprovado boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists recados_aprovado_created_at_idx
  on public.recados (aprovado, created_at desc);

alter table public.recados enable row level security;

-- RLS controla QUAIS linhas cada papel enxerga, mas o Postgres também exige
-- a permissão "de tabela" correspondente — sem isso, a policy nunca é nem
-- avaliada. anon precisa poder tentar SELECT/INSERT; authenticated precisa
-- poder tentar tudo (a policy acima decide o que de fato é permitido).
grant usage on schema public to anon, authenticated;
grant select, insert on public.recados to anon;
grant select, update, delete on public.recados to authenticated;

-- Qualquer visitante pode enviar um recado, mas ele sempre nasce como
-- "não aprovado" — o valor de aprovado=true é rejeitado na própria política.
drop policy if exists "Publico pode enviar recados" on public.recados;
create policy "Publico pode enviar recados"
  on public.recados
  for insert
  to anon
  with check (aprovado = false);

-- Qualquer visitante só consegue LER os recados já aprovados por vocês.
drop policy if exists "Publico le recados aprovados" on public.recados;
create policy "Publico le recados aprovados"
  on public.recados
  for select
  to anon
  using (aprovado = true);

-- Só quem estiver autenticado (vocês, via login no /admin) enxerga tudo,
-- inclusive os pendentes.
drop policy if exists "Autenticado le todos recados" on public.recados;
create policy "Autenticado le todos recados"
  on public.recados
  for select
  to authenticated
  using (true);

-- Só autenticado pode aprovar/reprovar (alterar a coluna aprovado).
drop policy if exists "Autenticado atualiza recados" on public.recados;
create policy "Autenticado atualiza recados"
  on public.recados
  for update
  to authenticated
  using (true)
  with check (true);

-- Só autenticado pode apagar (ex: remover spam ou mensagem indevida).
drop policy if exists "Autenticado apaga recados" on public.recados;
create policy "Autenticado apaga recados"
  on public.recados
  for delete
  to authenticated
  using (true);

-- Limite de segurança: no máximo 500 recados aguardando aprovação ao mesmo
-- tempo. Isso limita o pior cenário de alguém tentando floodar o formulário
-- (no plano gratuito o limite de banco é 500MB, então isso é uma fração
-- irrisória disso — é só uma trava extra de bom senso).
create or replace function public.limitar_recados_pendentes()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if (select count(*) from public.recados where aprovado = false) >= 500 then
    raise exception 'Limite de recados pendentes atingido. Tente novamente mais tarde.';
  end if;
  return new;
end;
$$;

drop trigger if exists trg_limitar_recados_pendentes on public.recados;
create trigger trg_limitar_recados_pendentes
  before insert on public.recados
  for each row
  execute function public.limitar_recados_pendentes();

-- Recados que já existiam no site antigo (iCasei), importados como aprovados.
insert into public.recados (nome, mensagem, aprovado, created_at) values
  ('Cezar Augusto Wertonge Santiago', 'Laiana e Ricardo, com muita emoção e orgulho, venho parabeniza-los por tão nobre decisão. Que este enlace seja uma aliança com DEUS e venha florescer grandemente o amor a prosperidade, sabedoria e sua descendência não tenha fim. Grande abraço!!! Papai!!!!', true, '2026-04-22T10:00:00-03:00'),
  ('Elisandra Nardi Santiago', 'Laiana e Ricardo, fico grandemente feliz com a união de vocês, que Deus derrame bênçãos em suas vidas. Gênesis 2:24 Portanto deixará o homem a seu pai e a sua mãe, e serão uma só carne.', true, '2026-04-22T11:00:00-03:00'),
  ('Elisandra Nardi Santiago', 'Desejo toda sorte de bênçãos para vcs.', true, '2026-04-22T11:05:00-03:00'),
  ('Abhi Mario Martins', 'Queridos netos Laiana e Ricardo, estou muito feliz em poder presenciar a esse momento de união do amor de vocês! Sejam pacientes e cuidadosos na relação cada vez mais. Desejo felicidades totais, companheirismo e muito amor. Que a vida seja repleta de bons momentos, sempre! Beijos do seu Vô que ama muito vocês!', true, '2026-04-21T09:00:00-03:00'),
  ('Vera M C Pereira', 'Que a felicidade a dois continue sendo o objetivo principal de suas vidas. A contagem regressiva para o "sim" mais importante está acabando, e eu desejo que a união de vocês seja luz e esperança para sempre.', true, '2026-04-21T14:00:00-03:00'),
  ('Isabel da Conceição Oliveira', 'Que Deus abençoe a união de vcs e sejam muito felizes e obrigada pelo convite.', true, '2026-04-21T18:00:00-03:00'),
  ('Andrei Santos', 'Ricardo e Laiane, hoje vocês iniciam um novo capítulo, e não é qualquer capítulo — é a construção de uma vida juntos. O casamento não é só sobre amor nos dias fáceis, mas principalmente sobre parceria, respeito e escolha diária de caminhar lado a lado. Ricardo, tenho muito orgulho de você e da pessoa que se tornou. E fico feliz em ver que você encontrou na Laiane alguém para somar, crescer e construir algo sólido. Laiane, seja muito bem-vinda à família. Que você e o Ricardo construam uma história leve, forte e cheia de conquistas. Que nunca falte diálogo nos momentos difíceis, leveza nos dias comuns e amor em todos os detalhes. Desejo a vocês uma vida próspera, feliz e cheia de realizações. Contem sempre conosco.', true, '2026-04-20T10:00:00-03:00'),
  ('Nadia Nogues de Almeida', 'Lai e Ricardo, que esse casamento possa florescer o melhor em vocês, que traga felicidade, amor e paixão! Espero que nunca falte o companheirismo e a amizade que já existe entre vocês! Sejam incríveis como são, reais e sinceros sempre. Desejo do fundo do meu coração que essa data seja comemorada anos e anos e que não faltem motivos pra comemorar! Amo vocês, obrigada por lembrarem de mim. Que nossa amizade também seja eterna!', true, '2026-04-20T16:00:00-03:00');
