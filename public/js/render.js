/**
 * Created by Tiffany Thom Wing Lam on 7/5/2017.
 *
 * Read me:
 * This javascript file is the collection of all rendering functions
 */

///////// graphics and drawing stuff /////////

function loadDrillerSprite() {
    var data = {
        images: [resources.getResult("drill"), resources.getResult("walk")],
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
    var spriteSheet = new createjs.SpriteSheet(data);
    drillerSpriteSheet = new createjs.Sprite(spriteSheet, "stand");
    drillerSpriteSheet.gotoAndPlay("stand");
    drillerSpriteSheet.scaleX = 50 / 300;
    drillerSpriteSheet.scaleY = 50 / 300;
}

function drawDriller() {
    //Mr.Driller's animation
    drillerSpriteSheet.x = driller.column * 60 + 30;
    drillerSpriteSheet.y = canvas.height - driller.row * 60;

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

    stage.addChild(drillerSpriteSheet);
}

function drawScoreboard(width, height) {
    //drawRectangle("black", 0, 0, worldWidth, canvas.height);
    //drawRectangle("black", canvas.width - width, 0, width, height);

    //Lives
    drawRoundedRectangle("Khaki", canvas.width - width + 5,
        height / 9 - 30,
        width - 5, 35, 5);
    drawText("LIVES", "35px Arial", "white", canvas.width - width + 10, height / 9 - 30, "start");
    drawText("" + driller.lives, "35px Arial", "white", canvas.width, height / 9 - 30, "end");

    //Depth
    drawRoundedRectangle("LightCoral", canvas.width - width + 5,
        3 * height / 9 - 30,
        width - 5, 35, 5);
    drawText("DEPTH: ", "35px Arial", "white", canvas.width - width + 10, 3 * height / 9 - 30, "start");
    drawText("" + driller.depth + "ft", "35px Arial", "white",
        canvas.width - 10, 4 * height / 9 - 30, "end");

    //ENERGY
    drawRoundedRectangle("LightBlue", canvas.width - width + 5,
        5 * height / 9 - 30,
        width - 5, 35, 5);
    drawText("ENERGY: ", "35px Arial", "white",
        canvas.width - width + 10, 5 * height / 9 - 30, "start");

    //ENERGY BAR
    drawRoundedRectangle("white", canvas.width - width + 10,
        5.7 * height / 9,
        width - 20, 20, 5);

    drawRoundedRectangle("LightBlue",
        (canvas.width - width + 15) + (1 - driller.air / 100) * (width - 30),
        5.7 * height / 9 + 5,
        (width - 30) * (driller.air / 100), 10, 1);

    //SCORE
    drawRoundedRectangle("plum", canvas.width - width + 5,
        7 * height / 9 - 30,
        width - 5, 35, 5);
    drawText("SCORE: ", "35px Arial", "white",
        canvas.width - width + 10, 7 * height / 9 - 30, "start");
    drawText("" + window.score, "35px Arial", "white",
        canvas.width - 10, 8 * height / 9 - 30, "end");
}

function drawGameOver() {
    drawRectangle("rgba(0,0,0,.5)", 0, 0, canvas.width, canvas.height);

    drawText("GAME OVER", "60px Arial", "white", canvas.width / 2, canvas.height / 2, "center");
    drawText("Press R to play again", "40px Arial", "white", canvas.width / 2, canvas.height / 2 + 70, "center");
    stage.update();
}

function drawIntroScreen() {
    var intro = resources.getResult("intro");
    addBitmap(intro, 0, 0, canvas.width, canvas.height);
    stage.update();
}

function drawBackground() {
    var bgImg = resources.getResult("bg0");
    addBitmap(bgImg, 0, 0, canvas.width, canvas.height);
}

// EaselJS wrapper
// Graphics Wrapper funciton
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