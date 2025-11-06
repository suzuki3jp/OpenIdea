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
  const buttonItems: string[] = ["投稿", "いいね", "購入履歴"];
  return <Selector buttonItems={buttonItems} />;
}

// 2ボタン用の設定
function OtherProfileBodyTypeSelector() {
  const buttonItems: string[] = ["投稿", "いいね"];

  return <Selector buttonItems={buttonItems} />;
}
