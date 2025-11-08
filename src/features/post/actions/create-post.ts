"use server";

import { redirect } from "next/navigation";
import * as v from "valibot";
import { createTags } from "@/features/tags/actions/create-tags";
import type { TagType } from "@/features/tags/types";
import { consoleError } from "@/lib/consoleError";
import { createClient } from "@/lib/supabase/server";
import { convertDBPostToPost } from "../lib/convert-post";
import { postSchema } from "../schemas";
import type { NewPost } from "../types";

export async function createPost(newPost: NewPost, newTags: TagType[]) {
  const supabase = await createClient();

  // ログインしてない人ははじく
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, message: "認証が必要です" };
  }

  // postのバリデーション
  const rawData = {
    title: newPost.postTitle,
    freeContent: newPost.freeContent,
    paidContent: newPost.paidContent,
  };
  const validatedPostData = v.parse(postSchema, rawData);

  // Create Tags
  const postTags = await createTags(supabase, newTags);

  // Insert Post
  const { data, error: postError } = await supabase
    .from("Posts")
    .insert({
      user_id: user.id,
      post_title: validatedPostData.title,
      free_content: validatedPostData.freeContent,
      paid_content: validatedPostData.paidContent,
      good_count: 0,
      bad_count: 0,
    })
    .select()
    .single();

  if (postError) {
    consoleError(postError);
  }

  // convert post
  const post = convertDBPostToPost(data);

  // postにタグあればInsert PostTags
  if (postTags) {
    const { error: postTagsError } = await supabase.from("PostTags").insert(
      postTags.map((tag) => ({
        post_id: post.postId,
        tag_id: tag.tagId,
      })),
    );

    if (postTagsError) {
      consoleError(postTagsError);
    }
  }

  redirect(`/post/${post.postId}`);
}
