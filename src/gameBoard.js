import ship from './ship'


export default function gameBoard(size) {
  let boardSize = size;
  let ships = [];
  let missedAttacks = [];
  let occupiedCoords = new Set();

  let boardMap = (boardSize) => {
    let board = {};
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < size; j++) {
        board[`${i},${j}`] = { ship: null, isHit: null };
      }
    }
    return board;
  };

  let board = boardMap();
  const placeShip = (startCoord, direction, ship) => {
    const [x, y] = startCoord.split(",").map(Number);

    if (
      (direction == "horizontal" && boardSize < ship.getLength() + x) ||
      (direction == "vertical" && boardSize < ship.getLength() + y)
    ) {
      console.log("Invalid coordinates or ship lenght!");
    } else {
      let shipCoords = new Set();
      switch (direction) {
        case "horizontal":
          for (let i = 0; i < ship.getLength(); i++) {
            shipCoords.add(`${x + i},${y}`);
          }
          break;
        case "vertical":
          for (let i = 0; i < ship.getLength(); i++) {
            shipCoords.add(`${x},${y + i}`);
          }
          break;
      }
      let able = true;

      for (const coord of shipCoords) {
        if (occupiedCoords.has(coord)) {
          able = false;
          break;
        }
      }
      if (able == true) {
        ships.push(ship);
        shipCoords.forEach((cord) => {
          occupiedCoords.add(cord);
          board[cord].ship = ship;
        });
      } else return false;
    }
  };

  const allShipsSunk = () => ships.every((ship) => ship.isSunk());

  const receiveAttack = (coord) => {
    if (board[coord].isHit != null) return;

    board[coord].isHit = true;

    if (board[coord].ship != null) {
      board[coord].ship.hit();
      return "Hit";
    } else {
      missedAttacks.push(coord);
      return "Miss";
    }
  };

  const getMissedAttacks = () => missedAttacks;
  const getBoard = () => board;

  const printBoard = () => {
    for (let y = 0; y < boardSize; y++) {
      let row = "";
      for (let x = 0; x < boardSize; x++) {
        const cell = board[`${x},${y}`];
        if (cell.isHit == true && cell.ship != null) {
          row += " X ";
        } else if (cell.isHit === true) {
          row += " O ";
        } else if (cell.ship != null) {
          row += " S ";
        } else row += " ~ ";
      }
      console.log(row);
    }
  };

  return {
    placeShip,
    allShipsSunk,
    receiveAttack,
    getMissedAttacks,
    getBoard,
    printBoard,
    getSize: () => boardSize
  };
}