import type { Player } from "../types/player";

type PlayerSelectorProps = {
  players: Player[];
  selectedPlayerIds: string[];
  onTogglePlayer: (playerId: string) => void;
};

export function PlayerSelector({
  players,
  selectedPlayerIds,
  onTogglePlayer,
}: PlayerSelectorProps) {
  const selectedCount = selectedPlayerIds.length;
  const hasMinimumPlayers = selectedCount >= 3;
  const hasMaximumPlayers = selectedCount >= 7;

  return (
    <section>
      <h2>Joueurs</h2>

      <p className="helper-text">
        Sélectionne entre 3 et 7 joueurs. Joueurs sélectionnés :{" "}
        <strong>{selectedCount}</strong>
      </p>

      {!hasMinimumPlayers && (
        <p className="warning-text">
          Il faut encore sélectionner {3 - selectedCount} joueur
          {3 - selectedCount > 1 ? "s" : ""}.
        </p>
      )}

      <div className="player-list">
        {players.map((player) => {
          const isSelected = selectedPlayerIds.includes(player.id);
          const isDisabled = !isSelected && hasMaximumPlayers;

          return (
            <label
              key={player.id}
              className={`player-item ${isSelected ? "is-selected" : ""}`}
            >
              <input
                type="checkbox"
                checked={isSelected}
                disabled={isDisabled}
                onChange={() => onTogglePlayer(player.id)}
              />
              {player.name}
            </label>
          );
        })}
      </div>
    </section>
  );
}