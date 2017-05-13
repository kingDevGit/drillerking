/**
 * Created by Tiffany Thom Wing Lam on 7/5/2017.
 *
 * Read me:
 * This javascript file is the collection of all rendering functions
 */

///////// graphics and drawing stuff /////////
////////  dedicated rendering functions

var drillerSprite;

function loadDrillerSprite() {
    var character1Sprite, character2Sprite, character3Sprite;

    var image_res = [
        [resources.getResult("drill"), resources.getResult("walk")],
        [resources.getResult("character_attack"), resources.getResult("character")],
        [resources.getResult("character2_attack"), resources.getResult("character2")],
        [resources.getResult("character3_attack"), resources.getResult("character3")]
    ];

    function generateSpriteData(_images) {
        var data = {
            images: _images,
            frames: {width: 300, height: 300, regX: 150},
            animations: {
                stand: 2,
                drill: {
                    frames: [3, 5],
                    next: false,
                    speed: 0.5
                },
                walk: [6, 9, "stand", 0.5],
            },
            framerate: 5
        };
        return new createjs.SpriteSheet(data);
    }


    var spriteSheet = generateSpriteData(image_res[0]);
    drillerSpriteSheet = new createjs.Sprite(spriteSheet, "stand");
    drillerSpriteSheet.gotoAndPlay("stand");
    drillerSpriteSheet.scaleX = 50 / 300;
    drillerSpriteSheet.scaleY = 50 / 300;

    var sprite1Sheet = generateSpriteData(image_res[1]);
    character1Sprite = new createjs.Sprite(sprite1Sheet, "stand");
    character1Sprite.gotoAndPlay("stand");
    character1Sprite.scaleX = 50 / 300;
    character1Sprite.scaleY = 50 / 300;

    var sprite2Sheet = generateSpriteData(image_res[2]);
    character2Sprite = new createjs.Sprite(sprite2Sheet, "stand");
    character2Sprite.gotoAndPlay("stand");
    character2Sprite.scaleX = 50 / 300;
    character2Sprite.scaleY = 50 / 300;

    var sprite3Sheet = generateSpriteData(image_res[3]);
    character3Sprite = new createjs.Sprite(sprite3Sheet, "stand");
    character3Sprite.gotoAndPlay("stand");
    character3Sprite.scaleX = 50 / 300;
    character3Sprite.scaleY = 50 / 300;

    drillerSprite = {
        "norm" : drillerSpriteSheet,
        "brown" : character1Sprite,
        "blue" : character2Sprite,
        "yellow" : character3Sprite
    };
}

function drawDriller() {
    //Mr.Driller's animation
    drillerSprite[mainCharacter].x = driller.column * 60 + 30;
    drillerSprite[mainCharacter].y = canvas.height - driller.row * 60;

    // Draw Mr. Driller's drill
    var drillOffset = 10;
    if (driller.drillDirection === "down") {
        var line = new createjs.Shape();
        line.graphics.f("#E01B6A");
        line.graphics.beginStroke("#E01B6A");
        line.graphics.moveTo(driller.column * 60 + 25,
            canvas.height - driller.row * 60 + 45);
        line.graphics.lineTo(driller.column * 60 + 30,
            canvas.height - driller.row * 60 + 60);
        line.graphics.lineTo(driller.column * 60 + 35,
            canvas.height - driller.row * 60 + 45);
        line.graphics.endStroke();
        stage.addChild(line);
    }
    else if (driller.drillDirection === "up") {
        var line = new createjs.Shape();
        line.graphics.f("#E01B6A");
        line.graphics.beginStroke("#E01B6A");
        line.graphics.moveTo(driller.column * 60 + 25,
            canvas.height - driller.row * 60 + 15);
        line.graphics.lineTo(driller.column * 60 + 30,
            canvas.height - driller.row * 60);
        line.graphics.lineTo(driller.column * 60 + 35,
            canvas.height - driller.row * 60 + 15);
        line.graphics.endStroke();
        stage.addChild(line);
    }
    else if (driller.drillDirection === "left") {
        var line = new createjs.Shape();
        line.graphics.f("#E01B6A");
        line.graphics.beginStroke("#E01B6A");
        line.graphics.moveTo(driller.column * 60 + 15,
            canvas.height - driller.row * 60 + 25);
        line.graphics.lineTo(driller.column * 60,
            canvas.height - driller.row * 60 + 30);
        line.graphics.lineTo(driller.column * 60 + 15,
            canvas.height - driller.row * 60 + 35);
        line.graphics.endStroke();
        stage.addChild(line);

    }
    else if (driller.drillDirection === "right") {
        var line = new createjs.Shape();
        line.graphics.f("#E01B6A");
        line.graphics.beginStroke("#E01B6A");
        line.graphics.moveTo(driller.column * 60 + 45,
            canvas.height - driller.row * 60 + 25);
        line.graphics.lineTo(driller.column * 60 + 60,
            canvas.height - driller.row * 60 + 30);
        line.graphics.lineTo(driller.column * 60 + 45,
            canvas.height - driller.row * 60 + 35);
        line.graphics.endStroke();
        stage.addChild(line);
    }

    stage.addChild(drillerSprite[mainCharacter]);
}

