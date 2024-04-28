import { useState } from "react";
import Player from "../../gamecomponents/Player";

export default function usePlayer() {
  const [players, setPlayers] = useState({
    player1: new Player(1),
    player2: new Player(2),
  });

  const [currentPlayer, setCurrentPlayer] = useState(players.player1);

  return { players, currentPlayer, setCurrentPlayer };
}
