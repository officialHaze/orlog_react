import React, { useEffect, useState } from "react";
import Player from "../gamecomponents/Player";
import Dice from "../gamecomponents/Dice";
import DiceComponent from "./DiceComponent";

interface Props {
  player: Player;
}

export default function PlayerCard({ player }: Props) {
  const [currentDicePool, setCurrentDicePool] = useState<Dice[]>([]);
  const [selectedDicePool, setSelectedDicePool] = useState<Dice[]>([]);
  const [displayConfirmSelectionBtn, toDisplayConfirmSelectionBtn] = useState(false);
  const [disableRollBtn, toDisableRollBtn] = useState(false);

  const [currentPlayerId, setCurrentPlayerId] = useState(1);
  console.log(currentPlayerId);
  console.log(player.getId());

  useEffect(() => {
    // ready the dices
    player.readyTheDices();
    // // Assign the current dice state
    // setCurrentDicePool(player.getDices());

    return () => {
      player.emptyTheDices(); // Empty the dice list
      // setCurrentDicePool(player.getDices());
    };
  }, [player]);

  const switchPlayer = () => {
    if (currentPlayerId === 1) setCurrentPlayerId(2);
    else setCurrentPlayerId(1);
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const { id: btnType } = e.currentTarget;
    if (btnType === "roll-btn") {
      // Handle dice roll
      // Get the dices for the current player
      const initialDiceList = player.getDices();
      console.log(initialDiceList);
      // Roll each dice seperately
      initialDiceList.forEach((dice) => dice.roll());

      // Update the dices state
      const afterRollDiceList = player.getDices();
      console.log(afterRollDiceList);
      setCurrentDicePool([...afterRollDiceList]);

      // Disable roll btn
      toDisableRollBtn(true);
    } else {
      toDisplayConfirmSelectionBtn(false);
      switchPlayer();
    }
  };

  return (
    <div className="player-card h-fit w-1/2 border border-black p-4 relative">
      <div
        className={`absolute w-full h-full bg-black opacity-60 top-0 left-0 ${
          currentPlayerId !== player.getId() ? "block" : "hidden"
        }`}
      />
      <h1 className="text-center text-xl">{player.getPlayerName()}</h1>
      <div className="flex flex-col gap-12 mt-10">
        <div>
          <div>
            Selected Pool:{" "}
            <span>
              {" "}
              {displayConfirmSelectionBtn && (
                <button
                  id="confirm-btn"
                  className="px-2 py-0 bg-black text-white rounded-md"
                  onClick={handleClick}
                >
                  Confirm Selection
                </button>
              )}
            </span>
          </div>
          <div className="selected-dices flex items-center gap-6 flex-wrap">
            {selectedDicePool.map((dice) => (
              <DiceComponent
                key={dice.getId()}
                dice={dice}
                player={player}
                setCurrentDicePool={setCurrentDicePool}
                setSelectedDicePool={setSelectedDicePool}
                toDisplayConfirmBtn={toDisplayConfirmSelectionBtn}
                displayConfirmBtn={displayConfirmSelectionBtn}
                type="selection"
              />
            ))}
          </div>
        </div>
        <div>
          <div>Current Pool:</div>
          <div className="current-dices-in-hand flex items-center gap-6 flex-wrap">
            {currentDicePool.map((dice) => (
              <DiceComponent
                key={dice.getId()}
                dice={dice}
                player={player}
                setCurrentDicePool={setCurrentDicePool}
                setSelectedDicePool={setSelectedDicePool}
                toDisplayConfirmBtn={toDisplayConfirmSelectionBtn}
                displayConfirmBtn={displayConfirmSelectionBtn}
                type="in-hand"
              />
            ))}
          </div>
        </div>
      </div>
      <footer className="mt-20 text-center">
        <button
          id="roll-btn"
          disabled={disableRollBtn}
          className="px-8 py-2 bg-black text-white rounded-md"
          onClick={handleClick}
        >
          Roll
        </button>
      </footer>
    </div>
  );
}
