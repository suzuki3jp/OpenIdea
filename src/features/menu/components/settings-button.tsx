/**
 * 設定ボタンコンポーネント
 * アイコンデータは lucide-react でいいのがあればそれを使う
 * なければデザイン側で SVG を作ってもらってそれを使う
 * 内部で useIsSmallDevice を使って画面サイズに応じたスタイルを適用する
 */
import { Settings } from "lucide-react";
export function SettingsButton() {
  return (
    <button className="setting" type="button">
      <div className="setting-icon">
        <Settings className="h-full w-full stroke-[2.5] text-[#946B54]" />
      </div>
    </button>
  );
}
