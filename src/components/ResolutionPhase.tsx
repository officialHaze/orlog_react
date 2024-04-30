import React, { useEffect, useMemo, useState } from "react";
import Player from "../gamecomponents/Player";
import { FaHeart } from "react-icons/fa6";
import useDiceSeperation from "../utils/CustomHooks/useDiceSeperation";
import { iconMap } from "./DiceComponent";

interface Props {
  player1: Player;
  player2: Player;
  toStartResolutionPhase: React.Dispatch<React.SetStateAction<boolean>>;
  switchCoin: () => void;
  resetRoundOverForPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  setHealth1: (health: number) => void;
  setHealth2: (health: number) => void;
  health1: number;
  health2: number;
}

const delay = (ms: number) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(true);
    }, ms);
  });
};

export default function ResolutionPhase({
  player1,
  player2,
  toStartResolutionPhase,
  switchCoin,
  resetRoundOverForPlayers,
  setHealth1,
  setHealth2,
  health1,
  health2,
}: Props) {
  const {
    arrowAttacks: player1ArrowAttacks,
    arrowDefences: player1ArrowDefences,
    axeAttacks: player1AxeAttacks,
    axeDefences: player1AxeDefences,
    thiefs: player1Thiefs,
    favors: player1Favors,
    diceSeperationComplete: diceSeperationCompleteForP1,
    setArrowAttacks: setPlayer1ArrowAtks,
    setArrowDefences: setPlayer1ArrowDefences,
    setAxeAttacks: setPlayer1AxeAtks,
    setAxeDefences: setPlayer1AxeDefences,
    setThiefs: setPlayer1Thiefs,
    setFavors: setPlayer1Favors,
  } = useDiceSeperation(player1);

  const {
    arrowAttacks: player2ArrowAttacks,
    arrowDefences: player2ArrowDefences,
    axeAttacks: player2AxeAttacks,
    axeDefences: player2AxeDefences,
    thiefs: player2Thiefs,
    favors: player2Favors,
    diceSeperationComplete: diceSeperationCompleteForP2,
    setArrowAttacks: setPlayer2ArrowAtks,
    setArrowDefences: setPlayer2ArrowDefences,
    setAxeAttacks: setPlayer2AxeAtks,
    setAxeDefences: setPlayer2AxeDefences,
    setThiefs: setPlayer2Thiefs,
    setFavors: setPlayer2Favors,
  } = useDiceSeperation(player2);

  const [increaseScale, toIncreaseScale] = useState({
    arrowDicesP1: false,
    arrowDicesp2: false,
    axeDicesP1: false,
    axeDicesP2: false,
  });

  // Check for player health, whoever falls to zero first will loose
  // and the later will win
  useMemo(() => {
    if (health1 <= 0) return alert("PLAYER 2 WON!");
    else if (health2 <= 0) return alert("PLAYER 1 WON!");
  }, [health1, health2]);

  useMemo(() => {
    const startComparingDices = async () => {
      if (diceSeperationCompleteForP1 && diceSeperationCompleteForP2) {
        const totalPlayer1ArrowAtks = player1ArrowAttacks.length;
        const totalPlayer1AxeAtks = player1AxeAttacks.length;
        const totalPlayer1ArrowDefences = player1ArrowDefences.length;
        const totalPlayer1Thiefs = player1Thiefs.length;
        const totalPlayer1Favors = player1Favors.length;
        const totalPlayer1AxeDefences = player1AxeDefences.length;

        const totalPlayer2ArrowAtks = player2ArrowAttacks.length;
        const totalPlayer2AxeAtks = player2AxeAttacks.length;
        const totalPlayer2ArrowDefences = player2ArrowDefences.length;
        const totalPlayer2Thiefs = player2Thiefs.length;
        const totalPlayer2Favors = player2Favors.length;
        const totalPlayer2AxeDefences = player2AxeDefences.length;

        await delay(1000);

        // Compare player 1 arrow attacks with player 2 arrow defences
        if (totalPlayer1ArrowAtks > totalPlayer2ArrowDefences) {
          // For a subtle animation increase the scale of arrow dices list
          // then de-scale it after certain ms
          toIncreaseScale(prevState => {
            return { ...prevState, arrowDicesP1: true };
          });
          setTimeout(() => {
            toIncreaseScale(prevState => {
              return { ...prevState, arrowDicesP1: false };
            });
          }, 500);

          setHealth2(player2.getHealth() - (totalPlayer1ArrowAtks - totalPlayer2ArrowDefences));
        }
        // // Remove arrow attacks for player 1 and arrow defences for player 2 from the list
        // setPlayer1ArrowAtks([]);
        // setPlayer2ArrowDefences([]);

        await delay(1000);

        // Compare player 1 arrow defences with player 2 arrow attacks
        if (totalPlayer2ArrowAtks > totalPlayer1ArrowDefences) {
          // For a subtle animation increase the scale of arrow dices list
          // then de-scale it after certain ms
          toIncreaseScale(prevState => {
            return { ...prevState, arrowDicesP2: true };
          });
          setTimeout(() => {
            toIncreaseScale(prevState => {
              return { ...prevState, arrowDicesP2: false };
            });
          }, 500);

          setHealth1(player1.getHealth() - (totalPlayer2ArrowAtks - totalPlayer1ArrowDefences));
        }
        // // Remove arrow attacks for player 1 and arrow defences for player 2 from the list
        // setPlayer2ArrowAtks([]);
        // setPlayer1ArrowDefences([]);

        await delay(1000);

        // Compare player 1 axe attacks with player 2 axe defences
        if (totalPlayer1AxeAtks > totalPlayer2AxeDefences) {
          // For a subtle animation increase the scale of arrow dices list
          // then de-scale it after certain ms
          toIncreaseScale(prevState => {
            return { ...prevState, axeDicesP1: true };
          });
          setTimeout(() => {
            toIncreaseScale(prevState => {
              return { ...prevState, axeDicesP1: false };
            });
          }, 500);

          setHealth2(player2.getHealth() - (totalPlayer1AxeAtks - totalPlayer2AxeDefences));
        }
        // // Remove axe attacks for player 1 and axe defences for player 2 from the list
        // setPlayer1AxeAtks([]);
        // setPlayer2AxeDefences([]);

        await delay(1000);

        // Compare player 2 axe attacks with player 1 axe defences
        if (totalPlayer2AxeAtks > totalPlayer1AxeDefences) {
          // For a subtle animation increase the scale of arrow dices list
          // then de-scale it after certain ms
          toIncreaseScale(prevState => {
            return { ...prevState, axeDicesP2: true };
          });
          setTimeout(() => {
            toIncreaseScale(prevState => {
              return { ...prevState, axeDicesP2: false };
            });
          }, 500);

          setHealth1(player1.getHealth() - (totalPlayer2AxeAtks - totalPlayer1AxeDefences));
        }
        // // Remove axe attacks for player 1 and axe defences for player 2 from the list
        // setPlayer2AxeAtks([]);
        // setPlayer1AxeDefences([]);

        await delay(1000);

        // Remove steal and favor tokens, (NO NEED TO CONSIDER THEM AS OF NOW)
        // setPlayer1Thiefs([]);
        // setPlayer1Favors([]);
        // setPlayer2Thiefs([]);
        // setPlayer2Favors([]);

        await delay(2000);

        // if (player1.getHealth() <= 0) return alert(player2.getPlayerName() + " WON!");
        // else if (player2.getHealth() <= 0) return alert(player1.getPlayerName() + " WON!");

        // Move to roll phase
        player1.reset();
        player2.reset();
        resetRoundOverForPlayers([]);
        switchCoin();
        toStartResolutionPhase(false);
      }
    };

    startComparingDices();
  }, [
    diceSeperationCompleteForP1,
    diceSeperationCompleteForP2,
    player1ArrowAttacks,
    player1ArrowDefences,
    player1AxeAttacks,
    player1AxeDefences,
    player1Favors,
    player1Thiefs,
    player2ArrowAttacks,
    player2ArrowDefences,
    player2AxeAttacks,
    player2AxeDefences,
    player2Favors,
    player2Thiefs,
    player2,
    player1,
    setHealth2,
    setHealth1,
    // setPlayer1ArrowAtks,
    // setPlayer2ArrowDefences,
    // setPlayer2ArrowAtks,
    // setPlayer1ArrowDefences,
    // setPlayer1AxeAtks,
    // setPlayer2AxeDefences,
    // setPlayer2AxeAtks,
    // setPlayer1AxeDefences,
    // setPlayer1Thiefs,
    // setPlayer1Favors,
    // setPlayer2Thiefs,
    // setPlayer2Favors,
    switchCoin,
    toStartResolutionPhase,
    resetRoundOverForPlayers,
  ]);

  return (
    <div>
      <section className="player-1-section flex flex-col items-center p-20">
        <div className="hud flex items-center justify-between gap-10 w-1/2">
          <div className="health-points flex items-center gap-2">
            <FaHeart className="text-2xl" /> <span className="text-2xl">{health1}</span>
          </div>
          <h1 className="text-2xl font-bold">{player1.getPlayerName()}</h1>
        </div>

        <div className="dices-played mt-10 w-fit flex items-center justify-evenly gap-6">
          <div
            className={`dices-arrow transition-all flex items-center w-32 ${
              increaseScale.arrowDicesP1 ? "scale-125" : "scale-100"
            }`}
          >
            {player1ArrowAttacks.map(dice => {
              return (
                <div key={dice.getId()} className="text-2xl">
                  {iconMap[dice.getValueMeaning()]}
                </div>
              );
            })}
          </div>
          <div className="dices-shield flex items-center w-32">
            {player1ArrowDefences.map(dice => {
              return (
                <div key={dice.getId()} className="text-2xl">
                  {iconMap[dice.getValueMeaning()]}
                </div>
              );
            })}
          </div>
          <div className="dices-axe flex items-center w-32">
            {player1AxeAttacks.map(dice => {
              return (
                <div key={dice.getId()} className="text-2xl">
                  {iconMap[dice.getValueMeaning()]}
                </div>
              );
            })}
          </div>
          <div className="dices-helmet flex items-center w-32">
            {player1AxeDefences.map(dice => {
              return (
                <div key={dice.getId()} className="text-2xl">
                  {iconMap[dice.getValueMeaning()]}
                </div>
              );
            })}
          </div>
          <div className="dices-steal flex items-center w-32">
            {player1Thiefs.map(dice => {
              return (
                <div key={dice.getId()} className="text-2xl">
                  {iconMap[dice.getValueMeaning()]}
                </div>
              );
            })}
          </div>
          <div className="dices-favors flex items-center w-32">
            {player1Favors.map(dice => {
              return (
                <div key={dice.getId()} className="text-2xl">
                  {iconMap[dice.getValueMeaning()]}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="player-2-section flex flex-col items-center p-20">
        <div className="dices-played w-fit flex items-center justify-evenly gap-6">
          <div className="dices-shield flex items-center w-32">
            {player2ArrowDefences.map(dice => {
              return (
                <div key={dice.getId()} className="text-2xl">
                  {iconMap[dice.getValueMeaning()]}
                </div>
              );
            })}
          </div>
          <div
            className={`dices-arrow flex items-center w-32 ${
              increaseScale.arrowDicesp2 ? "scale-125" : "scale-100"
            }`}
          >
            {player2ArrowAttacks.map(dice => {
              return (
                <div key={dice.getId()} className="text-2xl">
                  {iconMap[dice.getValueMeaning()]}
                </div>
              );
            })}
          </div>
          <div className="dices-helmet flex items-center w-32">
            {player2AxeDefences.map(dice => {
              return (
                <div key={dice.getId()} className="text-2xl">
                  {iconMap[dice.getValueMeaning()]}
                </div>
              );
            })}
          </div>
          <div className="dices-axe flex items-center w-32">
            {player2AxeAttacks.map(dice => {
              return (
                <div key={dice.getId()} className="text-2xl">
                  {iconMap[dice.getValueMeaning()]}
                </div>
              );
            })}
          </div>
          <div className="dices-steal flex items-center w-32">
            {player2Thiefs.map(dice => {
              return (
                <div key={dice.getId()} className="text-2xl">
                  {iconMap[dice.getValueMeaning()]}
                </div>
              );
            })}
          </div>
          <div className="dices-favors flex items-center w-32">
            {player2Favors.map(dice => {
              return (
                <div key={dice.getId()} className="text-2xl">
                  {iconMap[dice.getValueMeaning()]}
                </div>
              );
            })}
          </div>
        </div>
        <div className="hud flex items-center justify-between gap-10 w-1/2 mt-10">
          <div className="health-points flex items-center gap-2">
            <FaHeart className="text-2xl" /> <span className="text-2xl">{health2}</span>
          </div>
          <h1 className="text-2xl font-bold">{player2.getPlayerName()}</h1>
        </div>
      </section>
    </div>
  );
}
