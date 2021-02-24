import background from '../../assets/img/background.png';
import cell from '../../assets/img/cell.png';
import body from '../../assets/img/body.png';
import {loadPicture} from "../helpers";
import {Board} from "./Board";
import {Snake} from "./Snake";
import {config} from "../config";

const sprites: Record<string, string> = {
  background,
  cell,
  body,
}

export class Game {
  public readonly ctx: CanvasRenderingContext2D;
  public sprites: Record<string, HTMLImageElement> = {};
  private preloadedAssets!: Promise<void>[];
  public board: Board;
  public snake: Snake = new Snake(this);
  public width: number = 0;
  public height: number = 0;

  constructor(private canvas: HTMLCanvasElement) {
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.board = new Board(this);
    this.initDimensions();
  }

  private renderBackground(): void {
    this.ctx.drawImage(this.sprites.background, (this.width - this.sprites.background.width) / 2, (this.height - this.sprites.background.height) / 2);
  }

  private setUpAssets() {
    Object.keys(sprites).forEach((key: string) => {
      this.sprites[key] = new Image();
      this.sprites[key].src = sprites[key];
    });
  }

  private preloadImageAssets(): Promise<void>[] {
    return Object.keys(sprites).map((key) => loadPicture(this.sprites[key], sprites[key]));
  }

  private preloadAssets(): void {
    this.preloadedAssets = this.preloadImageAssets();
  }

  private preload() {
    this.setUpAssets();
    this.preloadAssets();
  }

  private render(): void {
    // this.clearCanvas();

    Promise.all(this.preloadedAssets).then(() => {
      this.renderBackground();
      this.board.render();
      this.snake.render();
    });
  }

  private run() {
    window.requestAnimationFrame(() => {
      this.render();
    })

  }

  public start() {
    this.preload();
    // this.setEvents();
    this.run();
  }

  private initDimensions() {
    this.fitHeight();

    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  private fitHeight() {
    const data = {
      maxWidth: config.game.max.width,
      maxHeight: config.game.max.height,
      minWidth: config.game.min.width,
      minHeight: config.game.min.height,
      realWidth: window.innerWidth,
      realHeight: window.innerHeight
    };
    // realWidth / realHeight
    // resultWidth / maxHeight
    this.width = Math.floor(data.realWidth * data.maxHeight / data.realHeight);

    // realWidth / realHeight

    this.width = Math.min(this.width, data.maxWidth);
    this.width = Math.max(this.width, data.minWidth);

    // this.height = data.maxHeight;
    this.height = Math.floor(this.width * data.realHeight / data.realWidth);
    this.canvas.style.height = "100%";
    console.log(this.width, this.height);
  }
}
