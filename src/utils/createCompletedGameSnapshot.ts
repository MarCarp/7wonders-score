import type { ExtensionId, Game, GamePlayer } from "../types/game";
import type { Player } from "../types/player";
import type { ScoreCategory, ScoreDraft, ScoreEntry } from "../types/score";
import {
  calculatePlayerScoreResults,
  getScoreNumber,
} from "./calculateScores";

export type CompletedGameSnapshot = {
  game: Game;
  gamePlayers: GamePlayer[];
  scoreEntries: ScoreEntry[];
};

function createId(prefix: string): string {
  return `${prefix}_${crypto.randomUUID()}`;
}

export function createCompletedGameSnapshot(params: {
  players: Player[];
  categories: ScoreCategory[];
  scoreDraft: ScoreDraft;
  enabledExtensions: Record<ExtensionId, boolean>;
}): CompletedGameSnapshot {
  const { players, categories, scoreDraft, enabledExtensions } = params;

  const now = new Date().toISOString();
  const gameId = createId("game");

  const scoreResults = calculatePlayerScoreResults(
    players,
    categories,
    scoreDraft
  );

  const topScore = Math.max(...scoreResults.map((result) => result.totalScore));

  const playersWithTopScore = scoreResults.filter(
    (result) => result.totalScore === topScore
  );

  const leaders = scoreResults.filter((result) => result.isLeader);

  const winnerPlayerId = leaders.length === 1 ? leaders[0].playerId : null;

  const game: Game = {
    id: gameId,
    status: "completed",
    createdAt: now,
    completedAt: now,
    playedAt: now,
    playerCount: players.length,
    winnerPlayerId,
    tieBreakerUsed: playersWithTopScore.length > 1,
    enabledExtensions: {
      ...enabledExtensions,
    },
  };

  const gamePlayers: GamePlayer[] = scoreResults.map((result, index) => ({
    id: createId("game_player"),
    gameId,
    playerId: result.playerId,
    position: index + 1,
    totalScore: result.totalScore,
    coinScore: result.coinScore,
    rank: result.rank,
    isWinner: winnerPlayerId === result.playerId,
  }));

  const scoreEntries: ScoreEntry[] = players.flatMap((player) =>
    categories.map((category) => ({
      id: createId("score"),
      gameId,
      playerId: player.id,
      categoryId: category.id,
      value: getScoreNumber(scoreDraft, player.id, category.id),
    }))
  );

  return {
    game,
    gamePlayers,
    scoreEntries,
  };
}