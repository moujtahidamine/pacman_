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

function test() {
  console.log("### Test... ###");
  // tests 1.4 : tuiles :
  const wall = new Wall("w1");
  const dot = new Dot("d1", true);
  console.log(wall);
  console.log(dot);
  console.log(dot.isEnergizer);

  // tests 1.5 : position
  const pos = new Position(3, 14);
  console.log("line", pos.raw);
  console.log("column", pos.column);

  // tests 1.6 : Layer
  const layer = new Layer(10, 20);
  layer.setTile(pos, wall);
  console.log("layer", layer);
  console.log("getTile", layer.getTile(pos)); // Wall("w1")
  console.log("getTile", layer.getTile(new Position(1, 5))); // undefined
  console.log("contains", layer.contains(new Position(-2, 15))); // false
  console.log("hasTile-1", layer.hasTile(pos)); // true
  console.log("hasTile-2", layer.hasTile(new Position(2, 2))); // false

  console.log("### Fin de Test! ###");
}
