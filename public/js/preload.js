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

        //Menu
        //{src: "image/menu.jpg", id: "menu"},

        //Character
        {src: "image/drill.png", id: "drill"},
        {src: "image/walk.png", id: "walk"},

        /*{src: "image/character.png", id: "character"},
        {src: "image/character_attack.png", id: "character_attack"},
        {src: "image/character1.png", id: "character1"},
        {src: "image/character1_attack.png", id: "character1_attack"},
        {src: "image/character2.png", id: "character2"},
        {src: "image/character2_attack.png", id: "character2_attack"},
        {src: "image/character3.png", id: "character3"},
        {src: "image/character3_attack.png", id: "character3_attack"},*/

        //Props
        {src: "image/chickenleg.png", id: "chickenleg"}

    ]);
}