import gameBoard from "../src/gameBoard.js";
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
  const myShip = ship(2)
  const myBoard = gameBoard(5)
  myBoard.placeShip('2,2', 'horizontal', myShip)
  myBoard.receiveAttack('2,2')
  myBoard.receiveAttack('3,2')
  expect(myBoard.allShipsSunk()).toBe(true)
  expect(myBoard.getMissedAttacks().length).toBe(0)
  expect(myBoard.receiveAttack('0,0')).toBe('Miss')
});
