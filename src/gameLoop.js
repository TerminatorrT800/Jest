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
    const targetBoard =
      currentPlayer === player1 ? player2.getBoard() : player1.getBoard();
    const result = currentPlayer.attack(targetBoard, coord);

    if (targetBoard.allShipsSunk()) {
      return { result, Winner: `${currentPlayer.getName()} wins!` };
    }

    if (currentPlayer === player1) {
      setCurrentPlayer(player2);
    } else {
      setCurrentPlayer(player1);
    }
    const cpuLastMove = currentPlayer.getLastMove();

    let cpuCoord;
    if (currentPlayer.isComputer() && !player1.getBoard().allShipsSunk()) {
      console.log(cpuLastMove);
      cpuCoord = currentPlayer.CPUsmartAttack(currentPlayer.getLastMove());

      const cpuResult = currentPlayer.attack(player1.getBoard(), cpuCoord);
      currentPlayer.setLastMove({ coord: cpuCoord, result: cpuResult });

      if (player1.getBoard().allShipsSunk()) {
        return {
          result,
          cpuCoord,
          cpuWinner: `${currentPlayer.getName()} wins!`,
        };
      }

      setCurrentPlayer(player1);
      return { result, cpuCoord };
    }

    return { result, cpuCoord };
  };
  const setCurrentPlayer = (player) => {
    currentPlayer = player;
  };

  return { init, playTurn, getCurrentPlayer: () => currentPlayer };
}
