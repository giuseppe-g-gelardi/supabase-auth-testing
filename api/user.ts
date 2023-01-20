


export async function updateTheme(id: string, supabaseClient: any, theme: string) {
  await supabaseClient
    .from('profiles')
    .update({ prefersDark: theme !== 'dark' ? true : false })
    .eq('id', id)
}
