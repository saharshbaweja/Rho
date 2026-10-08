alter table public.operator_documents
  add column if not exists xai_file_id text,
  add column if not exists processed_at timestamptz,
  add column if not exists processing_error text;

alter table public.operator_rules
  add column if not exists confidence numeric(5,4),
  add column if not exists logic_version text not null default 'v1';

create index if not exists operator_documents_org_status_idx
  on public.operator_documents(organization_id,status,created_at desc);

insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values (
  'operator-documents',
  'operator-documents',
  false,
  52428800,
  array[
    'application/pdf',
    'text/plain',
    'text/markdown',
    'application/json',
    'text/csv',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
)
on conflict (id) do update set
  public=false,
  file_size_limit=excluded.file_size_limit,
  allowed_mime_types=excluded.allowed_mime_types;
