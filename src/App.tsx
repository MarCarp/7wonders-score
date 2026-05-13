import { useMemo, useState } from "react";
import "./App.css";

import { ExtensionSelector } from "./components/ExtensionSelector";
import { PlayerSelector } from "./components/PlayerSelector";
import { scoreCategories, getActiveScoreCategories } from "./data/scoreCategories";
import { players } from "./data/players";
import type { ExtensionId } from "./types/game";

const defaultEnabledExtensions: Record<ExtensionId, boolean> = {
  armada: false,
  cities: false,
  leaders: false,
  edifice: false,
};

function App() {
  const [enabledExtensions, setEnabledExtensions] = useState(
    defaultEnabledExtensions
  );

  const [selectedPlayerIds, setSelectedPlayerIds] = useState<string[]>([]);

  const activeScoreCategories = useMemo(() => {
    return getActiveScoreCategories(enabledExtensions);
  }, [enabledExtensions]);

  const selectedPlayers = useMemo(() => {
    return players.filter((player) => selectedPlayerIds.includes(player.id));
  }, [selectedPlayerIds]);

  const canStartGame = selectedPlayerIds.length >= 3 && selectedPlayerIds.length <= 7;

  function handleToggleExtension(extensionId: ExtensionId) {
    setEnabledExtensions((currentEnabledExtensions) => ({
      ...currentEnabledExtensions,
      [extensionId]: !currentEnabledExtensions[extensionId],
    }));
  }

  function handleTogglePlayer(playerId: string) {
    setSelectedPlayerIds((currentSelectedPlayerIds) => {
      const isAlreadySelected = currentSelectedPlayerIds.includes(playerId);

      if (isAlreadySelected) {
        return currentSelectedPlayerIds.filter((id) => id !== playerId);
      }

      if (currentSelectedPlayerIds.length >= 7) {
        return currentSelectedPlayerIds;
      }

      return [...currentSelectedPlayerIds, playerId];
    });
  }

  return (
    <main className="app">
      <h1>7 Wonders Score</h1>

      <PlayerSelector
        players={players}
        selectedPlayerIds={selectedPlayerIds}
        onTogglePlayer={handleTogglePlayer}
      />

      <ExtensionSelector
        enabledExtensions={enabledExtensions}
        onToggle={handleToggleExtension}
      />

      <section>
        <h2>Résumé de la partie</h2>

        <p>
          Joueurs : <strong>{selectedPlayers.length}</strong>
        </p>

        <p>
          Catégories actives : <strong>{activeScoreCategories.length}</strong> /{" "}
          {scoreCategories.length}
        </p>

        <button type="button" disabled={!canStartGame}>
          Créer la feuille de score
        </button>
      </section>

      <section>
        <h2>Catégories de score actives</h2>

        <ul className="score-category-list">
          {activeScoreCategories.map((category) => (
            <li key={category.id}>
              <strong>{category.label}</strong>
              <span>{category.source}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default App;