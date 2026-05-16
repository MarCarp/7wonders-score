import type { Player } from "../types/player";
import type { ScoreCategory, ScoreDraft } from "../types/score";
import {
  calculateCoinScore,
  calculateTotalScore,
  getScoreInputValue,
} from "../utils/calculateScores";

type ScoreTableProps = {
  players: Player[];
  categories: ScoreCategory[];
  scoreDraft: ScoreDraft;
  onScoreChange: (
    playerId: string,
    categoryId: ScoreCategory["id"],
    value: string
  ) => void;
};

export function ScoreTable({
  players,
  categories,
  scoreDraft,
  onScoreChange,
}: ScoreTableProps) {
  return (
    <section>
      <h2>Feuille de score</h2>

      <div className="score-table-wrapper">
        <table className="score-table">
          <thead>
            <tr>
              <th>Catégorie</th>
              {players.map((player) => (
                <th key={player.id}>{player.name}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <th>{category.label}</th>

                {players.map((player) => (
                  <td key={`${player.id}-${category.id}`}>
                    <input
                      type="number"
                      step="1"
                      value={getScoreInputValue(
                        scoreDraft,
                        player.id,
                        category.id
                      )}
                      onChange={(event) =>
                        onScoreChange(player.id, category.id, event.target.value)
                      }
                      aria-label={`${category.label} - ${player.name}`}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <th>Total</th>
              {players.map((player) => (
                <td key={`${player.id}-total`}>
                  <strong>
                    {calculateTotalScore(scoreDraft, player.id, categories)}
                  </strong>
                </td>
              ))}
            </tr>

            <tr>
              <th>Monnaie</th>
              {players.map((player) => (
                <td key={`${player.id}-coin`}>
                  {calculateCoinScore(scoreDraft, player.id)}
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
}