// const playSound = (url) => new Audio(url).play();

// function playrumble() {
//   // const title = document.querySelector(".title-game");
//   const rumble = "./audio/lets-rumble.mp3";
//   // title.onmouseover = function () {
//   rumble.play();
//   // };
// }

const playSound = (url) => new Audio(url).play();
const title = document.querySelector(".title-game");
const rumble = "./audio/lets-rumble.mp3";

// title.onmouseover = playSound(rumble);

// console.log("toto");

playSound(rumble);
