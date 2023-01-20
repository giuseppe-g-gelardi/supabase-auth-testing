import { Fragment } from "react";
import { useTheme } from "next-themes";
import { Switch } from "@headlessui/react";
import { SunIcon, MoonIcon } from '@heroicons/react/20/solid'
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { updateTheme } from "@/api/user";
import { Profile } from "@/types/UserTypes";
import type { Database } from "@/db_types";

// * The useTheme hook is used to get the current theme and to set the theme.
// * It also provides the systemTheme which is the theme that the user has
// * set in their operating system.

// * you can find more information here: https://github.com/pacocoursey/next-themes

type ThemeSwitchProps = {
  profile: Profile;
}

export default function ThemeSwitch({ profile }: ThemeSwitchProps) {
  const { systemTheme, setTheme, theme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const supabaseClient = useSupabaseClient<Database>()

  // update this to pull theme from profile.prefersDark setting

  return (
    <Switch
      checked={currentTheme === 'dark' ? true : false}
      onChange={() => `${setTheme(currentTheme === 'dark' ? 'light' : 'dark')
        }${updateTheme(profile?.id!, supabaseClient, theme!)}`}
      as={Fragment}>
      {({ checked }) => (
        <a
          className={`${checked ? 'bg-purple-500' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span className={`${checked ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}>
            {theme === 'dark' ? (
              <MoonIcon className="h-4 w-4 text-gray-800" />
            ) : (
              <SunIcon className="h-4 w-4 text-gray-800" />
            )}
          </span>
        </a>
      )}
    </Switch>
  )
}

// import { Profile } from "@/types/UserTypes";
  // const [profile, setProfile] = useState<Profile | null>(null)
  // useEffect(() => {
  //   async function loadData() {
  //     const { data } = await supabaseClient.from('profiles').select('*').eq('id', user?.id).single()
  //     console.log('use effect data', data)
  //     setProfile(data)
  //   }
  //   // Only run query once user is logged in.
  //   if (user) loadData()
  // }, [supabaseClient, user])
  // async function updateUserTheme(id: string) {
  //   await supabaseClient
  //   .from('profiles')
  //   .update({ prefersDark: theme !== 'dark' ? true : false })
  //   .eq('id', id)
  // }
      // onChange={() => `${setTheme(currentTheme === 'dark' ? 'light' : 'dark')}${updateUserTheme(user?.id!)}`}
