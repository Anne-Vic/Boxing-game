const playSound = (url) => new Audio(url).play();

function playrumble() {
  const title = document.querySelector(".title-game");
  const rumble = "./audio/lets-rumble.mp3";
  title.onmouseover = function () {
    rumble.play();
  };
}

// playrumble();

// title.onmouseover = playSound(rumble);

// const startButton = document.getElementById("btn-start");
// startButton.addEventListener("click", () => play(rumble));
