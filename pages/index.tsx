



import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { Database } from '@/db_types'
import { Session, createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next'
import Link from 'next/link'





export const getServerSideProps = async (ctx: GetServerSidePropsContext | { req: NextApiRequest; res: NextApiResponse }) => {
  const supabase = createServerSupabaseClient(ctx)
  const { data, error } = await supabase.from('test').select('*').single()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (error) console.log(error.message)

  return { props: { data, session } }
}





type TestProps = {
  data: Database['public']['Tables']['test']['Row']
  session: Session
}

export default function Home({ data, session }: TestProps) {
  const user = useUser()

  return (
    <div>
      <h1 className="text-rose-400 text-3xl">hi</h1>
      <div>{JSON.stringify(data.message)}</div>
      <div className='flex gap-4'>
        <div className='text-rose-400'>{!session?.user ? "No session Detected, please log in" : (JSON.stringify(session?.user?.aud))}</div>
        <div>{JSON.stringify(user?.email)}</div>
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
