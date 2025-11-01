"use client";

/**
 * 画面幅が小さいモバイル端末（例: iPhone SE）かどうかを判定するフック
 * 戻り値: true (小さいモバイル端末), false (それ以外)
 * /constants/screen.ts の SMALL_SCREEN_MAX_WIDTH を閾値として使用
 * https://zenn.dev/kenghaya/articles/6020b6192dadec この記事が参考になりそう
 */
export function useIsSmallDevice(): boolean {}
