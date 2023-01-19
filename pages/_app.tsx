import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import { Quicksand } from '@next/font/google'
import { Database } from '@/db_types'
import Layout from '@/components/Layout'
const quicksand = Quicksand({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient<Database>())

  return (
    <main className={quicksand.className}>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <Layout />
        <Component {...pageProps} />
      </SessionContextProvider>
    </main>
  )
}



