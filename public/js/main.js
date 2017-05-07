// HTML5 Mr. Driller
// Authors:
//   Nathan Hamal <nhamal@andrew.cmu.edu>
//   Dylan Mikus <dmikus@andrew.cmu.edu>

// Global variables

//colors used for blocks.
// Everything in this array can be drilled.
var colors = ["red", "blue", "green", "purple"];
function canDrill(block) {
    return (colors.indexOf(block.type) > -1);
}

//maximum rows of blocks stored
//blocks dissappear if they are 15 above the bottom of the screen
var numRows = 15;
// The number of columns of blocks (x width)
var numColumns = 7;

// variables so keycodes are more transparent
var downarrow = 40;
var uparrow = 38;
var leftarrow = 37;
var rightarrow = 39;
var spacebar = 32;
var rKey = 82;
var isRight = true;

var inGame = false;
var introScreen = true;

var worldWidth = 420;

var score = 0;
var driller;
var drillerSpriteSheet;

var canvas = document.getElementById("myCanvas");
var body = document.getElementsByTagName("body")[0];
var ctx = canvas.getContext("2d");

// EaselJS
var stage;

// Socket.io
var socket;

// A 2D array of blocks. Block at pos (0,0) is one below canvas display on
// left side. This is like cartesian plane coordinates
var blocks = [];
for (var i = 0; i < numColumns; i++) {
    blocks.push([]); // add second dimensional arrays to each index
}

// Sets up the world and draws objects on canvas
function main() {
    // socket.io
    socket = io('http://localhost:5000');
    bindSocketListener(socket);

    //TODO: stage machine update 1
    intro();

    // adding listeners to control driller
    // Focusing canvas so it can register events
    canvas.setAttribute('tabindex', '0');
    canvas.focus();
    canvas.addEventListener('keydown', onKeyDown, false);
    body.addEventListener('click', focusCanvas, false); //fix focus problem

    //easelJs init
    stage = new createjs.Stage("myCanvas");
    createjs.Ticker.addEventListener("tick", onTimer);

    // preload resources
    preload_Resouces(function () {
        drawIntroScreen();
        loadDrillerSprite();
    });
}

// TODO: Switch to state machine for menu control
function intro() {
    window.introScreen = true;
}

// #SocketIOEvent : Socket.io event
function bindSocketListener(pray) {
    var eden = null;
    pray.on('handshake', function () {
        console.log('Handshake');
    });

    pray.on('logos', function (universe) {
        console.log('Universe Received', universe);
        //blocks = universe.blocks;
        //driller = new Driller(universe.adam.column,universe.adam.row);
        introScreen = false;
        inGame = true;
        pray.emit('eden');
    });

    // TODO: single player screen update
    pray.on('eden', function (universe) {
        console.log('World updated');
        blocks = universe.blocks;
        eden = universe;
        eden.adam = {
            row: driller.row,
            column: driller.column,
            countdown: driller.countdown,
            depth: driller.depth,
            score: eden.adam.score
        };
        score = eden.adam.score;
        //eden.blocks = blocks;

        if (window.inGame === true) {
            stage.removeAllChildren();
            drawDisplay(); // draws objects on screen
            gravity();
            if (driller.alive === true) {
                driller.breathe();
            } else {
                driller.deathTime();
            }
            blocks = animate(blocks);
            // Check if Mr. Driller is in an air pocket
            if (blocks[driller.column][driller.row].type === "air") {
                console.log("air1");
                blocks[driller.column][driller.row].type = "empty";
                driller.airPocket();
            }
            blocks = animate(blocks);

        }
        pray.emit('pray', eden);
    });


    pray.on('noob', ()=> {
        driller.air -= 10;
    });
}

function setUpWorld() {
    socket.emit('genesis', null);
    // fill the rest of the grid with empty blocks
    driller = new Driller(3, 5);
}

function gameOver() {
    window.inGame = false;
    drawGameOver();
    socket.emit('apocalypse');
}

// Stuff that happens every time the timer fires
function onTimer() {
    if (!window.introScreen) {
        stage.update();
    }
}

// #physicsEngine
//checks all things that can fall to see if they should be falling,
//then makes them fall
function gravity() {
    //check if the driller should fall
    if (blocks[driller.column][driller.row - 1].type === "empty" ||
        blocks[driller.column][driller.row - 1].type === "air") {

        if (driller.countdown === 0) {
            /*addBottomBlocks(1,
                .015,
                //this argument is the probability of a durable block
                //essentially this is the function from depth to
                //difficulty, since durable blocks make it harder
                Math.pow(driller.depth / 100, 2) /
                (5 * Math.pow((driller.depth + 300) / 100, 2)));
            driller.depth += 5;*/
            if (window.blocks[driller.column][driller.row].type === "air") {
                console.log("air2");
                driller.airPocket();
                blocks[driller.column][driller.row].type = "empty";
            }
            driller.resetCountdown();
        } else {
            driller.countdown -= 1;
        }
    }

    //TODO: server side problem
    //TODO: BUG - gravity drop will not encounter get airPocket
    //var fallObj = blockGravity(blocks);
    //blocks = fallObj.blockGrid;
    //check if driller was crushed
    if (window.blocks[driller.column][driller.row].type !== "empty"
        && window.blocks[driller.column][driller.row].type !== "air"
        && driller.alive === true) {
        driller.kill();
    }
}

