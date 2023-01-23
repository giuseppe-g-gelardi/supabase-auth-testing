import { GetServerSidePropsContext } from 'next'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'

import type { User, Profile, Database } from '@/types'

type ProtectedProps = {
  user: User,
  profile: Profile
}

export default function ProtectedPage({
  user,
  profile
}: ProtectedProps) {
  return (
    <>
      <div>Protected content for {user.email}</div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient<Database>(ctx)
  // Check if we have a session
  const { data: { session } } = await supabase.auth.getSession()

  const {
    data: profile
  } = await supabase.from('profiles').select('*').eq('id', session?.user.id).single()

  if (!session)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }


  return {
    props: {
      initialSession: session,
      user: session.user,
      profile
    },
  }
}
