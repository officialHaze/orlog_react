import React, { useCallback, useEffect, useMemo, useState } from "react";
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
  } = useDiceSeperation(player1);

  const {
    arrowAttacks: player2ArrowAttacks,
    arrowDefences: player2ArrowDefences,
    axeAttacks: player2AxeAttacks,
    axeDefences: player2AxeDefences,
    thiefs: player2Thiefs,
    favors: player2Favors,
    diceSeperationComplete: diceSeperationCompleteForP2,
  } = useDiceSeperation(player2);

  const [increaseScale, toIncreaseScale] = useState({
    arrowDicesP1: false,
    arrowDicesp2: false,
    axeDicesP1: false,
    axeDicesP2: false,
  });

  const [hide, toHide] = useState({
    // Player 1 related
    arrowP1: false,
    shieldP1: false,
    axeP1: false,
    helmetP1: false,
    thiefP1: false,
    favorTokenP1: false,

    // Player 2 related
    arrowP2: false,
    shieldP2: false,
    axeP2: false,
    helmetP2: false,
    thiefP2: false,
    favorTokenP2: false,
  });

  const [healthColor, setHealthColor] = useState({
    p1: "",
    p2: "",
  });

  // Check for player health, whoever falls to zero first will loose
  // and the later will win
  useMemo(() => {
    if (health1 <= 0) {
      alert(`${player2.getPlayerName()} WON!`);
      window.location.reload();
    } else if (health2 <= 0) {
      alert(`${player1.getPlayerName()} WON!`);
      window.location.reload();
    }
  }, [health1, health2, player1, player2]);

  const animateHealthReduction = useCallback((playerId: number) => {
    // Set the health color to red, initially
    playerId === 1
      ? setHealthColor((prevState) => {
          return { ...prevState, p1: "text-red-500" };
        })
      : setHealthColor((prevState) => {
          return { ...prevState, p2: "text-red-500" };
        });
    // After 500 ms change back the color
    setTimeout(() => {
      playerId === 1
        ? setHealthColor((prevState) => {
            return { ...prevState, p1: "" };
          })
        : setHealthColor((prevState) => {
            return { ...prevState, p2: "" };
          });
    }, 500);
  }, []);

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
          toIncreaseScale((prevState) => {
            return { ...prevState, arrowDicesP1: true };
          });
          setTimeout(() => {
            toIncreaseScale((prevState) => {
              return { ...prevState, arrowDicesP1: false };
            });
          }, 500);

          setHealth2(player2.getHealth() - (totalPlayer1ArrowAtks - totalPlayer2ArrowDefences));
          animateHealthReduction(2);
        }

        // Hide player 1 arrows and player 2 shields
        toHide((prevState) => {
          return { ...prevState, arrowP1: true, shieldP2: true };
        });

        await delay(2000);

        // Compare player 1 arrow defences with player 2 arrow attacks
        if (totalPlayer2ArrowAtks > totalPlayer1ArrowDefences) {
          // For a subtle animation increase the scale of arrow dices list
          // then de-scale it after certain ms
          toIncreaseScale((prevState) => {
            return { ...prevState, arrowDicesP2: true };
          });
          setTimeout(() => {
            toIncreaseScale((prevState) => {
              return { ...prevState, arrowDicesP2: false };
            });
          }, 500);

          setHealth1(player1.getHealth() - (totalPlayer2ArrowAtks - totalPlayer1ArrowDefences));
          animateHealthReduction(1);
        }

        // Hide player 1 shield and player 2 arrow
        toHide((prevState) => {
          return { ...prevState, arrowP2: true, shieldP1: true };
        });

        await delay(2000);

        // Compare player 1 axe attacks with player 2 axe defences
        if (totalPlayer1AxeAtks > totalPlayer2AxeDefences) {
          // For a subtle animation increase the scale of arrow dices list
          // then de-scale it after certain ms
          toIncreaseScale((prevState) => {
            return { ...prevState, axeDicesP1: true };
          });
          setTimeout(() => {
            toIncreaseScale((prevState) => {
              return { ...prevState, axeDicesP1: false };
            });
          }, 500);

          setHealth2(player2.getHealth() - (totalPlayer1AxeAtks - totalPlayer2AxeDefences));
          animateHealthReduction(2);
        }

        // Hide player 1 axe and player 2 helmet
        toHide((prevState) => {
          return { ...prevState, axeP1: true, helmetP2: true };
        });

        await delay(2000);

        // Compare player 2 axe attacks with player 1 axe defences
        if (totalPlayer2AxeAtks > totalPlayer1AxeDefences) {
          // For a subtle animation increase the scale of arrow dices list
          // then de-scale it after certain ms
          toIncreaseScale((prevState) => {
            return { ...prevState, axeDicesP2: true };
          });
          setTimeout(() => {
            toIncreaseScale((prevState) => {
              return { ...prevState, axeDicesP2: false };
            });
          }, 500);

          setHealth1(player1.getHealth() - (totalPlayer2AxeAtks - totalPlayer1AxeDefences));
          animateHealthReduction(1);
        }

        // Hide player 2 axe and player 1 helmet
        toHide((prevState) => {
          return { ...prevState, axeP2: true, helmetP1: true };
        });

        await delay(2000);

        // No need to do any kind of operation on steal and token dices as of now

        // Hide player 1 thiefs, player 1 favorTokens, player 2 thiefs and player 2 favor tokens
        toHide((prevState) => {
          return {
            ...prevState,
            thiefP1: true,
            favorTokenP1: true,
            thiefP2: true,
            favorTokenP2: true,
          };
        });

        await delay(2000);

        // Move to roll phase. TODO: This functionality will be triggered when user clicks on continue
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
    animateHealthReduction,
    switchCoin,
    toStartResolutionPhase,
    resetRoundOverForPlayers,
  ]);

  return (
    <div>
      <section className="player-1-section flex flex-col items-center p-20">
        <div className="hud flex items-center justify-between gap-10 w-1/2">
          <div className="health-points flex items-center gap-2">
            <FaHeart className={`text-2xl ${healthColor.p1}`} />{" "}
            <span className={`text-2xl ${healthColor.p1}`}>{health1}</span>
          </div>
          <h1 className="text-2xl font-bold">{player1.getPlayerName()}</h1>
        </div>

        <div className="dices-played mt-10 w-fit flex items-center justify-evenly gap-6">
          <div
            className={`dices-arrow transition-all flex items-center w-32 ${
              increaseScale.arrowDicesP1 ? "scale-125" : "scale-100"
            } ${hide.arrowP1 && "hidden"}`}
          >
            {player1ArrowAttacks.map((dice) => {
              return (
                <div key={dice.getId()} className="text-2xl">
                  {iconMap[dice.getValueMeaning()]}
                </div>
              );
            })}
          </div>
          <div className={`dices-shield flex items-center w-32 ${hide.shieldP1 && "hidden"}`}>
            {player1ArrowDefences.map((dice) => {
              return (
                <div key={dice.getId()} className="text-2xl">
                  {iconMap[dice.getValueMeaning()]}
                </div>
              );
            })}
          </div>
          <div
            className={`dices-axe flex transition-all items-center w-32 ${
              increaseScale.axeDicesP1 ? "scale-125" : "scale-100"
            } ${hide.axeP1 && "hidden"}`}
          >
            {player1AxeAttacks.map((dice) => {
              return (
                <div key={dice.getId()} className="text-2xl">
                  {iconMap[dice.getValueMeaning()]}
                </div>
              );
            })}
          </div>
          <div className={`dices-helmet flex items-center w-32 ${hide.helmetP1 && "hidden"}`}>
            {player1AxeDefences.map((dice) => {
              return (
                <div key={dice.getId()} className="text-2xl">
                  {iconMap[dice.getValueMeaning()]}
                </div>
              );
            })}
          </div>
          <div className={`dices-steal flex items-center w-32 ${hide.thiefP1 && "hidden"}`}>
            {player1Thiefs.map((dice) => {
              return (
                <div key={dice.getId()} className="text-2xl">
                  {iconMap[dice.getValueMeaning()]}
                </div>
              );
            })}
          </div>
          <div className={`dices-favors flex items-center w-32 ${hide.favorTokenP1 && "hidden"}`}>
            {player1Favors.map((dice) => {
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
          <div className={`dices-shield flex items-center w-32 ${hide.shieldP2 && "hidden"}`}>
            {player2ArrowDefences.map((dice) => {
              return (
                <div key={dice.getId()} className="text-2xl">
                  {iconMap[dice.getValueMeaning()]}
                </div>
              );
            })}
          </div>
          <div
            className={`dices-arrow transition-all flex items-center w-32 ${
              increaseScale.arrowDicesp2 ? "scale-125" : "scale-100"
            } ${hide.arrowP2 && "hidden"}`}
          >
            {player2ArrowAttacks.map((dice) => {
              return (
                <div key={dice.getId()} className="text-2xl">
                  {iconMap[dice.getValueMeaning()]}
                </div>
              );
            })}
          </div>
          <div className={`dices-helmet flex items-center w-32 ${hide.helmetP2 && "hidden"}`}>
            {player2AxeDefences.map((dice) => {
              return (
                <div key={dice.getId()} className="text-2xl">
                  {iconMap[dice.getValueMeaning()]}
                </div>
              );
            })}
          </div>
          <div
            className={`dices-axe flex transition-all items-center w-32 ${
              increaseScale.axeDicesP2 ? "scale-125" : "scale-100"
            } ${hide.axeP2 && "hidden"}`}
          >
            {player2AxeAttacks.map((dice) => {
              return (
                <div key={dice.getId()} className="text-2xl">
                  {iconMap[dice.getValueMeaning()]}
                </div>
              );
            })}
          </div>
          <div className={`dices-steal flex items-center w-32 ${hide.thiefP2 && "hidden"}`}>
            {player2Thiefs.map((dice) => {
              return (
                <div key={dice.getId()} className="text-2xl">
                  {iconMap[dice.getValueMeaning()]}
                </div>
              );
            })}
          </div>
          <div className={`dices-favors flex items-center w-32 ${hide.favorTokenP2 && "hidden"}`}>
            {player2Favors.map((dice) => {
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
            <FaHeart className={`text-2xl ${healthColor.p2}`} />{" "}
            <span className={`text-2xl ${healthColor.p2}`}>{health2}</span>
          </div>
          <h1 className="text-2xl font-bold">{player2.getPlayerName()}</h1>
        </div>
      </section>
    </div>
  );
}
