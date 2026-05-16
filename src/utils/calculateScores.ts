import type { Player } from "../types/player";
import type {
  ScoreCategory,
  ScoreCategoryId,
  ScoreDraft,
} from "../types/score";

export type PlayerScoreResult = {
  playerId: string;
  totalScore: number;
  coinScore: number;
  rank: number;
  isLeader: boolean;
};

export function getScoreInputValue(
  scoreDraft: ScoreDraft,
  playerId: string,
  categoryId: ScoreCategoryId
): string {
  return scoreDraft[playerId]?.[categoryId] ?? "";
}

export function getScoreNumber(
  scoreDraft: ScoreDraft,
  playerId: string,
  categoryId: ScoreCategoryId
): number {
  const rawValue = getScoreInputValue(scoreDraft, playerId, categoryId);
  const numericValue = Number(rawValue);

  if (!Number.isFinite(numericValue)) {
    return 0;
  }

  return numericValue;
}

export function calculateTotalScore(
  scoreDraft: ScoreDraft,
  playerId: string,
  categories: ScoreCategory[]
): number {
  return categories.reduce((total, category) => {
    return total + getScoreNumber(scoreDraft, playerId, category.id);
  }, 0);
}

export function calculateCoinScore(
  scoreDraft: ScoreDraft,
  playerId: string
): number {
  return getScoreNumber(scoreDraft, playerId, "coin");
}

export function calculatePlayerScoreResults(
  players: Player[],
  categories: ScoreCategory[],
  scoreDraft: ScoreDraft
): PlayerScoreResult[] {
  const results = players.map((player) => ({
    playerId: player.id,
    totalScore: calculateTotalScore(scoreDraft, player.id, categories),
    coinScore: calculateCoinScore(scoreDraft, player.id),
    rank: 0,
    isLeader: false,
  }));

  const sortedResults = [...results].sort((a, b) => {
    if (b.totalScore !== a.totalScore) {
      return b.totalScore - a.totalScore;
    }

    return b.coinScore - a.coinScore;
  });

  const topResult = sortedResults[0];

  const rankedResults: PlayerScoreResult[] = [];

  for (const result of sortedResults) {
    const previousResult = rankedResults[rankedResults.length - 1];

    const hasSameRankAsPrevious =
      previousResult &&
      previousResult.totalScore === result.totalScore &&
      previousResult.coinScore === result.coinScore;

    const rank = hasSameRankAsPrevious
      ? previousResult.rank
      : rankedResults.length + 1;

    rankedResults.push({
      ...result,
      rank,
      isLeader:
        Boolean(topResult) &&
        result.totalScore === topResult.totalScore &&
        result.coinScore === topResult.coinScore,
    });
  }

  return rankedResults;
}