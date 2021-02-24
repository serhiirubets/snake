import {Cell} from "./Cell";
import {Game} from "./Game";

export class Snake {
  cells: Cell[] = [];

  constructor(private game: Game) {}

  public render() {
    this.create();

    this.cells.forEach(cell => {
      this.game.ctx.drawImage(this.game.sprites.body, cell.x, cell.y);
    });
  }


  public create() {
    let startCells = [{row: 5, col: 4}, { row: 5, col: 5}];

    startCells.forEach(startCell => {
      const cell = this.game.board.getCell(startCell.row, startCell.col)

      if (cell) {
        this.cells.push(cell)
      }
    })
  }
}
