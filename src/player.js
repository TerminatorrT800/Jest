export default function player(name, board) {
  const playerName = name;
  let gameBoard = board;
  let AI = false;

  let firedShots = new Set()

  const generateRandomCoord = () => {
    let coord = ''
    do {
      let x = Math.floor(Math.random() * gameBoard.getSize())
      let y = Math.floor(Math.random() * gameBoard.getSize())
      coord = `${x},${y}`
    } while (firedShots.has(coord))

    firedShots.add(coord)
    return coord
  }

  const makeMove = (enemyBoard) => {
    if (!AI) return;

    const coord = generateRandomCoord()
    return attack(enemyBoard, coord)
  }

  const resetFiredshoots = () => {
    firedShots.clear()
  }


  const attack = (board, coord) => board.receiveAttack(coord)

  const setAsComputer = () => {
    AI = true;
  };

  return { setAsComputer, attack, getBoard: () => gameBoard, isComputer: () => AI, resetFiredshoots, makeMove };
}