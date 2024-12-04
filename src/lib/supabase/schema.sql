-- Enable Row Level Security
alter table if exists public.student_marks enable row level security;

-- Create Course Configuration Table
create table if not exists public.course_config (
  id uuid default uuid_generate_v4() primary key,
  course_code text not null unique,
  course_name text not null,
  academic_session text not null,
  semester text not null,
  lecturer_name text not null,
  -- Assessment total marks
  quiz1_total numeric not null default 100,
  quiz2_total numeric not null default 100,
  quiz3_total numeric not null default 100,
  assignment1_total numeric not null default 100,
  assignment2_total numeric not null default 100,
  assignment3_total numeric not null default 100,
  test1_total numeric not null default 100,
  test2_total numeric not null default 100,
  final1_total numeric not null default 100,
  final2_total numeric not null default 100,
  final3_total numeric not null default 100,
  -- Metadata
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_by uuid references auth.users(id),
  updated_by uuid references auth.users(id)
);

-- Create CLO Configuration Table
create table if not exists public.clo_config (
  id uuid default uuid_generate_v4() primary key,
  course_code text not null references public.course_config(course_code),
  -- Assessment CLO mappings
  quiz1_clo int,
  quiz2_clo int,
  quiz3_clo int,
  assignment1_clo int,
  assignment2_clo int,
  assignment3_clo int,
  test1_clo int,
  test2_clo int,
  final1_clo int,
  final2_clo int,
  final3_clo int,
  -- Assessment PLO mappings
  quiz1_plo int,
  quiz2_plo int,
  quiz3_plo int,
  assignment1_plo int,
  assignment2_plo int,
  assignment3_plo int,
  test1_plo int,
  test2_plo int,
  final1_plo int,
  final2_plo int,
  final3_plo int,
  -- CLO descriptions
  clo1_description text,
  clo2_description text,
  clo3_description text,
  -- Metadata
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_by uuid references auth.users(id),
  updated_by uuid references auth.users(id)
);

-- Create triggers to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger course_config_updated_at
  before update on public.course_config
  for each row
  execute procedure public.handle_updated_at();

create trigger clo_config_updated_at
  before update on public.clo_config
  for each row
  execute procedure public.handle_updated_at();

-- Create RLS policies for course_config
create policy "Users can view their own course configs"
  on public.course_config for select
  using (auth.uid() = created_by);

create policy "Users can insert their own course configs"
  on public.course_config for insert
  with check (auth.uid() = created_by);

create policy "Users can update their own course configs"
  on public.course_config for update
  using (auth.uid() = created_by)
  with check (auth.uid() = created_by);

-- Create RLS policies for clo_config
create policy "Users can view their own CLO configs"
  on public.clo_config for select
  using (auth.uid() = created_by);

create policy "Users can insert their own CLO configs"
  on public.clo_config for insert
  with check (auth.uid() = created_by);

create policy "Users can update their own CLO configs"
  on public.clo_config for update
  using (auth.uid() = created_by)
  with check (auth.uid() = created_by);

