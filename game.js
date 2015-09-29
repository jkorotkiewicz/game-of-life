var x = 40;
var y = 40;
var world;

function main() {
    var world = new Array(x);
    for (var i = 0; i < x; i++) {
        world[i] = new Array(y);
    }    
    initiateBoard(world);
    drawBoard(world);
    this.world = world;
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

function updateBoard() {
	makeStep();
	for (i = 0; i < x; i++) {        
        for (j = 0; j < y; j++) {
        	var id = "" + i + '.' + j;
            document.getElementById(id).innerHTML=deadOrAlive(this.world[i][j]);
        }        
    }
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

function initiateBoard(world) {
    for (i = 0; i < x; i++) {
        for (j = 0; j < y; j++) {
            world[i][j] = 0;
            if(i == 0 && j == 1) world[i][j] = 1;
            if(i == 1 && j == 2) world[i][j] = 1;
            if(i == 2 && j == 0) world[i][j] = 1;
            if(i == 2 && j == 1) world[i][j] = 1;
            if(i == 2 && j == 2) world[i][j] = 1;
        }
    }
}

function drawBoard(world)  {   
    for (i = 0; i < x; i++) {
        var section = document.createElement("section");
        section.className = "mainboard"; 
        for (j = 0; j < y; j++) {
            section.appendChild(createCell(deadOrAlive(world[i][j]), i, j));
        }
        document.body.appendChild(section);
    }
}

function deadOrAlive(cell) {
	var dead = '·';
    var alive = '0';
	return cell ? alive : dead;
}

function createCell(cell, i, j) {
    var id = i + '.' + j;
    var div = document.createElement("div");
    div.id = id;
    div.addEventListener('click', function () {changeState(id)});
    div.appendChild(document.createTextNode(cell));
    return div;
}

function changeState(id) {
    var split = id.split(".");
    var x = split[0];
    var y = split[1];
    this.world[x][y] = !this.world[x][y];
    document.getElementById(id).innerHTML = deadOrAlive(this.world[x][y]);
}

//main();