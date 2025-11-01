/**
 * Mobile 版のメニューコンポーネント
 * 画面下部につくやつ
 */
export function MobileMenu() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "100px",
        backgroundImage:
          "linear-gradient(90deg, #ffeebe, #fee290 18%, #facb72 56%, #fa9e72)",
        boxShadow: "0 -5px 10px rgba(0, 0, 0, 0.1)",
      }}
    ></div>
  );
}
