var tiles = ["red", "green", "yellow", "blue"];
var level = 1;
var seq = [];
var userSeq = [];

$("body").on("keydown", function() {
  changeTitle(level);
  start();
})

function start() {
  var rand = generateRandom();
  var colorTile = tiles[rand]
  var colorTileClass = "." + colorTile;
  console.log(colorTile);


  $(colorTileClass).addClass("pressed");
  setTimeout(function() {
    $(colorTileClass).removeClass("pressed");
  }, 100);

  playSound(colorTile);
  // pressAndSound(obj);
  seq.push(colorTile);
}

$(".btn").click(function(event) {
  // console.log(this.id);
  pressAndSound(this);

  userSeq.push(this.id);
  checkSeq();
})

function pressAndSound(e) {
  var classList = e.classList;
  classList.add("pressed");
  playSound(e.id);
  setTimeout(function() {
    classList.remove("pressed");
  }, 100);

}

function checkSeq() {
  var timer;
  if (userSeq.length < seq.length) {

  } else {
    clearTimeout(timer);
    if (userSeq.toString() === seq.toString()) {

      timer = setTimeout(goNextLevel, 1100);

    } else {

      restart();
    }
  }
}

function restart() {
  seq = [];
  userSeq = [];
  changeTitle("-1");
  level = 1;
  $("body").addClass("game-over");

  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
}

function goNextLevel() {
  userSeq = [];
  level++;
  changeTitle(level);
  start();
  // var rand = generateRandom();
  // seq.push(tiles[rand]);
}

function changeTitle(str) {
  if (str == '-1') {
    $("h1").text("Game over. Press any key to restart!");
    return;
  }
  $("h1").text("Level " + str);
}

function generateRandom() {
  var rand = Math.random();
  var randInt = Math.floor(rand * 4);
  return randInt;
}

var sound = new Audio();

function playSound(event) {
  var file;

  switch (event) {
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
