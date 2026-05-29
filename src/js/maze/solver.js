export function solveMazeBFS(grid) {
    let startBlock = grid.startBlock;
    let endBlock = grid.endBlock;

    let junctions = [startBlock];
    startBlock.visited = true;

    while(junctions.length > 0) {
        let block = junctions.at(0);
        junctions = junctions.slice(1);

        if(block.isEnd) {
            grid.solution = block;

            return block;
        }

        let blockRight = grid.getBlock(block.row, block.col + 1);
        let blockLeft = grid.getBlock(block.row, block.col - 1);
        let blockTop = grid.getBlock(block.row - 1, block.col);
        let blockBottom = grid.getBlock(block.row + 1, block.col);

        exploreBlock(junctions, blockRight, block);
        exploreBlock(junctions, blockLeft, block);
        exploreBlock(junctions, blockBottom, block);
        exploreBlock(junctions, blockTop, block);

        //console.log("Junctions");
        //console.log(junctions);
    }

    return null;
}

export function solveMazeDFS(grid) {
    let startBlock = grid.startBlock;
    let endBlock = grid.endBlock;

    let junctions = [startBlock];
    startBlock.visited = true;

    while(junctions.length > 0) {
        let block = junctions.at(-1);
        junctions = junctions.slice(0, -1);

        if(block.isEnd) {
            grid.solution = block;

            return block;
        }

        let neighbours = grid.getNeighbours(block);

        neighbours.forEach(neighbour => {
            exploreBlock(junctions, neighbour, block);
        });

        //console.log("Junctions");
        //console.log(junctions);
    }

    return null;
}

function exploreBlock(junctions, block, parentBlock) {
    if(block == null) return;
    if(!block.isEmpty || block.visited) return;

    //console.log("Block");
    //console.log(block);

    block.visited = true;
    block.cameFrom = parentBlock;

    junctions.push(block);
}