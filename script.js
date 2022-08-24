const startButton = document.querySelector("button.start");
const animationPanel = document.querySelector(".animation_panel");
const weaponButtons = document.querySelectorAll(".weapons_panel > button");
const hearts = document.querySelectorAll("img.heart");
const playerHearts = document.querySelectorAll("img.player_heart");
const computerHearts = document.querySelectorAll("img.npc_heart");
const playText = document.querySelector("p > .pressStart");
const textStart = "PRESS START";
const blink = document.querySelector(".blink");
let lose = "you lose!";
let tie = "tie game!";
let win = "you win!";
let playerScore = 0;
let computerScore = 0;
let playerSelection = "";
let playerCounter = 3;
let computerCounter = 2;
let tmpc = 0;
let tmpp = 0;
let counter = 600;
let tmpTime = "";

function startMessage() {
  for (let i = 0; i < textStart.length; i++) {
    timeoutStart = setTimeout(() => {
      playText.textContent += textStart[i];
    }, counter);
    counter += 100;
  }
}

startMessage();

window.setInterval(() => {
  blink.style.visibility = "hidden";
}, 650);
window.setInterval(() => {
  blink.style.visibility = "visible";
}, 1300);

//let animation = new heartsAnimation();

startButton.addEventListener("click", () => {
  resetValues();
  main();
});

function main() {
  playText.textContent = "";
  printMessage("NEW GAME! SELECT YOUR WEAPON!", 2000);

  weaponButtons.forEach((weapon) => {
    weapon.addEventListener("click", weaponsReadValueEvent);
  });

  function weaponsReadValueEvent(e) {
    playerSelection = e.currentTarget.className;
    tmpc = computerScore;
    tmpp = playerScore;
    let computerSelection = computerPlay();
    //console.log(e);
    //console.log(playRound(playerSelection, computerPlay()));
    printMessage(playerSelection + " ", 1500);
    printMessage("vs " + computerSelection + " ", 1500);
    printMessage(playRound(playerSelection, computerSelection) + " ", 1700);
    checkScore();
  }

  function printMessage(value, time) {
    for (let i = 0; i < value.length; i++) {
      playText.textContent += value[i];
    }
    console.log(time);
    setTimeout(() => {
      playText.textContent = "";
    }, time);
  }

  function computerPlay() {
    let rndNum = Math.floor(Math.random() * 3) + 1;
    //console.log(rndNum);
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
    //heartsAnimation("player");
    if (computerSelection === "rock") {
      switch (playerSelection) {
        case "rock":
          return tie;
        case "paper":
          heartsAnimation("computer");
          playerScore++;
          return win;
        case "scissors":
          heartsAnimation("player");
          computerScore++;
          return lose;
      }
    } else if (computerSelection === "paper") {
      switch (playerSelection) {
        case "rock":
          heartsAnimation("player");
          computerScore++;
          return lose;
        case "paper":
          return tie;
        case "scissors":
          heartsAnimation("computer");
          playerScore++;
          return win;
      }
    } else if (computerSelection === "scissors") {
      switch (playerSelection) {
        case "rock":
          heartsAnimation("computer");
          playerScore++;
          return win;
        case "paper":
          heartsAnimation("player");
          computerScore++;
          return lose;
        case "scissors":
          return tie;
      }
    }
  }
  function styleGO() {
    hearts.forEach((heart) => {
      heart.style.filter = "grayscale()";
    });
    weaponButtons.forEach((weapon) => {
      weapon.style.filter = "grayscale()";
    });
  }

  function checkScore() {
    removeHeart();
    if (
      computerScore === playerScore ||
      (playerScore < 3 && computerScore < 3)
    ) {
    } else if (playerScore === computerScore) {
      weaponButtons.forEach((weapon) => {
        weapon.removeEventListener("click", weaponsReadValueEvent);
      });
      styleGO();
      printMessage("GAME OVER! TIE GAME!!!!", 2000);
    } else if (playerScore > computerScore) {
      weaponButtons.forEach((weapon) => {
        weapon.removeEventListener("click", weaponsReadValueEvent);
      });
      styleGO();
      printMessage("GAME OVER! YOU WIN!!!!", 2000);
    } else {
      weaponButtons.forEach((weapon) => {
        weapon.removeEventListener("click", weaponsReadValueEvent);
      });
      styleGO();
      printMessage("GAME OVER! YOU LOSE!!!!", 2000);
    }
  }

  function heartsAnimation(value) {
    if (value == "player") {
      playerHearts.forEach((heart) => {
        heart.classList.add("shake");
      });
    } else if (value == "computer") {
      computerHearts.forEach((heart) => {
        heart.classList.add("shake");
      });
    }
    hearts.forEach((heart) => {
      heart.addEventListener("animationend", (e) => {
        heart.classList.remove("shake"); //USUNAC EFEKT (LISTENER) PO ZAKACZENIU GRY
      });
    });
  }

  function removeHeart() {
    if (tmpc < computerScore) {
      playerCounter--;
      hearts[playerCounter].style.visibility = "hidden"; //hearts[playerCounter].remove();
    } else if (tmpp < playerScore) {
      computerCounter++;
      hearts[computerCounter].style.visibility = "hidden"; //hearts[computerCounter].remove();
    }
  }
}

function resetValues() {
  playerScore = 0;
  computerScore = 0;
  playerSelection = "";
  playerCounter = 3;
  computerCounter = 2;
  tmpc = 0;
  tmpp = 0;

  animationPanel.classList.add("animation_panel_on");

  hearts.forEach((heart) => {
    heart.style.visibility = "visible";
    heart.style.filter = "none";
  });
  weaponButtons.forEach((weapon) => {
    weapon.style.filter = "none";
  });
  playText.textContent = "";
}
