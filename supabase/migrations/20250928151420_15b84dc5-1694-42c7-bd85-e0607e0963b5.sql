-- Enhanced database schema for comprehensive institute and hostel management

-- Create enum types for hostel management
CREATE TYPE public.room_type AS ENUM ('single', 'double', 'triple', 'suite');
CREATE TYPE public.room_status AS ENUM ('available', 'occupied', 'maintenance', 'reserved');
CREATE TYPE public.allocation_status AS ENUM ('active', 'expired', 'cancelled');
CREATE TYPE public.visitor_status AS ENUM ('pending', 'approved', 'rejected', 'checked_in', 'checked_out');
CREATE TYPE public.leave_status AS ENUM ('pending', 'approved', 'rejected', 'active', 'completed');
CREATE TYPE public.maintenance_status AS ENUM ('reported', 'assigned', 'in_progress', 'completed', 'verified');
CREATE TYPE public.facility_type AS ENUM ('classroom', 'lab', 'auditorium', 'sports', 'library_room', 'conference');
CREATE TYPE public.booking_status AS ENUM ('pending', 'approved', 'rejected', 'active', 'completed', 'cancelled');
CREATE TYPE public.fee_status AS ENUM ('pending', 'paid', 'overdue', 'partial');
CREATE TYPE public.transport_status AS ENUM ('active', 'inactive', 'maintenance');

