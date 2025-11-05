"use client";
import { handleFollowToggle } from "@/features/follow/actions/handle-follow-toggle";
export function ProfileFollowButton({
  currentUserId,
  userId,
}: {
  currentUserId: string | null;
  userId: string | null;
}) {
  function onClick() {
    if (!currentUserId || !userId || currentUserId === userId) {
      return;
    }

    const isFollow = handleFollowToggle(currentUserId, userId);
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="-mb-1 absolute right-0 h-7 w-[110px] rounded-4xl border-none bg-linear-to-r from-[#A9D6DD] to-[#739ED5] text-[17px] text-white"
    >
      ＋ フォロー
    </button>
  );
}
