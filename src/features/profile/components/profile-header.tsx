import type { User } from "@/features/auth/convert-db-user-to-user";
import { FollowContainer } from "./follow-container";
import { ProfileBackArrow } from "./profile-back-arrow";
import { ProfileBanner } from "./profile-banner";
import { ProfileBodyTypeSelector } from "./profile-body-type-selector";
import { ProfileIcon } from "./profile-icon";
import { ProfileLevel } from "./profile-level";
import {
  ProfileDisplayName,
  ProfileSelfIntroduction,
} from "./profile-textarea";

export async function ProfileHeader({
  user,
  currentUserId,
}: {
  user: User | null;
  currentUserId: string | null;
}) {
  const isMyProfile: boolean = currentUserId === user?.id;

  return (
    <div className="h-82 w-full bg-white shadow-[4px_4px_4px_0px_rgba(0,0,0,0.4)]">
      <ProfileBackArrow />
      <ProfileBanner bannerPath={user?.bannerPath ?? ""} />
      <div className="relative mx-8 flex h-9 items-end">
        <ProfileIcon iconPath={user?.iconPath ?? ""} />
        <ProfileLevel level={user?.level ?? 1} />

        {!isMyProfile && (
          <FollowContainer
            currentUserId={currentUserId}
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
