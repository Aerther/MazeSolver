export class Point {
    constructor(row, col, isPartOfMaze = false) {
        this.row = row;
        this.col = col;
        this.isPartOfMaze = isPartOfMaze;
    }
}