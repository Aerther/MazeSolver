function createBlock(row, col, length, height) {
    let block = document.createElement("div");
    block.classList.add("block");
    
    block.dataset.row = row;
    block.dataset.col = col;

    block.addEventListener("click", blockEventListener);

    if(row == 0 && col == 0) {
        block.classList.add("start-block");
    }

    if(row == height - 1 && col == length - 1) {
        block.classList.add("end-block");
    }

    if(col === 0) {
        block.classList.add("first-col");
    }

    if(row === 0) {
        block.classList.add("first-row");
    }

    return block;
}

function blockEventListener(e) {
    e.target.classList.toggle("active");
}

export function makeGrid(points) {
    let blocks = document.querySelectorAll(".block");

    blocks.forEach(block => {
        let row = Number(block.getAttribute("data-row"));
        let col = Number(block.getAttribute("data-col"));

        let isStart = block.classList.contains("start-block");
        let isEnd = block.classList.contains("end-block");

        if(isStart || isEnd) return;

        points.forEach(point => {
            if(point.isPartOfMaze) return;

            if(point.row == row && point.col == col) {
                block.classList.add("active");
            };
        });
    });
}

export function addBlocks(blocks, height, length) {
    blocks.innerHTML = "";

    for (let row = 0; row < height; row++) {
        for(let col = 0; col < length; col++) {
            let block = createBlock(row, col, length, height);

            blocks.appendChild( block );
        }
    }
}

export function removeHighlight() {
    let blocks = document.querySelectorAll(".block");

    blocks.forEach(block => {
        block.classList.remove("highlight-block");
    });
}

export function removeWalls() {
    let blocks = document.querySelectorAll(".block");

    blocks.forEach(block => {
        block.classList.remove("active");
    });
}

export function highlightBlocks(points) {
    let blocks = document.querySelectorAll(".block");

    blocks.forEach(block => {
        let row = Number(block.getAttribute("data-row"));
        let col = Number(block.getAttribute("data-col"));

        let isStart = block.classList.contains("start-block");
        let isEnd = block.classList.contains("end-block");

        if(isStart || isEnd) return;

        points.forEach(point => {
            if(point.row == row && point.col == col) {
                block.classList.add("highlight-block");
            }
        });
    });
}

export function updateLength(blocks, length) {
    blocks.style.setProperty("--length", length);
}

export function updateHeight(blocks, height) {
    blocks.style.setProperty("--height", height);
}

export function updateSize(size) {
    blocks.style.setProperty("--block-size", size);
}