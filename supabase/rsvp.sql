-- Execute este script inteiro no SQL Editor do Supabase, depois do schema.sql.
--
-- Diferente da tabela de recados, aqui NÃO damos acesso direto de leitura para
-- o público (isso vazaria a lista de convidados e os códigos secretos de
-- todas as famílias de uma vez). Em vez disso, o público só acessa os dados
-- através de duas funções (RPCs) que exigem o código secreto exato da
-- família — sem o código, não dá pra listar nem editar nada.

create table if not exists public.familias (
  id uuid primary key default gen_random_uuid(),
  nome text not null check (char_length(nome) between 1 and 100),
  codigo text not null unique check (char_length(codigo) between 8 and 24),
  created_at timestamptz not null default now()
);

create table if not exists public.convidados (
  id uuid primary key default gen_random_uuid(),
  familia_id uuid not null references public.familias(id) on delete cascade,
  nome text not null check (char_length(nome) between 1 and 100),
  status text not null default 'pendente'
    check (status in ('pendente', 'confirmado', 'recusado')),
  created_at timestamptz not null default now()
);

create index if not exists convidados_familia_id_idx
  on public.convidados (familia_id);

alter table public.familias enable row level security;
alter table public.convidados enable row level security;

-- Só quem está autenticado (vocês, no /admin) mexe direto nessas tabelas.
drop policy if exists "Autenticado gerencia familias" on public.familias;
create policy "Autenticado gerencia familias"
  on public.familias
  for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Autenticado gerencia convidados" on public.convidados;
create policy "Autenticado gerencia convidados"
  on public.convidados
  for all
  to authenticated
  using (true)
  with check (true);

grant usage on schema public to authenticated;
grant select, insert, update, delete on public.familias to authenticated;
grant select, insert, update, delete on public.convidados to authenticated;

-- O público (anon) não recebe NENHUM grant direto nas tabelas — só pode
-- interagir através das duas funções abaixo.
revoke all on public.familias from anon;
revoke all on public.convidados from anon;

-- RPC pública: busca a família e seus convidados a partir do código secreto
-- do link/QR code. Retorna vazio se o código não existir.
create or replace function public.rsvp_buscar_familia(p_codigo text)
returns table (
  familia_id uuid,
  familia_nome text,
  convidado_id uuid,
  convidado_nome text,
  status text
)
language sql
security definer
set search_path = public
stable
as $$
  select f.id, f.nome, c.id, c.nome, c.status
  from public.familias f
  join public.convidados c on c.familia_id = f.id
  where f.codigo = p_codigo
  order by c.created_at;
$$;

grant execute on function public.rsvp_buscar_familia(text) to anon;

-- RPC pública: atualiza o status de UM convidado, mas exige o código da
-- família como prova de que quem está chamando tem o link/QR correto.
-- Sem o código certo, o update simplesmente não encontra nenhuma linha.
create or replace function public.rsvp_atualizar_status(
  p_codigo text,
  p_convidado_id uuid,
  p_status text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_status not in ('pendente', 'confirmado', 'recusado') then
    raise exception 'status invalido';
  end if;

  update public.convidados c
  set status = p_status
  from public.familias f
  where c.id = p_convidado_id
    and c.familia_id = f.id
    and f.codigo = p_codigo;

  if not found then
    raise exception 'codigo ou convidado invalido';
  end if;
end;
$$;

grant execute on function public.rsvp_atualizar_status(text, uuid, text) to anon;
