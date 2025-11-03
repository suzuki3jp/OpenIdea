"use server";

import type { SupabaseClient } from "@supabase/supabase-js";
import { convertDBPostToPost } from "@/features/lib/convert-dbpost-to-post";
import type { Post } from "../types";

export async function getPostById(
  supabase: SupabaseClient,
  id: string,
): Promise<Post> {
  const { data, error } = await supabase
    .from("Posts")
    .select("*")
    .eq("post_id", id)
    .single();

  if (error) {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.error(error);
  }

  return convertDBPostToPost(data);
}
