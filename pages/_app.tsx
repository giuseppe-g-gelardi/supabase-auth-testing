import { useState } from 'react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { Quicksand } from '@next/font/google'
import { ThemeProvider } from 'next-themes'
import Layout from '@/components/Layout'

import type { Database } from '@/db_types'
import type { AppProps } from 'next/app'

const quicksand = Quicksand({ subsets: ['latin'] })
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient<Database>())

  return (
    <main className={quicksand.className}>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <ThemeProvider attribute='class'>
          <Layout />
          <Component {...pageProps} />
        </ThemeProvider>
      </SessionContextProvider>
    </main>
  )
}



