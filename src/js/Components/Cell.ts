export class Cell {
  hasFood = false;
  constructor(
    public x: number,
    public y: number,
    public row: number,
    public col: number
  ) {
  }
}
