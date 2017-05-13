/**
 * Created by tiffany Thom wing lam on 28/4/2017.
 * The main purpose of this script is to preload the necessary resources
 * like image, sprite sheet before the game start.
 */

//var resources = {};
var resources;

function preload_Resouces(callback) {

    resources = new createjs.LoadQueue();

    resources.on("complete", function (event) {
        callback();
    });

    resources.loadManifest([
        //Background
        {src: "image/cover.jpg", id: "intro"},
        {src: "image/bg0.jpg", id: "bg0"},
        {src: "image/fail2.jpg", id: "fail2"},
        {src: "image/selectPage.jpg", id: "selectPage"},
        {src: "image/storyBackground.jpg", id: "storyBackground"},
        {src: "image/instruction2.jpg", id: "instruction2"},
        {src: "image/winPlay.jpg", id: "winPlay"},
        {src: "image/losePlay.jpg", id: "losePlay"},

        //buttons
        {src: "image/home.png", id: "home"},
        {src: "image/restart.png", id: "restart"},

        {src: "image/insTxt.png", id: "insTxt"},
        {src: "image/storyTxt.png", id: "storyTxt"},
        {src: "image/battleTxt.png", id: "battleTxt"},

        {src: "image/brownChar.png", id: "brownChar"},
        {src: "image/yellowChar.png", id: "yellowChar"},
        {src: "image/blueChar.png", id: "blueChar"},

        //Menu
        //{src: "image/menu.jpg", id: "menu"},

        //Character
        {src: "image/drill.png", id: "drill"},
        {src: "image/walk.png", id: "walk"},

        {src: "image/character.png", id: "character"},
        {src: "image/character_attack.png", id: "character_attack"},
        {src: "image/character2.png", id: "character2"},
        {src: "image/character2_attack.png", id: "character2_attack"},
        {src: "image/character3.png", id: "character3"},
        {src: "image/character3_attack.png", id: "character3_attack"},

        //Props
        {src: "image/chickenleg.png", id: "chickenleg"}

    ]);
}