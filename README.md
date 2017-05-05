Before you ask,
[Google it](https://www.google.com)

***

# Update Changes:
### **05-May-2017** By King
1. Adding Multiplayer support
Socket Command:
*emit/on lonely 
   Create a room for dual mode.
   return the room key
*on women(room)
   Receive when the room has two player ready.
    
*on Parallel(both)
   Receive every server tick when the game started.
   
   both:{
   adam: *Your World* 
   eve:  *World of the other player*
   }  
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



