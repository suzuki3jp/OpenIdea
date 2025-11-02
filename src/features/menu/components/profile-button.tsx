/**
 * プロフィールボタンコンポーネント
 * アイコンデータは lucide-react でいいのがあればそれを使う
 * なければデザイン側で SVG を作ってもらってそれを使う
 * 内部で useIsSmallDevice を使って画面サイズに応じたスタイルを適用する
 */
import { User } from "lucide-react";
export function ProfileButton() {
  return (
    <button className="profile" type="button">
      <div className="profile-icon">
        <User className="h-full w-full stroke-[2.5] text-[#946B54]" />
      </div>
    </button>
  );
}
