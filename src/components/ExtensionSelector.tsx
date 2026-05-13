import type { ExtensionId } from "../types/game";

const extensionIds: ExtensionId[] = ["armada", "cities", "leaders", "edifice"];

const extensionLabels: Record<ExtensionId, string> = {
  armada: "Armada",
  cities: "Cities",
  leaders: "Leaders",
  edifice: "Edifice",
};

type ExtensionSelectorProps = {
  enabledExtensions: Record<ExtensionId, boolean>;
  onToggle: (extensionId: ExtensionId) => void;
};

export function ExtensionSelector({
  enabledExtensions,
  onToggle,
}: ExtensionSelectorProps) {
  return (
    <section>
      <h2>Extensions</h2>

      <div className="extension-list">
        {extensionIds.map((extensionId) => (
          <label key={extensionId} className="extension-item">
            <input
              type="checkbox"
              checked={enabledExtensions[extensionId]}
              onChange={() => onToggle(extensionId)}
            />
            {extensionLabels[extensionId]}
          </label>
        ))}
      </div>
    </section>
  );
}