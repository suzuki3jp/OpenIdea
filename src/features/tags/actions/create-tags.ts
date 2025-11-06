"use server";

import * as v from "valibot";
import { consoleError } from "@/lib/consoleError";
import { createClient } from "@/lib/supabase/server";
import { convertDBTagsToTags } from "../lib/convert-tag";
import { tagNameSchema } from "../schemas";
import type { TagType } from "../types";

export async function createTags(tags: TagType[]): Promise<TagType[] | null> {
  const supabase = await createClient();

  // tagのバリデーション
  const tagNames = tags.map((tag) => tag.tagName);
  const tagArraySchema = v.array(tagNameSchema);
  v.parse(tagArraySchema, tagNames);

  const { data, error } = await supabase
    .from("Tags")
    .insert(
      tags.map((tag) => ({
        tag_name: tag.tagName,
      })),
    )
    .select("*");
  if (error) {
    consoleError(error);
    return null;
  }

  return convertDBTagsToTags(data);
}
