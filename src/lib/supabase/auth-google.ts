"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signInWithGoogle() {
  const supabase = await createClient();
  const {
    data: { url },
    error,
  } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.SUPABASE_AUTH_URL}/auth/callback`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });
  // biome-ignore lint/suspicious/noConsole: <explanation>
  if (error) console.error("Googleログインエラー:", error.message);
  if (!error && url) redirect(url);
}

export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  // biome-ignore lint/suspicious/noConsole: <explanation>
  if (error) console.error("Googleログアウトエラー:", error.message);
  if (!error) return true;
  return false;
}
