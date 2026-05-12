export type ExtensionId = "armada" | "cities" | "leaders" | "edifice";

export type GameStatus = "draft" | "completed";

export type Game = {
  id: string;
  status: GameStatus;
  createdAt: string;
  completedAt?: string;
  playedAt: string;
  playerCount: number;
  winnerPlayerId: string | null;
  tieBreakerUsed: boolean;
  enabledExtensions: Record<ExtensionId, boolean>;
};

export type GamePlayer = {
  id: string;
  gameId: string;
  playerId: string;
  position: number;
  totalScore: number;
  coinScore: number;
  rank: number;
  isWinner: boolean;
};