function drawEnemyDriller(){
    drillerSprite["norm"].x = enemy.column * 60 + 30 + 600;
    drillerSprite["norm"].y = canvas.height - enemy.row * 60;

    stage.addChild(drillerSprite["norm"]);
}

function drawScoreboard(width, height) {
    //drawRectangle("black", 0, 0, worldWidth, canvas.height);
    //drawRectangle("black", canvas.width - width, 0, width, height);
    var canvasWidth = 600;

    //Lives
    drawRoundedRectangle("Khaki", canvasWidth - width + 5,
        height / 9 - 30,
        width - 5, 35, 5);
    drawText("LIVES", "35px Arial", "white", canvasWidth - width + 10, height / 9 - 30, "start");
    drawText("" + driller.lives, "35px Arial", "white", canvasWidth, height / 9 - 30, "end");

    //Depth
    drawRoundedRectangle("LightCoral", canvasWidth - width + 5,
        3 * height / 9 - 30,
        width - 5, 35, 5);
    drawText("DEPTH: ", "35px Arial", "white", canvasWidth - width + 10, 3 * height / 9 - 30, "start");
    drawText("" + driller.depth + "ft", "35px Arial", "white",
        canvasWidth - 10, 4 * height / 9 - 30, "end");

    //ENERGY
    drawRoundedRectangle("LightBlue", canvasWidth - width + 5,
        5 * height / 9 - 30,
        width - 5, 35, 5);
    drawText("ENERGY: ", "35px Arial", "white",
        canvasWidth - width + 10, 5 * height / 9 - 30, "start");

    //ENERGY BAR
    drawRoundedRectangle("white", canvasWidth - width + 10,
        5.7 * height / 9,
        width - 20, 20, 5);

    drawRoundedRectangle("LightBlue",
        (canvasWidth - width + 15) + (1 - driller.air / 100) * (width - 30),
        5.7 * height / 9 + 5,
        (width - 30) * (driller.air / 100), 10, 1);

    //SCORE
    drawRoundedRectangle("plum", canvasWidth - width + 5,
        7 * height / 9 - 30,
        width - 5, 35, 5);
    drawText("SCORE: ", "35px Arial", "white",
        canvasWidth - width + 10, 7 * height / 9 - 30, "start");
    drawText("" + window.score, "35px Arial", "white",
        canvasWidth - 10, 8 * height / 9 - 30, "end");
}

function drawGameOver() {
    drawRectangle("rgba(0,0,0,.5)", 0, 0, canvas.width, canvas.height);

    drawText("GAME OVER", "60px Arial", "white", canvas.width / 2, canvas.height / 2, "center");
    drawText("Press R to play again", "40px Arial", "white", canvas.width / 2, canvas.height / 2 + 70, "center");
    stage.update();
}

function drawIntroScreen() {
    resizeCanvas(1);

    var intro = resources.getResult("intro");
    addBitmap(intro, 0, 0, canvas.width, canvas.height);
    stage.update();
}

function drawBackground() {
    var bgImg = resources.getResult("bg0");
    addBitmap(bgImg, 0, 0, canvas.width, canvas.height);
}

function drawMenuOld() {
    resizeCanvas(1);

    var bgImg = resources.getResult("bg0");
    addBitmap(bgImg, 0, 0, canvas.width, canvas.height);

    addButton("Single Player", 300, 200, "red", function () {
        switchState("single", null);
    });

    addButton("Create Room", 300, 300, "blue", function () {
        switchState("create", null);
    });

    addButton("Join Room", 300, 400, "green", function () {
        switchState("join", null);
    });

    stage.update();
}

function drawMenu() {
    resizeCanvas(1);

    var bgImg = resources.getResult("bg0");
    addBitmap(bgImg, 0, 0, canvas.width, canvas.height);

    var btn1 = resources.getResult("insTxt");
    addBitmapButton(btn1, 10, 300, 133, 149, function(){
        switchState("goIns", null);
    });

    var btn2 = resources.getResult("storyTxt");
    addBitmapButton(btn2, 220, 300, 133, 149, function(){
        switchState("single", null);
    });

    var btn3 = resources.getResult("battleTxt");
    addBitmapButton(btn3, 420, 300, 133, 149, function(){
        switchState("multi", null);
    });

    stage.update();
}

