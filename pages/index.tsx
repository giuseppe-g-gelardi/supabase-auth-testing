import { useUser } from '@supabase/auth-helpers-react'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'

import type { Database, Session, Test } from '@/types'
import type { GetServerSidePropsContext } from 'next'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient<Database>(ctx)
  const { data: test, error } = await supabase.from('test').select('*').single()
  const { data: { session } } = await supabase.auth.getSession()

  if (error) console.log(error.message)

  return { props: { test, session } }
}

type TestProps = {
  test: Test
  session: Session
}

export default function Home({ test, session }: TestProps) {
  const user = useUser()

  return (
    <div className='flex flex-col gap-5 items-center justify-center h-screen'>
      <h1 className="text-rose-400 text-3xl">hi</h1>
      <div className='text-green-500 font-bold text-2xl'>{JSON.stringify(test.message)}</div>
      <div className='flex gap-4'>
        <div className='text-rose-400'>{!session?.user ? "No session Detected, please log in" : (JSON.stringify(session?.user?.aud))}</div>
        <div className='text-purple-800 font-bold'>{JSON.stringify(user?.email)}</div>
      </div>
    </div>
  )
}



{/* <div className='flex gap-5'>
<Link href='/protected' className='hover:text-rose-600 hover:underline'>
  protected
</Link>
<Link href='/auth/userinfo' className='hover:text-indigo-600 hover:underline'>
  middleware protected
</Link>
</div> */}
{/* <button className='bg-rose-300 hover:bg-rose-400 w-40 h-10 rounded-lg'
onClick={async () => await supabaseClient.auth.signInWithOAuth({ provider: 'google' })}
>
login with google
</button>
<button className='bg-purple-300 hover:bg-purple-400 w-40 h-10 rounded-lg'
onClick={async () => await supabaseClient.auth.signInWithOAuth({ provider: 'github' })}
>
login with github
</button>
<button className='bg-cyan-300 hover:bg-cyan-400 w-40 h-10 rounded-lg'
onClick={async () => await supabaseClient.auth.signOut()}
>
log out
</button> */}
