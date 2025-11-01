/**
 * プロフィールボタンコンポーネント
 * アイコンデータは lucide-react でいいのがあればそれを使う
 * なければデザイン側で SVG を作ってもらってそれを使う
 * 内部で useIsSmallDevice を使って画面サイズに応じたスタイルを適用する
 */
import { User } from "lucide-react";
export function ProfileButton() {
  return (
    <button
      type="button"
      style={{
        height: "100px",
      }}
    >
      <User
        width={43}
        height={43}
        color="#946B54"
        strokeWidth={2.5}
        style={{
          margin: "auto",
        }}
      />
    </button>
  );
}
