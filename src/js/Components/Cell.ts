import {CellType} from "../../types";

export class Cell {
  type?: CellType;

  constructor(
    public x: number,
    public y: number,
    public row: number,
    public col: number
  ) {
  }
}
