import './style.css'
import gameBoard from './gameBoard.js';
import gameLoop from './gameLoop.js';
import player from './player.js';
import ship from './ship.js';

const BOARD_SIZE = 5;

const playerBoardDiv = document.getElementById('player-board')
const enemyBoardDiv = document.getElementById('enemy-board')
const startBtn = document.getElementById('start-btn')

let p1;
let cpu;


startBtn.addEventListener('click', () => {
    const game = gameLoop();
    const P1Board = gameBoard(BOARD_SIZE);
    const CPUBoard = gameBoard(BOARD_SIZE);
    const p1 = player('T800', P1Board)
    const cpu = player('cpu', CPUBoard)

    const firstShip = ship(2)
    const secondShip = ship(2)

    p1.getBoard().placeShip('2,2', 'horizontal', firstShip)
    cpu.getBoard().placeShip('2,2', 'horizontal', secondShip)

    game.init(p1, cpu);

    console.log('Game initialized with player and CPU boards');
    console.log('Player Board:', p1.getBoard());
    console.log('CPU Board:', cpu.getBoard());

    createGrid(playerBoardDiv, p1.getBoard(), false, BOARD_SIZE);
    createGrid(enemyBoardDiv, cpu.getBoard(), true, BOARD_SIZE);
});

function createGrid(container, board, isEnemy = false, BOARD_SIZE) {
    container.innerHTML = '';
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.coord = `${i},${j}`;
            if (isEnemy) {
                cell.addEventListener('click', () => {
                    if (!cell.classList.contains('hit') && !cell.classList.contains('miss')) {
                        const result = cpu.attack(`${i},${j}`);
                        if (result === 'Hit') {
                            cell.classList.add('hit');
                        } else {
                            cell.classList.add('miss');
                        }
                    }
                });
            } else {
                if (board.getOccupiedCoords().has(`${i},${j}`)) {
                    cell.classList.add('ship');
                }
            }
            container.appendChild(cell);
        }
    }
}

