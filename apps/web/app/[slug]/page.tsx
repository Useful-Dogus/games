import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getGameLandingRedirectUrl } from "@/config/deployment.config";
import { games } from "@/config/games.config";

export default async function GameLandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = games.find((item) => item.slug === slug);

  if (!game) {
    notFound();
  }

  const redirectUrl = getGameLandingRedirectUrl(game);
  if (redirectUrl) {
    redirect(redirectUrl);
  }

  const isComingSoon = game.status === "coming-soon";

  return (
    <main>
      <section className="notice-card" aria-label="게임 상태 안내">
        <h1>{game.title}</h1>
        <p>{game.description}</p>
        {isComingSoon ? (
          <p>이 게임은 아직 배포되지 않았습니다. 준비가 끝나면 이 경로에서 바로 플레이할 수 있습니다.</p>
        ) : (
          <p>게임 연결 정보가 확인되지 않았습니다. 배포 URL 설정을 확인해 주세요.</p>
        )}
        <div className="notice-actions">
          <Link href="/">허브 홈으로 돌아가기</Link>
        </div>
      </section>
    </main>
  );
}
