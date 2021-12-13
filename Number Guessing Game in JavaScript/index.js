const numberLabel = document.querySelector(".hidden-number-label");
const playBtn = document.querySelector(".play");
const continueBtn = document.querySelector(".continue");
const inputGuessNumber = document.querySelector(".guess");
const message = document.querySelector(".feedback-label");
const scoreLabel = document.querySelector(".score");
const highScoreLabel = document.querySelector(".high-score");
const livesCountLabel = document.querySelector(".lives-count");
const gameOver = document.querySelector(".modal");
const game = document.querySelector(".game-wrapper");
const retry = document.querySelector(".retry");
const numbersGuess = document.querySelector(".numbers-guess");
const guessdNumbersLabel = document.querySelector(".guessed-number");

var guessedNumbers = [];
var score = 0;
var lifLine = 5;
showHighScore();
function randomNumberGenerate() {
  return Math.floor(Math.random() * 100) + 1;
}
function checkIsGameOver(lifLine) {
  if (lifLine === 0) {
    gameOver.style.opacity = 1;
    gameOver.style.transform = "scale(1)";
    game.style.opacity = 0;
  }
}
function showGuessedNumbers(guessedNumbers) {
  numbersGuess.style.opacity = 1;
  guessdNumbersLabel.innerHTML = guessedNumbers;
}
var answer = randomNumberGenerate();
console.log("answer", answer);
playBtn.addEventListener("click", () => {
  const user_guess = inputGuessNumber.value;
  if (user_guess < 1 || user_guess > 100) {
    alert("Please Enter A Number Between 1 to 100.");
  } else {
    if (user_guess < answer) {
      message.innerHTML = "Your guess is too low";
      lifLine--;
      checkIsGameOver(lifLine);
      livesCountLabel.innerHTML = lifLine;
      guessedNumbers.push(user_guess);
      showGuessedNumbers(guessedNumbers);
    } else if (user_guess > answer) {
      message.innerHTML = "Your guess is too high";
      lifLine--;
      checkIsGameOver(lifLine);
      livesCountLabel.innerHTML = lifLine;
      guessedNumbers.push(user_guess);
      showGuessedNumbers(guessedNumbers);
    } else if (user_guess == answer) {
      message.innerHTML = "You Guessed correctly!";
      numberLabel.innerHTML = user_guess;
      playBtn.disabled = true;
      continueBtn.disabled = false;
      score++;
      scoreLabel.innerHTML = score;
      checkHighScore(score);
    }
  }
  inputGuessNumber.value = "";
});

continueBtn.addEventListener("click", () => {
  answer = randomNumberGenerate();
  console.log("answer contimue", answer);
  playBtn.disabled = false;
  continueBtn.disabled = true;
  numberLabel.innerHTML = "?";
  guessedNumbers = [];
  numbersGuess.style.opacity = 0;
  guessdNumbersLabel.innerHTML = "";
});

retry.addEventListener("click", () => {
  gameOver.style.opacity = 0;
  gameOver.style.transform = "scale(0)";
  game.style.opacity = 1;
  message.innerHTML = "";
  lifLine = 5;
  score = 0;
  guessedNumbers = [];
  livesCountLabel.innerHTML = lifLine;
  scoreLabel.innerHTML = score;
  numbersGuess.style.opacity = 0;
  guessdNumbersLabel.innerHTML = "";
  showHighScore();
});
function saveHighScore(score) {
  localStorage.setItem("highscore", score);
}
function checkHighScore(score) {
  const highScore = JSON.parse(localStorage.getItem("highscore"));
  if (score > highScore) {
    saveHighScore(score);
    showHighScore();
  }
}
function showHighScore() {
  const highScore = localStorage.getItem("highscore");
  if (highScore == null) {
    highScoreLabel.innerHTML = 0;
  } else {
    highScoreLabel.innerHTML = highScore;
  }
}
