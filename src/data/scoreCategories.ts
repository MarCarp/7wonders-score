import type { ExtensionId } from "../types/game";
import type { ScoreCategory } from "../types/score";

export const scoreCategories: ScoreCategory[] = [
  { id: "wonder", label: "Merveille", source: "base", order: 1 },
  { id: "coin", label: "Monnaie", source: "base", order: 2 },
  { id: "blue", label: "Bleu", source: "base", order: 3 },
  { id: "yellow", label: "Jaune", source: "base", order: 4 },
  { id: "green", label: "Vert", source: "base", order: 5 },
  { id: "red", label: "Rouge", source: "base", order: 6 },
  { id: "purple", label: "Violet", source: "base", order: 7 },

  { id: "armada_naval_war", label: "Guerre maritime", source: "armada", order: 8 },
  { id: "armada_island", label: "Îles", source: "armada", order: 9 },
  { id: "cities_black", label: "Noir", source: "cities", order: 10 },
  { id: "leaders_white", label: "Blanc", source: "leaders", order: 11 },
  { id: "edifice_orange", label: "Orange", source: "edifice", order: 12 }
];

export function getActiveScoreCategories(
  enabledExtensions: Record<ExtensionId, boolean>
): ScoreCategory[] {
  return scoreCategories
    .filter((category) => {
      if (category.source === "base") return true;
      return enabledExtensions[category.source];
    })
    .sort((a, b) => a.order - b.order);
}