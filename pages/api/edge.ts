// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'


export default function handler() {
  return new Response(
    JSON.stringify({ name: 'John Doe' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
}

export const config = {
  runtime: 'edge'
}
