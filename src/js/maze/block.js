export class Block {
    constructor(row, col, isEmpty, isStart, isEnd) {
        this.row = row;
        this.col = col;
        this.isEmpty = isEmpty;

        this.isStart = isStart;
        this.isEnd = isEnd;

        this.cameFrom = null;
        this.visited = false;
    }
}