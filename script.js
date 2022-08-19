const startButton = document.querySelector("button.start");
const animationPanel = document.querySelector(".animation_panel");
const weaponButtons = document.querySelectorAll(".weapons_panel > button");
let playerSelection = "";
let playerScore = 0;
let computerScore = 0;
let lose = "you lose game!";
let tie = "tie game!";
let win = "you win game!";

startButton.addEventListener("click", () => {
  location.reload();
});
console.log("NEW GAME!");
weaponButtons.forEach((weapon) => {
  weapon.addEventListener("click", (e) => {
    //console.log(e.currentTarget.className);
    playerSelection = e.currentTarget.className;
    checkScore(); //game(playerSelection);
  });
});

function computerPlay() {
  let rndNum = Math.floor(Math.random() * 3) + 1;
  console.log(rndNum);
  switch (rndNum) {
    case 1:
      return "rock";
    case 2:
      return "paper";
    case 3:
      return "scissors";
  }
  //computer play logic
  //return rock/paper/scissors
}
function playRound(playerSelection, computerSelection) {
  if (computerSelection === "rock") {
    switch (playerSelection) {
      case "rock":
        return tie;
      case "paper":
        playerScore++;
        return win;
      case "scissors":
        computerScore++;
        return lose;
    }
  } else if (computerSelection === "paper") {
    switch (playerSelection) {
      case "rock":
        computerScore++;
        return lose;
      case "paper":
        return tie;
      case "scissors":
        playerScore++;
        return win;
    }
  } else if (computerSelection === "scissors") {
    switch (playerSelection) {
      case "rock":
        playerScore++;
        return win;
      case "paper":
        computerScore++;
        return lose;
      case "scissors":
        return tie;
    }
  } else {
    return "wrong value";
  }
  //playerSelection parameter case-insensitive (rock, Rock, RoCk)
  //return "You Lose! Paper beats Rock"
}

function game(playerSelection) {
  //KLASA POZNIEJ DO USUNIECIA
  //console.log(playerSelection + " test");

  return console.log(playRound(playerSelection, computerPlay()));
}

/*let roundCounter = 0;
game ? roundCounter++ : roundCounter;*/

//for (let i = 0; ; i++) {
function checkScore() {
  if (computerScore === playerScore || (playerScore < 3 && computerScore < 3)) {
    console.log(playRound(playerSelection, computerPlay())); //zamiast game(playerScore)
  } else {
    playerScore === computerScore
      ? console.log("END GAME! TIE GAME!!!!")
      : playerScore > computerScore
      ? console.log("END GAME! YOU WIN THE GAME!!!!")
      : console.log("END GAME! YOU LOSE THE GAME!!!!");
  }
}
//}
