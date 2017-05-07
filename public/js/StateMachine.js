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
                drawIntroScreen();
                loadDrillerSprite();
            }
        },
        {
            "id" : "menu",
            "transitions" : [
                {
                    "event" : "single",
                    "target" : "singlePlayer"
                },
                {
                    "event" : "create",
                    "target" : "createRoom"
                },
                {
                    "event" : "join",
                    "target" : "joinRoom"
                }
            ],
            onEntry : function(event){
                console.log("Game State: menu");
                drawMenu();
            }
        },
        {
            "id" : "singlePlayer",
            "transitions" : [
                {
                    "event" : "gameOver",
                    "target" : "GameOver"
                }
            ],
            onEntry : function(event){
                console.log("Game State: singlePlayer");
                mode = 2;
                resizeCanvas();
                setUpWorld();
            }
        },
        {
            "id" : "createRoom",
            "transitions" : [
                {
                    "event" : "didJoin",
                    "target" : "multiPlayer"
                }
            ],
            onEntry : function(event){
                console.log("Game State: createRoom");
                createRoom();
            }
        },
        {
            "id" : "joinRoom",
            "transitions" : [
                {
                    "event" : "didJoin",
                    "target" : "multiPlayer"
                }
            ],
            onEntry : function(event){
                console.log("Game State: joinRoom");
                joinRoom();
            }
        },
        {
            "id" : "multiPlayer",
            "transitions" : [
                {
                    "event" : "gameOver",
                    "target" : "GameOver"
                }
            ],
            onEntry : function(event){
                console.log("Game State: multiPlayer");
                mode = 2;
                resizeCanvas();
                driller = new Driller(3, 5);
            }
        },
        {
            "id" : "GameOver",
            "transitions" : [
                {
                    "event" : "mousedown",
                    "target" : "GameOver",
                }
            ],
            onEntry : function(event){
                console.log("Game State: GameOver");
                gameOver();
            }
        }
    ]
};