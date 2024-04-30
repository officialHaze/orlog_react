import React from "react";
import usePlayerNameModal from "./utils/CustomHooks/usePlayerNameModal";
import NameInputModal from "./components/NameInputModal";
import usePlayer from "./utils/CustomHooks/usePlayer";
import PlayerCard from "./components/PlayerCard";
import useResolutionPhase from "./utils/CustomHooks/useResolutionPhase";
import ResolutionPhase from "./components/ResolutionPhase";
import usePlayerHealth from "./utils/CustomHooks/usePlayerHealth";

function App() {
  const { players, currentPlayer, setCurrentPlayer, switchCoin } = usePlayer();

  const { displayNameInputModal, toDisplayNameInputModal } = usePlayerNameModal(
    players.player1.getPlayerName(),
    players.player2.getPlayerName()
  );

  const { setRoundOverForPlayers, startResolutionPhase, toStartResolutionPhase } =
    useResolutionPhase();

  const { health: health1, updateHealthHelper: setHealth1 } = usePlayerHealth(players.player1);
  const { health: health2, updateHealthHelper: setHealth2 } = usePlayerHealth(players.player2);

  return (
    <div className="main relative h-screen w-screen">
      {displayNameInputModal && (
        <NameInputModal
          toDisplayNameInputModal={toDisplayNameInputModal}
          player1={players.player1}
          player2={players.player2}
        />
      )}

      {startResolutionPhase ? (
        <ResolutionPhase
          player1={players.player1}
          player2={players.player2}
          toStartResolutionPhase={toStartResolutionPhase}
          switchCoin={switchCoin}
          resetRoundOverForPlayers={setRoundOverForPlayers}
          health1={health1}
          health2={health2}
          setHealth1={setHealth1}
          setHealth2={setHealth2}
        />
      ) : (
        <div className="board h-full flex justify-center items-center gap-10 p-20">
          <PlayerCard
            player={players.player1}
            currentPlayer={currentPlayer}
            allPlayers={players}
            setCurrentPlayer={setCurrentPlayer}
            roundOverFor={setRoundOverForPlayers}
            health={health1}
          />
          <PlayerCard
            player={players.player2}
            currentPlayer={currentPlayer}
            allPlayers={players}
            setCurrentPlayer={setCurrentPlayer}
            roundOverFor={setRoundOverForPlayers}
            health={health2}
          />
        </div>
      )}
    </div>
  );
}

export default App;
