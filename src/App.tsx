import { useMemo, useState } from "react";
import "./App.css";

import { ExtensionSelector } from "./components/ExtensionSelector";
import { getActiveScoreCategories } from "./data/scoreCategories";
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

  const activeScoreCategories = useMemo(() => {
    return getActiveScoreCategories(enabledExtensions);
  }, [enabledExtensions]);

  function handleToggleExtension(extensionId: ExtensionId) {
    setEnabledExtensions((currentEnabledExtensions) => ({
      ...currentEnabledExtensions,
      [extensionId]: !currentEnabledExtensions[extensionId],
    }));
  }

  return (
    <main className="app">
      <h1>7 Wonders Score</h1>

      <ExtensionSelector
        enabledExtensions={enabledExtensions}
        onToggle={handleToggleExtension}
      />

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