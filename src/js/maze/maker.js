import { Grid } from "./grid.js";

// Iterative randomized Prim's algorithm
export function createMazePrim(length, height) {
    let walls = [];

    let grid = new Grid(length, height);
    grid.addWalls();

    let block = grid.getBlock(0, 0);
    block.isPartOfMaze = true;

    let neighbours = grid.getNeighbours(block);
    walls.push(...neighbours);

    while(walls.length > 0) {
        let random = Math.floor(Math.random() * (walls.length));
        let wall = walls.at(random);

        let list = grid.getNeighbours(wall);

        let sum = list.reduce((acc, neighbour) => acc + (neighbour.isPartOfMaze ? 1 : 0), 0);

        if(sum == 1) {
            wall.isPartOfMaze = true;
            
            list = list.filter(neighbour => neighbour.isPartOfMaze == false);
            walls.push(...list);
        }

        walls.splice(random, 1);
    }

    return grid;
};

// DFS
function createMazeDFS(length, height) {
    
}