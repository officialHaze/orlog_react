import React, { ChangeEvent, useEffect, useState } from "react";
import Player from "../gamecomponents/Player";

interface Props {
  toDisplayNameInputModal: React.Dispatch<React.SetStateAction<boolean>>;
  player1: Player;
  player2: Player;
}

export default function NameInputModal({ toDisplayNameInputModal, player1, player2 }: Props) {
  const [playerNames, setPlayerNamesOnChange] = useState({
    player1Name: "Player 1",
    player2Name: "Player 2",
  });

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;

    switch (id) {
      case "modal-input-player1":
        setPlayerNamesOnChange({
          ...playerNames,
          player1Name: value,
        });
        break;

      case "modal-input-player2":
        setPlayerNamesOnChange({
          ...playerNames,
          player2Name: value,
        });
        break;

      default:
        break;
    }
  };

  // Handle click on done button
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    player1.setPlayerName(playerNames.player1Name);
    player2.setPlayerName(playerNames.player2Name);
  };

  // Handle click outise the main modal
  useEffect(() => {
    const handleClick = (e: any) => {
      if (!e.target.parentNode.id.includes("modal") || !e.target.id.includes("modal"))
        toDisplayNameInputModal(false); // Clicked outside modal, close it
    };

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, [toDisplayNameInputModal]);

  return (
    <div id="modal-bg" className="absolute h-full w-full bg-gray-100 flex justify-center z-10">
      <div id="modal" className="mt-20 w-1/2 h-fit rounded-xl overflow-hidden shadow-lg">
        <header className="bg-red-600 text-white py-2 px-4">
          <h2 className="text-xl font-bold">Assign Player Names</h2>
        </header>
        <div id="modal-body" className="bg-white p-6 flex items-center justify-between">
          <div id="modal-input-wrapper" className="player-1-name-wrapper flex items-center gap-2">
            <i id="modal-input-heading" className="text-lg font-bold">
              Player 1 name:
            </i>
            <input
              id="modal-input-player1"
              type="text"
              className="py-1 px-2 border border-black rounded-md"
              autoComplete="off"
              onChange={handleChange}
            />
          </div>

          <div id="modal-input-wrapper" className="player-2-name-wrapper flex items-center gap-2">
            <i id="modal-input-heading" className="text-lg font-bold">
              Player 2 name:
            </i>
            <input
              id="modal-input-player2"
              type="text"
              className="py-1 px-2 border border-black rounded-md"
              autoComplete="off"
              onChange={handleChange}
            />
          </div>
        </div>

        <footer className="py-2 px-6 bg-white text-right">
          <button
            className="py-2 px-4 rounded-md bg-blue-500 text-white hover:opacity-70"
            onClick={handleClick}
          >
            Done
          </button>
        </footer>
      </div>
    </div>
  );
}
