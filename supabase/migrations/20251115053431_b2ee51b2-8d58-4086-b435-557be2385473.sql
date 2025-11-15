-- Create app_role enum for role management
create type public.app_role as enum ('admin', 'faculty', 'student');

-- Create profiles table first
create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null unique,
  full_name text not null,
  email text not null,
  phone_number text,
  student_id text,
  department text,
  year_of_study text,
  avatar_url text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS on profiles
alter table public.profiles enable row level security;

-- Create user_roles table (CRITICAL SECURITY FIX)
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  created_at timestamp with time zone default now(),
  unique (user_id, role)
);

-- Enable RLS on user_roles
alter table public.user_roles enable row level security;

-- Create security definer function to check roles (prevents recursion)
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

-- Create helper function to get user role
create or replace function public.get_user_role(_user_id uuid)
returns app_role
language sql
stable
security definer
set search_path = public
as $$
  select role
  from public.user_roles
  where user_id = _user_id
  limit 1
$$;

-- Create ticket categories
create table public.ticket_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  created_at timestamp with time zone default now()
);

-- Create tickets table
create table public.tickets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  description text not null,
  category_id uuid references public.ticket_categories(id),
  priority text not null check (priority in ('low', 'medium', 'high', 'urgent')),
  status text not null default 'open' check (status in ('open', 'in_progress', 'resolved', 'rejected')),
  resolved_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create permission types
create table public.permission_types (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  created_at timestamp with time zone default now()
);

-- Create permission requests
create table public.permission_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  description text not null,
  permission_type_id uuid references public.permission_types(id),
  from_date timestamp with time zone not null,
  to_date timestamp with time zone not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  approval_notes text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create announcement categories
create table public.announcement_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  created_at timestamp with time zone default now()
);

-- Create announcements
create table public.announcements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  content text not null,
  category_id uuid references public.announcement_categories(id),
  is_pinned boolean default false,
  expires_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create fee records
create table public.fee_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  amount numeric(10, 2) not null,
  payment_method text,
  transaction_id text,
  status text not null default 'pending' check (status in ('pending', 'paid', 'overdue')),
  due_date timestamp with time zone not null,
  paid_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS on all tables
alter table public.ticket_categories enable row level security;
alter table public.tickets enable row level security;
alter table public.permission_types enable row level security;
alter table public.permission_requests enable row level security;
alter table public.announcement_categories enable row level security;
alter table public.announcements enable row level security;
alter table public.fee_records enable row level security;

-- RLS Policies for user_roles
create policy "Users can view their own role"
  on public.user_roles
  for select
  using (auth.uid() = user_id);

create policy "Only admins can insert roles"
  on public.user_roles
  for insert
  with check (public.has_role(auth.uid(), 'admin'));

create policy "Only admins can update roles"
  on public.user_roles
  for update
  using (public.has_role(auth.uid(), 'admin'));

create policy "Only admins can delete roles"
  on public.user_roles
  for delete
  using (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for profiles
create policy "Users can view their own profile"
  on public.profiles
  for select
  using (auth.uid() = user_id);

create policy "Faculty and admin can view profiles"
  on public.profiles
  for select
  using (
    public.has_role(auth.uid(), 'faculty') or 
    public.has_role(auth.uid(), 'admin')
  );

create policy "Users can update their own profile"
  on public.profiles
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- RLS Policies for tickets
create policy "Students can view their own tickets"
  on public.tickets
  for select
  using (
    auth.uid() = user_id or 
    public.has_role(auth.uid(), 'faculty') or 
    public.has_role(auth.uid(), 'admin')
  );

create policy "Students can create their own tickets"
  on public.tickets
  for insert
  with check (auth.uid() = user_id and public.has_role(auth.uid(), 'student'));

create policy "Faculty can update tickets"
  on public.tickets
  for update
  using (
    public.has_role(auth.uid(), 'faculty') or 
    public.has_role(auth.uid(), 'admin')
  );

-- RLS Policies for permission_requests
create policy "Students can view their own permission requests"
  on public.permission_requests
  for select
  using (
    auth.uid() = user_id or 
    public.has_role(auth.uid(), 'faculty') or 
    public.has_role(auth.uid(), 'admin')
  );

create policy "Students can create permission requests"
  on public.permission_requests
  for insert
  with check (auth.uid() = user_id and public.has_role(auth.uid(), 'student'));

create policy "Faculty can update permission requests"
  on public.permission_requests
  for update
  using (
    public.has_role(auth.uid(), 'faculty') or 
    public.has_role(auth.uid(), 'admin')
  );

-- RLS Policies for announcements
create policy "Everyone can view announcements"
  on public.announcements
  for select
  using (true);

create policy "Faculty and admin can manage announcements"
  on public.announcements
  for all
  using (
    public.has_role(auth.uid(), 'faculty') or 
    public.has_role(auth.uid(), 'admin')
  );

-- RLS Policies for fee_records
create policy "Students can view their own fee records"
  on public.fee_records
  for select
  using (auth.uid() = user_id);

create policy "Admin can manage all fee records"
  on public.fee_records
  for all
  using (public.has_role(auth.uid(), 'admin'));

-- Public read for categories and types
create policy "Everyone can view ticket categories"
  on public.ticket_categories
  for select
  using (true);

create policy "Everyone can view permission types"
  on public.permission_types
  for select
  using (true);

create policy "Everyone can view announcement categories"
  on public.announcement_categories
  for select
  using (true);

-- Trigger to create profile and default role on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Create profile
  insert into public.profiles (user_id, full_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', 'New User'),
    new.email
  );
  
  -- Create default student role
  insert into public.user_roles (user_id, role)
  values (new.id, 'student');
  
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Insert default categories
insert into public.ticket_categories (name, description) values
  ('Academic', 'Academic related issues'),
  ('Administrative', 'Administrative queries'),
  ('Technical', 'Technical support'),
  ('Hostel', 'Hostel related issues'),
  ('Other', 'Other issues');

insert into public.permission_types (name, description) values
  ('Leave', 'Leave of absence'),
  ('Hostel', 'Hostel permission'),
  ('Library', 'Library access'),
  ('Other', 'Other permissions');

insert into public.announcement_categories (name, description) values
  ('General', 'General announcements'),
  ('Academic', 'Academic updates'),
  ('Events', 'Event announcements'),
  ('Urgent', 'Urgent notifications');