import "./style.css";
import gameBoard from "./gameBoard.js";
import gameLoop from "./gameLoop.js";
import player from "./player.js";
import ship from "./ship.js";
import Inventory from "./inventory.js";
import Directions from "./directions.js";

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
const cpuToggle = document.getElementById("cpu-toggle");
const p1Input = document.getElementById("p1-name");
const p2Input = document.getElementById("p2-name");
const boardSizeInput = document.getElementById("board-size");
resetBtn.disabled = true;


let currentGame = null;

cancelConfig.addEventListener("click", () => {
  configModal.classList.add("hidden");
});

cpuToggle.addEventListener("change", () => {
  if (cpuToggle.checked) {
    p2Input.disabled = true;
    p2Input.value = "CPU";
  } else {
    p2Input.disabled = false;
    p2Input.value = "";
  }
});

confirmConfig.addEventListener("click", () => {
  collectGameData(createGame);
  console.log("Game Configuration:", currentGame);
  configModal.classList.add("hidden");
});


resetBtn.addEventListener("click", async () => {
  startBtn.disabled = false;
  resetBtn.disabled = true;
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
  if (cpuToggle.checked) {
    cpu.setAsComputer();
  }
  const game = gameLoop();

  const inventory = Inventory(boardSize || BOARD_SIZE);
  inventory.generateShips();

  deployShipsRandomly(p1, inventory);
  deployShipsRandomly(cpu, inventory);

  const firstShip = ship(2);
  const secondShip = ship(2);
  firstShip.setDirection(Directions.VERTICAL);

  //p1.getBoard().placeShip("2,1", firstShip);
  cpu.getBoard().placeShip("2,3", secondShip);

  game.init(p1, cpu);

  console.log("Game initialized with player and CPU boards");
  p1.getBoard().printBoard();
  cpu.getBoard().printBoard();
  currentGame = game;

  createGrid(playerBoardDiv, p1.getBoard(), p1.isComputer(), boardSize || BOARD_SIZE, currentGame);
  createGrid(enemyBoardDiv, cpu.getBoard(), cpu.isComputer(), boardSize || BOARD_SIZE, currentGame);
}

function createGrid(container, board, isCPUBoard = false, BOARD_SIZE, game) {
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
          if (!cell.classList.contains("hit") && !cell.classList.contains("miss")) {
            const result = game.playTurn(`${j},${i}`);
            if (!result.result) {
              alert(result);
              
            }
            const player1Cell = playerBoardDiv.querySelector(`[data-coord="${result.cpuCoord}"]`);
              if (player1Cell) {
                if(player1Cell.classList.contains("ship")) {
                  player1Cell.classList.add("hit");
                  player1Cell.innerText = "X";
                } else {
                  player1Cell.classList.add("miss");
                  player1Cell.innerText = "O";
                }
              }
            console.log(board.allShipsSunk());
            if (result.result === "Hit") {
              cell.classList.add("hit");
              cell.innerText = "X";
              cell.classList.remove("clickable");
            }
            else {
              cell.classList.add("miss");
              cell.innerText = "O";
              cell.classList.remove("clickable");
            }
          }
        });
      }

      if(!isCPUBoard) cell.classList.add("player1-cell");
      if (!isCPUBoard && board.getOccupiedCoords().has(`${j},${i}`)) {
        cell.classList.add("ship");
      }
      container.appendChild(cell);
    }
  }
  // for (const startingCoord of board.getStartingCoords()) {
  //   const cell = container.querySelector(`[data-coord="${startingCoord}"]`);
  //   cell.classList.add("starting");
  // }
}



function collectGameData(callback) {
  const playerOneName = p1Input.value.trim() || "Player 1";
  const playerTwoName = cpuToggle.checked
    ? "CPU"
    : p2Input.value.trim() || "Player 2";
  const boardSize = parseInt(boardSizeInput.value, 10) || BOARD_SIZE;

  playerOneHeader.innerText = `${playerOneName} board`
  playerTwoHeader.innerText = `${playerTwoName} board`

  callback({
    playerOneName,
    playerTwoName,
    boardSize,
  });
}

function deployShipsRandomly(player, inventory) {
  //ODUZMI I PROBANE KOORDINATE U AVAILABLE
  const availableCoords = player.getBoard().getAvailableCoords();
  for (const ship of inventory.getShips()) {
    let placed = false;
    const direction = Math.random() < 0.5 ? Directions.HORIZONTAL : Directions.VERTICAL;
    ship.setDirection(direction);
    let randomCoord = Array.from(availableCoords)[Math.floor(Math.random() * availableCoords.size)];
    while (!placed) {
      randomCoord = Array.from(availableCoords)[Math.floor(Math.random() * availableCoords.size)];
      console.log(`Trying to place ship of length ${ship.getLength()} at ${randomCoord} facing ${direction}`);
      placed = player.getBoard().placeShip(randomCoord, ship);
    }
    player.getBoard().addStartingCoord(randomCoord);
  }

}