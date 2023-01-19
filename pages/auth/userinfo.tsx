import { User, createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { GetServerSidePropsContext } from 'next'
import type { Database } from '@/db_types';
import type { Profile } from '@/types/UserTypes';


type ProtectedProps = {
  user: User,
  data: unknown
  profile: Profile
}

export default function ProtectedPage({ user, data, profile }: ProtectedProps) {
  return (
    <>
      <div>Protected content for {user.email}</div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
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

  // Run queries with RLS on the server
  const { data } = await supabase.from('users').select('*') // this does nothing lol

  return {
    props: {
      initialSession: session,
      user: session.user,
      data: data ?? [],
      profile
    },
  }
}
