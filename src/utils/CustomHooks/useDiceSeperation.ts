import { useEffect, useState } from "react";
import Player from "../../gamecomponents/Player";
import Dice from "../../gamecomponents/Dice";

export default function useDiceSeperation(player: Player) {
  const [arrowAttacks, setArrowAttacks] = useState<Dice[]>([]);
  const [arrowDefences, setArrowDefences] = useState<Dice[]>([]);
  const [axeAttacks, setAxeAttacks] = useState<Dice[]>([]);
  const [axeDefences, setAxeDefences] = useState<Dice[]>([]);
  const [thiefs, setThiefs] = useState<Dice[]>([]);
  const [favors, setFavors] = useState<Dice[]>([]);

  const [diceSeperationComplete, isDiceSeperationComplete] = useState(false);

  useEffect(() => {
    const segregateDices = () => {
      player.getConfirmedDices().forEach((dice) => {
        switch (dice.getValueMeaning()) {
          case "Arrow":
            setArrowAttacks((prevState) => [...prevState, dice]);
            break;

          case "Shield":
            setArrowDefences((prevState) => [...prevState, dice]);
            break;

          case "Axe":
            setAxeAttacks((prevState) => [...prevState, dice]);
            break;

          case "Helmet":
            setAxeDefences((prevState) => [...prevState, dice]);
            break;

          case "Steal":
            setThiefs((prevState) => [...prevState, dice]);
            break;

          case "Favor Token":
            setFavors((prevState) => [...prevState, dice]);
            break;

          default:
            break;
        }
      });
    };

    segregateDices();
    isDiceSeperationComplete(true);

    return () => {
      setArrowAttacks([]);
      setArrowDefences([]);
      setAxeAttacks([]);
      setAxeDefences([]);
      setThiefs([]);
      setFavors([]);

      isDiceSeperationComplete(false);
    };
  }, [player]);

  return {
    arrowAttacks,
    arrowDefences,
    axeAttacks,
    axeDefences,
    thiefs,
    favors,
    diceSeperationComplete,

    setArrowAttacks,
    setArrowDefences,

    setAxeAttacks,
    setAxeDefences,

    setThiefs,
    setFavors,
  };
}
