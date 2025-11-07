import { Selector } from "@/components/selector/selector";

export function HomeBodyTypeSelector() {
  const items = [
    {
      label: "おすすめ",
      href: { pathname: "/", query: "recommended" },
    },
    {
      label: "フォロー",
      href: { pathname: "/", query: "following" },
    },
  ];

  return <Selector buttonItems={items} />;
}
