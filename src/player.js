export default function player(name, board) {
  const playerName = name;
  let gameBoard = board;
  let AI = false;
  let lastMove = { coord: null, result: null };

  let firedShots = new Set();
  let cpuSmartAttack = false;

  let smartAttackCoords = [];

  const generateRandomCoord = () => {
    let coord = "";
    do {
      let x = Math.floor(Math.random() * gameBoard.getSize());
      let y = Math.floor(Math.random() * gameBoard.getSize());
      coord = `${x},${y}`;
    } while (firedShots.has(coord));

    firedShots.add(coord);
    const index = smartAttackCoords.indexOf(coord);
    if (index !== -1) smartAttackCoords.splice(index, 1);
    return coord;
  };

  const resetFiredshoots = () => {
    firedShots.clear();
    smartAttackCoords = [];
  };

  const attack = (board, coord) => board.receiveAttack(coord);

  const setAsComputer = () => {
    AI = true;
  };

  const CPUsmartAttack = ({ coord, result }) => {
  if (result === "Hit") {
    const [x, y] = coord.split(",").map(Number);
    const adjacentCoords = [
      `${x},${y - 1}`,
      `${x},${y + 1}`,
      `${x - 1},${y}`,
      `${x + 1},${y}`,
    ];

    adjacentCoords.forEach((c) => {
      if (
        !firedShots.has(c) &&
        gameBoard.getBoard()[c] &&    
        !smartAttackCoords.includes(c)   
      ) {
        smartAttackCoords.push(c);
      }
    });
  }

  const available = smartAttackCoords.filter((c) => !firedShots.has(c));

  if (available.length > 0) {
    const randomCoord = available[Math.floor(Math.random() * available.length)];
    firedShots.add(randomCoord);
    smartAttackCoords.splice(smartAttackCoords.indexOf(randomCoord), 1);
    return randomCoord;
  }
  return generateRandomCoord();
};
  return {
    setAsComputer,
    attack,
    getBoard: () => gameBoard,
    isComputer: () => AI,
    resetFiredshoots,
    getName: () => playerName,
    generateRandomCoord,
    getFiredShoots: () => firedShots,
    getLastMove: () => lastMove,
    setLastMove: (move) => (lastMove = move),
    CPUsmartAttack,
    getCpuSmartAttack: () => cpuSmartAttack,
    setCpuSmartAttack: () => (cpuSmartAttack = true),
  };
}