-- Hostels table
CREATE TABLE public.hostels (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT,
    total_floors INTEGER NOT NULL DEFAULT 1,
    total_rooms INTEGER NOT NULL DEFAULT 0,
    contact_phone TEXT,
    warden_id UUID,
    facilities TEXT[], -- Array of facilities like 'wifi', 'laundry', 'gym', etc.
    rules TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Rooms table
CREATE TABLE public.rooms (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    hostel_id UUID NOT NULL REFERENCES public.hostels(id) ON DELETE CASCADE,
    room_number TEXT NOT NULL,
    floor INTEGER NOT NULL,
    room_type public.room_type NOT NULL DEFAULT 'double',
    capacity INTEGER NOT NULL DEFAULT 2,
    current_occupancy INTEGER NOT NULL DEFAULT 0,
    status public.room_status NOT NULL DEFAULT 'available',
    amenities TEXT[], -- Array like 'ac', 'furniture', 'wifi', etc.
    rent_amount DECIMAL(10,2),
    images TEXT[], -- Array of image URLs
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(hostel_id, room_number)
);

-- Room allocations table
CREATE TABLE public.room_allocations (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    room_id UUID NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
    allocated_date DATE NOT NULL DEFAULT CURRENT_DATE,
    expiry_date DATE,
    status public.allocation_status NOT NULL DEFAULT 'active',
    monthly_rent DECIMAL(10,2),
    security_deposit DECIMAL(10,2),
    allocated_by UUID,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Visitor management table
CREATE TABLE public.visitors (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    visitor_name TEXT NOT NULL,
    visitor_phone TEXT NOT NULL,
    visitor_id_proof TEXT, -- ID proof number
    relation TEXT,
    purpose TEXT NOT NULL,
    visit_date DATE NOT NULL,
    check_in_time TIME,
    check_out_time TIME,
    status public.visitor_status NOT NULL DEFAULT 'pending',
    approved_by UUID,
    security_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Leave/Outing requests table
CREATE TABLE public.leave_requests (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    leave_type TEXT NOT NULL, -- 'casual', 'sick', 'home', 'emergency', etc.
    from_date DATE NOT NULL,
    to_date DATE NOT NULL,
    from_time TIME,
    to_time TIME,
    reason TEXT NOT NULL,
    contact_details TEXT,
    parent_consent BOOLEAN DEFAULT false,
    status public.leave_status NOT NULL DEFAULT 'pending',
    approved_by UUID,
    approval_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Hostel maintenance requests table
CREATE TABLE public.hostel_maintenance (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    room_id UUID REFERENCES public.rooms(id),
    category TEXT NOT NULL, -- 'electrical', 'plumbing', 'furniture', 'cleaning', etc.
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    priority public.ticket_priority NOT NULL DEFAULT 'medium',
    status public.maintenance_status NOT NULL DEFAULT 'reported',
    assigned_to UUID,
    estimated_cost DECIMAL(10,2),
    actual_cost DECIMAL(10,2),
    completion_date DATE,
    images TEXT[], -- Array of image URLs
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Mess management table
CREATE TABLE public.mess_feedback (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    meal_type TEXT NOT NULL, -- 'breakfast', 'lunch', 'dinner', 'snacks'
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    food_quality_rating INTEGER CHECK (food_quality_rating >= 1 AND food_quality_rating <= 5),
    service_rating INTEGER CHECK (service_rating >= 1 AND service_rating <= 5),
    feedback_text TEXT,
    suggestions TEXT,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Mess menu table
CREATE TABLE public.mess_menu (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6), -- 0=Sunday
    meal_type TEXT NOT NULL,
    menu_items TEXT[] NOT NULL,
    nutritional_info TEXT,
    special_diet TEXT[], -- 'vegetarian', 'vegan', 'gluten-free', etc.
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(day_of_week, meal_type)
);

-- Campus facilities table
CREATE TABLE public.facilities (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    facility_type public.facility_type NOT NULL,
    location TEXT NOT NULL,
    capacity INTEGER,
    available_equipment TEXT[],
    booking_rules TEXT,
    hourly_rate DECIMAL(10,2),
    contact_person TEXT,
    contact_phone TEXT,
    is_active BOOLEAN DEFAULT true,
    images TEXT[],
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Facility bookings table
CREATE TABLE public.facility_bookings (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    facility_id UUID NOT NULL REFERENCES public.facilities(id) ON DELETE CASCADE,
    booking_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    purpose TEXT NOT NULL,
    attendees_count INTEGER,
    special_requirements TEXT,
    status public.booking_status NOT NULL DEFAULT 'pending',
    approved_by UUID,
    total_cost DECIMAL(10,2),
    payment_status public.fee_status DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Transportation table
CREATE TABLE public.transport_routes (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    route_name TEXT NOT NULL,
    route_code TEXT UNIQUE NOT NULL,
    start_point TEXT NOT NULL,
    end_point TEXT NOT NULL,
    stops TEXT[] NOT NULL,
    departure_times TIME[] NOT NULL,
    return_times TIME[],
    fare DECIMAL(8,2) NOT NULL,
    vehicle_capacity INTEGER NOT NULL,
    driver_name TEXT,
    driver_phone TEXT,
    vehicle_number TEXT,
    status public.transport_status NOT NULL DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Academic calendar table
CREATE TABLE public.academic_events (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    event_type TEXT NOT NULL, -- 'exam', 'holiday', 'registration', 'fest', etc.
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_holiday BOOLEAN DEFAULT false,
    target_audience TEXT[], -- 'students', 'faculty', 'staff', 'all'
    created_by UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Fee management table
CREATE TABLE public.fee_records (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    fee_type TEXT NOT NULL, -- 'hostel', 'tuition', 'mess', 'transport', 'library', etc.
    academic_year TEXT NOT NULL,
    semester TEXT,
    amount DECIMAL(10,2) NOT NULL,
    due_date DATE NOT NULL,
    paid_date DATE,
    payment_method TEXT,
    transaction_id TEXT,
    status public.fee_status NOT NULL DEFAULT 'pending',
    late_fee DECIMAL(10,2) DEFAULT 0,
    discount DECIMAL(10,2) DEFAULT 0,
    remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.hostels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_allocations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leave_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hostel_maintenance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mess_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mess_menu ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.facility_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transport_routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fee_records ENABLE ROW LEVEL SECURITY;

-- RLS Policies for hostel management

-- Hostels: Everyone can view, only admins can modify
CREATE POLICY "Everyone can view hostels" ON public.hostels FOR SELECT USING (true);
CREATE POLICY "Admins can manage hostels" ON public.hostels FOR ALL USING (is_faculty_or_admin());

-- Rooms: Everyone can view, only admins can modify
CREATE POLICY "Everyone can view rooms" ON public.rooms FOR SELECT USING (true);
CREATE POLICY "Admins can manage rooms" ON public.rooms FOR ALL USING (is_faculty_or_admin());

-- Room allocations: Users can view their own, faculty can view all
CREATE POLICY "Users can view their allocations" ON public.room_allocations FOR SELECT USING (auth.uid() = user_id OR is_faculty_or_admin());
CREATE POLICY "Users can create allocation requests" ON public.room_allocations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Faculty can manage allocations" ON public.room_allocations FOR ALL USING (is_faculty_or_admin());

-- Visitors: Users can manage their own visitors, faculty can view all
CREATE POLICY "Users can manage their visitors" ON public.visitors FOR ALL USING (auth.uid() = user_id OR is_faculty_or_admin());

-- Leave requests: Users can manage their own, faculty can approve
CREATE POLICY "Users can manage their leave requests" ON public.leave_requests FOR ALL USING (auth.uid() = user_id OR is_faculty_or_admin());

-- Hostel maintenance: Users can create, faculty can manage all
CREATE POLICY "Users can create maintenance requests" ON public.hostel_maintenance FOR SELECT USING (auth.uid() = user_id OR is_faculty_or_admin());
CREATE POLICY "Users can report maintenance" ON public.hostel_maintenance FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Faculty can manage maintenance" ON public.hostel_maintenance FOR ALL USING (is_faculty_or_admin());

-- Mess feedback: Users can manage their own
CREATE POLICY "Users can manage their mess feedback" ON public.mess_feedback FOR ALL USING (auth.uid() = user_id OR is_faculty_or_admin());

-- Mess menu: Everyone can view, faculty can modify
CREATE POLICY "Everyone can view mess menu" ON public.mess_menu FOR SELECT USING (true);
CREATE POLICY "Faculty can manage mess menu" ON public.mess_menu FOR ALL USING (is_faculty_or_admin());

-- Facilities: Everyone can view, faculty can manage
CREATE POLICY "Everyone can view facilities" ON public.facilities FOR SELECT USING (true);
CREATE POLICY "Faculty can manage facilities" ON public.facilities FOR ALL USING (is_faculty_or_admin());

-- Facility bookings: Users can manage their own, faculty can manage all
CREATE POLICY "Users can manage their bookings" ON public.facility_bookings FOR ALL USING (auth.uid() = user_id OR is_faculty_or_admin());

-- Transport routes: Everyone can view, faculty can manage
CREATE POLICY "Everyone can view transport routes" ON public.transport_routes FOR SELECT USING (true);
CREATE POLICY "Faculty can manage transport routes" ON public.transport_routes FOR ALL USING (is_faculty_or_admin());

-- Academic events: Everyone can view, faculty can manage
CREATE POLICY "Everyone can view academic events" ON public.academic_events FOR SELECT USING (true);
CREATE POLICY "Faculty can manage academic events" ON public.academic_events FOR ALL USING (is_faculty_or_admin());

-- Fee records: Users can view their own, faculty can view all
CREATE POLICY "Users can view their fee records" ON public.fee_records FOR SELECT USING (auth.uid() = user_id OR is_faculty_or_admin());
CREATE POLICY "Faculty can manage fee records" ON public.fee_records FOR ALL USING (is_faculty_or_admin());

-- Add triggers for updated_at columns
CREATE TRIGGER update_hostels_updated_at BEFORE UPDATE ON public.hostels FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_rooms_updated_at BEFORE UPDATE ON public.rooms FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_room_allocations_updated_at BEFORE UPDATE ON public.room_allocations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_visitors_updated_at BEFORE UPDATE ON public.visitors FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_leave_requests_updated_at BEFORE UPDATE ON public.leave_requests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_hostel_maintenance_updated_at BEFORE UPDATE ON public.hostel_maintenance FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_mess_menu_updated_at BEFORE UPDATE ON public.mess_menu FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_facilities_updated_at BEFORE UPDATE ON public.facilities FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_facility_bookings_updated_at BEFORE UPDATE ON public.facility_bookings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_transport_routes_updated_at BEFORE UPDATE ON public.transport_routes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_academic_events_updated_at BEFORE UPDATE ON public.academic_events FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_fee_records_updated_at BEFORE UPDATE ON public.fee_records FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();