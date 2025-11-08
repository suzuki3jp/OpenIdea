import { redirect } from "next/navigation";
import { getCurrentUser } from "@/features/auth/get-current-user";
import { SettingBackground } from "@/features/setting/components/setting-background";
import { SettingHeader } from "@/features/setting/components/setting-header";
import { SettingProfileForm } from "@/features/setting/components/setting-profile/setting-profile-form";
import { createClient } from "@/lib/supabase/server";

export default async function () {
  const supabase = await createClient();
  const currentUser = await getCurrentUser(supabase);

  //  ログインしてなければログインページへ
  if (!currentUser) redirect("/login");

  return (
    <SettingBackground>
      <SettingHeader label="プロフィール設定" />
      <SettingProfileForm currentUser={currentUser} />
    </SettingBackground>
  );
}
