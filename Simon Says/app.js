let gameseq = [];
let userseq = [];
let highscore = 0;

let btncolors = [
  "red",
  "green",
  "blue",
  "yellow",
  "purple",
  "orange",
  "pink",
  "teal",
  "cyan",
];

let h3 = document.querySelector("h3");

let started = false;
let level = 0;

let start = document.querySelector(".start");
let btn = document.querySelectorAll(".box");

let content = document.querySelector("body");

start.addEventListener("click", function () {
  if (started == false) {
    started = true;
    levelup();
  }
});

function btnflash(box) {
  box.classList.add("flash");
  setTimeout(function () {
    box.classList.remove("flash");
  }, 250);
}

function levelup() {
  userseq = [];
  level++;
  h3.innerText = `Level ${level}`;

  let ranidx = Math.floor(Math.random() * 9);
  let randcolor = btncolors[ranidx];
  let randbtn = document.querySelector(`.${randcolor}`);
  gameseq.push(randcolor);
  btnflash(randbtn);

  if (level > highscore) {
    highscore = level;
    console.log(highscore);
  }
}

function checkans(indx) {
  if (gameseq[indx] == userseq[indx]) {
    if (gameseq.length == userseq.length) {
      setTimeout(levelup, 500);
    }
  } else {
    gameover();
  }
}

function btnPress() {
  if (!started) {
    return;
  }
  btnflash(this);

  let usercolor = this.getAttribute("id");
  userseq.push(usercolor);
  checkans(userseq.length - 1);
}

let allbtns = document.querySelectorAll(".box");

for (b of allbtns) {
  b.addEventListener("click", btnPress);
}

function gameover() {
  h3.innerHTML = `Game Over!! <b>Your Score was ${level}</b> <br>High Score: ${highscore} <br>Click start to restart`;
  started = false;
  gameseq = [];
  userseq = [];
  level = 0;
  content.classList.add("flash-bg");
  setTimeout(function () {
    content.classList.remove("flash-bg");
  }, 250);
}
