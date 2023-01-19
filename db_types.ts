export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      comments: {
        Row: {
          body: string
          created_at: string | null
          id: number
          likes: number
          posted_by: string
          replies: number | null
        }
        Insert: {
          body: string
          created_at?: string | null
          id?: number
          likes?: number
          posted_by: string
          replies?: number | null
        }
        Update: {
          body?: string
          created_at?: string | null
          id?: number
          likes?: number
          posted_by?: string
          replies?: number | null
        }
      }
      direct_messges: {
        Row: {
          created_at: string | null
          from: string
          id: number
          to: string
        }
        Insert: {
          created_at?: string | null
          from: string
          id?: number
          to: string
        }
        Update: {
          created_at?: string | null
          from?: string
          id?: number
          to?: string
        }
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          user_id?: string
        }
      }
      posts: {
        Row: {
          body: string
          comments: string | null
          created_at: string
          id: number
          likes: string | null
          posted_by: string
        }
        Insert: {
          body?: string
          comments?: string | null
          created_at?: string
          id?: number
          likes?: string | null
          posted_by?: string
        }
        Update: {
          body?: string
          comments?: string | null
          created_at?: string
          id?: number
          likes?: string | null
          posted_by?: string
        }
      }
      profiles: {
        Row: {
          avatar: string | null
          created_at: string | null
          display_name: string | null
          email: string
          id: string
          isPrivate: boolean
          location: string | null
          name: string | null
          prefersDark: boolean
        }
        Insert: {
          avatar?: string | null
          created_at?: string | null
          display_name?: string | null
          email: string
          id: string
          isPrivate?: boolean
          location?: string | null
          name?: string | null
          prefersDark?: boolean
        }
        Update: {
          avatar?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string
          id?: string
          isPrivate?: boolean
          location?: string | null
          name?: string | null
          prefersDark?: boolean
        }
      }
      replies: {
        Row: {
          body: string
          created_at: string | null
          id: number
          in_reply_to: number
          likes: string | null
          posted_by: string
        }
        Insert: {
          body?: string
          created_at?: string | null
          id?: number
          in_reply_to: number
          likes?: string | null
          posted_by: string
        }
        Update: {
          body?: string
          created_at?: string | null
          id?: number
          in_reply_to?: number
          likes?: string | null
          posted_by?: string
        }
      }
      test: {
        Row: {
          created_at: string
          id: number
          message: string
        }
        Insert: {
          created_at?: string
          id?: number
          message: string
        }
        Update: {
          created_at?: string
          id?: number
          message?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
