import gameBoard from "../src/gameBoard.js";
import gameLoop from "../src/gameLoop.js";
import Inventory from "../src/inventory.js";
import player from "../src/player.js";
import ship from "../src/ship.js";

test("hit() increases hit count", () => {
  const myShip = ship(3);
  myShip.hit();
  expect(myShip.getHits()).toBe(1);
});

test("isSunk() returns true when ship is sunk", () => {
  const myShip = ship(2);
  myShip.hit();
  myShip.hit();
  expect(myShip.isSunk()).toBe(true);
});

test("allShipsSunk() returns true when all ships are sunk", () => {
  const myShip = ship(2);
  const myShip2 = ship(2);
  const myBoard = gameBoard(5);
  myBoard.placeShip("2,2", myShip);
  myBoard.placeShip("2,4", myShip2);
  myBoard.receiveAttack("2,2");
  myBoard.receiveAttack("3,2");
  myBoard.receiveAttack("3,4");
  myBoard.receiveAttack("2,4");
  expect(myBoard.allShipsSunk()).toBe(true);
  expect(myBoard.receiveAttack("0,0")).toBe("Miss");
});

test("getMissedAttacks() counts missed attacks", () => {
  const myShip = ship(2);
  const myBoard = gameBoard(5);
  myBoard.placeShip("2,2", myShip);
  myBoard.receiveAttack("8,2");
  myBoard.receiveAttack("4,2");
  expect(myBoard.getMissedAttacks().length).toBe(1);
});

test("playTurn() player wins", () => {
  const game = gameLoop();

  const P1Board = gameBoard(5);
  const CPUBoard = gameBoard(5);

  const p1 = player("T800", P1Board);
  const cpu = player("cpu", CPUBoard);
  cpu.setAsComputer();

  const firstShip = ship(2);
  const secondShip = ship(2);

  p1.getBoard().placeShip("2,2", firstShip);
  cpu.getBoard().placeShip("2,2", secondShip);

  game.init(p1, cpu);

  game.playTurn("3,2");
  game.playTurn("5,3");
  game.playTurn("0,3");
  game.playTurn("2,2");
  expect(p1.getName()).toBe("T800");
  expect(cpu.getBoard().allShipsSunk()).toBe(true);
});

test(`Ship number`, ()=>{
  const BOARD_SIZE = 5;
  const p1Board = gameBoard(BOARD_SIZE);
  const p2Board = gameBoard(BOARD_SIZE);

  const shipInventory = Inventory(BOARD_SIZE);
  shipInventory.generateShips();
  expect(shipInventory.getNumberOfShips()).toBe(Math.ceil(BOARD_SIZE / 2));
})
