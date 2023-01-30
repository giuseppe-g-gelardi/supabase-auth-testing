import supabase from "../util/supabase";
import { getPagination } from "./helpers/getPagination";

export async function getInfinitePosts(page: number, userid: string) { // infinite posts
  const { from, to } = getPagination(page, 10)
  const { data, error, count } = await supabase.from("posts")
    .select('*, posted_by: profiles(id, avatar, display_name, email)', { count: 'exact' })
    .eq('posted_by', userid)
    .range(from, to)
    .order('id', { ascending: false }) // order might be the problem
  if (error) return error
  return { data, count };
}

export async function getInitialPosts(userid: string) { // initial posts (10)
  const { data, error } = await supabase.from("posts")
    .select('*, posted_by: profiles(id, avatar, display_name, email)')
    .eq('posted_by', userid)
    .range(0, 9)
    .order('id', { ascending: false }) // order might be the problem
  if (error) return error
  return data;
}
