import "./style.css";
import gameBoard from "./gameBoard.js";
import gameLoop from "./gameLoop.js";
import player from "./player.js";
import ship from "./ship.js";
import Inventory from "./inventory.js";
import Directions from "./directions.js";
import { deployShipsRandomly } from "./shipPlacer.js";

const BOARD_SIZE = 10;

const playerOneHeader = document.getElementById("PlayerOneName");
const playerTwoHeader = document.getElementById("PlayerTwoName");
const playerBoardDiv = document.getElementById("player-board");
const enemyBoardDiv = document.getElementById("enemy-board");
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");
const configModal = document.getElementById("config-modal");
const cancelConfig = document.getElementById("cancel-config");
const confirmConfig = document.getElementById("confirm-config");
const p1Input = document.getElementById("p1-name");
const boardSizeInput = document.getElementById("board-size");
resetBtn.disabled = true;


let currentGame = null;

let gameOver = false;

cancelConfig.addEventListener("click", () => {
  configModal.classList.add("hidden");
});


confirmConfig.addEventListener("click", () => {
  collectGameData(createGame);
  console.log("Game Configuration:", currentGame);
  configModal.classList.add("hidden");
});


resetBtn.addEventListener("click", async () => {
  startBtn.disabled = false;
  resetBtn.disabled = true;
  p1.getBoard().reset();
  cpu.getBoard().reset();
  currentGame = null;
  p1.resetFiredshoots();
  cpu.resetFiredshoots();
  gameOver = false;
  playerBoardDiv.innerHTML = "";
  enemyBoardDiv.innerHTML = "";
});

startBtn.addEventListener("click", async () => {
  configModal.classList.remove("hidden");
});

async function createGame({ playerOneName, playerTwoName, boardSize } = {}) {

  startBtn.disabled = true;
  resetBtn.disabled = false;

  const P1Board = gameBoard(boardSize || BOARD_SIZE);
  const CPUBoard = gameBoard(boardSize || BOARD_SIZE);
  const p1 = player(playerOneName, P1Board);
  const cpu = player(playerTwoName, CPUBoard);

  cpu.setAsComputer();

  const game = gameLoop();

  const p1Inventory = Inventory(boardSize || BOARD_SIZE);
  p1Inventory.generateShips();

  const p2Inventory = Inventory(boardSize || BOARD_SIZE);
  p2Inventory.generateShips();

  deployShipsRandomly(p1, p1Inventory);
  deployShipsRandomly(cpu, p2Inventory);


  game.init(p1, cpu);

  console.log("Game initialized with player and CPU boards");
  cpu.getBoard().printBoard();
  currentGame = game;

  createGrid(playerBoardDiv, p1.getBoard(), p1.isComputer(), boardSize || BOARD_SIZE, currentGame);
  createGrid(enemyBoardDiv, cpu.getBoard(), cpu.isComputer(), boardSize || BOARD_SIZE, currentGame);
}

function createGrid(container, board, isCPUBoard = false, BOARD_SIZE, game) {
  gameOver = false;
  container.innerHTML = "";
  container.style.gridTemplateColumns = `repeat(${BOARD_SIZE}, 40px)`;
  container.style.gridTemplateRows = `repeat(${BOARD_SIZE}, 40px)`;

  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.coord = `${j},${i}`;

      if (isCPUBoard) {
        cell.classList.add("clickable");
        cell.addEventListener("click", () => {
          if (gameOver) return;
          if (!cell.classList.contains("hit") && !cell.classList.contains("miss")) {
            cell.classList.remove("clickable");
            const outcome = game.playTurn(`${j},${i}`);

            updateCell(cell, outcome.result);
            updatePlayer1Cell(outcome.cpuCoord);

            const winner = outcome.Winner || outcome.cpuWinner;
            if (winner) {
              gameOver = true;
              document.querySelectorAll(".cell.clickable")
                .forEach(c => c.classList.remove("clickable"));
              enemyBoardDiv.style.pointerEvents = "none";
              alert(winner);
            }
          }
        });
      }

      if (!isCPUBoard) cell.classList.add("player1-cell");
      if (!isCPUBoard && board.getOccupiedCoords().has(`${j},${i}`)) {
        cell.classList.add("ship");
      }
      container.appendChild(cell);
    }
  }
}



function collectGameData(callback) {
  const playerOneName = p1Input.value.trim() || "Player 1";
  const playerTwoName = "CPU"
    
  const boardSize = parseInt(boardSizeInput.value, 10) || BOARD_SIZE;

  playerOneHeader.innerText = `${playerOneName} board`
  playerTwoHeader.innerText = `${playerTwoName} board`

  callback({
    playerOneName,
    playerTwoName,
    boardSize,
  });
}


function updateCell(cell, result) {
  cell.classList.add(result === "Hit" ? "hit" : "miss");
  cell.innerText = result === "Hit" ? "X" : "O";
}

function updatePlayer1Cell(cpuCoord) {
  if (!cpuCoord) return;
  const cell = playerBoardDiv.querySelector(`[data-coord="${cpuCoord}"]`);
  if (!cell) return;
  const isShip = cell.classList.contains("ship");
  cell.classList.add(isShip ? "hit" : "miss");
  cell.innerText = isShip ? "X" : "O";
}