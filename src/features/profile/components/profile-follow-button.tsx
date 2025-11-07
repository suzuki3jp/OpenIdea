"use client";

import { useState } from "react";
import { handleFollowToggle } from "@/features/follow/actions/handle-follow-toggle";
export function ProfileFollowButton({
  currentUserId,
  userId,
  isFollowProp,
}: {
  currentUserId: string;
  userId: string;
  isFollowProp: boolean;
}) {
  const [isFollow, setIsFollow] = useState(isFollowProp);
  async function onClick() {
    const newIsFollow = await handleFollowToggle(currentUserId, userId);
    setIsFollow(newIsFollow);
  }

  return (
    <>
      {!isFollow ? (
        <button
          type="button"
          onClick={async () => await onClick()}
          className="-mb-1 absolute right-0 h-7 w-[110px] rounded-4xl border-none bg-linear-to-r from-[#A9D6DD] to-[#739ED5] text-[14px] text-white"
        >
          ＋ フォロー
        </button>
      ) : (
        <button
          type="button"
          onClick={async () => await onClick()}
          className="-mb-1 absolute right-0 h-7 w-[110px] rounded-4xl border-none bg-linear-to-r from-[#F4CABB] to-[#FE5151] text-[14px] text-white"
        >
          フォロー解除
        </button>
      )}
    </>
  );
}
