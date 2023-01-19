import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import Link from "next/link"
export default function Layout() {
  const user = useUser()
  const supabaseClient = useSupabaseClient()


  return (
    <div className="flex w-screen bg-purple-300 h-20">
      <div className="flex items-center ml-16 mr-auto">
        <div className='flex gap-5'>
          <Link href='/' className='hover:text-cyan-600 hover:underline'>
            Home
          </Link>
          <Link href='/public' className='hover:text-green-600 hover:underline'>
            Public
          </Link>
          <Link href='/protected' className='hover:text-rose-600 hover:underline'>
            protected
          </Link>
          <Link href='/auth/userinfo' className='hover:text-indigo-600 hover:underline'>
            middleware protected
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-center ml-auto mr-16">
        {user ? (
          <div className="flex flex-row items-center gap-4">
            {JSON.stringify(user?.email)}
            <button className='bg-cyan-300 hover:bg-cyan-400 w-40 h-10 rounded-lg'
              onClick={async () => await supabaseClient.auth.signOut()}
            >
              log out
            </button>
          </div>
        ) : (
          <div className="flex flex-row gap-4">
            <button className='bg-rose-300 hover:bg-rose-400 w-40 h-10 rounded-lg'
              onClick={async () => await supabaseClient.auth.signInWithOAuth({ provider: 'google' })}
            >
              login with google
            </button>
            <button className='bg-cyan-300 hover:bg-cyan-400 w-40 h-10 rounded-lg'
              onClick={async () => await supabaseClient.auth.signInWithOAuth({ provider: 'github' })}
            >
              login with github
            </button>
          </div>
        )}
      </div>

    </div>
  )
}



