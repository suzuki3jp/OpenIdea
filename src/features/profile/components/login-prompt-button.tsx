"use client";

import Link from "next/link";

export function LoginPromptButton() {
  return (
    // フォローボタンの見た目だけどログインページに飛ばすボタン
    <Link href="/login">
      <button
        type="button"
        className="-mb-1 absolute right-0 h-7 w-[110px] rounded-4xl border-none bg-linear-to-r from-[#A9D6DD] to-[#739ED5] text-[14px] text-white"
      >
        ＋ フォロー
      </button>
    </Link>
  );
}
