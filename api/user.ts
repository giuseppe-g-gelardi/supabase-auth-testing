// import { Database } from "@/db_types";
import type { SupabaseClient } from "@supabase/auth-helpers-nextjs";

export async function getProfile(id: string, supabaseClient: SupabaseClient) {
  const { data, error } = await supabaseClient
    .from('profiles').select('*').eq('id', id).single()
  if (error) return error
  return data
}

export async function updateTheme(id: string, supabaseClient: SupabaseClient, theme: string): Promise<void> {
  await supabaseClient
    .from('profiles')
    .update({ prefersDark: theme !== 'dark' ? true : false })
    .eq('id', id)
}

export async function uTheme(id: string, supabaseClient: SupabaseClient, theme: string): Promise<void> {
  await supabaseClient
    .from('profiles')
    .update({ theme })
    .eq('id', id)
}

export async function updatePrivacy(
  id: string,
  isPrivate: boolean,
  supabaseClient: SupabaseClient
) {
  const { error } = await supabaseClient
    .from('profiles')
    .update({ isPrivate: !isPrivate })
    .eq('id', id)
  if (error) return error
}
