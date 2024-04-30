import { useCallback, useState } from "react";
import Player from "../../gamecomponents/Player";

export default function usePlayerHealth(player: Player) {
  const [health, setHealth] = useState(player.getHealth());

  const updateHealthHelper = useCallback(
    (health: number) => {
      // Update the health in Player class
      player.setHealth(health);
      setHealth(player.getHealth()); // Update the value in UI
    },
    [player]
  );

  return { health, updateHealthHelper };
}