function animate(blocks) {
    var x = 0;
    var y = 0;

    // If block is in middle, shake left
    // If block is left, shake right
    function shakeBlock(block) {
        blockOffset = 5;

        if (block.xOffset >= 0) {
            block.xOffset = -blockOffset;
        } else if (block.xOffset < 0) {
            block.xOffset = blockOffset;
        }

        return block;
    }

    for (y = 0; y < numRows; y++) {
        for (x = 0; x < numColumns; x++) {
            if (blocks[x][y].state === "shaking") {
                if (blocks[x][y].countdown % 2 === 0) {
                    blocks[x][y] = shakeBlock(blocks[x][y]);
                }
            } else {
                blocks[x][y].xOffset = 0;
            }
        }
    }

    return blocks;
}


// The player's dude
function Driller(column, row) {
    var countdownFactor = 4;

    this.countdown = countdownFactor;
    this.column = column;
    this.row = row;
    this.lives = 2;
    this.alive = true;
    this.depth = 0;
    this.air = 100;
    this.timeDead = 0;
    // Possibilities: left, right, up, down
    this.drillDirection = "down";

    // Receives input to move around digger
    // Also does object collision detection
    // Pretty sure this will only be called with dx or dy non-zero. Not both
    this.move = function (dx, dy) {
        if (this.alive === false) {//prevent moving while driller is dead
            return;
        }
        // Checks for object collision for moving
        if (this.column + dx >= 0 && this.column + dx < numColumns
            && this.row + dy > 0 && this.row + dy < blocks[this.column].length
            && (blocks[this.column + dx][this.row + dy].type === "empty"
            || blocks[this.column + dx][this.row + dy].type === "air")) {
            this.column += dx;
            if (blocks[this.column][this.row].type === "air") {
                console.log("air3)");
                blocks[this.column][this.row].type = "empty";
                this.airPocket();
            }
        }

        if (dx < 0) this.drillDirection = "left";
        else if (dx > 0) this.drillDirection = "right";
        else if (dy < 0) this.drillDirection = "down";
        else if (dy > 0) this.drillDirection = "up";
    }

    this.airPocket = function () {
        this.air = Math.min(this.air + 30, 100);
    }

    this.deathTime = function () {
        this.timeDead += 1;
        if (this.timeDead > 30) {
            this.timeDead = 0;
            this.revive();
        }
    }

    this.breathe = function () {
        this.air -= .07;

        if (this.air < 0) {
            this.kill();
        }
    }

    this.kill = function () {//kills the driller
        this.alive = false;
        this.lives--;
        if (this.lives < 0) {
            gameOver();
        }
    }

    this.revive = function () {
        for (var i = this.column - 1; i <= this.column + 1; i++) {
            if (i < 0 || i >= numColumns)
                continue;
            for (var j = this.row; j < numRows; j++) {
                blocks[i][j].type = "empty";
            }
            this.air = 100;
            this.alive = true;
        }
    }

    this.fall = function () {
        this.row--;
    }

    this.drill = function () {
        var pos;
        if (this.alive === false) {
            return;
        }
        if (this.drillDirection === "left")
            pos = [this.column - 1, this.row];
        else if (this.drillDirection === "right")
            pos = [this.column + 1, this.row];
        else if (this.drillDirection === "up")
            pos = [this.column, this.row + 1];
        else if (this.drillDirection === "down")
            pos = [this.column, this.row - 1];

        // drilling animation
        drillerSpriteSheet.gotoAndPlay("drill");

        // Check that block is within the bounds of the grid,
        // and disable player from drilling blocks that are currently falling
        if (pos[0] >= 0 && pos[0] < numColumns
            && pos[1] >= 0 && pos[1] < numRows
            && blocks[pos[0]][pos[1]].state !== "falling") {
            var toDrill = blocks[pos[0]][pos[1]];

            socket.emit('drill', {toDrill: toDrill, pos: pos});
        }
    }

    this.resetCountdown = function () {
        this.countdown = countdownFactor;
    }
}