function drawSingleModeDisplay() {
    drawBackground();
    drawScoreboard(600 - worldWidth, canvas.height);
    drawBlocks(blocks,1);
    drawDriller();
}

function drawMultiModeDisplay(){
    drawBackground();
    drawScoreboard(600 - worldWidth, canvas.height);
    drawBlocks(blocks,1);
    drawBlocks(duelBlocks,2);
    drawDriller();
    drawEnemyDriller();
}

function resizeCanvas(mode) {
    if (mode == 1) {
        stage.canvas.width = 600;
    }
    else if (mode == 2) {
        stage.canvas.width = 600 + worldWidth;
    }
}

function drawEndGameOne(){
    resizeCanvas(1);

    var bgImg = resources.getResult("fail2");
    addBitmap(bgImg, 0, 0, canvas.width, canvas.height);

    var homeBtnImg = resources.getResult("home");
    addBitmapButton(homeBtnImg, 30, 500, 75, 75, function(){
        switchState("homePress", null);
    });

    var restartBtnImg = resources.getResult("restart");
    addBitmapButton(restartBtnImg, 470, 500, 75, 75, function(){
        switchState("gameRestart", null);
    });
    stage.update();
}

function drawEndGameLose(){
    resizeCanvas(1);

    var bgImg = resources.getResult("losePlay");
    addBitmap(bgImg, 0, 0, canvas.width, canvas.height);

    var homeBtnImg = resources.getResult("home");
    addBitmapButton(homeBtnImg, 30, 500, 75, 75, function(){
        switchState("homePress", null);
    });

    stage.update();
}

function drawEndGameWin(){
    resizeCanvas(1);

    var bgImg = resources.getResult("winPlay");
    addBitmap(bgImg, 0, 0, canvas.width, canvas.height);

    var homeBtnImg = resources.getResult("home");
    addBitmapButton(homeBtnImg, 30, 500, 75, 75, function(){
        switchState("homePress", null);
    });

    stage.update();
}

function drawCharacterSelect(){
    // 10 150, 220 150, 420 150
    // yellow character 3
    // blue character 2
    // brown character 1

    resizeCanvas(1);

    //background
    var bgImg = resources.getResult("selectPage");
    addBitmap(bgImg, 0, 0, canvas.width, canvas.height);

    var blueCharImg = resources.getResult("blueChar");
    addBitmapButton(blueCharImg, 10, 300, 133, 149, function(){
        mainCharacter = "blue";
        switchState("selected", null);
    });

    var yellowCharImg = resources.getResult("yellowChar");
    addBitmapButton(yellowCharImg, 220, 300, 133, 149, function(){
        mainCharacter = "yellow";
        switchState("selected", null);
    });

    var brownCharImg = resources.getResult("brownChar");
    addBitmapButton(brownCharImg, 420, 300, 133, 149, function(){
        mainCharacter = "brown";
        switchState("selected", null);
    });
    stage.update();
}

function drawInstruction(){
    resizeCanvas(1);

    var intro = resources.getResult("instruction2");
    addBitmap(intro, 0, 0, canvas.width, canvas.height);

    var homeBtnImg = resources.getResult("home");
    addBitmapButton(homeBtnImg, 30, 30, 75, 75, function(){
        switchState("back", null);
    });

    stage.update();
}

function drawStoryBackground(){
    resizeCanvas(1);

    var intro = resources.getResult("storyBackground");
    addBitmap(intro, 0, 0, canvas.width, canvas.height);

    stage.update();
}

function drawWaitingForPlayer(){
    drawRectangle("rgba(0,0,0,.5)", 0, 0, canvas.width, canvas.height);

    drawText("Waiting for Player...", "60px Arial", "white", canvas.width / 2, canvas.height / 2, "center");
    drawText("Press X to Cancel", "40px Arial", "white", canvas.width / 2, canvas.height / 2 + 70, "center");
    stage.update();
}

///////// Blocks related stuff ///////////

// connect blocks visually
function drawBlocks(_blocks, mode) {
    for (var column = 0; column < numColumns; column++) {
        for (var index = 0; index < _blocks[column].length; index++) {
            drawBlock(column, index, _blocks[column][index].type, mode, _blocks);
        }
    }
}

