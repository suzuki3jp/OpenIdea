import type { User } from "@/features/auth/convert-db-user-to-user";
import { ProfileBackArrow } from "./profile-back-arrow";
import { ProfileBanner } from "./profile-banner";
import { ProfileBodyTypeSelector } from "./profile-body-type-selector";
import { ProfileFollowButton } from "./profile-follow-button";
import { ProfileIcon } from "./profile-icon";
import { ProfileLevel } from "./profile-level";
import {
  ProfileDisplayName,
  ProfileSelfIntroduction,
} from "./profile-textarea";
// このコンポーネントには遊佐ーネームとかアイコンとかのエリアを担当しそう
// profile-follow-button.tsx, profile-body-type-selector.tsx などと組み合わせて使う想定
export function ProfileHeader({
  user,
  currentUserId,
}: {
  user: User | null;
  currentUserId: string | null;
}) {
  const isMyProfile: boolean = currentUserId === user?.id;

  return (
    <div className="h-82 w-full border-b bg-white shadow-[4px_4px_4px_0px_rgba(0,0,0,0.4)]">
      <ProfileBackArrow />
      <ProfileBanner bannerPath={user?.bannerPath ?? ""} />
      <div className="relative mx-8 flex h-9 items-end">
        <ProfileIcon iconPath={user?.iconPath ?? ""} />
        <ProfileLevel level={user?.level ?? 1} />

        {!isMyProfile && (
          <ProfileFollowButton
            currentUserId={currentUserId ?? null}
            userId={user?.id ?? null}
          />
        )}
      </div>

      <div className="mx-8">
        <ProfileDisplayName
          displayName={user?.displayName ?? "名無しのユーザー"}
        />
        <ProfileSelfIntroduction
          selfIntroduction={user?.selfIntroduction ?? "ひとこと"}
        />
        <ProfileBodyTypeSelector isMyProfile={isMyProfile} />
      </div>
    </div>
  );
}
