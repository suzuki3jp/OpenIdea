"use server";

import * as v from "valibot";
import { createClient } from "@/lib/supabase/server";
import { postSchema } from "../schemas";

export async function createPost(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, message: "認証が必要です" };
  }

  const rawData = {
    title: formData.get("title"),
    freeContent: formData.get("freeContent"),
    paidContent: formData.get("paidContent"),
  };
  try {
    const validatedData = v.parse(postSchema, rawData);

    const { data, error } = await supabase.from("Posts").insert({
      user_id: user.id,
      post_title: validatedData.title,
      free_content: validatedData.freeContent,
      paid_content: validatedData.paidContent,
      good_count: 0,
      bad_count: 0,
    });
    if (error) {
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.error("supabase insert error", error);
    }
  } catch (error) {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.error(error);
  }
}
