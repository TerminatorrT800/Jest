import player from './player.js';
import gameBoard from './gameBoard.js';

export default function gameLoop() {
    let player1;
    let player2;
    let currentPlayer;

    const init = (name, boardSize) => {
        const board1 = gameBoard(boardSize)
        const board2 = gameBoard(boardSize)

        player1 = player(name, board1)
        player2 = player('Computer', board2)

        player2.setAsComputer()
        currentPlayer = player1;
    }


    const playTurn = (coord)=>{
        const targetBoard = currentPlayer ===player1 ? player2.getBoard() : player1.getBoard()
        const result = currentPlayer.attack(targetBoard, coord)

        if(targetBoard.allShipsSunk()){
            console.log(`${currentPlayer === player1 ? player1.getName() : "Computer"} win!`);
            return
        }

        currentPlayer = currentPlayer === player1 ? player2 : player1

        if(currentPlayer.isComputer()){
            const coord = currentPlayer.generateRandomCoord()
            playTurn(coord)
        }
    }

    return {init, playTurn}
}
