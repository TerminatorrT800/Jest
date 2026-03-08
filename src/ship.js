const Directions  = require("./directions.js");

export default function ship(shipLength) {
  let length = shipLength;
  let hits = 0;

  let direction = Directions.right;

  const isSunk = () => hits >= length;

  const hit = () => hits++;

  const setDirection = (direction) => (direction = direction);

  return {
    isSunk,
    hit,
    getHits: () => hits,
    getLength: () => length,
    getDirection: () => direction,
    setDirection,
  };
}
