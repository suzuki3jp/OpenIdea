import type { SupabaseClient } from "@supabase/supabase-js";
import { getPostsByQuery } from "../actions/get-posts-by-query";
import { HomeCard } from "./home-card";

export async function HomeBody({
  query,
  client,
}: {
  query: string | string[] | undefined;
  client: SupabaseClient;
}) {
  const posts = await getPostsByQuery(query, client);

  if (!posts || posts.length === 0) {
    return <div>投稿がありません</div>;
  }

  return (
    <div>
      {posts.map((post) => (
        <HomeCard key={post.postId} {...post} />
      ))}
    </div>
  );
}
