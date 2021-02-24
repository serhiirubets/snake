import { CellType } from "../../types";
export declare class Cell {
    x: number;
    y: number;
    row: number;
    col: number;
    type?: CellType;
    constructor(x: number, y: number, row: number, col: number);
}
