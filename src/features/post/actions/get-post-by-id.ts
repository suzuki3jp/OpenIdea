"use server";

import type { SupabaseClient } from "@supabase/supabase-js";
import { consoleError } from "@/lib/consoleError";
import { convertDBPostToPost } from "../lib/convert-post";
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
    consoleError(error);
  }

  return convertDBPostToPost(data);
}
