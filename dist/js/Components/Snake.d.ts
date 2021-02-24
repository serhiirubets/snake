import { Cell } from "./Cell";
import { Game } from "./Game";
import { Key } from "../../types";
export declare class Snake {
    private game;
    moving: boolean;
    cells: Cell[];
    direction: {
        row: number;
        col: number;
        angle: number;
    };
    constructor(game: Game);
    private renderHead;
    private renderBody;
    render(): void;
    create(): void;
    move(): void;
    private getNextCell;
    start(key: Key): void;
    hasCell(cell: Cell): Cell | undefined;
}
