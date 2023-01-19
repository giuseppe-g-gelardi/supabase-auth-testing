
import type { Database } from "@/db_types";

type DB = Database['public']['Tables']

export type Profile = DB['profiles']['Row']