// If blocks are adjacent and same color, connects them
function drawBlock(column, row, type, mode, _blocks) {
    var viewOffset = 0;
    mode == 1 ? viewOffset = 0 : viewOffset = 600;

    function drawNormal(fillStyle) {
        var color = fillStyle;

        var hasAdjacent = false;

        //detects overlap
        if (column > 0 && _blocks[column - 1][row].type === type) {
            drawRoundedRectangle(color,
                (column - 1) * 60 + 5 + viewOffset + _blocks[column][row].xOffset,
                canvas.height - row * 60 + 5,
                110, 50, 5);
            hasAdjacent = true;
        }
        if (row > 0 && _blocks[column][row - 1].type === type) {
            drawRoundedRectangle(color,
                column * 60 + 5 + viewOffset + _blocks[column][row].xOffset,
                canvas.height - row * 60 + 5,
                50, 110, 5);
            hasAdjacent = true;
        }
        if (hasAdjacent === false) {
            drawRoundedRectangle(color,
                column * 60 + 5 + viewOffset + _blocks[column][row].xOffset,
                canvas.height - row * 60 + 5,
                50, 50, 5);
        }
    }

    function drawAir() {
        var chickenleg = resources.getResult("chickenleg");
        addBitmap(chickenleg,
            column * 60 + 5 + viewOffset + _blocks[column][row].xOffset,
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
            column * 60 + 5 + viewOffset + _blocks[column][row].xOffset,
            canvas.height - row * 60 + 5,
            50, 50, 5);

        var innerTopLeft = {
            "x": column * 60 + 10 + viewOffset + _blocks[column][row].xOffset,
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
        drawDurable(_blocks[column][row]);
    }
}

/////////     EaselJS wrapper   ////////////
// Graphics Wrapper function
// These function should be general and reusable
function drawText(text, font, color, x, y, align) {
    var text = new createjs.Text(text, font, color);
    text.x = x;
    text.y = y;
    text.textAlign = align;
    stage.addChild(text);
}

function drawRectangle(ctx, x, y, width, height) {
    var rect = new createjs.Shape();
    rect.graphics.beginFill(ctx).dr(x, y, width, height);
    stage.addChild(rect);
}

function drawRoundedRectangle(ctx, x, y, width, height, radius) {
    var roundedRect = new createjs.Shape();
    roundedRect.graphics.f(ctx).rr(0, 0, width, height, radius);
    roundedRect.x = x;
    roundedRect.y = y;
    stage.addChild(roundedRect);
}

function circle(ctx, cx, cy, radius) {
    var circle = new createjs.Shape();
    circle.graphics.f(ctx).dc(0, 0, radius);
    circle.x = cx;
    circle.y = cy;
    stage.addChild(circle);
}

function addBitmap(img, x, y, width, height) {
    var bitmap = new createjs.Bitmap(img);
    bitmap.x = x;
    bitmap.y = y;
    bitmap.scaleX = width / img.width;
    bitmap.scaleY = height / img.height;
    stage.addChild(bitmap);
}

function drawLine(x1, y1, x2, y2, stroke, color) {
    var line = new createjs.Shape();
    line.graphics.setStrokeStyle(stroke);
    line.graphics.beginStroke(color);
    line.graphics.moveTo(x1, y1);
    line.graphics.lineTo(x2, y2);
    line.graphics.endStroke();
    stage.addChild(line);
}

function rgbToString(r, g, b, a) {
    var retStr;

    if (a === undefined) {
        retStr = ("rgb(" + String(r) + ","
        + String(g) + ","
        + String(b) + ")");
    } else {
        retStr = ("rgba(" + String(r) + ","
        + String(g) + ","
        + String(b) + ","
        + String(a) + ")");
    }
    return retStr;
}

function addButton(text, x, y, txtcolor, keyDown) {

    var label2 = new createjs.Text(text, "48px Arial", txtcolor);
    label2.x = x;
    label2.y = y;
    label2.textAlign = "center";

    // create a rectangle shape the same size as the text, and assign it as the hitArea
    // note that it is never added to the display list.
    var hit = new createjs.Shape();
    hit.graphics.beginFill("#000")
        .drawRect(0, 0,
        label2.getMeasuredWidth(),
        label2.getMeasuredHeight());

    label2.hitArea = hit;

    //label2.on("mouseover", buttonHandleInteraction);
    //label2.on("mouseout", buttonHandleInteraction);
    label2.on("click", keyDown);

    stage.addChild(label2);

    function buttonHandleInteraction(event) {
        event.target.alpha = (event.type == "mouseover") ? 1 : 0.5;
    }
}

function addBitmapButton(img, x, y, width, height, keydown) {
    var bitmap = new createjs.Bitmap(img);
    bitmap.x = x;
    bitmap.y = y;
    bitmap.scaleX = width / img.width;
    bitmap.scaleY = height / img.height;

    bitmap.on("click",keydown);

    stage.addChild(bitmap);
}
