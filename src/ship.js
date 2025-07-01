export default function ship(shipLength) {
  let length = shipLength;
  let hits = 0;

  const isSunk = () => hits >= length;

  const hit = () => hits++;

  const getHits = () => hits;

  const getLength = () => length;

  return {
    isSunk,
    hit,
    getHits,
    getLength,
  };
}

