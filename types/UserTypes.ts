
import type { DB } from "./DB";

export type Profile = DB['profiles']['Row']
export type { User } from '@supabase/supabase-js'
export type { Session } from '@supabase/supabase-js'
