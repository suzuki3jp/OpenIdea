import { Selector } from "@/components/selector/selector";

export function HomeBodyTypeSelector() {
  const buttonItems: string[] = ["フォロー", "おすすめ"];

  return <Selector buttonItems={buttonItems} />;
}
