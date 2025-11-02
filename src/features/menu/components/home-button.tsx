/**
 * メニューの中にあるホームボタンコンポーネント
 * デスクトップ版とモバイル版で共通で使う
 * デスクトップ版の場合は 127px, モバイル版の場合は 112px が直径（Figma参照）
 * 内部で useIsSmallDevice を使って画面サイズに応じたスタイルを適用する
 */
import { House } from "lucide-react";
export function HomeButton() {
  return (
    <button className="home-button" type="button">
      <div className="home-icon">
        <House className="h-full w-full stroke-[2.5] text-[#946B54]" />
      </div>
    </button>
  );
}
