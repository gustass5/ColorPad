var cols = 11;
var rows = 11;
var grid = new Array(cols);
var spid = 50;
var radius = 10;
var snakeDelayStep = 5;

var sound1, sound2, drums, sound3;

var w, h;

function tile(i, j){
    this.i = i;
    this.j = j;

    this.col;
    this.snake;

    this.lit = false;

    this.show = function(){
        if(this.lit){
            fill(this.col);
        }else if(this.snake){
            fill(this.col);
        }else{
            fill(0);
        }

        stroke(255);
        rect(this.i * w, this.j * h, w-1, h-1);

    }

    this.lightUp = function (col, nr) {
        this.col = col;
        if(nr == 1){
            this.snake = true;
        }else{
            this.snake = false;
            this.lit = true;
            setTimeout(function () {
                this.lit = false;
            }.bind(this), spid);
        }

    }

}

function ray(i, j, col, rad){

    var corners = [
        [i-rad, j-rad],
        [i+rad, j-rad],
        [i+rad, j+rad],
        [i-rad, j+rad],
    ];

    var dir = [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1],
    ];


    for(var a = 0; a <= 3; a++){
        var c1 = a;
        var c2 = a + 1;
        if (c2 == 4)
            c2 = 0;

        var ii = corners[c1][0];
        var jj = corners[c1][1];

        while(
            ii != corners[c2][0] ||
            jj != corners[c2][1]
        ){
            ii = ii + dir[c1][0];
            jj = jj + dir[c1][1];
            //console.log(ii, jj);

            if(
                ii >= 0 &&
                ii <= cols-1 &&
                jj >= 0 &&
                jj <= rows-1
            ){
                grid[ii][jj].lightUp(col, 0);
            }
        }
    }

}
function snake(i, j, col, rad){

    var corners = [
        [i-rad, j-rad],
        [i+rad, j-rad],
        [i+rad, j+rad],
        [i-rad, j+rad],
    ];

    var dir = [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1],
    ];

    var delay = 0;
    for(var a = 0; a <= 3; a++){
        var c1 = a;
        var c2 = a + 1;
        if (c2 == 4)
            c2 = 0;

        var ii = corners[c1][0];
        var jj = corners[c1][1];


        while(
            ii != corners[c2][0] ||
            jj != corners[c2][1]
        ){
            ii = ii + dir[c1][0];
            jj = jj + dir[c1][1];
            //console.log(ii, jj);

            if(
                ii >= 0 &&
                ii <= cols-1 &&
                jj >= 0 &&
                jj <= rows-1
            ){
                setTimeout(function (iii, jjj) {
                    grid[iii][jjj].lightUp(col, 1);
                }.bind(this, ii, jj), delay);
                delay += snakeDelayStep;

            }
        }
    }

}

function beat(i, j, col,rad, num){
        var r=0;
        var k = 1;
        var snakeDelay = 0;
        if(num == 0){
            for (var a=0;a<rad;a++) {
            setTimeout(function () {
                if(r == 0){
                    grid[i][j].lightUp(color(253,95,0), 0);
                }
                ray(i,j,col,r);
                r++;
            }, spid * a);
            }
        }else if(num == 1){

            var l = false;

            if(!l){
                l = true;
                for(var a = 0; a < rad; a++){
                    var count = (a * 2) * 4;
                                    //console.log(count);
                    setTimeout(function (aa){

                        if(r == 0){
                            grid[i][j].lightUp(color(253,95,0), 0);
                        }

                        r++;

                        snake(i, j, col, aa);

                    }.bind(this, a), snakeDelay * a);
                    snakeDelay = count * snakeDelayStep / 2;
                }
                setTimeout(function(){
                    for(var q = 0; q < cols; q++){
                        for(var qq = 0; qq < rows; qq++){
                            grid[q][qq].snake = false;
                            grid[q][qq].show();
                        }
                    }
                }, snakeDelay*3.8);

                l = false;

            }
        }
}

function setup(){
    createCanvas(800,800);


    w = width / cols;
    h = height / rows;

    for(var i = 0; i < cols; i++){
        grid[i] = new Array(rows);
    }

    for(var i = 0; i < cols; i++){
        for(var j = 0; j < rows; j++){
            grid[i][j] = new tile(i, j);
        }
    }

}

function loaded(){
}

function draw(){
    for(var i = 0; i < cols; i++){
        for(var j = 0; j < rows; j++){
            grid[i][j].show();
        }
    }

    if(keyIsDown(97)){
        //beat(4, 6, color(178,31,53), radius, 0 );
        beat(4, 6, color(254,1,45), radius, 0 );

    }
    if(keyIsDown(98)){
        //beat(5, 6, color(255,249,53), radius, 0 );
        beat(5, 6, color(253,254,2), radius, 0 );
 
    }
    if(keyIsDown(99)){
        beat(6, 6, color(22,221,53), radius, 0 );
        //beat(5, 6, color(255,249,53), radius, 0 );
    }
    if(keyIsDown(100)){
        //beat(4, 5, color(0,82,165), radius, 0);
        beat(4, 5, color(0,42,255), radius, 0);
        //beat(4, 5, color(0,0,255), radius, 0);
    }
    if(keyIsDown(101)){
        //beat(5, 5, color(0,169,252), radius, 1);
        beat(5, 5, color(255,255,255), radius, 1);

    }
    if(keyIsDown(102)){
        //beat(6, 5, color(104,30,126), radius, 0 );
        beat(6, 5, color(184,30,126), radius, 0 );
    }
    if(keyIsDown(103)){
        beat(4, 4, color(0, 255, 255), radius, 0);
    }
    if(keyIsDown(104)){
        beat(5, 4, color(57,255,20), radius,0 );
    }
    if(keyIsDown(105)){
        beat(6, 4, color(253,254,2), radius, 0 );
    }


}
