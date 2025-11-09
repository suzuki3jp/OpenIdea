import { redirect } from "next/navigation";
import { getCurrentUser } from "@/features/auth/get-current-user";
import { SettingBackground } from "@/features/setting/components/setting-background";
import { SettingHeader } from "@/features/setting/components/setting-header";
import { SettingPage } from "@/features/setting/components/setting-page";
import { createClient } from "@/lib/supabase/server";

export default async function () {
  const supabase = await createClient();
  const currentUser = await getCurrentUser(supabase);

  //  ログインしてなければログインページへ
  if (!currentUser) redirect("/login");

  return (
    <SettingBackground>
      <SettingHeader prevUrl={"/"} label="設定" />
      <SettingPage />
    </SettingBackground>
  );
}
