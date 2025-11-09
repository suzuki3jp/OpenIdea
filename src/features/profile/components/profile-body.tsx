import type { User } from "@/features/auth/convert-db-user-to-user";
import { getPosts } from "@/features/post/actions/get-posts";
import { PostCard } from "@/features/post/components/post-card";
import { createClient } from "@/lib/supabase/server";
export async function ProfileBody({
  user,
  currentUserId,
}: {
  user: User | null;
  currentUserId: string | null;
}) {
  if (!user || !currentUserId) {
    return null;
  }

  const client = await createClient();
  const posts = await getPosts(client, 50, [user.id]);

  return (
    <div className={`space-y-5 px-8 py-11 ${posts.length > 2 ? "pb-32" : ""}`}>
      {posts.map((post) => (
        <PostCard
          key={post.postId}
          icon={user.iconPath}
          {...post}
          showIcon={false}
        />
      ))}
    </div>
  );
}
