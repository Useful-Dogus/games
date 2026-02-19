import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Patisserie Drop",
  description: "디저트를 테마로 한 퍼즐 게임 준비 중"
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
