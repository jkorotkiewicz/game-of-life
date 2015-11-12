var x = 80;
var y = 80;
var world = new Array(x);
var mousedown = false;
var lifeGoesOn = null;
var isPixel = true;
for (var i = 0; i < x; i++) {
    world[i] = new Array(y);
}

function main() {
    document.body.onmousedown = function() {
        mousedown = true;
    };
    document.body.onmouseup = function() {
        mousedown = false;
    };
    document.getElementById('radio1').onclick = function() {
      changeBoardType(this.value);
    };
    document.getElementById('radio2').onclick = function() {
      changeBoardType(this.value);
    };
    initiateBoard(this.world);
}

function reset() {
    stop();
    resetBoard(this.world);
    // drawBoard(this.world);
}

function play() {
    if(lifeGoesOn === null)
        lifeGoesOn = setInterval(makeStepAndUpdateBoard, 100);
}

function stop() {
    if(lifeGoesOn !== null)
        clearInterval(lifeGoesOn);
    lifeGoesOn = null;
}

function changeBoardType(boardType) {
  if(boardType == "text") isPixel = false;
  else if(boardType == "pixel") isPixel = true;
  var sectionArray = document.getElementsByTagName('section');
  for(var i = 0; i < sectionArray.length; i++) {
    sectionArray[i].className = getSectionClassName();
  }
  updateBoard();
}

function getSectionClassName() {
  return this.isPixel ? "mainboardPixel" : "mainboard";
}

function makeStepAndUpdateBoard() {
  makeStep();
  updateBoard();
}

function updateBoard() {
	for (i = 0; i < x; i++) {
        for (j = 0; j < y; j++) {
        	var id = "" + i + '.' + j;
            setCellState(id, this.world[i][j]);
        }
    }
}

function makeStep() {
    var newWorld = new Array(x);
    for (var i = 0; i < this.x; i++) {
        newWorld[i] = new Array(this.y);
    }
    for (var i = 0; i < this.x; i++) {
        for (var j = 0; j < this.y; j++) {
            newWorld[i][j] = checkNeighbours(this.world, i, j);
        }
    }
    this.world = newWorld;
}

function checkNeighbours(world, x, y) {
    var n = 1;
    var s = 1;
    var e = 1;
    var w = 1;
    var counter = 0;
    if (x == 0) w = 0;
    if (x == this.x-1) e = 0;
    if (y == 0) n = 0;
    if (y == this.y-1) s = 0;
    for (var i = x - w; i <= x + e ; i++) {
        for (var j = y - n; j <= y + s ; j++) {
            if(!(i==x && j==y)) counter += world[i][j];
        }
    }
    if(world[x][y]) return(counter<2?0:counter>3?0:1);
    else return(counter==3?1:0);
}

function createGlider(world, i, j) {
    if(i == 0 && j == 1) world[i][j] = 1;
    if(i == 1 && j == 2) world[i][j] = 1;
    if(i == 2 && j == 0) world[i][j] = 1;
    if(i == 2 && j == 1) world[i][j] = 1;
    if(i == 2 && j == 2) world[i][j] = 1;
}

function resetBoard(world) {
    for (i = 0; i < x; i++) {
        for (j = 0; j < y; j++) {
            world[i][j] = 0;
            createGlider(world, i, j);
            var id = i + '.' + j;
            setCellState(id, world[i][j]);
        }
    }
}
function initiateBoard(world)  {
    for (i = 0; i < x; i++) {
        var section = document.createElement("section");
        section.className = getSectionClassName();
        for (j = 0; j < y; j++) {
            world[i][j] = 0;
            createGlider(world, i, j);
            section.appendChild(createCell(world[i][j], i, j));
        }
        document.body.appendChild(section);
    }
}

function deadOrAlive(cell) {
  var dead = this.isPixel ? 'dead' : '·';
  var alive = this.isPixel ? 'alive' : '0';
	return cell ? alive : dead;
}

function createCell(cell, i, j) {
    var id = i + '.' + j;
    var div = document.createElement("div");
    div.id = id;
    div.addEventListener("mousedown", function() {changeState(id);});
    div.addEventListener("mouseenter", function() {if(mousedown) changeState(id);});
    if(this.isPixel)
      div.className = deadOrAlive(cell);
    else
      div.appendChild(document.createTextNode(deadOrAlive(cell)));
    return div;
}

function changeState(id) {
    var split = id.split(".");
    var x = split[0];
    var y = split[1];
    this.world[x][y] = !this.world[x][y];
    setCellState(id, this.world[x][y]);
}

function setCellState(id, cell) {
  if(this.isPixel) {
    document.getElementById(id).className = deadOrAlive(cell);
    document.getElementById(id).innerHTML = "";
  }
  else {
    document.getElementById(id).innerHTML = deadOrAlive(cell);
  }
}
//main();
