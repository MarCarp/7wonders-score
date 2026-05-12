import type { ExtensionId } from "./game";

export type ScoreCategorySource = "base" | ExtensionId;

export type ScoreCategoryId =
  | "wonder"
  | "coin"
  | "blue"
  | "yellow"
  | "green"
  | "red"
  | "purple"
  | "armada_naval_war"
  | "armada_island"
  | "cities_black"
  | "leaders_white"
  | "edifice_orange";

export type ScoreCategory = {
  id: ScoreCategoryId;
  label: string;
  source: ScoreCategorySource;
  order: number;
};

export type ScoreEntry = {
  id: string;
  gameId: string;
  playerId: string;
  categoryId: ScoreCategoryId;
  value: number;
};