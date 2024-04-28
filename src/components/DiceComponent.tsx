import React from "react";
import Dice from "../gamecomponents/Dice";
import Player from "../gamecomponents/Player";
import { GiPaperArrow } from "react-icons/gi";
import { GiWoodAxe } from "react-icons/gi";
import { PiShieldCheckeredFill } from "react-icons/pi";
import { GiCrestedHelmet } from "react-icons/gi";
import { GiCardPickup } from "react-icons/gi";
import { MdToken } from "react-icons/md";

interface Props {
  dice: Dice;
  player: Player;
  setSelectedDicePool: React.Dispatch<React.SetStateAction<Dice[]>>;
  setCurrentDicePool: React.Dispatch<React.SetStateAction<Dice[]>>;
  toDisplayConfirmBtn: React.Dispatch<React.SetStateAction<boolean>>;
  displayConfirmBtn: boolean;
  type: string;
}

const iconMap: any = {
  Arrow: <GiPaperArrow />,
  Axe: <GiWoodAxe />,
  Shield: <PiShieldCheckeredFill />,
  Helmet: <GiCrestedHelmet />,
  Steal: <GiCardPickup />,
  "Favor Token": <MdToken />,
};

export default function DiceComponent({
  dice,
  player,
  setSelectedDicePool,
  setCurrentDicePool,
  toDisplayConfirmBtn,
  displayConfirmBtn,
  type,
}: Props) {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const { id: selectedDiceId } = e.currentTarget;
    if (type === "current") {
      // Handle moving the selected dice to the selection pool
      // Remove the selected dice from the current in hand pool
      // of the player
      const dices = player.getDices();
      console.log(dices);
      const filteredDices = dices.filter(dice_ => dice_.getId() !== selectedDiceId);
      console.log(filteredDices);
      // Update the dices list with the filtered listt
      player.setDices(filteredDices);
      console.log(player.getDices());
      // Update the in hand pool
      setCurrentDicePool(player.getDices());

      // Push the selected dice to the selected dices list
      // const intitalSelectedDices = player.getSelectedDices();
      // intitalSelectedDices.push(dice);
      player.setSelectedDices([...player.getSelectedDices(), dice]);

      // Update the selection pool ui
      setSelectedDicePool(player.getSelectedDices());

      toDisplayConfirmBtn(true);
    } else if (type === "selection") {
      // Handle moving the selected dice from selection pool
      // to the current in hand pool

      // Filter the selection pool
      const initialSelectedDices = player.getSelectedDices();
      const filteredSelectedDices = initialSelectedDices.filter(
        dice_ => dice_.getId() !== dice.getId()
      );
      player.setSelectedDices(filteredSelectedDices);
      // Change the state to update the UI
      setSelectedDicePool(player.getSelectedDices());

      // Push the selected dice to the current pool
      player.setDices([...player.getDices(), dice]);
      // Update the state to change the UI
      setCurrentDicePool(player.getDices());
    }
  };

  return (
    <button
      disabled={type === "selection" && !displayConfirmBtn}
      id={dice.getId()}
      className="cursor-pointer text-2xl"
      onClick={handleClick}
    >
      {iconMap[dice.getValueMeaning()]}
    </button>
  );
}
