import Dice from "./Dice";

export default class Player {
  private id: number;
  private name: string;

  // Player moves
  private totalArrowAttacksSelected: number = 0;
  private totalAxeAttacksSelected: number = 0;
  private totalArrowDefenceSelected: number = 0;
  private totalAxeDefencesSelected: number = 0;
  private totalStealSelected: number = 0;
  private totalFavorTokensSelected: number = 0;

  private dices: Dice[] = [];
  private selectedDices: Dice[] = [];
  private confirmedDices: Dice[] = [];

  private health: number = 5;

  private totalRounds = 0; // 3 is maximum

  private confirmationStatus = false;

  constructor(id: number) {
    this.id = id;
    this.name = `Player ${id}`;
  }

  // Setters
  public setPlayerName(name: string) {
    this.name = name;
  }

  public setDices(newDiceList: Dice[]) {
    this.dices = newDiceList;
  }

  public setSelectedDices(list: Dice[]) {
    this.selectedDices = list;
  }

  public setConfirmedDices(list: Dice[]) {
    this.confirmedDices = [...this.confirmedDices, ...list];
  }

  // Getter
  public getPlayerName() {
    return this.name;
  }

  public getDices() {
    return this.dices;
  }

  public getSelectedDices() {
    return this.selectedDices;
  }

  public getConfirmedDices() {
    return this.confirmedDices;
  }

  public getId() {
    return this.id;
  }

  public readyTheDices() {
    for (let i = 0; i < 6; i++) {
      this.dices.push(new Dice());
    }
  }

  public emptyTheDices() {
    this.dices = [];
  }

  public resetDiceValues() {
    this.dices.forEach(dice => {
      dice.setValue(-1);
    });
  }
}
