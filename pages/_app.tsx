import { useState } from 'react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { Quicksand } from '@next/font/google'
import { ThemeProvider } from 'next-themes'
import Layout from '@/components/Layout'

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import type { Database } from '@/db_types'
import type { AppProps } from 'next/app'

const quicksand = Quicksand({ subsets: ['latin'] })
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient<Database>())
  const [queryClient] = useState(() => new QueryClient())

  return (
    <main className={quicksand.className}>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <ThemeProvider attribute='class'>
              <Layout />
              <Component {...pageProps} />
              <ReactQueryDevtools initialIsOpen={false} />
            </ThemeProvider>
          </Hydrate>
        </QueryClientProvider>
      </SessionContextProvider>
    </main>
  )
}



