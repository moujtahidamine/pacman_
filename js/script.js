"use strict";

const layout = RAW_MAZE.table;

function test_1() {
  console.log("### Test... ###");
  // tests 1.4 : tuiles :
  const wall = new Wall("w1");
  const dot = new Dot("d1", true);
  console.log(wall);
  console.log(dot);
  console.log(dot.isEnergizer);

  // tests 1.5 : position
  const pos = new Position(3, 14);
  console.log("line", pos.row);
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

  // test 1.7 : Maze
  const maze = new Maze(RAW_MAZE);
  console.log(maze);
  console.log("nbRows", maze.nbRows);
  console.log("nbColumns", maze.nbColumns);
  console.log("getWallLayerTile", maze.getWallLayerTile(new Position(0, 1)));
  console.log("getDotLayerTile", maze.getDotLayerTile(new Position(1, 5)));

  // test 1.8 : game
  const game = new Game(RAW_MAZE);
  console.log(game);

  // test 1.9 : GameView
  const view = new GameView(game); // affichage du contenue visuelle
  console.log(view);

  console.log("### Fin de Test! ###");
}

function test_2() {
  const component = new Component("c-1");
  const tile = new Tile("t-1");
  console.log("component", component);
  console.log("tile", tile);
}
