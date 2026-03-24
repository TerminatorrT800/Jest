import player from "./player.js";
import gameBoard from "./gameBoard.js";

export default function gameLoop() {
  let player1;
  let player2;
  let currentPlayer;

  const init = (player, cpu) => {
    player1 = player;
    player2 = cpu;

    currentPlayer = player1;
  };

  const playTurn = (coord) => {
    let targetBoard =
      currentPlayer === player1 ? player2.getBoard() : player1.getBoard();
    console.log(targetBoard.getBoard());
    const result = currentPlayer.attack(targetBoard, coord);

    if (targetBoard.allShipsSunk()) {
      return `${currentPlayer.getName()} wins!`;
    }
    currentPlayer.lastMove = { coord, result };


    if (currentPlayer === player1) {
      setCurrentPlayer(player2);
    } else {
      setCurrentPlayer(player1);
    }
    let cpuCoord;
    if (
      currentPlayer.isComputer() &&
      !player1.getBoard().allShipsSunk() &&
      !player2.getBoard().allShipsSunk() &&
      currentPlayer.getLastMove().result === "Hit"
    ) {
      let x = parseInt(currentPlayer.lastMove.coord.split(",")[0]);
      let y = parseInt(currentPlayer.lastMove.coord.split(",")[1]);
      const potentialCoords = [
        `${x + 1},${y}`,
        `${x - 1},${y}`,
        `${x},${y + 1}`,
        `${x},${y - 1}`
      ].filter((coord) => !currentPlayer.getFiredShoots().has(coord));

      cpuCoord = potentialCoords.length > 0
        ? potentialCoords[Math.floor(Math.random() * potentialCoords.length)]
        : currentPlayer.generateRandomCoord();
      playTurn(cpuCoord);
    }
    else if (
      currentPlayer.isComputer() &&
      !player1.getBoard().allShipsSunk() &&
      !player2.getBoard().allShipsSunk()
    ) {
      cpuCoord = currentPlayer.generateRandomCoord();
      playTurn(cpuCoord);
    }

    return {result, cpuCoord};
  };

  const setCurrentPlayer = (player) => {
    currentPlayer = player;
  };

  return { init, playTurn, getCurrentPlayer: () => currentPlayer };
}
