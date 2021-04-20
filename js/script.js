"use strict";

const grid = document.getElementById("board");
const layout = RAW_MAZE.table;
const items = [];

//create your board
function createBoard() {
  var c = 0;
  for (let i = 0; i < layout.length; i++) {
    const line = layout[i];
    for (let j = 0; j < line.length; j++) {
      const item = document.createElement("div");
      grid.appendChild(item);
      items.push(item);

      //add layout to the board
      if (line[j] === 2) {
        items[c].classList.add("pac-dot");
      } else if (line[j] === 1) {
        items[c].classList.add("wall");
      }

      // puting the square in the right position
      items[c].style.position = "absolute";
      items[c].style.top = 15 * i + "px";
      items[c].style.left = 15 * j + "px";

      c++;
    }
  }
}
createBoard();
