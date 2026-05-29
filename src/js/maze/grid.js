import { Point } from "./point.js";
import { Block } from "./block.js";

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

    addWalls() {
        for (let row = 0; row < this.height; row++) {
            let gridRow = [];

            for(let col = 0; col < this.length; col++) {
                gridRow.push( new Block(row, col, false) );
            }

            this.grid.push(gridRow);
        }
    };

    transformGridToPoints() {
        let points = [];

        this.grid.forEach(gridRow => {
            gridRow.forEach(block => {
                points.push(new Point(block.row, block.col, block.isPartOfMaze));
            });
        });

        return points;
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

    getNeighbours(block, distance = 1) {
        let row = block.row;
        let col = block.col;
        
        let blockTop = this.getBlock(row - distance, col);
        let blockBottom = this.getBlock(row + distance, col);
        let blockLeft = this.getBlock(row, col - distance);
        let blockRight = this.getBlock(row, col + distance);

        let list = [blockTop, blockBottom, blockLeft, blockRight];

        list = list.filter(block => block != null);

        return list;
    }

    getBlockBetween(block1, block2) {
        let row = (block1.row + block2.row)/2;
        let col = (block1.col + block2.col)/2;

        return this.getBlock(row, col);
    }
}