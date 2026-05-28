import { handleIntegerInput } from "./handler.js";
import { addBlocks, updateLength, updateHeight, updateSize, highlightBlocks, removeHighlight } from "./rendering.js";
import { loadGrid } from "./maze/utils.js";
import { solveMaze } from "./maze/solver.js";

let blocks = document.querySelector("#blocks");
let length = document.querySelector("#length");
let height = document.querySelector("#height");
let size = document.querySelector("#size");

let solve = document.querySelector("#solve");
let reset = document.querySelector("#reset");

let mapLength = getComputedStyle(document.documentElement).getPropertyValue("--length");
let mapHeight = getComputedStyle(document.documentElement).getPropertyValue("--height");
let blockSize = getComputedStyle(document.documentElement).getPropertyValue("--block-size");

let grid = null;

handleIntegerInput(length, function(value) {
    mapLength = value;

    length.value = value;
    addBlocks(blocks, mapHeight, mapLength);
    updateLength(blocks, mapLength);
}, 1, 50);

handleIntegerInput(height, function(value) {
    mapHeight = value;

    height.value = value;
    addBlocks(blocks, mapHeight, mapLength);
    updateHeight(blocks, mapHeight);
}, 1, 50);

handleIntegerInput(size, function(value) {
    blockSize = value + "px";

    size.value = value;
    updateSize(blockSize);
}, 5, 100);

solve.addEventListener("click", function(e) {
    removeHighlight();

    grid = loadGrid(mapLength, mapHeight);

    console.log("Grid");
    console.log(grid);

    let solution = solveMaze(grid);

    let points = grid.transformSolutionBlockToPoints();
    
    highlightBlocks(points);
});

reset.addEventListener("click", function(e) {
    addBlocks(blocks, mapHeight, mapLength);
});

addBlocks(blocks, mapHeight, mapLength);