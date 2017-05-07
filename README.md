Before you ask,
[Google it](https://www.google.com)

***

# Update Changes:
### **05-May-2017** By King
Adding Multiplayer support
Socket Command:

1. emit/on lonely 
    * emit: Create a room for dual mode.
    * on: return the room key.
   
2. emit/on women
    * emit: join a room with the room key.
    * on: Receive when the room has two player ready.
    
3. on Parallel(both):
    * Receive every server tick when the game started.  
    ```javascript   
   both:{
      adam: **Your World** 
      eve:  **World of the other player**
   }
    ```
 
Example:

* testm.js **Create Room**
* tests.js **Join Room**

### **28-April-2017** By Felix
1. Color Blocks and UI changes (See Remark)
2. Add player
3. change intro sceen
4. ChickenLeg (thigh) added.

***
# Some Remarks 
1. **Color Change**
    * plum  --purple
    * Khaki  -- yellow  (original green)
    * LightCoral -- red
    * LightCyan  -- light blue
  
    They are CSS color you can find the list in w3cSchool.
  
2. **Bitmap**
    * Some static images are added into the scene
[tutorial](http://createjs.com/docs/easeljs/classes/Bitmap.html)
. 

    Some troubleshooting: [stackOverFlow1](http://stackoverflow.com/questions/20850634/easeljs-not-showing-bitmap/20860996#20860996)


3. **Animation** (SpriteSheet)
For the animation of the character, follow the tutorial.
[tutorial](http://createjs.com/docs/easeljs/classes/SpriteSheet.html)
and some basic setup
[tutorial](http://www.createjs.com/tutorials/Animation%20and%20Ticker/)
.

     In the current development, the mechanism of the update is to delete all the object
 inside the canvas(stage) and redraw it ont the canvas.
 This cause the problem of the animation animate incorrectly.

4. **PreloadJs**
[http://www.createjs.com/docs/preloadjs/modules/PreloadJS.html]
    * Some images need to be reloaded.
    * A new javascript file has been created

5. **Update mechanism**
All the graphics are updated after receiving the "tick" (eden). So, disconnection will lead to freezing problem.

    `drawDisplay()` and `gravity()` will called every time. The tick is synced with the server.



