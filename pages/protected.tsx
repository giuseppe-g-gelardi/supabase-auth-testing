import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'

import type { GetServerSidePropsContext } from 'next'
import type { Database, User } from '@/types'

export default function ProtectedPage({ user, allRepos }: { user: User; allRepos: any }) {
  return (
    <>
      <div>Protected content for {user.email}</div>
      <p>Data fetched with provider token:</p>
      <pre>{JSON.stringify(allRepos, null, 2)}</pre>
      <p>user:</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient<Database>(ctx)
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }

  // Retrieve provider_token & logged in user's third-party id from metadata
  const { provider_token, user } = session
  const userId = user.user_metadata.user_name

  const allRepos = await (
    await fetch(`https://api.github.com/search/repositories?q=user:${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `token ${provider_token}`,
      },
    })
  ).json()

  return { props: { user, allRepos } }
}
