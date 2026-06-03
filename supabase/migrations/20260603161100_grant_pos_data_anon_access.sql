grant usage on schema public to anon;

grant select, insert, update on table public.pos_data to anon;
grant usage, select on all sequences in schema public to anon;

drop policy if exists "Allow anon POS reads" on public.pos_data;
create policy "Allow anon POS reads"
on public.pos_data
for select
to anon
using (true);

drop policy if exists "Allow anon POS inserts" on public.pos_data;
create policy "Allow anon POS inserts"
on public.pos_data
for insert
to anon
with check (true);

drop policy if exists "Allow anon POS updates" on public.pos_data;
create policy "Allow anon POS updates"
on public.pos_data
for update
to anon
using (true)
with check (true);
