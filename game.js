var x = 10;
var y = 10;
var world;

function main() {
    var world = new Array(x);
    for (var i = 0; i < x; i++) {
        world[i] = new Array(y);
    }    
    initiateBoard(world);
    drawBoard(world);
    drawSection();
    this.world = world;
    // // for(var i = 0; i < 100; i++) {
    // 	makeStep(world);
    // 	drawBoard(this.world);
    // 	drawSection();    	
    // 	drawBoard(world);
    // 	drawSection();    	
    // 	drawBoard(this.world);
    // 	drawSection();    	
    // // }
}

function makeStep() {
    var newWorld = new Array(x);
    for (var i = 0; i < this.x; i++) {
        newWorld[i] = new Array(this.y);
    }
    // debugger;
    for (var i = 0; i < this.x; i++) {
        for (var j = 0; j < this.y; j++) {        	
        	newWorld[i][j] = checkNeighbours(this.world, i, j);
        }
    }    
    this.world = newWorld;
    //return newWorld;
}

function updateBoard() {
	makeStep();
	for (i = 0; i < x; i++) {        
        for (j = 0; j < y; j++) {
        	var id = "" + i + '-' + j;
        	// alert(id);
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
    // document.write(w + ' ' + n  + ' ' + e  + ' ' + s);
    // document.write(' i = ' + i + ' j = ' + j + ' x = ' + x + ' y = ' + y + ' counter = ' + counter + '\n');
    // alert('x = ' + x + ' y = ' + y + ' counter = ' + counter);
    //if(counter < 2 || counter > 3) return 0;
    // return counter;
    if(world[x][y]) return(counter<2?0:counter>3?0:1);
    else return(counter==3?1:0);
}

function initiateBoard(world) {
    for (i = 0; i < x; i++) {
        for (j = 0; j < y; j++) {
            // world[i][j] = Math.floor(Math.random() + 0.2);
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
        document.write("<section class=\"mainboard\">");
        for (j = 0; j < y; j++) {
            document.write(createCell(deadOrAlive(world[i][j]), i, j));
        }
        document.write("</section>");
    }
}

function deadOrAlive(cell) {
	var dead = ' &middot';
    var alive = ' 0';
	return cell ? alive : dead;
}

function createCell(cell, i, j) {
    var id = i + '-' + j;
	return "<div id='"
            + id + 
            "'" +  "onclick='changeState(\""
             + id + 
             "\")'> "
             + cell + 
             "<\/div>";
}

function changeState(id) {
    var split = id.split("-");
    var x = split[0];
    var y = split[1];
    this.world[x][y] = !this.world[x][y];
    document.getElementById(id).innerHTML = deadOrAlive(this.world[x][y]);
}

function drawSection() {
    document.write("<section>");
    for (i = 0; i <= x; i++) {
        document.write("--");
    }
    document.write("</section>");
}

//main();