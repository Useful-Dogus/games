export interface GameMeta {
  slug: string;
  title: string;
  description: string;
  genre: string[];
  thumbnail: string;
  status: "live" | "coming-soon";
}

export const games: GameMeta[] = [
  {
    slug: "patisserie-drop",
    title: "Patisserie Drop",
    description: "달콤한 디저트를 조합하는 퍼즐 플레이스홀더",
    genre: ["퍼즐", "낙하"],
    thumbnail: "/images/patisserie-drop-placeholder.png",
    status: "coming-soon"
  },
  {
    slug: "sadari",
    title: "사다리",
    description: "간단한 결과 선택형 캐주얼 플레이스홀더",
    genre: ["캐주얼"],
    thumbnail: "/images/sadari-placeholder.png",
    status: "coming-soon"
  },
  {
    slug: "santa-endless-runner",
    title: "Santa Endless Runner",
    description: "산타의 러닝 액션 플레이스홀더",
    genre: ["러너", "아케이드"],
    thumbnail: "/images/santa-endless-runner-placeholder.png",
    status: "coming-soon"
  }
];
