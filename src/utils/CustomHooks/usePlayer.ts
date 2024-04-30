import { useCallback, useMemo, useState } from "react";
import Player from "../../gamecomponents/Player";
import useCoin from "./useCoin";

export default function usePlayer() {
  const [players, setPlayers] = useState({
    player1: new Player(1),
    player2: new Player(2),
  });

  const { coinBelongsTo, setCoinBelongsTo } = useCoin(players.player1);

  const [currentPlayer, setCurrentPlayer] = useState(coinBelongsTo);

  useMemo(() => {
    setCurrentPlayer(coinBelongsTo);
  }, [coinBelongsTo]);

  const switchCoin = useCallback(() => {
    coinBelongsTo.getId() === 1
      ? setCoinBelongsTo(players.player2)
      : setCoinBelongsTo(players.player1);
  }, [coinBelongsTo, setCoinBelongsTo, players]);

  return { players, currentPlayer, setCurrentPlayer, switchCoin };
}
