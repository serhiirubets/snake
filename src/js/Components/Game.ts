import background from '../../assets/img/background.png';
import cell from '../../assets/img/cell.png';
import body from '../../assets/img/body.png';
import food from '../../assets/img/food.png';
import head from '../../assets/img/head.png';
import bomb from '../../assets/img/bomb.png';
import bombSound from '../../assets/sounds/bomb.mp3';
import foodSound from '../../assets/sounds/food.mp3';
import themeSound from '../../assets/sounds/theme.mp3';
import {loadAudio, loadPicture} from "../helpers";
import {Board} from "./Board";
import {Snake} from "./Snake";
import {config} from "../config";
import {Key} from "../../types";

const sprites: Record<string, string> = {
  background,
  cell,
  body,
  food,
  head,
  bomb
}

const sounds: Record<string, string> = {
  bomb: bombSound,
  food: foodSound,
  theme: themeSound,
}

export class Game {
  public readonly ctx: CanvasRenderingContext2D;
  public sprites: Record<string, HTMLImageElement> = {};
  private preloadedAssets!: Promise<void>[];
  private sounds: Record<string, HTMLAudioElement> = {};
  public board: Board;
  public snake: Snake = new Snake(this);
  public width: number = 0;
  public height: number = 0;
  private gameInterval!: number;
  private bombInterval!: number;
  private score = 0;

  constructor(private canvas: HTMLCanvasElement) {
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.board = new Board(this);
    this.initDimensions();
    this.setEvents();
    this.setFonts();
  }

  private renderBackground(): void {
    this.ctx.drawImage(
      this.sprites.background,
      (this.width - this.sprites.background.width) / 2,
      (this.height - this.sprites.background.height) / 2
    );
  }

  private setUpAssets() {
    Object.keys(sprites).forEach((key: string) => {
      this.sprites[key] = new Image();
      this.sprites[key].src = sprites[key];
    });

    Object.keys(sounds).forEach((key: string) => {
      this.sounds[key] = new Audio(sounds[key]);
    });
  }

  private preloadImageAssets(): Promise<void>[] {
    return Object.keys(sprites).map((key) => loadPicture(this.sprites[key], sprites[key]));
  }

  private preloadAudioAssets(): Promise<void>[] {
    return Object.keys(sounds).map((key) => loadAudio(this.sounds[key]));
  }

  private preloadAssets(): void {
    this.preloadedAssets = [...this.preloadImageAssets(), ...this.preloadAudioAssets()];
  }

  private preload() {
    this.setUpAssets();
    this.preloadAssets();
  }

  private create() {
    this.board.create();
    this.snake.create();
    this.board.createFood();
    this.board.createBomb();
  }

  private setFonts() {
    this.ctx.font = '20px Cocoai';
    this.ctx.fillStyle = '#FFF';
  }

  private render(): void {
    this.clearCanvas();
    this.renderBackground();
    this.board.render();
    this.snake.render();
    this.ctx.fillText(`Score: ${this.score}`, 30, 30);
  }

  private run() {
    this.gameInterval = window.setInterval(() => {
      this.snake.move();
      this.render();
    }, 150);

    this.bombInterval = window.setInterval(() => {
      if (this.snake.moving) {
        this.board.createBomb();
      }

    }, 3000);
  }

  public start() {
    this.preload();

    Promise.all(this.preloadedAssets).then(() => {
      this.create();
      this.run();
    });
  }

  private fitWidth() {
    this.height = Math.floor(this.width * window.innerHeight / window.innerWidth);
    this.height = Math.min(this.height, config.game.max.height);
    this.height = Math.max(this.height, config.game.min.height);
    this.width = Math.round(window.innerWidth * this.height / window.innerHeight);
  }

  private fitHeight() {
    this.width = Math.floor(window.innerWidth * config.game.max.height / window.innerHeight);
    this.width = Math.min(this.width, config.game.max.width);
    this.width = Math.max(this.width, config.game.min.width);
    this.height = Math.floor(this.width * window.innerHeight / window.innerWidth);
  }

  private initDimensions() {
    const data = {
      maxWidth: config.game.max.width,
      maxHeight: config.game.max.height,
      minWidth: config.game.min.width,
      minHeight: config.game.min.height,
      realWidth: window.innerWidth,
      realHeight: window.innerHeight
    };

    if (data.realWidth / data.realHeight > data.maxWidth / data.maxHeight) {
      this.fitWidth();
    } else {
      this.fitHeight();
    }

    this.canvas.style.width = "100%";
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  private clearCanvas() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  private setEvents() {
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      this.snake.start(e.key as Key);
    });
  }

  stop() {
    clearInterval(this.gameInterval);
    clearInterval(this.bombInterval);
    this.sounds.bomb.play();
    alert('Game is over');
    window.location.reload();
  }

  onSnakeStart() {
    this.sounds.theme.loop = true;
    this.sounds.theme.play();
  }

  onSnakeEat() {
    this.sounds.food.play();
    this.board.createFood();
    this.score++;
  }
}
