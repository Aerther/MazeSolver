export class Block {
    constructor(row, col, isEmpty, isStart = false, isEnd = false) {
        this.row = row;
        this.col = col;
        this.isEmpty = isEmpty;

        this.isStart = isStart;
        this.isEnd = isEnd;

        this.cameFrom = null;
        this.visited = false;
        this.isPartOfMaze = false;
    }
}