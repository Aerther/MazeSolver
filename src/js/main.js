import { handleIntegerInput } from "./handler.js";
import { addBlocks, updateLength, updateHeight, updateSize, highlightBlocks, removeHighlight, makeGrid, removeWalls } from "./rendering.js";
import { loadGrid } from "./maze/utils.js";
import { solveMazeBFS } from "./maze/solver.js";
import { createMazePrim } from "./maze/maker.js";

let blocks = document.querySelector("#blocks");
let length = document.querySelector("#length");
let height = document.querySelector("#height");
let size = document.querySelector("#size");

let solve = document.querySelector("#solve");
let reset = document.querySelector("#reset");
let make = document.querySelector("#make");

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

    let solution = solveMazeBFS(grid);

    let points = grid.transformSolutionBlockToPoints();
    
    highlightBlocks(points);
});

reset.addEventListener("click", function(e) {
    addBlocks(blocks, mapHeight, mapLength);
});

make.addEventListener("click", function(e) {
    removeHighlight();
    removeWalls();

    let grid = createMazePrim(mapLength, mapHeight);

    let points = grid.transformGridToPoints();

    makeGrid(points);
});

addBlocks(blocks, mapHeight, mapLength);