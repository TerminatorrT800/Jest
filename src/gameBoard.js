import ship from "./ship.js";
import Directions from "./directions.js";

export default function gameBoard(size) {
  let boardSize = size;
  let ships = [];
  let missedAttacks = [];
  let occupiedCoords = new Set();
  let availableCoords = new Set();
  let startingCoords = new Set();

  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      availableCoords.add(`${i},${j}`);
    }
  }

  let boardMap = (boardSize) => {
    let board = {};
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        board[`${i},${j}`] = { ship: null, isHit: null };
      }
    }
    return board;
  };

  let board = boardMap(boardSize);

  const placeShip = (startCoord, ship) => {
    const [x, y] = startCoord.split(",").map(Number);

    if (
      (ship.getDirection() == Directions.HORIZONTAL && boardSize < ship.getLength() + x) ||
      (ship.getDirection() == Directions.VERTICAL && boardSize < ship.getLength() + y)
    ) {
      console.log("Invalid coordinates or ship lenght!");
    } else {
      let shipCoords = new Set();
      switch (ship.getDirection()) {
        case Directions.HORIZONTAL:
          for (let i = 0; i < ship.getLength(); i++) {
            shipCoords.add(`${x + i},${y}`);                                                     
          }
          break;
        case Directions.VERTICAL:
          for (let i = 0; i < ship.getLength(); i++) {
            shipCoords.add(`${x},${y + i}`);
          }
          break;
      }
      let able = true;

      for (const coord of shipCoords) {
        if (!availableCoords.has(coord)) {
          able = false;
          console.log("Cannot place ship here, coordinates occupied!");
          break;
        }
      }
      if (able == true) {
        ships.push(ship);
        let coordNum = startCoord.split(",").map(Number);
        shipCoords.forEach((cord) => {
          coordNum = cord.split(",").map(Number);
          occupiedCoords.add(cord);
          availableCoords.delete(cord);
          availableCoords.delete(`${coordNum[0]},${coordNum[1]-1}`);
           availableCoords.delete(`${coordNum[0]-1},${coordNum[1]}`);
           availableCoords.delete(`${coordNum[0]-1},${coordNum[1]-1}`);
           availableCoords.delete(`${coordNum[0]-1},${coordNum[1]+1}`);
           availableCoords.delete(`${coordNum[0]+1},${coordNum[1]-1}`);
           availableCoords.delete(`${coordNum[0]+1},${coordNum[1]+1}`);
           ship.Directions == Directions.HORIZONTAL
             ? availableCoords.delete(`${coordNum[0]},${coordNum[1]+1}`)
             : availableCoords.delete(`${coordNum[0]+1},${coordNum[1]}`);
          board[cord].ship = ship;
        });
        ship.Directions == Directions.HORIZONTAL
          ? availableCoords.delete(`${coordNum[0]+1},${coordNum[1]}`)
          : availableCoords.delete(`${coordNum[0]},${coordNum[1]+1}`)       
        return true;
      } else return false;
    }
  };

  const allShipsSunk = () => ships.length > 0 && ships.every((ship) => ship.isSunk());

  const receiveAttack = (coord) => {
    if (!board[coord]) return 0;

    if (board[coord].ship != null) {
      if (board[coord].isHit == null) {
        board[coord].ship.hit()
        board[coord].isHit = true;
        return 'Hit'
      } else {
        missedAttacks.push(coord)
        return 'Miss'
      }
    } else {
      board[coord].isHit = true;
      missedAttacks.push(coord)
      return 'Miss'
    }
  }



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

  const reset = () => {
  ships = [];
  missedAttacks = [];
  occupiedCoords = new Set();
  startingCoords = new Set();
  
  availableCoords = new Set();
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      availableCoords.add(`${i},${j}`);
    }
  }
  
  board = boardMap(boardSize);
};

  const addStartingCoord = (coord) => startingCoords.add(coord);

  return {
    placeShip,
    allShipsSunk,
    receiveAttack,
    getMissedAttacks,
    getBoard,
    printBoard,
    getSize: () => boardSize,
    getOccupiedCoords: () => occupiedCoords,
    getAvailableCoords: () => availableCoords,
    addStartingCoord,
    getStartingCoords: () => startingCoords,
    reset,
  };
}
