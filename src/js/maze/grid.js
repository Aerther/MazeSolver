import { Point } from "./point.js";

export class Grid {
    constructor(length, height) {
        this.grid = [];
        this.falseGrid = [];
        this.length = Number(length);
        this.height = Number(height);

        this.startBlock = null;
        this.endBlock = null;

        this.solution = null;
    }

    transformSolutionBlockToPoints() {
        let points = [];

        let currentBlock = this.solution;
        while(currentBlock != null) {
            points.push(new Point(currentBlock.row, currentBlock.col));

            currentBlock = currentBlock.cameFrom;
        }

        return points;
    }

    addBlock(block) {
        this.falseGrid.push(block);

        if(block.isStart) this.startBlock = block;
        if(block.isEnd) this.endBlock = block;

        if(this.falseGrid.length === this.length) {
            this.grid.push(this.falseGrid);
            
            this.falseGrid = [];
        }
    }

    setStartBlock(startBlock) {
        this.startBlock = startBlock;
    }

    setEndBlock(endBlock) {
        this.endBlock = endBlock;
    }

    getBlock(row, col) {
        if(row < 0 || col < 0) return null;

        if(row >= this.height || col >= this.length) return null;

        return this.grid[row][col];
    }
}