import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dogus Games",
  description: "브라우저에서 바로 즐기는 캐주얼 게임 허브"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
