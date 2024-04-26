import React from "react";
import usePlayerNameModal from "./utils/CustomHooks/usePlayerNameModal";
import NameInputModal from "./components/NameInputModal";
import usePlayer from "./utils/CustomHooks/usePlayer";
import PlayerCard from "./components/PlayerCard";

function App() {
  const { players } = usePlayer();

  const { displayNameInputModal, toDisplayNameInputModal } = usePlayerNameModal(
    players.player1.getPlayerName(),
    players.player2.getPlayerName()
  );

  return (
    <div className="main relative h-screen w-screen">
      {displayNameInputModal && (
        <NameInputModal
          toDisplayNameInputModal={toDisplayNameInputModal}
          player1={players.player1}
          player2={players.player2}
        />
      )}

      <div className="board h-full flex justify-center items-center gap-10 p-20">
        <PlayerCard player={players.player1} />
        <PlayerCard player={players.player2} />
      </div>
    </div>
  );
}

export default App;
