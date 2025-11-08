"use client";
import { usePathname } from "next/navigation";
import { Selector } from "@/components/selector/selector";

interface ProfileBodyTypeSelectorProps {
  isMyProfile: boolean;
}

export function ProfileBodyTypeSelector({
  isMyProfile,
}: ProfileBodyTypeSelectorProps) {
  return isMyProfile ? (
    <MyProfileBodyTypeSelector />
  ) : (
    <OtherProfileBodyTypeSelector />
  );
}
// 3ボタン用の設定
function MyProfileBodyTypeSelector() {
  const pathname = usePathname() ?? "/users";
  const items = [
    {
      label: "投稿",
      href: { pathname, query: "posts" },
    },
    {
      label: "いいね",
      href: { pathname, query: "likes" },
    },
    {
      label: "購入履歴",
      href: { pathname, query: "purchases" },
    },
  ];
  return <Selector buttonItems={items} />;
}

// 2ボタン用の設定
function OtherProfileBodyTypeSelector() {
  const pathname = usePathname() ?? "/users";
  const items = [
    {
      label: "投稿",
      href: { pathname, query: "posts" },
    },
    {
      label: "いいね",
      href: { pathname, query: "likes" },
    },
  ];
  return <Selector buttonItems={items} />;
}
