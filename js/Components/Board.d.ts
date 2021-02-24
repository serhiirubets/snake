import { Cell } from "./Cell";
import { Game } from "./Game";
export declare class Board {
    private game;
    private size;
    readonly cells: Cell[];
    constructor(game: Game);
    render(): void;
    private getRandomAvailableCell;
    private createCellObject;
    createFood(): void;
    createBomb(): void;
    create(): void;
    getCell(row: number, col: number): Cell | undefined;
    isFoodCell(cell: Cell): boolean;
    isBombCell(cell: Cell): boolean;
}
