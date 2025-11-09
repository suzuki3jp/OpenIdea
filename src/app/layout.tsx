import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Open Idea",
  description: "SNS形式で気軽にアイデアを売買しよう",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
