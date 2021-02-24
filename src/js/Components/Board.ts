import {Cell} from "./Cell";
import {Game} from "./Game";

export class Board {
  private size = 15;
  public readonly cells: Cell[] = [];

  constructor(private game: Game) {
  }

  public render() {
    this.create();
    this.cells.forEach(cell => {
      this.game.ctx.drawImage(this.game.sprites.cell, cell.x, cell.y);
    });
  }

  public create() {
    const cellSize = this.game.sprites.cell.width + 1;
    const offsetX = (this.game.width - cellSize * this.size) / 2;
    const offsetY = (this.game.height - cellSize * this.size) / 2;
    console.log(offsetX);

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
}
