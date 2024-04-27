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
    if (type === "in-hand") {
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
      setCurrentDicePool([...filteredDices]);

      // Push the selected dice to the selected dices list
      const intitalSelectedDices = player.getSelectedDices();
      intitalSelectedDices.push(dice);
      player.setSelectedDices(intitalSelectedDices);

      // Update the selection pool ui
      setSelectedDicePool(player.getSelectedDices());

      toDisplayConfirmBtn(true);
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
