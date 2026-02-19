import Link from "next/link";
import { getHubCardHref } from "@/config/deployment.config";
import { games } from "@/config/games.config";

export default function HomePage() {
  return (
    <main>
      <header>
        <h1>Dogus Games</h1>
        <p>설치 없이 바로 플레이하는 캐주얼 게임 플랫폼</p>
      </header>

      <section aria-label="게임 목록" className="grid">
        {games.map((game) => {
          const href = getHubCardHref(game);

          return (
            <Link key={game.slug} href={href} className="card">
              <h2>{game.title}</h2>
              <p>{game.description}</p>
              <div className="tags">
                {game.genre.map((genre) => (
                  <span key={genre} className="tag">
                    {genre}
                  </span>
                ))}
              </div>
              {game.status === "coming-soon" ? <span className="status">Coming Soon</span> : null}
            </Link>
          );
        })}
      </section>
    </main>
  );
}
