import Link from "next/link";
import { SettingContainer } from "./setting-container";

const items = [
  {
    url: "profile",
    label: "プロフィール設定",
  },
  {
    url: "interest",
    label: "興味分野の設定",
  },
  {
    url: "terms-of-use",
    label: "利用規約",
  },
  {
    url: "sale",
    label: "販売設定",
  },
  {
    url: "sales",
    label: "販売履歴",
  },
  {
    url: "payment",
    label: "支払い設定",
  },
];

export function SettingPage() {
  return (
    <div className="bg-[#FFFEEE]">
      <ul>
        {items.map((item, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <SettingContainer key={index} className="py-6 text-lg">
            <Link href={`/setting/${item.url}`} className="pl-22">
              {item.label}
            </Link>
          </SettingContainer>
        ))}
      </ul>
    </div>
  );
}
