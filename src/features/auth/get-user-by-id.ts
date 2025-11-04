import type { SupabaseClient } from "@supabase/supabase-js";
import { convertDBUserToUser } from "./convert-db-user-to-user";

export async function getUserById(id: string, client: SupabaseClient) {
  const { data: user, error } = await client
    .from("Users")
    .select("*")
    .eq("user_id", id)
    .maybeSingle();

  if (error || !user) return null;

  return convertDBUserToUser(user);
}
