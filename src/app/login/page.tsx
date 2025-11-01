"use client";

import { useRouter } from "next/navigation";
import { signInWithGoogle, signOut } from "@/lib/supabase/auth-google";

export default function LoginPage() {
  const handleGoogleLogin = async () => {
    await signInWithGoogle();
  };

  const router = useRouter();
  const handleGoogleLogout = async () => {
    const result = await signOut();
    if (result) router.refresh();
  };

  return (
    <div>
      <button type="submit" onClick={handleGoogleLogin}>
        ログイン
      </button>
      <button type="submit" onClick={handleGoogleLogout}>
        ログアウト
      </button>
    </div>
  );
}
