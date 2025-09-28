export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      academic_events: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          end_date: string
          event_type: string
          id: string
          is_holiday: boolean | null
          start_date: string
          target_audience: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          end_date: string
          event_type: string
          id?: string
          is_holiday?: boolean | null
          start_date: string
          target_audience?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          end_date?: string
          event_type?: string
          id?: string
          is_holiday?: boolean | null
          start_date?: string
          target_audience?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      announcement_categories: {
        Row: {
          color: string | null
          created_at: string
          icon: string | null
          id: string
          name: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          icon?: string | null
          id?: string
          name: string
        }
        Update: {
          color?: string | null
          created_at?: string
          icon?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      announcements: {
        Row: {
          attachment_url: string | null
          category_id: string
          content: string
          created_at: string
          expires_at: string | null
          id: string
          is_pinned: boolean | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          attachment_url?: string | null
          category_id: string
          content: string
          created_at?: string
          expires_at?: string | null
          id?: string
          is_pinned?: boolean | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          attachment_url?: string | null
          category_id?: string
          content?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          is_pinned?: boolean | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "announcements_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "announcement_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      facilities: {
        Row: {
          available_equipment: string[] | null
          booking_rules: string | null
          capacity: number | null
          contact_person: string | null
          contact_phone: string | null
          created_at: string
          facility_type: Database["public"]["Enums"]["facility_type"]
          hourly_rate: number | null
          id: string
          images: string[] | null
          is_active: boolean | null
          location: string
          name: string
          updated_at: string
        }
        Insert: {
          available_equipment?: string[] | null
          booking_rules?: string | null
          capacity?: number | null
          contact_person?: string | null
          contact_phone?: string | null
          created_at?: string
          facility_type: Database["public"]["Enums"]["facility_type"]
          hourly_rate?: number | null
          id?: string
          images?: string[] | null
          is_active?: boolean | null
          location: string
          name: string
          updated_at?: string
        }
        Update: {
          available_equipment?: string[] | null
          booking_rules?: string | null
          capacity?: number | null
          contact_person?: string | null
          contact_phone?: string | null
          created_at?: string
          facility_type?: Database["public"]["Enums"]["facility_type"]
          hourly_rate?: number | null
          id?: string
          images?: string[] | null
          is_active?: boolean | null
          location?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      facility_bookings: {
        Row: {
          approved_by: string | null
          attendees_count: number | null
          booking_date: string
          created_at: string
          end_time: string
          facility_id: string
          id: string
          payment_status: Database["public"]["Enums"]["fee_status"] | null
          purpose: string
          special_requirements: string | null
          start_time: string
          status: Database["public"]["Enums"]["booking_status"]
          total_cost: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          approved_by?: string | null
          attendees_count?: number | null
          booking_date: string
          created_at?: string
          end_time: string
          facility_id: string
          id?: string
          payment_status?: Database["public"]["Enums"]["fee_status"] | null
          purpose: string
          special_requirements?: string | null
          start_time: string
          status?: Database["public"]["Enums"]["booking_status"]
          total_cost?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          approved_by?: string | null
          attendees_count?: number | null
          booking_date?: string
          created_at?: string
          end_time?: string
          facility_id?: string
          id?: string
          payment_status?: Database["public"]["Enums"]["fee_status"] | null
          purpose?: string
          special_requirements?: string | null
          start_time?: string
          status?: Database["public"]["Enums"]["booking_status"]
          total_cost?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "facility_bookings_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
        ]
      }
      fee_records: {
        Row: {
          academic_year: string
          amount: number
          created_at: string
          discount: number | null
          due_date: string
          fee_type: string
          id: string
          late_fee: number | null
          paid_date: string | null
          payment_method: string | null
          remarks: string | null
          semester: string | null
          status: Database["public"]["Enums"]["fee_status"]
          transaction_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          academic_year: string
          amount: number
          created_at?: string
          discount?: number | null
          due_date: string
          fee_type: string
          id?: string
          late_fee?: number | null
          paid_date?: string | null
          payment_method?: string | null
          remarks?: string | null
          semester?: string | null
          status?: Database["public"]["Enums"]["fee_status"]
          transaction_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          academic_year?: string
          amount?: number
          created_at?: string
          discount?: number | null
          due_date?: string
          fee_type?: string
          id?: string
          late_fee?: number | null
          paid_date?: string | null
          payment_method?: string | null
          remarks?: string | null
          semester?: string | null
          status?: Database["public"]["Enums"]["fee_status"]
          transaction_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      hostel_maintenance: {
        Row: {
          actual_cost: number | null
          assigned_to: string | null
          category: string
          completion_date: string | null
          created_at: string
          description: string
          estimated_cost: number | null
          id: string
          images: string[] | null
          priority: Database["public"]["Enums"]["ticket_priority"]
          room_id: string | null
          status: Database["public"]["Enums"]["maintenance_status"]
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          actual_cost?: number | null
          assigned_to?: string | null
          category: string
          completion_date?: string | null
          created_at?: string
          description: string
          estimated_cost?: number | null
          id?: string
          images?: string[] | null
          priority?: Database["public"]["Enums"]["ticket_priority"]
          room_id?: string | null
          status?: Database["public"]["Enums"]["maintenance_status"]
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          actual_cost?: number | null
          assigned_to?: string | null
          category?: string
          completion_date?: string | null
          created_at?: string
          description?: string
          estimated_cost?: number | null
          id?: string
          images?: string[] | null
          priority?: Database["public"]["Enums"]["ticket_priority"]
          room_id?: string | null
          status?: Database["public"]["Enums"]["maintenance_status"]
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "hostel_maintenance_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      hostels: {
        Row: {
          address: string | null
          contact_phone: string | null
          created_at: string
          facilities: string[] | null
          id: string
          name: string
          rules: string | null
          total_floors: number
          total_rooms: number
          updated_at: string
          warden_id: string | null
        }
        Insert: {
          address?: string | null
          contact_phone?: string | null
          created_at?: string
          facilities?: string[] | null
          id?: string
          name: string
          rules?: string | null
          total_floors?: number
          total_rooms?: number
          updated_at?: string
          warden_id?: string | null
        }
        Update: {
          address?: string | null
          contact_phone?: string | null
          created_at?: string
          facilities?: string[] | null
          id?: string
          name?: string
          rules?: string | null
          total_floors?: number
          total_rooms?: number
          updated_at?: string
          warden_id?: string | null
        }
        Relationships: []
      }
      leave_requests: {
        Row: {
          approval_notes: string | null
          approved_by: string | null
          contact_details: string | null
          created_at: string
          from_date: string
          from_time: string | null
          id: string
          leave_type: string
          parent_consent: boolean | null
          reason: string
          status: Database["public"]["Enums"]["leave_status"]
          to_date: string
          to_time: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          approval_notes?: string | null
          approved_by?: string | null
          contact_details?: string | null
          created_at?: string
          from_date: string
          from_time?: string | null
          id?: string
          leave_type: string
          parent_consent?: boolean | null
          reason: string
          status?: Database["public"]["Enums"]["leave_status"]
          to_date: string
          to_time?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          approval_notes?: string | null
          approved_by?: string | null
          contact_details?: string | null
          created_at?: string
          from_date?: string
          from_time?: string | null
          id?: string
          leave_type?: string
          parent_consent?: boolean | null
          reason?: string
          status?: Database["public"]["Enums"]["leave_status"]
          to_date?: string
          to_time?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      mess_feedback: {
        Row: {
          created_at: string
          date: string
          feedback_text: string | null
          food_quality_rating: number | null
          id: string
          meal_type: string
          rating: number | null
          service_rating: number | null
          suggestions: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          date?: string
          feedback_text?: string | null
          food_quality_rating?: number | null
          id?: string
          meal_type: string
          rating?: number | null
          service_rating?: number | null
          suggestions?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          feedback_text?: string | null
          food_quality_rating?: number | null
          id?: string
          meal_type?: string
          rating?: number | null
          service_rating?: number | null
          suggestions?: string | null
          user_id?: string
        }
        Relationships: []
      }
      mess_menu: {
        Row: {
          created_at: string
          day_of_week: number
          id: string
          meal_type: string
          menu_items: string[]
          nutritional_info: string | null
          special_diet: string[] | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          day_of_week: number
          id?: string
          meal_type: string
          menu_items: string[]
          nutritional_info?: string | null
          special_diet?: string[] | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          day_of_week?: number
          id?: string
          meal_type?: string
          menu_items?: string[]
          nutritional_info?: string | null
          special_diet?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      permission_requests: {
        Row: {
          approval_notes: string | null
          approved_by: string | null
          attachment_url: string | null
          created_at: string
          description: string
          from_date: string | null
          id: string
          permission_type_id: string
          status: Database["public"]["Enums"]["permission_status"]
          title: string
          to_date: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          approval_notes?: string | null
          approved_by?: string | null
          attachment_url?: string | null
          created_at?: string
          description: string
          from_date?: string | null
          id?: string
          permission_type_id: string
          status?: Database["public"]["Enums"]["permission_status"]
          title: string
          to_date?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          approval_notes?: string | null
          approved_by?: string | null
          attachment_url?: string | null
          created_at?: string
          description?: string
          from_date?: string | null
          id?: string
          permission_type_id?: string
          status?: Database["public"]["Enums"]["permission_status"]
          title?: string
          to_date?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "permission_requests_permission_type_id_fkey"
            columns: ["permission_type_id"]
            isOneToOne: false
            referencedRelation: "permission_types"
            referencedColumns: ["id"]
          },
        ]
      }
      permission_types: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: string
          requires_approval: boolean | null
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          requires_approval?: boolean | null
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          requires_approval?: boolean | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          department: string | null
          email: string
          full_name: string
          id: string
          phone_number: string | null
          role: Database["public"]["Enums"]["user_role"]
          student_id: string | null
          updated_at: string
          user_id: string
          year_of_study: number | null
        }
        Insert: {
          created_at?: string
          department?: string | null
          email: string
          full_name: string
          id?: string
          phone_number?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          student_id?: string | null
          updated_at?: string
          user_id: string
          year_of_study?: number | null
        }
        Update: {
          created_at?: string
          department?: string | null
          email?: string
          full_name?: string
          id?: string
          phone_number?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          student_id?: string | null
          updated_at?: string
          user_id?: string
          year_of_study?: number | null
        }
        Relationships: []
      }
      room_allocations: {
        Row: {
          allocated_by: string | null
          allocated_date: string
          created_at: string
          expiry_date: string | null
          id: string
          monthly_rent: number | null
          notes: string | null
          room_id: string
          security_deposit: number | null
          status: Database["public"]["Enums"]["allocation_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          allocated_by?: string | null
          allocated_date?: string
          created_at?: string
          expiry_date?: string | null
          id?: string
          monthly_rent?: number | null
          notes?: string | null
          room_id: string
          security_deposit?: number | null
          status?: Database["public"]["Enums"]["allocation_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          allocated_by?: string | null
          allocated_date?: string
          created_at?: string
          expiry_date?: string | null
          id?: string
          monthly_rent?: number | null
          notes?: string | null
          room_id?: string
          security_deposit?: number | null
          status?: Database["public"]["Enums"]["allocation_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "room_allocations_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      rooms: {
        Row: {
          amenities: string[] | null
          capacity: number
          created_at: string
          current_occupancy: number
          floor: number
          hostel_id: string
          id: string
          images: string[] | null
          rent_amount: number | null
          room_number: string
          room_type: Database["public"]["Enums"]["room_type"]
          status: Database["public"]["Enums"]["room_status"]
          updated_at: string
        }
        Insert: {
          amenities?: string[] | null
          capacity?: number
          created_at?: string
          current_occupancy?: number
          floor: number
          hostel_id: string
          id?: string
          images?: string[] | null
          rent_amount?: number | null
          room_number: string
          room_type?: Database["public"]["Enums"]["room_type"]
          status?: Database["public"]["Enums"]["room_status"]
          updated_at?: string
        }
        Update: {
          amenities?: string[] | null
          capacity?: number
          created_at?: string
          current_occupancy?: number
          floor?: number
          hostel_id?: string
          id?: string
          images?: string[] | null
          rent_amount?: number | null
          room_number?: string
          room_type?: Database["public"]["Enums"]["room_type"]
          status?: Database["public"]["Enums"]["room_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "rooms_hostel_id_fkey"
            columns: ["hostel_id"]
            isOneToOne: false
            referencedRelation: "hostels"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_categories: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name: string
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      tickets: {
        Row: {
          assigned_to: string | null
          attachment_url: string | null
          category_id: string
          created_at: string
          description: string
          id: string
          priority: Database["public"]["Enums"]["ticket_priority"]
          resolution_notes: string | null
          resolved_at: string | null
          status: Database["public"]["Enums"]["ticket_status"]
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          assigned_to?: string | null
          attachment_url?: string | null
          category_id: string
          created_at?: string
          description: string
          id?: string
          priority?: Database["public"]["Enums"]["ticket_priority"]
          resolution_notes?: string | null
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["ticket_status"]
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          assigned_to?: string | null
          attachment_url?: string | null
          category_id?: string
          created_at?: string
          description?: string
          id?: string
          priority?: Database["public"]["Enums"]["ticket_priority"]
          resolution_notes?: string | null
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["ticket_status"]
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tickets_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "ticket_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      transport_routes: {
        Row: {
          created_at: string
          departure_times: string[]
          driver_name: string | null
          driver_phone: string | null
          end_point: string
          fare: number
          id: string
          return_times: string[] | null
          route_code: string
          route_name: string
          start_point: string
          status: Database["public"]["Enums"]["transport_status"]
          stops: string[]
          updated_at: string
          vehicle_capacity: number
          vehicle_number: string | null
        }
        Insert: {
          created_at?: string
          departure_times: string[]
          driver_name?: string | null
          driver_phone?: string | null
          end_point: string
          fare: number
          id?: string
          return_times?: string[] | null
          route_code: string
          route_name: string
          start_point: string
          status?: Database["public"]["Enums"]["transport_status"]
          stops: string[]
          updated_at?: string
          vehicle_capacity: number
          vehicle_number?: string | null
        }
        Update: {
          created_at?: string
          departure_times?: string[]
          driver_name?: string | null
          driver_phone?: string | null
          end_point?: string
          fare?: number
          id?: string
          return_times?: string[] | null
          route_code?: string
          route_name?: string
          start_point?: string
          status?: Database["public"]["Enums"]["transport_status"]
          stops?: string[]
          updated_at?: string
          vehicle_capacity?: number
          vehicle_number?: string | null
        }
        Relationships: []
      }
      visitors: {
        Row: {
          approved_by: string | null
          check_in_time: string | null
          check_out_time: string | null
          created_at: string
          id: string
          purpose: string
          relation: string | null
          security_notes: string | null
          status: Database["public"]["Enums"]["visitor_status"]
          updated_at: string
          user_id: string
          visit_date: string
          visitor_id_proof: string | null
          visitor_name: string
          visitor_phone: string
        }
        Insert: {
          approved_by?: string | null
          check_in_time?: string | null
          check_out_time?: string | null
          created_at?: string
          id?: string
          purpose: string
          relation?: string | null
          security_notes?: string | null
          status?: Database["public"]["Enums"]["visitor_status"]
          updated_at?: string
          user_id: string
          visit_date: string
          visitor_id_proof?: string | null
          visitor_name: string
          visitor_phone: string
        }
        Update: {
          approved_by?: string | null
          check_in_time?: string | null
          check_out_time?: string | null
          created_at?: string
          id?: string
          purpose?: string
          relation?: string | null
          security_notes?: string | null
          status?: Database["public"]["Enums"]["visitor_status"]
          updated_at?: string
          user_id?: string
          visit_date?: string
          visitor_id_proof?: string | null
          visitor_name?: string
          visitor_phone?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { user_uuid?: string }
        Returns: Database["public"]["Enums"]["user_role"]
      }
      is_faculty_or_admin: {
        Args: { user_uuid?: string }
        Returns: boolean
      }
    }
    Enums: {
      allocation_status: "active" | "expired" | "cancelled"
      booking_status:
        | "pending"
        | "approved"
        | "rejected"
        | "active"
        | "completed"
        | "cancelled"
      facility_type:
        | "classroom"
        | "lab"
        | "auditorium"
        | "sports"
        | "library_room"
        | "conference"
      fee_status: "pending" | "paid" | "overdue" | "partial"
      leave_status: "pending" | "approved" | "rejected" | "active" | "completed"
      maintenance_status:
        | "reported"
        | "assigned"
        | "in_progress"
        | "completed"
        | "verified"
      permission_status: "pending" | "approved" | "rejected"
      room_status: "available" | "occupied" | "maintenance" | "reserved"
      room_type: "single" | "double" | "triple" | "suite"
      ticket_priority: "low" | "medium" | "high" | "urgent"
      ticket_status: "open" | "in_progress" | "resolved" | "rejected"
      transport_status: "active" | "inactive" | "maintenance"
      user_role: "student" | "faculty" | "admin"
      visitor_status:
        | "pending"
        | "approved"
        | "rejected"
        | "checked_in"
        | "checked_out"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      allocation_status: ["active", "expired", "cancelled"],
      booking_status: [
        "pending",
        "approved",
        "rejected",
        "active",
        "completed",
        "cancelled",
      ],
      facility_type: [
        "classroom",
        "lab",
        "auditorium",
        "sports",
        "library_room",
        "conference",
      ],
      fee_status: ["pending", "paid", "overdue", "partial"],
      leave_status: ["pending", "approved", "rejected", "active", "completed"],
      maintenance_status: [
        "reported",
        "assigned",
        "in_progress",
        "completed",
        "verified",
      ],
      permission_status: ["pending", "approved", "rejected"],
      room_status: ["available", "occupied", "maintenance", "reserved"],
      room_type: ["single", "double", "triple", "suite"],
      ticket_priority: ["low", "medium", "high", "urgent"],
      ticket_status: ["open", "in_progress", "resolved", "rejected"],
      transport_status: ["active", "inactive", "maintenance"],
      user_role: ["student", "faculty", "admin"],
      visitor_status: [
        "pending",
        "approved",
        "rejected",
        "checked_in",
        "checked_out",
      ],
    },
  },
} as const
