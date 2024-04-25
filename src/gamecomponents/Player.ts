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

  //   private dices: Dice[] = [];
  //   private selectedDices: Dice[] = [];

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

  // Getter
  public getPlayerName() {
    return this.name;
  }
}
