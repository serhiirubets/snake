import { Game } from './Components/Game';

const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
const game = new Game(canvas);

game.start();
