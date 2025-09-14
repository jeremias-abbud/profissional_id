-- Tabela para imagens do carrossel (já existe, mas incluindo para referência)
create table if not exists carousel_images (
  id uuid default gen_random_uuid() primary key,
  filename text not null,
  url text not null,
  uploaded_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar RLS na tabela carousel_images
alter table carousel_images enable row level security;

-- Política para permitir leitura pública das imagens do carrossel
drop policy if exists "Public can view carousel images" on carousel_images; create policy "Public can view carousel images" on carousel_images
  for select using (true);

-- Política para permitir inserção de imagens (você pode ajustar conforme necessário)
drop policy if exists "Allow carousel image uploads" on carousel_images; create policy "Allow carousel image uploads" on carousel_images
  for insert with check (true);

-- Política para permitir atualização de imagens
drop policy if exists "Allow carousel image updates" on carousel_images; create policy "Allow carousel image updates" on carousel_images
  for update using (true);

-- Política para permitir exclusão de imagens
drop policy if exists "Allow carousel image deletes" on carousel_images; create policy "Allow carousel image deletes" on carousel_images
  for delete using (true);

-- Tabela para sites do portfólio
create table if not exists portfolio_projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  url text not null,
  image_url text not null,
  technologies text[] default '{}',
  featured boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar RLS na tabela portfolio_projects
alter table portfolio_projects enable row level security;

-- Política para permitir leitura pública dos sites do portfólio
drop policy if exists "Public can view portfolio sites" on portfolio_projects; create policy "Public can view portfolio sites" on portfolio_projects
  for select using (true);

-- Política para permitir inserção de sites do portfólio
drop policy if exists "Allow portfolio site inserts" on portfolio_projects; create policy "Allow portfolio site inserts" on portfolio_projects
  for insert with check (true);

-- Política para permitir atualização de sites do portfólio
drop policy if exists "Allow portfolio site updates" on portfolio_projects; create policy "Allow portfolio site updates" on portfolio_projects
  for update using (true);

-- Política para permitir exclusão de sites do portfólio
drop policy if exists "Allow portfolio site deletes" on portfolio_projects; create policy "Allow portfolio site deletes" on portfolio_projects
  for delete using (true);

-- Função para atualizar o updated_at automaticamente
create or replace function update_updated_at_column()
returns trigger as $$
begin
  -- Defina o search_path para segurança, restringindo a busca a schemas conhecidos.
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Trigger para atualizar updated_at na tabela portfolio_projects
drop trigger if exists update_portfolio_projects_updated_at on portfolio_projects; create trigger update_portfolio_projects_updated_at
  before update 
  on portfolio_projects
  for each row 
  execute function update_updated_at_column();

-- Bucket para armazenar imagens (se não existir)
insert into storage.buckets (id, name, public)
values ('images', 'images', true)
on conflict (id) do nothing;

-- Política para permitir uploads no bucket images
drop policy if exists "Allow public uploads to images bucket" on storage.objects; create policy "Allow public uploads to images bucket" on storage.objects
  for insert with check (bucket_id = 'images');

-- Política para permitir downloads do bucket images
drop policy if exists "Allow public downloads from images bucket" on storage.objects; create policy "Allow public downloads from images bucket" on storage.objects
  for select using (bucket_id = 'images');

-- Política para permitir exclusão do bucket images
drop policy if exists "Allow public deletes from images bucket" on storage.objects; create policy "Allow public deletes from images bucket" on storage.objects
  for delete using (bucket_id = 'images');