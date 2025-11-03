import type { Post } from "../post/types";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function convertDBPostToPost(data: any): Post {
  return {
    postId: data.post_id,
    userId: data.user_id,
    postTitle: data.post_title,
    goodCount: data.good_count,
    badCount: data.bad_count,
    freeContent: data.free_content,
    paidContent: data.paid_content,
  };
}
