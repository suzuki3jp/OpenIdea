import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const userRes = await supabase.auth.getUser();
      const uid = userRes.data?.user?.id ?? null;

      if (uid) {
        const { data, error: selectError } = await supabase
          .from("Users")
          .select("user_id")
          .eq("user_id", uid)
          .maybeSingle();

        if (!selectError && data === null) {
          const payload = {
            user_id: uid,
            display_name: null,
            icon_path: null,
            banner_path: null,
            level: 1,
            self_introduction: null,
          };

          const { error: insertError } = await supabase
            .from("Users")
            .insert(payload);

          if (insertError && insertError) {
            // biome-ignore lint/suspicious/noConsole: <explanation>
            console.error("ユーザー作成エラー", insertError);
          }
        }

        const forwardedHost = request.headers.get("x-forwarded-host");
        const isLocalEnv = process.env.NODE_ENV === "development";

        if (isLocalEnv) {
          return NextResponse.redirect(`${origin}${next}`);
        } else if (forwardedHost) {
          return NextResponse.redirect(`https://${forwardedHost}${next}`);
        } else {
          return NextResponse.redirect(`${origin}${next}`);
        }
      }
    }

    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }
}
