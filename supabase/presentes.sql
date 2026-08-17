-- Execute este script inteiro no SQL Editor do Supabase, depois do rsvp.sql.
--
-- Diferente dos recados (aprovação privada) e das famílias (acesso restrito
-- por código), a lista de presentes é pública por natureza — qualquer
-- visitante pode e deve conseguir listar os itens e ver quem reservou o quê.
-- Por isso aqui liberamos SELECT direto para o público. As ações que mudam
-- estado (reservar/marcar comprado/liberar) continuam passando por funções
-- que conferem o nome informado, para dificultar que uma pessoa mexa na
-- reserva de outra sem saber o nome usado.

create table if not exists public.presentes (
  id uuid primary key default gen_random_uuid(),
  nome text not null check (char_length(nome) between 1 and 120),
  categoria text not null check (char_length(categoria) between 1 and 60),
  links text[] not null default '{}',
  status text not null default 'disponivel'
    check (status in ('disponivel', 'reservado', 'comprado')),
  reservado_por text check (reservado_por is null or char_length(reservado_por) between 1 and 80),
  created_at timestamptz not null default now()
);

create index if not exists presentes_categoria_idx on public.presentes (categoria);

alter table public.presentes enable row level security;

-- Público pode ler tudo (é uma lista de presentes pública, não tem dado sensível).
drop policy if exists "Publico le presentes" on public.presentes;
create policy "Publico le presentes"
  on public.presentes
  for select
  to anon
  using (true);

-- Autenticado (vocês, no /admin) pode gerenciar o catálogo por completo.
drop policy if exists "Autenticado gerencia presentes" on public.presentes;
create policy "Autenticado gerencia presentes"
  on public.presentes
  for all
  to authenticated
  using (true)
  with check (true);

grant usage on schema public to anon, authenticated;
grant select on public.presentes to anon;
grant select, insert, update, delete on public.presentes to authenticated;

-- Reservar um presente disponível. Só funciona se ele ainda estiver
-- "disponivel" (evita duas pessoas reservando o mesmo item ao mesmo tempo).
create or replace function public.presente_reservar(p_presente_id uuid, p_nome text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_nome is null or char_length(trim(p_nome)) = 0 then
    raise exception 'nome obrigatorio';
  end if;

  update public.presentes
  set status = 'reservado', reservado_por = trim(p_nome)
  where id = p_presente_id and status = 'disponivel';

  if not found then
    raise exception 'presente indisponivel';
  end if;
end;
$$;

grant execute on function public.presente_reservar(uuid, text) to anon;

-- Marcar como comprado. Se já estava reservado, exige o mesmo nome de quem
-- reservou. Se ainda estava disponível, permite marcar direto como comprado
-- (alguém que já comprou sem passar pela etapa de reserva).
create or replace function public.presente_marcar_comprado(p_presente_id uuid, p_nome text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_nome is null or char_length(trim(p_nome)) = 0 then
    raise exception 'nome obrigatorio';
  end if;

  update public.presentes
  set status = 'comprado', reservado_por = trim(p_nome)
  where id = p_presente_id
    and (
      status = 'disponivel'
      or (status = 'reservado' and lower(trim(reservado_por)) = lower(trim(p_nome)))
    );

  if not found then
    raise exception 'nome nao confere ou presente indisponivel';
  end if;
end;
$$;

grant execute on function public.presente_marcar_comprado(uuid, text) to anon;

-- Liberar (desistir) de um presente reservado ou comprado. Exige o mesmo
-- nome usado na reserva/compra, como confirmação de que é a mesma pessoa.
create or replace function public.presente_liberar(p_presente_id uuid, p_nome text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_nome is null or char_length(trim(p_nome)) = 0 then
    raise exception 'nome obrigatorio';
  end if;

  update public.presentes
  set status = 'disponivel', reservado_por = null
  where id = p_presente_id
    and status in ('reservado', 'comprado')
    and lower(trim(reservado_por)) = lower(trim(p_nome));

  if not found then
    raise exception 'nome nao confere';
  end if;
end;
$$;

grant execute on function public.presente_liberar(uuid, text) to anon;
