const gameItem = document.querySelectorAll(".game-item");
const resetBtn = document.querySelector("#reset");
let winnerSatus = document.querySelector(".winner h4 ");
// score
let xScoreItem = 0;
let oScoreItem = 0;
//winning conditons
const winningConditons = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let options = ["", "", "", "", "", "", "", "", ""];
let currntPlayer = "X";
let running = false;

// calling function
initializeGame();

// initialize the Game
function initializeGame() {
  // 1. show game item X O
  gameItem.forEach((item) => {
    item.addEventListener("click", gameItemClicked);
  });
  // 2. Restart Button
  resetBtn.addEventListener("click", restartGeme);
  running = true;
}

function gameItemClicked() {
  const cellIndex = this.getAttribute("cellIndex");

  if (options[cellIndex] != "" || !running) {
    return;
  }
  updateGameItem(this, cellIndex);
  checkWinner();
}

// Update Gamme Item
function updateGameItem(item, index) {
  options[index] = currntPlayer;
  item.textContent = currntPlayer;
}

// Change Player
function changePlayer() {
  currntPlayer = currntPlayer == "X" ? "O" : "X";
}

// Update Score
const updateScore = () => {
  const xScore = document.querySelector(".x-score");
  const oScore = document.querySelector(".o-score");
  xScore.textContent = xScoreItem;
  oScore.textContent = oScoreItem;
};

// Check winner
function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winningConditons.length; i++) {
    const condition = winningConditons[i];
    const itemA = options[condition[0]];
    const itemB = options[condition[1]];
    const itemC = options[condition[2]];
    if (itemA == "" || itemB == "" || itemC == "") {
      continue;
    }
    if (itemA == itemB && itemB == itemC) {
      roundWon = true;
      break;
    }
  }

  // check X-Player
  if (roundWon && currntPlayer == "X") {
    winnerSatus.textContent = "X wins!";
    xScoreItem++;
    updateScore();
    running = false;

    // check O-Player
  } else if (roundWon && currntPlayer == "O") {
    winnerSatus.textContent = "O wins!";
    oScoreItem++;
    updateScore();
    running = false;
  } else {
    if (!options.includes("")) {
      winnerSatus.textContent = "It is a tie";
      running = false;
    } else {
      changePlayer();
    }
  }
}

// Restart the game
function restartGeme() {
  currntPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  winnerSatus.textContent = `Let's Play!`;
  gameItem.forEach((item) => (item.textContent = ""));
  running = true;
}
