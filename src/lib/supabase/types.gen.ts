export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      projects: {
        Row: {
          createdAt: string
          id: string
          isFavourite: boolean
          name: string
          notes: string | null
          openIssues: number
          ownerLogin: string
          ownerType: string
          showInPublicProfile: boolean | null
          stars: number
          user: string
          visibility: string
        }
        Insert: {
          createdAt?: string
          id?: string
          isFavourite?: boolean
          name: string
          notes?: string | null
          openIssues: number
          ownerLogin: string
          ownerType: string
          showInPublicProfile?: boolean | null
          stars: number
          user?: string
          visibility: string
        }
        Update: {
          createdAt?: string
          id?: string
          isFavourite?: boolean
          name?: string
          notes?: string | null
          openIssues?: number
          ownerLogin?: string
          ownerType?: string
          showInPublicProfile?: boolean | null
          stars?: number
          user?: string
          visibility?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          createdAt: string
          deadline: string | null
          id: number
          isCompleted: boolean
          issueNumber: number | null
          notes: string | null
          prNumber: number | null
          projectId: string
          status: Database["public"]["Enums"]["taskStatus"]
          taskId: number | null
          title: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          deadline?: string | null
          id?: number
          isCompleted?: boolean
          issueNumber?: number | null
          notes?: string | null
          prNumber?: number | null
          projectId: string
          status?: Database["public"]["Enums"]["taskStatus"]
          taskId?: number | null
          title: string
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          deadline?: string | null
          id?: number
          isCompleted?: boolean
          issueNumber?: number | null
          notes?: string | null
          prNumber?: number | null
          projectId?: string
          status?: Database["public"]["Enums"]["taskStatus"]
          taskId?: number | null
          title?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_projectId_fkey"
            columns: ["projectId"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          bio: string | null
          createdAt: string
          fullName: string | null
          slug: string
          user: string
        }
        Insert: {
          bio?: string | null
          createdAt?: string
          fullName?: string | null
          slug: string
          user: string
        }
        Update: {
          bio?: string | null
          createdAt?: string
          fullName?: string | null
          slug?: string
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_profile_user_fkey"
            columns: ["user"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_settings: {
        Row: {
          createdAt: string
          showPublicActivity: boolean
          updatedAt: string
          user: string
        }
        Insert: {
          createdAt?: string
          showPublicActivity?: boolean
          updatedAt?: string
          user: string
        }
        Update: {
          createdAt?: string
          showPublicActivity?: boolean
          updatedAt?: string
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_settings_user_fkey"
            columns: ["user"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_max_task_id: {
        Args: {
          input_project_id: string
        }
        Returns: number
      }
    }
    Enums: {
      taskStatus: "todo" | "doing" | "done" | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
