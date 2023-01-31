// Creating a new supabase server client object (e.g. in API route):
import { createServerSupabaseClient as serverClient } from '@supabase/auth-helpers-nextjs'
import type { NextApiRequest as Request, NextApiResponse as Response } from 'next'
import type { Database } from '@/types'

export default async function handler(req: Request, res: Response) {
  const sb = serverClient<Database>({ req, res })

  const { data, error } = await sb.from('test').select('*').single()
  if (error) res.status(500).json(error?.message)

  res.status(200).json(data?.message)
}
