import { useEffect, useState } from "react";

export default function usePlayerNameModal(player1Name: string, player2Name: string) {
  const [displayNameInputModal, toDisplayNameInputModal] = useState(false);

  useEffect(() => {
    if (player1Name === "Player 1" || player2Name === "Player 2") toDisplayNameInputModal(true);

    return () => toDisplayNameInputModal(false);
  }, [player1Name, player2Name]);

  return { displayNameInputModal, toDisplayNameInputModal };
}
