-- Run this once in the Supabase SQL editor (free tier project).

create extension if not exists vector;

create table if not exists documents (
  id bigint generated always as identity primary key,
  content text not null,
  embedding vector(384) not null,  -- 384 = all-MiniLM-L6-v2 output size
  created_at timestamptz default now()
);

-- Cosine-similarity search, called from the backend via client.rpc("match_documents", ...)
create or replace function match_documents (
  query_embedding vector(384),
  match_count int default 4
)
returns table (id bigint, content text, similarity float)
language sql stable
as $$
  select
    documents.id,
    documents.content,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  order by documents.embedding <=> query_embedding
  limit match_count;
$$;

-- Optional: speeds up search once you have more than a few hundred rows.
-- create index on documents using ivfflat (embedding vector_cosine_ops) with (lists = 100);