function onKeyDown(event) {
    var keycode = event.keyCode;

    // Variables for where Mr. Driller moves
    var dx = 0;
    var dy = 0;

    if (keycode === leftarrow) {
        dx--;
        drillerSpriteSheet.gotoAndPlay("walk");
        if (isRight) {
            drillerSpriteSheet.scaleX = -1 * drillerSpriteSheet.scaleX;
            isRight = false;
        }
    }
    else if (keycode === rightarrow) {
        dx++;
        drillerSpriteSheet.gotoAndPlay("walk");
        if (!isRight) {
            drillerSpriteSheet.scaleX = -1 * drillerSpriteSheet.scaleX;
            isRight = true;
        }
    }
    else if (keycode === downarrow) dy--;
    else if (keycode === uparrow) dy++;

    // Shouldn't be able to move up or down by keypresses.

    if (dx !== 0 || dy !== 0) {
        driller.move(dx, dy); // TODO: this is probably messed up
    }

    // Drilling stuff
    if (keycode === spacebar && introScreen === false) {
        driller.drill();

    }
    if (keycode === spacebar && introScreen === true) {
        setUpWorld();
    }

    // Restart
    if (keycode === rKey
        && window.inGame === false) {
        restartGame();
    }
}

function restartGame() {
    window.blocks = [[], [], [], [], [], [], []];
    setUpWorld();
    window.score = 0;
    window.depth = 0;
    window.inGame = true;
}


// This is the drawing function that happens every time
function drawDisplay() {
    if (window.introScreen) {
        drawIntroScreen();
    } else {
        drawBackground();
        drawScoreboard(canvas.width - worldWidth, canvas.height);
        drawBlocks();
        drawDriller();
    }
}

// Just offshores (to China) the drawing of blocks and figuring out whether to
// connect blocks visually
function drawBlocks() {
    for (column = 0; column < numColumns; column++) {
        for (index = 0; index < blocks[column].length; index++) {
            drawBlock(column, index, blocks[column][index].type);
        }
    }
}

// If blocks are adjacent and same color, connects them
function drawBlock(column, row, type) {
    function drawNormal(fillStyle) {
        var color = fillStyle;

        var hasAdjacent = false;

        //detects overlap
        if (column > 0 && blocks[column - 1][row].type === type) {
            drawRoundedRectangle(color,
                (column - 1) * 60 + 5 + blocks[column][row].xOffset,
                canvas.height - row * 60 + 5,
                110, 50, 5);
            hasAdjacent = true;
        }
        if (row > 0 && blocks[column][row - 1].type === type) {
            drawRoundedRectangle(color,
                column * 60 + 5 + blocks[column][row].xOffset,
                canvas.height - row * 60 + 5,
                50, 110, 5);
            hasAdjacent = true;
        }
        if (hasAdjacent === false) {
            drawRoundedRectangle(color,
                column * 60 + 5 + blocks[column][row].xOffset,
                canvas.height - row * 60 + 5,
                50, 50, 5);
        }
    }

    function drawAir() {
        var chickenleg = resources.getResult("chickenleg");
        addBitmap(chickenleg,
            column * 60 + 5 + blocks[column][row].xOffset,
            canvas.height - row * 60 + 5,
            50, 50);
    }

    function drawDurable(block) {
        var r = 122;
        var g = 71;
        var b = 20;
        var a = 1 - (3 - block.health) * 0.25;

        var color;
        color = rgbToString(r, g, b, a);
        drawRoundedRectangle(color,
            column * 60 + 5 + blocks[column][row].xOffset,
            canvas.height - row * 60 + 5,
            50, 50, 5);

        var innerTopLeft = {
            "x": column * 60 + 10 + blocks[column][row].xOffset,
            "y": canvas.height - row * 60 + 10
        };
        color = rgbToString(r - 20, g - 20, b - 20, a);
        drawRoundedRectangle(color,
            innerTopLeft.x,
            innerTopLeft.y,
            40, 40, 5);

        color = rgbToString(r + 10, g + 10, b + 10, a);
        var stroke = 5;
        drawLine(innerTopLeft.x + 5, innerTopLeft.y + 5,
            innerTopLeft.x + 35, innerTopLeft.y + 35,
            stroke, color);
        drawLine(innerTopLeft.x + 5, innerTopLeft.y + 35,
            innerTopLeft.x + 35, innerTopLeft.y + 5,
            stroke, color);
    }

    //dont draw anything for empty blocks
    if (type === "empty")
        return;
    if (type === "blue") {
        drawNormal("LightCyan");
//        drawDurable();
    }
    else if (type === "green") {
        drawNormal("Khaki");
    }
    else if (type === "red") {
        drawNormal("LightCoral");
    }
    else if (type === "purple") {
        drawNormal("plum");
    }
    // drawing air and durables should be different
    // they don't connect
    else if (type === "air") {
        // ctx.fillStyle = "lightblue";
        drawAir();
    }
    else if (type === "durable") {
        drawDurable(blocks[column][row]);
    }
}

// #focus
function focusCanvas() {
    canvas.focus();
}

main();
