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
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      case_documents: {
        Row: {
          case_id: string
          created_at: string
          file_name: string
          file_type: string | null
          file_url: string
          id: string
          uploaded_by: string
        }
        Insert: {
          case_id: string
          created_at?: string
          file_name: string
          file_type?: string | null
          file_url: string
          id?: string
          uploaded_by: string
        }
        Update: {
          case_id?: string
          created_at?: string
          file_name?: string
          file_type?: string | null
          file_url?: string
          id?: string
          uploaded_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "case_documents_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "cases"
            referencedColumns: ["id"]
          },
        ]
      }
      case_messages: {
        Row: {
          case_id: string
          created_at: string
          file_name: string | null
          file_type: string | null
          file_url: string | null
          id: string
          message: string
          read_at: string | null
          sender_id: string
        }
        Insert: {
          case_id: string
          created_at?: string
          file_name?: string | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          message: string
          read_at?: string | null
          sender_id: string
        }
        Update: {
          case_id?: string
          created_at?: string
          file_name?: string | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          message?: string
          read_at?: string | null
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "case_messages_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "cases"
            referencedColumns: ["id"]
          },
        ]
      }
      case_notes: {
        Row: {
          case_id: string
          content: string
          created_at: string
          id: string
          lawyer_id: string
          updated_at: string
        }
        Insert: {
          case_id: string
          content: string
          created_at?: string
          id?: string
          lawyer_id: string
          updated_at?: string
        }
        Update: {
          case_id?: string
          content?: string
          created_at?: string
          id?: string
          lawyer_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "case_notes_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "cases"
            referencedColumns: ["id"]
          },
        ]
      }
      cases: {
        Row: {
          accepted_at: string | null
          case_type: string
          client_id: string
          client_location_city: string | null
          client_location_state: string | null
          closed_at: string | null
          created_at: string
          description: string
          id: string
          lawyer_id: string | null
          preferred_consultation: string | null
          priority: string | null
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          accepted_at?: string | null
          case_type: string
          client_id: string
          client_location_city?: string | null
          client_location_state?: string | null
          closed_at?: string | null
          created_at?: string
          description: string
          id?: string
          lawyer_id?: string | null
          preferred_consultation?: string | null
          priority?: string | null
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          accepted_at?: string | null
          case_type?: string
          client_id?: string
          client_location_city?: string | null
          client_location_state?: string | null
          closed_at?: string | null
          created_at?: string
          description?: string
          id?: string
          lawyer_id?: string | null
          preferred_consultation?: string | null
          priority?: string | null
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      consultations: {
        Row: {
          case_id: string | null
          client_feedback: string | null
          client_id: string
          client_rating: number | null
          completed_at: string | null
          consultation_type: string
          created_at: string
          decline_reason: string | null
          duration_minutes: number
          id: string
          lawyer_id: string
          lawyer_notes: string | null
          meeting_link: string | null
          scheduled_date: string
          scheduled_time: string
          status: string
          suggested_date: string | null
          suggested_time: string | null
          updated_at: string
        }
        Insert: {
          case_id?: string | null
          client_feedback?: string | null
          client_id: string
          client_rating?: number | null
          completed_at?: string | null
          consultation_type?: string
          created_at?: string
          decline_reason?: string | null
          duration_minutes?: number
          id?: string
          lawyer_id: string
          lawyer_notes?: string | null
          meeting_link?: string | null
          scheduled_date: string
          scheduled_time: string
          status?: string
          suggested_date?: string | null
          suggested_time?: string | null
          updated_at?: string
        }
        Update: {
          case_id?: string | null
          client_feedback?: string | null
          client_id?: string
          client_rating?: number | null
          completed_at?: string | null
          consultation_type?: string
          created_at?: string
          decline_reason?: string | null
          duration_minutes?: number
          id?: string
          lawyer_id?: string
          lawyer_notes?: string | null
          meeting_link?: string | null
          scheduled_date?: string
          scheduled_time?: string
          status?: string
          suggested_date?: string | null
          suggested_time?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "consultations_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "cases"
            referencedColumns: ["id"]
          },
        ]
      }
      lawyer_case_stats: {
        Row: {
          case_category: string
          cases_handled: number
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          case_category: string
          cases_handled?: number
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          case_category?: string
          cases_handled?: number
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      lawyer_documents: {
        Row: {
          admin_notes: string | null
          document_type: string
          file_name: string
          file_url: string
          id: string
          status: string
          uploaded_at: string
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          document_type: string
          file_name: string
          file_url: string
          id?: string
          status?: string
          uploaded_at?: string
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          document_type?: string
          file_name?: string
          file_url?: string
          id?: string
          status?: string
          uploaded_at?: string
          user_id?: string
        }
        Relationships: []
      }
      lawyer_education: {
        Row: {
          certifications: string | null
          created_at: string
          degree: string
          graduation_year: number
          id: string
          university: string
          user_id: string
        }
        Insert: {
          certifications?: string | null
          created_at?: string
          degree: string
          graduation_year: number
          id?: string
          university: string
          user_id: string
        }
        Update: {
          certifications?: string | null
          created_at?: string
          degree?: string
          graduation_year?: number
          id?: string
          university?: string
          user_id?: string
        }
        Relationships: []
      }
      lawyer_profiles: {
        Row: {
          available_days: string[] | null
          available_end_time: string | null
          available_start_time: string | null
          bar_council_number: string
          bio: string | null
          consultation_duration: number | null
          consultation_fee: number | null
          consultation_types: string[] | null
          court_jurisdictions: string[] | null
          created_at: string
          experience: number | null
          id: string
          languages_spoken: string[] | null
          law_firm: string | null
          practice_areas: string[]
          profile_visible: boolean | null
          rating: number | null
          role_type: Database["public"]["Enums"]["lawyer_role_type"]
          specialization: string | null
          tagline: string | null
          total_reviews: number | null
          updated_at: string
          user_id: string
          verification_status: Database["public"]["Enums"]["lawyer_verification_status"]
          verified_at: string | null
          year_of_practice: number
        }
        Insert: {
          available_days?: string[] | null
          available_end_time?: string | null
          available_start_time?: string | null
          bar_council_number: string
          bio?: string | null
          consultation_duration?: number | null
          consultation_fee?: number | null
          consultation_types?: string[] | null
          court_jurisdictions?: string[] | null
          created_at?: string
          experience?: number | null
          id?: string
          languages_spoken?: string[] | null
          law_firm?: string | null
          practice_areas?: string[]
          profile_visible?: boolean | null
          rating?: number | null
          role_type?: Database["public"]["Enums"]["lawyer_role_type"]
          specialization?: string | null
          tagline?: string | null
          total_reviews?: number | null
          updated_at?: string
          user_id: string
          verification_status?: Database["public"]["Enums"]["lawyer_verification_status"]
          verified_at?: string | null
          year_of_practice?: number
        }
        Update: {
          available_days?: string[] | null
          available_end_time?: string | null
          available_start_time?: string | null
          bar_council_number?: string
          bio?: string | null
          consultation_duration?: number | null
          consultation_fee?: number | null
          consultation_types?: string[] | null
          court_jurisdictions?: string[] | null
          created_at?: string
          experience?: number | null
          id?: string
          languages_spoken?: string[] | null
          law_firm?: string | null
          practice_areas?: string[]
          profile_visible?: boolean | null
          rating?: number | null
          role_type?: Database["public"]["Enums"]["lawyer_role_type"]
          specialization?: string | null
          tagline?: string | null
          total_reviews?: number | null
          updated_at?: string
          user_id?: string
          verification_status?: Database["public"]["Enums"]["lawyer_verification_status"]
          verified_at?: string | null
          year_of_practice?: number
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean
          message: string
          related_case_id: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean
          message: string
          related_case_id?: string | null
          title: string
          type?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean
          message?: string
          related_case_id?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_related_case_id_fkey"
            columns: ["related_case_id"]
            isOneToOne: false
            referencedRelation: "cases"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          city: string | null
          created_at: string
          email: string
          id: string
          name: string
          phone: string | null
          preferred_language: string | null
          state: string | null
          updated_at: string
          user_type: string
        }
        Insert: {
          avatar_url?: string | null
          city?: string | null
          created_at?: string
          email: string
          id: string
          name?: string
          phone?: string | null
          preferred_language?: string | null
          state?: string | null
          updated_at?: string
          user_type?: string
        }
        Update: {
          avatar_url?: string | null
          city?: string | null
          created_at?: string
          email?: string
          id?: string
          name?: string
          phone?: string | null
          preferred_language?: string | null
          state?: string | null
          updated_at?: string
          user_type?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      lawyer_role_type:
        | "junior_lawyer"
        | "advocate"
        | "senior_advocate"
        | "legal_consultant"
      lawyer_verification_status:
        | "pending"
        | "under_review"
        | "verified"
        | "rejected"
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
      app_role: ["admin", "moderator", "user"],
      lawyer_role_type: [
        "junior_lawyer",
        "advocate",
        "senior_advocate",
        "legal_consultant",
      ],
      lawyer_verification_status: [
        "pending",
        "under_review",
        "verified",
        "rejected",
      ],
    },
  },
} as const
