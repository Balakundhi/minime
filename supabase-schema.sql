-- Enable pgvector extension
create extension if not exists vector;

-- Documents table (metadata about sources)
create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  source text not null,
  title text,
  url text,
  metadata jsonb,
  created_at timestamptz default now()
);

-- Chunks table with embeddings
create table if not exists chunks (
  id uuid primary key default gen_random_uuid(),
  document_id uuid references documents(id) on delete cascade,
  content text not null,
  metadata jsonb,
  embedding vector(1536), -- OpenAI text-embedding-3-small dimension
  created_at timestamptz default now()
);

-- Create index for fast vector similarity search
create index if not exists idx_chunks_embedding on chunks using ivfflat (embedding vector_l2_ops) with (lists = 100);

-- Create index for document lookup
create index if not exists idx_chunks_document on chunks(document_id);

-- Function to search similar chunks
create or replace function match_chunks(
  query_embedding vector(1536),
  match_threshold float default 0.5,
  match_count int default 5
)
returns table (
  id uuid,
  document_id uuid,
  content text,
  metadata jsonb,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    chunks.id,
    chunks.document_id,
    chunks.content,
    chunks.metadata,
    1 - (chunks.embedding <=> query_embedding) as similarity
  from chunks
  where 1 - (chunks.embedding <=> query_embedding) > match_threshold
  order by chunks.embedding <=> query_embedding
  limit match_count;
end;
$$;
