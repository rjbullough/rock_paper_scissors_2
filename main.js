// Computers choice chosen at random
const choicesArray = ["rock", "paper", "scissors"];
function computerPlay() {
  let pickRandom = Math.floor(Math.random() * choicesArray.length);
  return choicesArray[pickRandom];
}
// Players choice chosen depending on button clicked
let playersChoice = "";
const selections = document.querySelector(".selections");
selections.addEventListener("click", function (e) {
  playerSelection = e.target.alt.toLowerCase();
  playRound();
});
// Initialise scores
let playerScore = 0;
let computerScore = 0;
// Animate image on click
const selectImage = document.querySelector(".selections");
selectImage.addEventListener("click", function (e) {
  e.target.classList.toggle("rotate-scale-up-hor");
  e.target.addEventListener("animationend", removeAnimation);
});
// Remove animation class, determine winner if appropriate
function removeAnimation(e) {
  e.target.removeEventListener("animationend", removeAnimation);
  e.target.classList.remove("rotate-scale-up-hor");
  if (playerScore >= 5 || computerScore >= 5) {
    if (playerScore > computerScore) {
      determineWinner(true);
    } else {
      determineWinner(false);
    }
  }
}
// Show a result screen depending on win/lose
function determineWinner(manOrMachine) {
  let winScreen = document.querySelector(".play-again-winner");
  let loseScreen = document.querySelector(".play-again-loser");
  if (manOrMachine) {
    winScreen.style.display = "flex";
  } else {
    loseScreen.style.display = "flex";
  }
}
function updateScore() {
  document.querySelector(".player-score>p").textContent = playerScore;
  document.querySelector(".computer-score>p").textContent = computerScore;
}
// Play a round
function playRound(playersChoice, computerSelection) {
  computerSelection = computerPlay();
  playersChoice = playerSelection;
  return playerSelection === computerSelection
    ? neitherWins()
    : playerSelection === "rock" && computerSelection === "paper"
    ? playerLoses()
    : playerSelection === "rock" && computerSelection === "scissors"
    ? playerWins()
    : playerSelection === "paper" && computerSelection === "scissors"
    ? playerLoses()
    : playerSelection === "paper" && computerSelection === "rock"
    ? playerWins()
    : playerSelection === "scissors" && computerSelection === "rock"
    ? playerLoses()
    : playerWins();
  function playerWins() {
    ++playerScore;
    updateResultPane(true);
    updateScore();
  }
  function playerLoses() {
    ++computerScore;
    updateResultPane(false);
    updateScore();
  }
  function neitherWins() {
    updateResultPane("tie");
  }
  function updateResultPane(winOrLose) {
    let result = document.querySelector(".result-pane");
    if (winOrLose === "tie") {
      return (result.textContent = `It's a TIE!`);
    }
    winOrLose
      ? (result.textContent = `Player won! ${playerSelection} beats ${computerSelection}`)
      : (result.textContent = `Player lost! ${computerSelection} beats ${playerSelection}`);
  }
}
// Reload the page after a result
const replayButton = document.querySelectorAll(".yes-play-again");
for (const button of replayButton) {
  button.addEventListener("click", function () {
    playerScore = 0;
    computerScore = 0;
    updateScore();
    document.querySelector(".result-pane").textContent = "";
    let winScreen = document.querySelector(".play-again-winner");
    let loseScreen = document.querySelector(".play-again-loser");
    winScreen.style.display = "none";
    loseScreen.style.display = "none";
  });
}
