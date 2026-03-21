import Directions from "./directions";
import ship from "./ship";
import player from "./player";
import gameBoard from "./gameBoard";

function tryPlaceShip(player, ship, maxAttempts = 30) {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const direction =
      Math.random() < 0.5 ? Directions.HORIZONTAL : Directions.VERTICAL;
    ship.setDirection(direction);

    const availableCoords = player.getBoard().getAvailableCoords();
    const boardSize = player.getBoard().getSize();
    const shipLength = ship.getLength();

    const validStartCoords = Array.from(availableCoords).filter((coord) => {
      const [x, y] = coord.split(",").map(Number);

      if (direction === Directions.HORIZONTAL) {
        for (let i = 0; i < shipLength; i++) {
          if (!availableCoords.has(`${x + i},${y}`)) return false;
        }
        return x + shipLength <= boardSize;
      } else {
        for (let i = 0; i < shipLength; i++) {
          if (!availableCoords.has(`${x},${y + i}`)) return false;
        }
        return y + shipLength <= boardSize;
      }
    });

    if (validStartCoords.length === 0) {
      continue;
    }

    const randomCoord =
      validStartCoords[Math.floor(Math.random() * validStartCoords.length)];
    const placed = player.getBoard().placeShip(randomCoord, ship);
    if (placed) {
      player.getBoard().addStartingCoord(randomCoord);
      return true;
    }
  }
  return false;
}

function deployShipsRandomly(player, inventory) {
  let success = false;

  while (!success) {
    player.getBoard().reset();
    success = true;

    for (const ship of inventory.getShips()) {
      const placed = tryPlaceShip(player, ship);
      if (!placed) {
        success = false;
        break;
      }
    }
  }
}

export { deployShipsRandomly };