import ship from '../src/ship.js';

test('hit() increases hit count', () => {
  const myShip = ship(3);
  myShip.hit();
  expect(myShip.getHits()).toBe(1);
});

test('isSunk() returns true when ship is sunk', () => {
  const myShip = ship(2);
  myShip.hit();
  myShip.hit();
  expect(myShip.isSunk()).toBe(true);
});
