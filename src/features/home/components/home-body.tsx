import type { SupabaseClient } from "@supabase/supabase-js";
import { PostCard } from "@/features/post/components/post-card";
import { getPostsByQuery } from "../actions/get-posts-by-query";

export async function HomeBody({
  query = "recommended",
  client,
}: {
  query: string | string[] | undefined;
  client: SupabaseClient;
}) {
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
    <div
      className={`no-scrollbar mt-[30px] flex max-h-[600px] flex-col items-center gap-4 overflow-y-scroll ${posts.length > 3 ? "pb-32" : ""}`} // 3 件以上だとメニューバーに投稿が隠れるため padding を追加してスクロール可能にする
    >
      {posts.map((post) => {
        const icon = iconByUserId.get(post.userId) ?? null;

        return <PostCard key={post.postId} {...post} icon={icon} />;
      })}
    </div>
  );
}
