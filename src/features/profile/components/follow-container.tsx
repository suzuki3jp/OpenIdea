import { createClient } from "@/lib/supabase/server";
import { getFollow } from "../../follow/actions/get-follow";
import { LoginPromptButton } from "./login-prompt-button";
import { ProfileFollowButton } from "./profile-follow-button";

type FollowContainerProps = {
  userId: string | null;
  currentUserId: string | null;
};

export async function FollowContainer({
  userId,
  currentUserId,
}: FollowContainerProps) {
  const client = await createClient();
  // もしログインしていたら普通のフォローボタン表示、ログインしてなかったらタミーボタンを表示(currentUserとuserIdがあったら、ログインしてるって判断して良さそう)
  if (currentUserId == null || userId == null)
    return (
      // ログインしてなかったらダミーボタンを表示したい
      <LoginPromptButton />
    );
  else {
    const isFollow = await getFollow({ currentUserId, userId, client }); // フォローしてるかどうか欲しい(get-follow)
    const isFollowing = isFollow.followeeId == null;

    return (
      <ProfileFollowButton
        currentUserId={currentUserId}
        userId={userId}
        isFollowProp={isFollowing}
      />
    );
  }
}
