/**
 * Created by Tiffany Thom Wing Lam on 7/5/2017.
 *
 * Using SCION-CORE from https://github.com/jbeard4/SCION-CORE
 * A state machine for the flow of the entire game
 *
 */

var stateModel = {
    "states" : [
        {
            "id" : "initGame",
            "transitions" : [
                {
                    "event" : "didLoad",
                    "target" : "intro"
                }
            ],
            onEntry : function(event){
                console.log("Game State: initGame");
                init();
            }
        },
        {
            "id" : "intro",
            "transitions" : [
                {
                    "event" : "goMenu",
                    "target" : "menu"
                }
            ],
            onEntry : function(event){
                console.log("Game State: intro");
                //drawCharacterSelect();
                drawIntroScreen();
                loadDrillerSprite();
            }
        },
        {
            "id" : "menu",
            "transitions" : [
                {
                    "event" : "goIns",
                    "target" : "instruction"
                },
                {
                    "event" : "single",
                    "target" : "storyBackground"
                },
                {
                    "event" : "multi",
                    "target" : "characterSelect"
                }
            ],
            onEntry : function(event){
                console.log("Game State: menu");
                drawMenu();
            }
        },
        {
            "id" : "instruction",
            "transitions" : [
                {
                    "event" : "back",
                    "target" : "menu"
                }
            ],
            onEntry : function(event){
                console.log("Game State: instruction");
                drawInstruction();
            }
        },
        {
            "id" : "storyBackground",
            "transitions" : [
                {
                    "event" : "start",
                    "target" : "singlePlayer"
                }
            ],
            onEntry : function(event){
                console.log("Game State: storyBackground");
                drawStoryBackground();
            }
        },
        {
            "id" : "singlePlayer",
            "transitions" : [
                {
                    "event" : "gameOver",
                    "target" : "singleGameOver"
                }
            ],
            onEntry : function(event){
                console.log("Game State: singlePlayer");
                mainCharacter = "norm";
                setUpWorld();
            }
        },
        {
            "id" : "characterSelect",
            "transitions" : [
                {
                    "event" : "selected",
                    "target" : "joinRoom"
                }
            ],
            onEntry : function(event){
                console.log("Game State: characterSelect");
                drawCharacterSelect();
            }
        },
        {
            "id" : "joinRoom",
            "transitions" : [
                {
                    "event" : "didJoin",
                    "target" : "multiPlayer"
                },
                {
                    "event" : "cancel",
                    "target" : "menu"
                }
            ],
            onEntry : function(event){
                console.log("Game State: joinRoom");
                drawWaitingForPlayer();
                joinRoom();
            }
        },
        {
            "id" : "multiPlayer",
            "transitions" : [
                {
                    "event" : "gameOver",
                    "target" : "mutliGameOver"
                },
                {
                    "event" : "gameWin",
                    "target" : "mutliGameWin"
                }
            ],
            onEntry : function(event){
                console.log("Game State: multiPlayer");
                resizeCanvas(2);
                driller = new Driller(3, 5);
            }
        },
        {
            "id" : "singleGameOver",
            "transitions" : [
                {
                    "event" : "homePress",
                    "target" : "menu"
                },
                {
                    "event" : "gameRestart",
                    "target" : "singlePlayer"
                }
            ],
            onEntry : function(event){
                console.log("Game State: singleGameOver");
                gameOver();
                drawEndGameOne();
            }
        },
        {
            "id" : "mutliGameOver",
            "transitions" : [
                {
                    "event" : "homePress",
                    "target" : "menu"
                }
            ],
            onEntry : function(event){
                console.log("Game State: mutliGameOver");
                gameOverMutli();
                drawEndGameLose();
            }
        },
        {
            "id" : "mutliGameWin",
            "transitions" : [
                {
                    "event" : "homePress",
                    "target" : "menu"
                }
            ],
            onEntry : function(event){
                console.log("Game State: mutliGameWin");
                drawEndGameWin();
            }
        }

    ]
};