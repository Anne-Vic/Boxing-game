var round = 1;
var countFight = 10;
var combi;
var combiIndex = 0;
var scoreRed = 0;
var scoreBlack = 0;
var winRoundRed = 0;
var winRoundBlack = 0;
var keyAllowed = ["Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6"];
// const goButton = document.querySelector("#memorize button");
const divPunch = document.querySelectorAll("#memorize .punch.memorize");
const disScoreRed = document.querySelector("td .red");
const disScoreBlack = document.querySelector("td .black");
const redFighter = document.querySelector(".fight.red");
const blackFighter = document.querySelector(".fight.black");
const blackPose = document.querySelector(".pose.black");
const redPose = document.querySelector(".pose.red");

// AUDIO
const ring = "./audio/Boxing-bell.mp3";
const rumble = "./audio/lets-rumble.mp3";
const victoire = "./audio/Victoire.mp3";
const jabsound = "./audio/Punch-2.mp3";
const chocsound = "./audio/coup-ventre.mp3";

const playSound = (url) => new Audio(url).play();

// FUNCTION JAB (MVT + SON)
const jab = () => {
  playSound(jabsound);
  if (combi[combiIndex] % 2 === 0) {
    blackFighter.innerHTML =
      '<img src="./images/jab-black.png" alt="black-jab-fighting" />';
    setTimeout(() => {
      blackFighter.innerHTML =
        '<img src="./images/fight-black.png" alt="black-player-fighting" />';
    }, 300);
  } else {
    blackFighter.innerHTML =
      '<img src="./images/hook-black.png" alt="black-hook-fighting" />';
    setTimeout(() => {
      blackFighter.innerHTML =
        '<img src="./images/fight-black.png" alt="black-player-fighting" />';
    }, 300);
  }
};

// FUNCTION CHOC (MVT + SON)
const choc = () => {
  playSound(chocsound);
  redFighter.innerHTML =
    '<img src="./images/jab-red.png" alt="red-jab-fighting" />';
  setTimeout(() => {
    redFighter.innerHTML =
      '<img src="./images/fight-red.png" alt="red-player-fighting" />';
  }, 300);
};

// FUNCTION UNDISPLAY FIGHT
function undisplayFight() {
  const divFight = document.getElementById("fight");
  const divPlayers = document.querySelectorAll(".player.fight");
  [...divPlayers, divFight].forEach(function (element) {
    element.classList.add("inactive");
  });
}

// FUNCTION DISPLAY CHAMPION
function displayChampion() {
  setTimeout(() => {
    // DISPLAY SCORE + MUSIC
    const scoreTitle = document.querySelector("td");
    scoreTitle.textContent = "Rounds";
    const disScoreRed = document.querySelector("table .red");
    disScoreRed.textContent = winRoundRed;
    const disScoreBlack = document.querySelector("table .black");
    disScoreBlack.textContent = winRoundBlack;
    playSound(victoire);
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
    const againButton = document.getElementById("btn-again");
    againButton.classList.remove("inactive");
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
      // const draw = document.querySelector("div .draw");
      // draw.classList.remove("inactive");
      // blackPose.classList.remove("inactive");
      // redPose.classList.remove("inactive");
    }
  }, 1500);
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
  const divMemory = document.getElementById("memorize");
  divMemory.classList.remove("inactive");
  // const sousDivMemory = document.querySelector("#memorize combination");
  // divMemory.classList.remove("inactive");
}

const checkCombi = (event) => {
  if (keyAllowed.includes(event.code)) {
    if (event.code === "Digit" + combi[combiIndex]) {
      console.log("yes");
      goodKey();
    } else {
      console.log("oups");
      badKey();
    }
  } else {
    console.log("not a key allowed");
  }
};

const undisplayDivMemorize = () => {
  const divMemory = document.getElementById("memorize");
  divMemory.classList.add("inactive");
  // const sousDivMemory = document.querySelector("#memorize combination");
  // divMemory.classList.add("inactive");
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
  const divFightDetail = document.querySelectorAll("#fight .punch");
  divFightDetail.forEach(function (element) {
    element.innerHTML = "";
  });
};

const displayMemorize = () => {
  const headTitle = document.querySelector(".full h1");
  console.log(headTitle, "<<<");
  headTitle.innerHTML = "Memorize";
  // const divMemory = document.getElementById("memorize");
  // divMemory.classList.remove("inactive");
  // const divPunch = document.querySelectorAll("#memorize .punch.memorize");
  // divPunch.classList.add("inactive");
  const recapRound = document.querySelector("td");
  recapRound.innerHTML = "Round " + round;
  const disScoreB = document.querySelector("table .black");
  disScoreB.innerHTML = 0;
  const disScoreR = document.querySelector("table .red");
  disScoreR.innerHTML = 0;
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

// const toggleGoBtnActive = () => goButton.classList.toggle("inactive");

// 1 // DISPLAY MEMORISE PART // CLEAR INTERVAL A FAIRE
function launch() {
  undisplayFight();
  displayMemorize();
  setTimeout(displayRound, 1000);
  setTimeout(() => {
    appendCombi();
    // toggleGoBtnActive();
    setChrono(
      () => {
        displayFight(() => {
          setChrono(
            () => {
              checkCombi();
              launch();
            },
            1000,
            9
          );
        });
      },
      1500,
      3
    );
  }, 1500);
}

launch();

//FUNCTION WINROUND
function winRound() {
  if (scoreBlack === scoreRed) {
    scoreBlack = 0;
    scoreRed = 0;
    // disScoreRed.textContent = "";
    // disScoreBlack.textContent = "";
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
    setTimeout(launch, 1000);
  } else {
    // reset();
    setTimeout(undisplayFight, 1000);
    setTimeout(displayChampion, 1000);
  }
}

// 2 // DISPLAY FIGHT // CHANGER TIMEOUT
function displayFight(callback) {
  undisplayDivMemorize();
  playSound(ring);
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
    jab();
    printResultBlack(combiIndex);
  } else {
    scoreBlack++;
    jab();
    printResultBlack(combiIndex + 1);
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
    choc();
    printResultRed(combiIndex);
  } else {
    scoreRed = combi.length - scoreBlack;
    choc();
    printResultRed(combiIndex + 1);
    winRound();
    matchover();
  }
}

// EVENT LISTENER
// goButton.addEventListener("click", () => displayFight());

document.addEventListener("keyup", checkCombi);

// if (startButton !== null) startButton.addEventListener("click", playRumble);
