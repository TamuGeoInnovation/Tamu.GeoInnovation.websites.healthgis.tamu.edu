
// Map resizing from: http://yardsales.lizndom.com/DynamicallyResizeGoogleMapsWithMouse.html
//Mouse variables
var mouseX = 0; //The current x-coordinate of the mouse cursor in relation to the entire screen
var mouseY = 0; //The current y-coordinate of the mouse cursor in relation to the entire screen
var mouseDX = 0; //The difference between the current x-coord of the mouse, and the x-coord of the mouse when last checked
var mouseDY = 0; //The difference between the current y-coord of the mouse, and the x-coord of the mouse when last checked
var resizeBoxCurrentlyBeingHeld = false; //Is the left mouse-button currently being held?

//Mouse event functions
document.onmouseup = function(){ resizeBoxCurrentlyBeingHeld = false; } //When the left mouse button is released

 //Runs while mouse moves
function watchMouse( event )
{
    pollMouse( event ); //Update all mouse information
    if (resizeBoxCurrentlyBeingHeld) //if the resize box is being held
    {                                
        changeMapSize( mouseDX, mouseDY ) //dynamically resize the map
    }            
}
        
//Gets relevent information from mouse, saves to global variables
function pollMouse( event ) {
    tempX = event.screenX //save the current x-coord of the mouse in relation to the entire screen
    tempY = event.screenY //save the current y-coord of the mouse in relation to the entire screen
    mouseDX = tempX - mouseX //amount mouse x-coord moved since last poll
    mouseDY = tempY - mouseY //amount mouse y-coord moved since last poll
    mouseX = tempX 
    mouseY = tempY
}


//Keep track of when the resize is being clicked-and-dragged
function resizeBoxMouseDown( event )
{
    resizeBoxCurrentlyBeingHeld = true;
}