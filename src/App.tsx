import React from "react";
import usePlayerNameModal from "./utils/CustomHooks/usePlayerNameModal";
import NameInputModal from "./components/NameInputModal";
import Player1Section from "./components/Player1Section";
import usePlayer from "./utils/CustomHooks/usePlayer";

function App() {
  const { displayNameInputModal, toDisplayNameInputModal } = usePlayerNameModal();

  const { players } = usePlayer();

  return (
    <div className="main relative h-screen w-screen">
      {displayNameInputModal && (
        <NameInputModal
          toDisplayNameInputModal={toDisplayNameInputModal}
          player1={players.player1}
          player2={players.player2}
        />
      )}

      <div className="board">
        <Player1Section name={players.player1.getPlayerName()} />
      </div>
    </div>
  );
}

export default App;

