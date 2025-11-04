import { getCurrentUser } from "@/features/auth/get-current-user";
import { getUserById } from "@/features/auth/get-user-by-id";
import { ProfileBody } from "@/features/profile/components/profile-body";
import { ProfileHeader } from "@/features/profile/components/profile-header";
import { createClient } from "@/lib/supabase/server";

export default async function ({ params }: PageProps<"/users/[id]">) {
  const userId = (await params).id;
  const client = await createClient();
  const currentUser = await getCurrentUser(client);
  const user = await getUserById(userId, client);

  return (
    <>
      <ProfileHeader user={user} currentUserId={currentUser?.id ?? null} />
      <ProfileBody user={user} currentUserId={currentUser?.id ?? null} />
    </>
  );
}
