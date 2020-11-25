var round = 1;
var countFight = 10;
var combi;
var combiIndex = 0;
var scoreRed = 0;
var scoreBlack = 0;
var winRoundRed = 0;
var winRoundBlack = 0;
const goButton = document.querySelector("#memorize button");
const divPunch = document.querySelectorAll("#memorize .punch.memorize");
const disScoreRed = document.querySelector("td .red");
const disScoreBlack = document.querySelector("td .black");

// FUNCTION UNDISPLAY FIGHT
function undisplayFight() {
  const divFight = document.getElementById("fight");
  const divPlayers = document.querySelectorAll(".player.fight");
  [...divPlayers, divFight].forEach(function (element) {
    element.classList.add("inactive");
  });
}

// FUNCTION RESET
// const reset = () => {
//   scoreRed.textContent = "";
//   scoreblack.textContent = "";
//   const testClearPunch = document.querySelector("#memorize .punch.memorize");
//   testClearPunch.textContent = "";
// };

// FUNCTION DISPLAY CHAMION
function displayChampion() {
  setTimeout(() => {
    // DISPLAY SCORE
    const scoreTitle = document.querySelector("td");
    scoreTitle.textContent = "Rounds";
    const disScoreRed = document.querySelector("table .red");
    disScoreRed.textContent = winRoundRed;
    const disScoreBlack = document.querySelector("table .black");
    disScoreBlack.textContent = winRoundBlack;
    // DISPLAY NAME
    if (winRoundBlack > winRoundRed) {
      const headTitle = document.querySelector(".full h1");
      const name = document.getElementById("playername");
      headTitle.innerHTML = "New champion ! ";
    } else if (winRoundBlack < winRoundRed) {
      const headTitle = document.querySelector(".full h1");
      headTitle.innerHTML = "New champion ! ";
    } else {
      const headTitle = document.querySelector(".full h1");
      headTitle.innerHTML = "Draw";
    }
  }, 500);
  setTimeout(() => {
    // DISPLAY BOXERS
    if (winRoundBlack > winRoundRed) {
      const winnerBlack = document.querySelector(".winner.black");
      winnerBlack.classList.remove("inactive");
      const looserRed = document.querySelector(".looser.red");
      looserRed.classList.remove("inactive");
    } else if (winRoundBlack < winRoundRed) {
      const winnerRed = document.querySelector(".winner.red");
      winnerRed.classList.remove("inactive");
      const looserBlack = document.querySelector(".looser.black");
      looserBlack.classList.remove("inactive");
    } else {
      //  BOXER POSE ? CENTRER ?
    }
  }, 1000);
}

// 0A // FUNCTION RANDOM COMBI
function randomCombi(length, max) {
  let arrCombi = [...new Array(length)].map(() =>
    Math.ceil(Math.random() * max)
  );
  return arrCombi;
}

// 0B // FUNCTION DISPLAY COMBI
function appendCombi() {
  let num = round + 2;
  combi = randomCombi(num, 6);
  console.log(combi);
  // document.getElementById("#memorize").classList.remove("inactive");
  const divPunch = document.querySelectorAll("#memorize .punch.memorize");
  divPunch.forEach(function (div, i) {
    if (Number.isInteger(combi[i])) {
      div.textContent = combi[i];
      div.classList.remove("inactive");
      div.style.display = "flex";
    } else {
      div.classList.add("inactive");
      div.style.display = "none";
    }
  });
}

const checkCombi = (event) => {
  console.log(event.code);
  console.log(combiIndex);
  if (event.code === "Digit" + combi[combiIndex]) {
    console.log("yes");
    goodKey();
  } else if (event.code === "CapsLock") {
    console.log("CAPSLOCK");
  } else {
    console.log("oups");
    badKey();
  }
};

const undisplayDivMemorize = () => {
  const divMemory = document.getElementById("memorize");
  divMemory.classList.add("inactive");
};

const displayTitleFight = () => {
  const headTitle = document.querySelector(".full h1");
  headTitle.innerHTML = "Time to fight";
};

const displayFighter = () => {
  const divFight = document.getElementById("fight");
  const divPlayers = document.querySelectorAll(".player.fight");
  [...divPlayers, divFight].forEach(function (element) {
    element.classList.remove("inactive");
  });
  [...divFight].forEach(function (element) {
    element.textContent = "";
  });
};

