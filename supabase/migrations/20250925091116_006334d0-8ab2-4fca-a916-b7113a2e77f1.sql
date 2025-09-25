-- Create user roles enum
CREATE TYPE public.user_role AS ENUM ('student', 'faculty', 'admin');

-- Create ticket status enum  
CREATE TYPE public.ticket_status AS ENUM ('open', 'in_progress', 'resolved', 'rejected');

-- Create ticket priority enum
CREATE TYPE public.ticket_priority AS ENUM ('low', 'medium', 'high', 'urgent');

-- Create permission status enum
CREATE TYPE public.permission_status AS ENUM ('pending', 'approved', 'rejected');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  student_id TEXT,
  department TEXT,
  year_of_study INTEGER,
  phone_number TEXT,
  role user_role NOT NULL DEFAULT 'student',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Create ticket categories table
CREATE TABLE public.ticket_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#3B82F6',
  icon TEXT DEFAULT 'AlertCircle',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert predefined ticket categories
INSERT INTO public.ticket_categories (name, description, color, icon) VALUES
('Water Supply', 'Issues related to water supply and availability', '#06B6D4', 'Droplets'),
('Hostel Problems', 'Accommodation and hostel related issues', '#8B5CF6', 'Home'),
('Food Quality', 'Mess and food quality complaints', '#F59E0B', 'UtensilsCrossed'),
('Cleanliness', 'Hygiene and cleanliness issues', '#10B981', 'Sparkles'),
('Washroom Maintenance', 'Restroom and washroom problems', '#6366F1', 'Bath'),
('Repairs', 'Infrastructure and equipment repairs', '#EF4444', 'Wrench'),
('Academic Issues', 'Class and academic related problems', '#0EA5E9', 'BookOpen'),
('Management/Staff', 'Administrative and staff related concerns', '#F97316', 'Users');

-- Create tickets table
CREATE TABLE public.tickets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES public.ticket_categories(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  priority ticket_priority NOT NULL DEFAULT 'medium',
  status ticket_status NOT NULL DEFAULT 'open',
  assigned_to UUID REFERENCES auth.users(id),
  resolution_notes TEXT,
  attachment_url TEXT,
  resolved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create announcement categories table
CREATE TABLE public.announcement_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  color TEXT DEFAULT '#3B82F6',
  icon TEXT DEFAULT 'Megaphone',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert predefined announcement categories
INSERT INTO public.announcement_categories (name, color, icon) VALUES
('College Updates', '#3B82F6', 'School'),
('Events', '#10B981', 'Calendar'),
('Clubs', '#8B5CF6', 'Users'),
('Competitions', '#F59E0B', 'Trophy'),
('Important Notices', '#EF4444', 'AlertTriangle');

-- Create announcements table
CREATE TABLE public.announcements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES public.announcement_categories(id),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  is_pinned BOOLEAN DEFAULT false,
  attachment_url TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create permission types table
CREATE TABLE public.permission_types (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#3B82F6',
  icon TEXT DEFAULT 'FileText',
  requires_approval BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert predefined permission types
INSERT INTO public.permission_types (name, description, color, icon) VALUES
('Outing', 'Permission for going out of campus', '#10B981', 'MapPin'),
('Casual Leave', 'Casual leave from classes', '#F59E0B', 'Calendar'),
('Sick Leave', 'Medical/sick leave', '#EF4444', 'Heart'),
('Special Permission', 'Other special permissions', '#8B5CF6', 'Star'),
('Query/Question', 'General queries and questions', '#06B6D4', 'MessageCircle');

-- Create permission requests table
CREATE TABLE public.permission_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  permission_type_id UUID NOT NULL REFERENCES public.permission_types(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  from_date TIMESTAMP WITH TIME ZONE,
  to_date TIMESTAMP WITH TIME ZONE,
  status permission_status NOT NULL DEFAULT 'pending',
  approved_by UUID REFERENCES auth.users(id),
  approval_notes TEXT,
  attachment_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.permission_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ticket_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcement_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.permission_types ENABLE ROW LEVEL SECURITY;

-- Create security definer functions
CREATE OR REPLACE FUNCTION public.get_user_role(user_uuid UUID DEFAULT auth.uid())
RETURNS user_role AS $$
  SELECT role FROM public.profiles WHERE user_id = user_uuid;
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.is_faculty_or_admin(user_uuid UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
  SELECT role IN ('faculty', 'admin') FROM public.profiles WHERE user_id = user_uuid;
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Faculty can view all profiles" ON public.profiles
  FOR SELECT USING (public.is_faculty_or_admin());

-- RLS Policies for tickets
CREATE POLICY "Users can view their own tickets" ON public.tickets
  FOR SELECT USING (auth.uid() = user_id OR public.is_faculty_or_admin());

CREATE POLICY "Users can create their own tickets" ON public.tickets
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tickets" ON public.tickets
  FOR UPDATE USING (auth.uid() = user_id OR public.is_faculty_or_admin());

CREATE POLICY "Faculty can update any ticket" ON public.tickets
  FOR UPDATE USING (public.is_faculty_or_admin());

-- RLS Policies for announcements
CREATE POLICY "Everyone can view announcements" ON public.announcements
  FOR SELECT USING (true);

CREATE POLICY "Faculty can create announcements" ON public.announcements
  FOR INSERT WITH CHECK (public.is_faculty_or_admin());

CREATE POLICY "Faculty can update their announcements" ON public.announcements
  FOR UPDATE USING (auth.uid() = user_id OR public.is_faculty_or_admin());

-- RLS Policies for permission requests
CREATE POLICY "Users can view their own permission requests" ON public.permission_requests
  FOR SELECT USING (auth.uid() = user_id OR public.is_faculty_or_admin());

CREATE POLICY "Users can create their own permission requests" ON public.permission_requests
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own permission requests" ON public.permission_requests
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Faculty can approve permission requests" ON public.permission_requests
  FOR UPDATE USING (public.is_faculty_or_admin());

-- Public read policies for categories and types
CREATE POLICY "Everyone can view ticket categories" ON public.ticket_categories
  FOR SELECT USING (true);

CREATE POLICY "Everyone can view announcement categories" ON public.announcement_categories
  FOR SELECT USING (true);

CREATE POLICY "Everyone can view permission types" ON public.permission_types
  FOR SELECT USING (true);

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'student')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tickets_updated_at BEFORE UPDATE ON public.tickets
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_announcements_updated_at BEFORE UPDATE ON public.announcements
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_permission_requests_updated_at BEFORE UPDATE ON public.permission_requests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();