// Creating a new supabase server client object (e.g. in API route):
import { createServerSupabaseClient as serverClient } from '@supabase/auth-helpers-nextjs'
import type { NextApiRequest as Request, NextApiResponse as Response } from 'next'
import type { Database } from '@/db_types'

export default async function handler(req: Request, res: Response) {
  const supabaseServerClient = serverClient<Database>({ req, res })
  const { data, error } = await supabaseServerClient.auth.getUser()
  if (!data.user) res.status(500).json(error?.message)

  res.status(200).json(data.user)
}