const displayMemorize = () => {
  const headTitle = document.querySelector(".full h1");
  console.log(headTitle, "<<<");
  headTitle.innerHTML = "Memorize";
  const divMemory = document.getElementById("memorize");
  divMemory.classList.remove("inactive");
  // divPunch.classList.remove("inactive");
  // divPunch.textContent = "";
};

const displayRound = () => {
  const titleRound = document.querySelector(".core.memorize h2");
  titleRound.innerHTML = "Round " + round;
  titleRound.classList.remove("inactive");
};

const setChrono = (callback, interval, l) => {
  let limit = l;
  const timer = document.querySelector(".counter");

  const intervalId1 = setInterval(() => {
    limit--;
    timer.innerHTML = limit;
    if (limit === 0) {
      clearInterval(intervalId1);
      callback();
    }
  }, interval);
};

const toggleGoBtnActive = () => goButton.classList.toggle("inactive");

// 1 // DISPLAY MEMORISE PART // CLEAR INTERVAL A FAIRE
function launch() {
  undisplayFight();
  displayMemorize();
  setTimeout(displayRound, 1000);
  setTimeout(() => {
    appendCombi();
    toggleGoBtnActive();
    setChrono(
      () => {
        // chrono memorize
        displayFight(() => {
          setChrono(
            () => {
              // chrono fight
              // check result ?
              console.log(
                "round =" +
                  round +
                  " " +
                  scoreRed +
                  " " +
                  scoreBlack +
                  " " +
                  winRoundRed +
                  " " +
                  winRoundBlack
              );
              checkCombi();
              console.log("SHOULD CHECK RESULT HERE");
              launch();
            },
            1000,
            11
          );
        });
      },
      1500,
      5
    );
  }, 1500);
}

launch();

//FUNCTION WINROUND
function winRound() {
  if (scoreBlack === scoreRed) {
    scoreBlack = 0;
    scoreRed = 0;
    disScoreRed.textContent = "";
    disScoreBlack.textContent = "";
    round++;
  } else {
    scoreBlack > scoreRed ? winRoundBlack++ : winRoundRed++;
    scoreBlack = 0;
    scoreRed = 0;
    round++;
  }
}

//FUNCTION MATCH OVER ? pour savoir si onlance un nouveau round
function matchover() {
  if (round < 6) {
    combiIndex = 0;
    // reset();
    launch();
  } else {
    // reset();
    undisplayFight();
    displayChampion();
  }
}

// 2 // DISPLAY FIGHT // CHANGER TIMEOUT
function displayFight(callback) {
  undisplayDivMemorize();
  setTimeout(displayTitleFight, 500);
  setTimeout(displayFighter, 1000);
  if (callback) callback();
}

// GOOD KEY - BAD KEY + UPDATE SCORE
const printResultBlack = (combiIndex) => {
  const divFight = document.querySelector(
    "#fight .punch:nth-child(" + combiIndex + ")"
  );
  divFight.innerHTML = combi[combiIndex - 1];
  const disScore = document.querySelector("table .black");
  disScore.innerHTML = scoreBlack;
};

function goodKey() {
  if (combiIndex !== combi.length - 1) {
    scoreBlack++;
    combiIndex++;
    printResultBlack(combiIndex);
  } else {
    scoreBlack++;
    printResultBlack(combiIndex);
    winRound();
    matchover();
  }
}

const printResultRed = (combiIndex) => {
  const divFight = document.querySelector(
    `#fight .punch:nth-child(${combiIndex})`
  );
  divFight.innerHTML = "X";
  const disScore = document.querySelector("table .red");
  disScore.innerHTML = scoreRed;
};

function badKey() {
  if (combiIndex !== combi.length - 1) {
    scoreRed++;
    combiIndex++;
    printResultRed(combiIndex);
  } else {
    scoreRed = combi.length - scoreBlack;
    printResultRed(combiIndex);
    winRound();
    matchover();
  }
}

// EVENT LISTENER
goButton.addEventListener("click", () => displayFight());

document.addEventListener("keydown", checkCombi);

if (startButton !== null) startButton.addEventListener("click", playRumble);
