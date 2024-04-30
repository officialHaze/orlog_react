import React from "react";
import Player from "../gamecomponents/Player";
import { FaHeart } from "react-icons/fa6";
import useDiceSeperation from "../utils/CustomHooks/useDiceSeperation";
import { iconMap } from "./DiceComponent";
// import DiceComponent from "./DiceComponent";

interface Props {
  player1: Player;
  player2: Player;
}

export default function ResolutionPhase({ player1, player2 }: Props) {
  const {
    arrowAttacks: player1ArrowAttacks,
    arrowDefences: player1ArrowDefences,
    axeAttacks: player1AxeAttacks,
    axeDefences: player1AxeDefences,
    thiefs: player1Thiefs,
    favors: player1Favors,
  } = useDiceSeperation(player1);

  const {
    arrowAttacks: player2ArrowAttacks,
    arrowDefences: player2ArrowDefences,
    axeAttacks: player2AxeAttacks,
    axeDefences: player2AxeDefences,
    thiefs: player2Thiefs,
    favors: player2Favors,
  } = useDiceSeperation(player2);

  return (
    <div>
      <section className="player-1-section flex flex-col items-center p-20">
        <div className="hud flex items-center justify-between gap-10 w-1/2">
          <div className="health-points flex items-center gap-2">
            <FaHeart className="text-2xl" /> <span className="text-2xl">{player1.getHealth()}</span>
          </div>
          <h1 className="text-2xl font-bold">{player1.getPlayerName()}</h1>
        </div>

        <div className="dices-played mt-10 w-fit flex items-center justify-evenly">
          <div className="dices-arrow flex items-center w-32">
            {player1ArrowAttacks.map((dice) => {
              return (
                <div key={dice.getId()} className="text-2xl">
                  {iconMap[dice.getValueMeaning()]}
                </div>
              );
            })}
          </div>
          <div className="dices-shield flex items-center w-32">
            {player1ArrowDefences.map((dice) => {
              return (
                <div key={dice.getId()} className="text-2xl">
                  {iconMap[dice.getValueMeaning()]}
                </div>
              );
            })}
          </div>
          <div className="dices-axe flex items-center w-32">
            {player1AxeAttacks.map((dice) => {
              return (
                <div key={dice.getId()} className="text-2xl">
                  {iconMap[dice.getValueMeaning()]}
                </div>
              );
            })}
          </div>
          <div className="dices-helmet flex items-center w-32">
            {player1AxeDefences.map((dice) => {
              return (
                <div key={dice.getId()} className="text-2xl">
                  {iconMap[dice.getValueMeaning()]}
                </div>
              );
            })}
          </div>
          <div className="dices-steal flex items-center w-32">
            {player1Thiefs.map((dice) => {
              return (
                <div key={dice.getId()} className="text-2xl">
                  {iconMap[dice.getValueMeaning()]}
                </div>
              );
            })}
          </div>
          <div className="dices-favors flex items-center w-32">
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
          <div className="dices-shield flex items-center w-32">
            {player2ArrowDefences.map((dice) => {
              return (
                <div key={dice.getId()} className="text-2xl">
                  {iconMap[dice.getValueMeaning()]}
                </div>
              );
            })}
          </div>
          <div className="dices-arrow flex items-center w-32">
            {player2ArrowAttacks.map((dice) => {
              return (
                <div key={dice.getId()} className="text-2xl">
                  {iconMap[dice.getValueMeaning()]}
                </div>
              );
            })}
          </div>
          <div className="dices-helmet flex items-center w-32">
            {player2AxeDefences.map((dice) => {
              return (
                <div key={dice.getId()} className="text-2xl">
                  {iconMap[dice.getValueMeaning()]}
                </div>
              );
            })}
          </div>
          <div className="dices-axe flex items-center w-32">
            {player2AxeAttacks.map((dice) => {
              return (
                <div key={dice.getId()} className="text-2xl">
                  {iconMap[dice.getValueMeaning()]}
                </div>
              );
            })}
          </div>
          <div className="dices-steal flex items-center w-32">
            {player2Thiefs.map((dice) => {
              return (
                <div key={dice.getId()} className="text-2xl">
                  {iconMap[dice.getValueMeaning()]}
                </div>
              );
            })}
          </div>
          <div className="dices-favors flex items-center w-32">
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
            <FaHeart className="text-2xl" /> <span className="text-2xl">{player2.getHealth()}</span>
          </div>
          <h1 className="text-2xl font-bold">{player2.getPlayerName()}</h1>
        </div>
      </section>
    </div>
  );
}
