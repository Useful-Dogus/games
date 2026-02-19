import Link from "next/link";

const hubUrl =
  process.env.NEXT_PUBLIC_HUB_URL ??
  (process.env.NODE_ENV === "development" ? "http://127.0.0.1:3000" : "https://dogusgames.com");

export default function PlaceholderPage() {
  return (
    <main>
      <h1>Patisserie Drop</h1>
      <p>디저트를 테마로 한 퍼즐 게임 준비 중</p>
      <p>이 페이지는 1차 모노레포 구축 단계의 플레이스홀더입니다.</p>
      <Link href={hubUrl}>허브로 돌아가기</Link>
    </main>
  );
}
