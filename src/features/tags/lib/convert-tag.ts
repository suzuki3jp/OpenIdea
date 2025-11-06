import type { TagType } from "../tags/types";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function convertDBTagsToTags(data: any): TagType[] {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const tags: TagType[] = data.map((item: { tag_name: any; tag_id: any }) => ({
    tagName: item.tag_name,
    tagId: item.tag_id,
  }));

  return tags;
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function convertDBTagToTag(data: any): TagType {
  const tag: TagType = {
    tagName: data.tag_name,
    tagId: data.tag_id,
  };

  return tag;
}
