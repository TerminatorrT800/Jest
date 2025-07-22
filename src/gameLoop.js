import player from './player.js';
import gameBoard from './gameBoard.js';

export default function gameLoop() {
    let player1;
    let player2;
    let currentPlayer;

    const init = (player, cpu) => {
        const board1 = player.getBoard()
        const board2 = cpu.getBoard()

        player1 = player
        player2 = cpu

        currentPlayer = player1;
    }


    const playTurn = (coord)=>{
        const targetBoard = currentPlayer ===player1 ? player2.getBoard() : player1.getBoard()
        currentPlayer.attack(targetBoard, coord)
        let message;

        if(targetBoard.allShipsSunk()){
            message =(`${currentPlayer === player1 ? player1.getName() : "Computer"} win!`);
            return
        }

        currentPlayer = currentPlayer === player1 ? player2 : player1

        if(currentPlayer.isComputer()){
            const coord = currentPlayer.generateRandomCoord()
            playTurn(coord)
            if(message) return message
        }
    }

    return {init, playTurn}
}
