import { Grid } from "./grid.js";
import { Block } from "./block.js";

let black = getComputedStyle(document.documentElement).getPropertyValue("--text-color").trim();
let green = getComputedStyle(document.documentElement).getPropertyValue("--background-color").trim();

export function loadGrid(length, height) {
    let grid = new Grid(length, height);

    let blocks = document.querySelectorAll(".block");

    console.log("Black: " + black);
    console.log("Green: " + green);

    blocks.forEach(block => {
        let row = Number(block.getAttribute("data-row"));
        let col = Number(block.getAttribute("data-col"));

        let color = getComputedStyle(block).backgroundColor;

        let isStart = block.classList.contains("start-block");
        let isEnd = block.classList.contains("end-block");

        color = rgbToHex(color);

        console.log("Color: " + color);

        let isEmpty = color === green ? true : false;

        if(isStart || isEnd) isEmpty = true;

        grid.addBlock(new Block(row, col, isEmpty, isStart, isEnd));
    });

    return grid;
}

function rgbToHex(rgb) {
    const values = rgb.match(/\d+/g);

    return "#" + values.map(v => Number(v).toString(16).padStart(2, "0").toUpperCase()).join("");
}