# Configuração do Banco de Dados - Profissional ID

Este documento explica como configurar as tabelas e políticas necessárias no Supabase para o funcionamento completo do sistema de gerenciamento de logotipos e portfólio.

## Tabelas Necessárias

### 1. carousel_images
Armazena as imagens do carrossel de logotipos.

### 2. portfolio_projects
Armazena os sites do portfólio com suas informações.

## Como Configurar

1. **Acesse o Supabase Dashboard**
   - Vá para [https://supabase.com/dashboard](https://supabase.com/dashboard)
   - Selecione seu projeto

2. **Execute as Migrações**
   - Vá para a aba "SQL Editor"
   - Copie e cole o conteúdo do arquivo `src/database/migrations.sql`
   - Execute o script

3. **Configurar Storage**
   - Vá para a aba "Storage"
   - Verifique se o bucket "images" foi criado
   - Configure as políticas de acesso se necessário

## Estrutura das Tabelas

### carousel_images
```sql
- id (uuid, primary key)
- filename (text)
- url (text)
- uploaded_at (timestamp)
```

### portfolio_projects
```sql
- id (uuid, primary key)
- title (text)
- description (text)
- url (text)
- image_url (text)
- technologies (text[])
- featured (boolean)
- created_at (timestamp)
- updated_at (timestamp)
```

## Funcionalidades do Painel Administrativo

### Gerenciamento de Logotipos
- Upload de múltiplas imagens
- Visualização em grid
- Exclusão de imagens
- Preview do carrossel

### Gerenciamento de Portfólio
- Adicionar novos sites
- Editar informações dos sites
- Upload de imagens dos sites
- Marcar sites como destaque
- Exclusão de sites

## Acesso ao Painel

O painel administrativo está disponível em `/admin` com senha: `profissionalid2024`

## Segurança

- Todas as tabelas têm Row Level Security (RLS) habilitado
- Políticas de acesso configuradas para leitura pública
- Controle de acesso ao painel administrativo via senha
- Armazenamento seguro de imagens no Supabase Storage