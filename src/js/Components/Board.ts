import {Cell} from "./Cell";
import {Game} from "./Game";
import {getRandomInteger} from "../helpers";
import {CellType} from "../../types";

export class Board {
  private size = 15;
  public readonly cells: Cell[] = [];

  constructor(private game: Game) {}

  public render() {
    this.cells.forEach(cell => {
      this.game.ctx.drawImage(this.game.sprites.cell, cell.x, cell.y);
      if (cell.type) {
        this.game.ctx.drawImage(this.game.sprites[cell.type], cell.x, cell.y);
      }
    });
  }

  private getRandomAvailableCell() {
    const pool = this.cells.filter(cell =>
      !this.game.snake.hasCell(cell) &&
      !cell.type
    );
    return pool[getRandomInteger(0, pool.length - 1)];
  }

  private createCellObject(type: CellType) {
    const cellWithFood = this.cells.find(cell => cell.type === type);

    if (cellWithFood) {
      cellWithFood.type = undefined;
    }

    const cell = this.getRandomAvailableCell();
    cell.type = type;
  }

  public createFood() {
    this.createCellObject(CellType.food)
  }

  public createBomb() {
    this.createCellObject(CellType.bomb);
  }

  public create() {
    const cellSize = this.game.sprites.cell.width + 1;
    const offsetX = (this.game.width - cellSize * this.size) / 2;
    const offsetY = (this.game.height - cellSize * this.size) / 2;

    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        const x = offsetX + cellSize * col;
        const y = offsetY + cellSize * row
        this.cells.push(new Cell(x, y, row, col));
      }
    }
  }

  public getCell(row: number, col: number) {
    return this.cells.find(cell =>
      cell.row === row && cell.col === col
    );
  }

  isFoodCell(cell: Cell) {
    return cell.type === CellType.food;
  }

  isBombCell(cell: Cell) {
    return cell.type === CellType.bomb;
  }
}
