import {Cell} from "./Cell";
import {Game} from "./Game";
import {Key} from "../../types";

const directions = {
  up: {
    row: -1,
    col: 0,
    angle: 0,
  },
  down: {
    row: 1,
    col: 0,
    angle: 180
  },
  left: {
    row: 0,
    col: -1,
    angle: 270
  },
  right: {
    row: 0,
    col: 1,
    angle: 90
  }
}

export class Snake {
  private moving = false;
  cells: Cell[] = [];
  direction = {row: 0, col: 0, angle: 0}

  constructor(private game: Game) {
  }

  private renderHead() {
    const head = this.cells[0];
    const side = this.game.sprites.head.width / 2;

    this.game.ctx.save();

    this.game.ctx.translate(head.x + side, head.y + side);

    this.game.ctx.rotate(this.direction.angle * Math.PI / 180);
    this.game.ctx.drawImage(this.game.sprites.head, -side, -side);
    this.game.ctx.restore();
  }

  private renderBody() {
    for (let i = 1; i < this.cells.length; i++) {
      const cell = this.cells[i];
      this.game.ctx.drawImage(this.game.sprites.body, cell.x, cell.y);
    }
  }

  public render(): void {
    this.renderHead();
    this.renderBody();
  }

  public create(): void {
    let startCells = [{row: 5, col: 5}, {row: 6, col: 5}];
    this.direction = directions.up;

    startCells.forEach(startCell => {
      const cell = this.game.board.getCell(startCell.row, startCell.col)

      if (cell) {
        this.cells.push(cell)
      }
    })
  }

  public move(): void {
    if (this.moving) {
      const cell = this.getNextCell();

      if (cell) {
        this.cells.unshift(cell);

        if (!this.game.board.isFoodCell(cell)) {
          this.cells.pop();
        } else {
          this.game.board.createFood();
        }
      }
    }
  }

  private getNextCell() {
    const head = this.cells[0];

    const row = head.row + this.direction.row;
    const col = head.col + this.direction.col

    return this.game.board.getCell(row, col);
  }

  public start(key: Key) {
    this.moving = true;

    switch (key) {
      case Key.arrowDown:
        this.direction = directions.down;
        break;
      case Key.arrowLeft:
        this.direction = directions.left;
        break;
      case Key.arrowRight:
        this.direction = directions.right;
        break;
      case Key.arrowUp:
        this.direction = directions.up
        break;
    }

  }

  public hasCell(cell: Cell) {
    return this.cells.find((c) => c === cell)
  }
}
