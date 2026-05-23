import { useMemo, useState } from "react";
import "./App.css";

import {
  createCompletedGameSnapshot,
  type CompletedGameSnapshot,
} from "./utils/createCompletedGameSnapshot";


import { ExtensionSelector } from "./components/ExtensionSelector";
import { PlayerSelector } from "./components/PlayerSelector";
import { ScoreTable } from "./components/ScoreTable";
import { players } from "./data/players";
import {
  getActiveScoreCategories,
  scoreCategories,
} from "./data/scoreCategories";
import type { ExtensionId } from "./types/game";
import type { ScoreCategoryId, ScoreDraft } from "./types/score";
import { calculatePlayerScoreResults } from "./utils/calculateScores";

const defaultEnabledExtensions: Record<ExtensionId, boolean> = {
  armada: false,
  cities: false,
  leaders: false,
  edifice: false,
};

function App() {
  const [completedSnapshot, setCompletedSnapshot] =
  useState<CompletedGameSnapshot | null>(null);

  const [enabledExtensions, setEnabledExtensions] = useState(
    defaultEnabledExtensions
  );

  const [selectedPlayerIds, setSelectedPlayerIds] = useState<string[]>([]);
  const [isScoreSheetVisible, setIsScoreSheetVisible] = useState(false);
  const [scoreDraft, setScoreDraft] = useState<ScoreDraft>({});

  const activeScoreCategories = useMemo(() => {
    return getActiveScoreCategories(enabledExtensions);
  }, [enabledExtensions]);

  const selectedPlayers = useMemo(() => {
    return players.filter((player) => selectedPlayerIds.includes(player.id));
  }, [selectedPlayerIds]);

  const scoreResults = useMemo(() => {
    return calculatePlayerScoreResults(
      selectedPlayers,
      activeScoreCategories,
      scoreDraft
    );
  }, [selectedPlayers, activeScoreCategories, scoreDraft]);

  const canStartGame =
    selectedPlayerIds.length >= 3 && selectedPlayerIds.length <= 7;


    function handleCompleteGame() {
  const snapshot = createCompletedGameSnapshot({
    players: selectedPlayers,
    categories: activeScoreCategories,
    scoreDraft,
    enabledExtensions,
  });

  setCompletedSnapshot(snapshot);
}

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

  function handleScoreChange(
    playerId: string,
    categoryId: ScoreCategoryId,
    value: string
  ) {
    setCompletedSnapshot(null);

    setScoreDraft((currentScoreDraft) => ({
      ...currentScoreDraft,
      [playerId]: {
        ...currentScoreDraft[playerId],
        [categoryId]: value,
      },
    }));
  }

  function getPlayerName(playerId: string): string {
    return players.find((player) => player.id === playerId)?.name ?? "Joueur";
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

        <button
          type="button"
          disabled={!canStartGame}
          onClick={() => setIsScoreSheetVisible(true)}
        >
          Créer la feuille de score
        </button>
      </section>

      {isScoreSheetVisible && (
        <>
          <ScoreTable
            players={selectedPlayers}
            categories={activeScoreCategories}
            scoreDraft={scoreDraft}
            onScoreChange={handleScoreChange}
          />

          <section>
            <h2>Classement actuel</h2>

            <ol className="ranking-list">
              {scoreResults.map((result) => (
                <li
                  key={result.playerId}
                  className={result.isLeader ? "is-leader" : ""}
                >
                  <span>
                    #{result.rank} {getPlayerName(result.playerId)}
                  </span>

                  <strong>
                    {result.totalScore} pts
                    {result.coinScore > 0 ? ` · monnaie ${result.coinScore}` : ""}
                  </strong>
                </li>
              ))}
            </ol>
          </section>
        </>
      )}

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

      <section>
  <h2>Fin de partie</h2>

  <button type="button" onClick={handleCompleteGame}>
    Terminer la partie
  </button>

  {completedSnapshot && (
    <div className="completed-game-summary">
      <h3>Partie finalisée</h3>

      <p>
        Gagnant :{" "}
        <strong>
          {completedSnapshot.game.winnerPlayerId
            ? getPlayerName(completedSnapshot.game.winnerPlayerId)
            : "Égalité parfaite"}
        </strong>
      </p>

      <p>
        Joueurs enregistrés :{" "}
        <strong>{completedSnapshot.gamePlayers.length}</strong>
      </p>

      <p>
        Scores enregistrés :{" "}
        <strong>{completedSnapshot.scoreEntries.length}</strong>
      </p>

      <p>
        Départage par monnaie :{" "}
        <strong>
          {completedSnapshot.game.tieBreakerUsed ? "oui" : "non"}
        </strong>
      </p>

      <details>
        <summary>Voir la donnée générée</summary>

        <pre>{JSON.stringify(completedSnapshot, null, 2)}</pre>
      </details>
    </div>
  )}
</section>
    </main>
  );
}

export default App;