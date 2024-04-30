import { useState } from "react";
import Player from "../../gamecomponents/Player";

export default function useCoin(player1: Player) {
  const [coinBelongsTo, setCoinBelongsTo] = useState(player1); // Initial

  return { coinBelongsTo, setCoinBelongsTo };
}
