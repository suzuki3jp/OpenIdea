import { getPostById } from "@/features/post/actions/get-post-by-id";
import { PostDetail } from "@/features/post/components/post-detail";
import { getTagsByPostId } from "@/features/tags/actions/get-tags-by-post-id";
import { createClient } from "@/lib/supabase/server";

export default async function ({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const supabase = await createClient();
  const id = (await params).id;
  const post = await getPostById(supabase, id);
  const postTags = await getTagsByPostId(supabase, post.postId);

  return <PostDetail post={post} tags={postTags} />;
}
