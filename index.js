var tiles = ["red", "green", "yellow", "blue"];
var level = 1;
var seq = [];
var userSeq = [];
var isStarted = false;
var nextLevelTimer;
var userClicks = -1;
var sound = new Audio();

$("h1").on("click", function() {
  if (!isStarted) {
    start();
  }
})

$("h1").on("tap", function() {
  if (!isStarted) {
    start();
  }
})

$("body").on("keydown", function() {
  if (!isStarted) {
    start();
  }
})

function start() {
  isStarted = true;
  changeTitle(level);
  var rand = generateRandom();
  var colorTile = tiles[rand]
  var colorTileClass = "." + colorTile;
  console.log(colorTile);


  $(colorTileClass).addClass("pressed");
  setTimeout(function() {
    $(colorTileClass).removeClass("pressed");
  }, 300);

  playSound(colorTile);
  // pressAndSound(obj);
  seq.push(colorTile);

}

$(".btn").click(function(event) {
  if (isStarted) {
    pressAndSound(this);

    userSeq.push(this.id);
    userClicks++;
    checkSeq();
  }
})

function pressAndSound(e) {
  var classList = e.classList;
  classList.add("pressed");
  var id = e.id;
  // playSound(e.id);
  setTimeout(function() {
    classList.remove("pressed");
  }, 100);

  // $("#" + id).fadeOut().fadeIn();
}

function checkSeq() {
  if (!isStarted) return;


  if ((userSeq.length < seq.length) && (userSeq[userClicks] == seq[userClicks])) {
    console.log(userSeq[level] == seq[level]);

  } else {
    clearTimeout(nextLevelTimer);
    if (userSeq.toString() === seq.toString()) {

      nextLevelTimer = setTimeout(goNextLevel, 1100);

    } else {

      restart();
    }
  }
}

function restart() {
  playSound("wrong");
  clearTimeout(nextLevelTimer);
  seq = [];
  userSeq = [];
  changeTitle("-1");
  level = 1;
  $("body").addClass("game-over");

  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);

  isStarted = false;
}

function goNextLevel() {
  userClicks = -1;
  userSeq = [];
  level++;
  changeTitle(level);
  start();
}

function changeTitle(str) {
  if (str == '-1') {
    $("h1").text("Game over. Click here to restart!");
    return;
  }
  $("h1").text("Level " + str);
}

function generateRandom() {
  var rand = Math.random();
  var randInt = Math.floor(rand * 4);
  return randInt;
}

function playSound(event) {
  var file;

  switch (event) {
    case "wrong":
      file = "sounds/wrong.mp3";
      break;
    case "red":
      file = "sounds/red.mp3";
      break;
    case "green":
      file = "sounds/green.mp3";
      break;
    case "yellow":
      file = "sounds/yellow.mp3";
      break;
    case "blue":
      file = "sounds/blue.mp3";
      break;
  }
  sound.src = file;
  sound.play();
}
