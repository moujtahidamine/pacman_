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

  // 2.2 Directions
  console.log("NORTH", Direction.NORTH);
  console.log("SOUTH", Direction.SOUTH);
  console.log("WEST", Direction.WEST);
  console.log("EAST", Direction.EAST);

  // 2.3 refactoring position
  let pos = new Position(41, 0);
  console.log(pos.nextPosition(Direction.SOUTH)); // doit afficher la Position(42, 0).

  // 2.4 sprites
  const pos2 = new Position(2, 41);
  const sp = new Sprite(pos2, Direction.EAST, "s1");
  console.log("sprite avant déplacement", sp.position);
  sp.move();
  console.log("sprite aprés déplacement", sp.position);

  sp.askToChangeDirection(Direction.WEST);
  console.log("la direction reste inchangée :", sp.direction);
  console.log(
    "une demande de direction a bien été faite :",
    sp.askedToChangeDirection
  );
  console.log("la direction demandée :", sp.askedDirection);
  sp.changeDirection();
  console.log("la direction a bien été changée :", sp.direction);
  console.log("aucune demande de direction :", sp.askedToChangeDirection);
  sp.move();
  console.log("sprite est bien revenu à sa position de départ", sp.position);
}

function test_2_5() {
  const game = new Game(RAW_MAZE);
  console.log("canWalkOn", game.maze.canWalkOn(new Position(0, 0))); // false.
  console.log("canWalkOn", game.maze.canWalkOn(new Position(1, 1))); // true.
  console.log("canPick", game.maze.canPick(new Position(1, 1))); // true.
  console.log("pick", game.maze.pick(new Position(1, 1))); // une gomme.
  console.log("canPick", game.maze.canPick(new Position(11, 0))); // false.
  console.log("pick", game.maze.pick(new Position(11, 0))); // Erreur !
}

function test_2_6() {
  const pacman = new Pacman(new Position(10, 10), Direction.NORTH);
  const pacmanCtrl = new PacmanCtrl(pacman);
  const pacmanView = new PacmanView(pacmanCtrl);
}
