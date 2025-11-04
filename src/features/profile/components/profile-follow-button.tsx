export function ProfileFollowButton({
  currentUserId,
  userId,
}: {
  currentUserId: string | null;
  userId: string | null;
}) {
  return (
    <button
      type="button"
      className="-mb-1 absolute right-0 h-7 w-[110px] rounded-4xl border-none bg-linear-to-r from-[#A9D6DD] to-[#739ED5] text-[17px] text-white"
    >
      ＋ フォロー
    </button>
  );
}
