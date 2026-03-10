import Directions from "./directions.js";

export default function ship(shipLength) {
  let length = shipLength;
  let hits = 0;

  let direction = Directions.HORIZONTAL;

  const isSunk = () => hits >= length;

  const hit = () => hits++;

  const setDirection = (newDirection) => (direction = newDirection);

  return {
    isSunk,
    hit,
    getHits: () => hits,
    getLength: () => length,
    getDirection: () => direction,
    setDirection,
  };
}
