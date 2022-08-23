const startButton = document.querySelector("button.start");
let playerScore = 0;
let computerScore = 0;
const animationPanel = document.querySelector(".animation_panel");
let weaponButtons = document.querySelectorAll(".weapons_panel > button");
const hearts = document.querySelectorAll("img.heart");
let playerSelection = "";
let lose = "you lose!";
let tie = "tie game!";
let win = "you win!";
let playerCounter = 3;
let computerCounter = 2;
let tmpc = 0;
let tmpp = 0;

startButton.addEventListener("click", () => {
  if (playerScore !== 0) {
    location.reload();
  } else {
    main();
  }
});

function main() {
  console.log("NEW GAME!");
  weaponButtons.forEach((weapon) => {
    weapon.addEventListener("click", (e) => {
      //console.log(e.currentTarget.className);
      playerSelection = e.currentTarget.className;
      //2. checkScore(); //game(playerSelection);
      tmpc = computerScore;
      tmpp = playerScore;
      console.log(e);
      console.log(playRound(playerSelection, computerPlay()));
      checkScore();
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
    heartsAnimation_add();
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
    }
  }
  //playerSelection parameter case-insensitive (rock, Rock, RoCk)
  //return "You Lose! Paper beats Rock"

  /*let roundCounter = 0;
          game ? roundCounter++ : roundCounter;*/

  //for (let i = 0; ; i++) {
  function checkScore() {
    removeHeart();
    if (
      computerScore === playerScore ||
      (playerScore < 3 && computerScore < 3)
    ) {
      //1. console.log(playRound(playerSelection, computerPlay()));
      console.log("test test test test test");
    } else if (playerScore === computerScore) {
      weaponButtons.forEach((weapon) => {
        weapon.addEventListener(
          "click",
          (event) => {
            event.stopImmediatePropagation();
          },
          true
        );
      });
      console.log("GAME OVER! TIE GAME!!!!");
    } else if (playerScore > computerScore) {
      weaponButtons.forEach((weapon) => {
        weapon.addEventListener(
          "click",
          (event) => {
            event.stopImmediatePropagation();
          },
          true
        );
      });
      console.log("GAME OVER! YOU WIN!!!!");
    } else {
      weaponButtons.forEach((weapon) => {
        weapon.addEventListener(
          "click",
          (event) => {
            event.stopImmediatePropagation();
          },
          true
        );
      });
      console.log("GAME OVER! YOU LOSE!!!!");
    }
  }

  function heartsAnimation_add() {
    hearts.forEach((heart) => {
      heart.classList.add("shake");
    });
  }

  hearts.forEach((heart) => {
    heart.addEventListener("animationend", (e) => {
      heart.classList.remove("shake"); //USUNAC EFEKT (LISTENER) PO ZAKACZENIU GRY
    });
  });

  function removeHeart() {
    if (tmpc < computerScore) {
      playerCounter--;
      hearts[playerCounter].remove();
      console.log("AAAAAAAA: " + playerCounter);
    } else if (tmpp < playerScore) {
      computerCounter++;
      hearts[computerCounter].remove();
      console.log("bbbbbbbbb: " + computerCounter);
    }
  }
}
