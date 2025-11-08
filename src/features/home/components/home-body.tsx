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
  if (!query) {
    query = "recommended";
  }

  const posts = await getPostsByQuery(query, client);

  if (!posts || posts.length === 0) {
    return <div>投稿がありません</div>;
  }

  // ユーザ情報を一括取得 component化したい

  const userIds = Array.from(new Set(posts.map((p) => p.userId)));

  const { data: usersData } = await client
    .from("Users")
    .select("user_id, icon_path")
    .in("user_id", userIds);

  const iconByUserId = new Map<string, string | undefined>();
  (usersData ?? []).forEach((u) => {
    iconByUserId.set(u.user_id, u.icon_path);
  });

  return (
    <div className="no-scrollbar mt-[30px] flex max-h-[600px] flex-col items-center gap-4 overflow-y-scroll">
      {posts.map((post) => {
        const icon = iconByUserId.get(post.userId) ?? null;

        return <HomeCard key={post.postId} {...post} icon={icon} />;
      })}
    </div>
  );
}
