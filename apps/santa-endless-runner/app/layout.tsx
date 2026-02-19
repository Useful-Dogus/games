import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Santa Endless Runner",
  description: "러너 장르 캐주얼 게임 준비 중"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
