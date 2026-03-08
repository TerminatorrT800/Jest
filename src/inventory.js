const { ship } = require("./ship.js");


export default function Inventory(boardSize) {
  let ships = [];

  let numberOfShips = Math.ceil(boardSize / 2);

  let minShipLength = 2;
  let maxShipLength = boardSize - minShipLength;

  

  const addShip = (ship) => ships.push(ship);

  const generateShips = () => {
    for (let i = 0; i < numberOfShips; i++) {
      let shipLength = Math.floor(Math.random() * (maxShipLength - minShipLength + 1)) + minShipLength;
      let ship = ship(shipLength);
      addShip(ship);
    }

  };

  return { addShip, getShips: () => ships };
}
