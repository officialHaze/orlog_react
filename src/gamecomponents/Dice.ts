import DiceNumberGenerator from "../utils/DicenumberGenerator";

export default class Dice {
  // Every dice have 6 faces
  // 0 -> arrow (1 damage)
  // 1 -> axe (1 damage)
  // 2 -> shield (1 arrow defence)
  // 3 -> helmet (1 axe defence)
  // 4 -> steal (steal 1 favor token from opponent)
  // 5 -> favor token

  private value: number = -1;

  private id: string;

  constructor() {
    this.id = crypto.randomUUID();
  }

  public roll() {
    // Generate a random number between 0 - 5
    const randnum = DiceNumberGenerator.generateRandNum();
    this.value = randnum;
  }

  // Getters
  public getValue() {
    return this.value;
  }

  public getId() {
    return this.id;
  }

  public getValueMeaning() {
    switch (this.value) {
      case 0:
        return "Arrow";

      case 1:
        return "Axe";

      case 2:
        return "Shield";

      case 3:
        return "Helmet";

      case 4:
        return "Steal";

      case 5:
        return "Favor Token";

      default:
        return "";
    }
  }
}