-- Create view to combine mark entry with CLO mappings
create or replace view public.clo_achievements as
with normalized_marks as (
  select 
    m.id,
    m.course_code,
    m.student_name,
    -- Normalize quiz marks
    m.quiz1 / c.quiz1_total as quiz1_normalized,
    m.quiz2 / c.quiz2_total as quiz2_normalized,
    m.quiz3 / c.quiz3_total as quiz3_normalized,
    -- Normalize assignment marks
    m.assignment1 / c.assignment1_total as assignment1_normalized,
    m.assignment2 / c.assignment2_total as assignment2_normalized,
    m.assignment3 / c.assignment3_total as assignment3_normalized,
    -- Normalize test marks
    m.test1 / c.test1_total as test1_normalized,
    m.test2 / c.test2_total as test2_normalized,
    -- Normalize final exam marks
    m.final1 / c.final1_total as final1_normalized,
    m.final2 / c.final2_total as final2_normalized,
    m.final3 / c.final3_total as final3_normalized,
    -- Get CLO mappings
    conf.quiz1_clo,
    conf.quiz2_clo,
    conf.quiz3_clo,
    conf.assignment1_clo,
    conf.assignment2_clo,
    conf.assignment3_clo,
    conf.test1_clo,
    conf.test2_clo,
    conf.final1_clo,
    conf.final2_clo,
    conf.final3_clo
  from 
    public.student_marks m
    join public.course_config c on m.course_code = c.course_code
    join public.clo_config conf on m.course_code = conf.course_code
)
select
  course_code,
  student_name,
  -- Calculate CLO1 achievement
  (
    case when quiz1_clo = 1 then quiz1_normalized else null end +
    case when quiz2_clo = 1 then quiz2_normalized else null end +
    case when quiz3_clo = 1 then quiz3_normalized else null end +
    case when assignment1_clo = 1 then assignment1_normalized else null end +
    case when assignment2_clo = 1 then assignment2_normalized else null end +
    case when assignment3_clo = 1 then assignment3_normalized else null end +
    case when test1_clo = 1 then test1_normalized else null end +
    case when test2_clo = 1 then test2_normalized else null end +
    case when final1_clo = 1 then final1_normalized else null end +
    case when final2_clo = 1 then final2_normalized else null end +
    case when final3_clo = 1 then final3_normalized else null end
  ) / nullif(
    (case when quiz1_clo = 1 then 1 else 0 end +
     case when quiz2_clo = 1 then 1 else 0 end +
     case when quiz3_clo = 1 then 1 else 0 end +
     case when assignment1_clo = 1 then 1 else 0 end +
     case when assignment2_clo = 1 then 1 else 0 end +
     case when assignment3_clo = 1 then 1 else 0 end +
     case when test1_clo = 1 then 1 else 0 end +
     case when test2_clo = 1 then 1 else 0 end +
     case when final1_clo = 1 then 1 else 0 end +
     case when final2_clo = 1 then 1 else 0 end +
     case when final3_clo = 1 then 1 else 0 end), 0
  ) as clo1_achievement,
  -- Calculate CLO2 achievement (similar to CLO1)
  (
    case when quiz1_clo = 2 then quiz1_normalized else null end +
    case when quiz2_clo = 2 then quiz2_normalized else null end +
    case when quiz3_clo = 2 then quiz3_normalized else null end +
    case when assignment1_clo = 2 then assignment1_normalized else null end +
    case when assignment2_clo = 2 then assignment2_normalized else null end +
    case when assignment3_clo = 2 then assignment3_normalized else null end +
    case when test1_clo = 2 then test1_normalized else null end +
    case when test2_clo = 2 then test2_normalized else null end +
    case when final1_clo = 2 then final1_normalized else null end +
    case when final2_clo = 2 then final2_normalized else null end +
    case when final3_clo = 2 then final3_normalized else null end
  ) / nullif(
    (case when quiz1_clo = 2 then 1 else 0 end +
     case when quiz2_clo = 2 then 1 else 0 end +
     case when quiz3_clo = 2 then 1 else 0 end +
     case when assignment1_clo = 2 then 1 else 0 end +
     case when assignment2_clo = 2 then 1 else 0 end +
     case when assignment3_clo = 2 then 1 else 0 end +
     case when test1_clo = 2 then 1 else 0 end +
     case when test2_clo = 2 then 1 else 0 end +
     case when final1_clo = 2 then 1 else 0 end +
     case when final2_clo = 2 then 1 else 0 end +
     case when final3_clo = 2 then 1 else 0 end), 0
  ) as clo2_achievement,
  -- Calculate CLO3 achievement (similar to CLO1)
  (
    case when quiz1_clo = 3 then quiz1_normalized else null end +
    case when quiz2_clo = 3 then quiz2_normalized else null end +
    case when quiz3_clo = 3 then quiz3_normalized else null end +
    case when assignment1_clo = 3 then assignment1_normalized else null end +
    case when assignment2_clo = 3 then assignment2_normalized else null end +
    case when assignment3_clo = 3 then assignment3_normalized else null end +
    case when test1_clo = 3 then test1_normalized else null end +
    case when test2_clo = 3 then test2_normalized else null end +
    case when final1_clo = 3 then final1_normalized else null end +
    case when final2_clo = 3 then final2_normalized else null end +
    case when final3_clo = 3 then final3_normalized else null end
  ) / nullif(
    (case when quiz1_clo = 3 then 1 else 0 end +
     case when quiz2_clo = 3 then 1 else 0 end +
     case when quiz3_clo = 3 then 1 else 0 end +
     case when assignment1_clo = 3 then 1 else 0 end +
     case when assignment2_clo = 3 then 1 else 0 end +
     case when assignment3_clo = 3 then 1 else 0 end +
     case when test1_clo = 3 then 1 else 0 end +
     case when test2_clo = 3 then 1 else 0 end +
     case when final1_clo = 3 then 1 else 0 end +
     case when final2_clo = 3 then 1 else 0 end +
     case when final3_clo = 3 then 1 else 0 end), 0
  ) as clo3_achievement
from normalized_marks; 