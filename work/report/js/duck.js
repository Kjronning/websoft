
"use strict";

(function(){
    const duck = document.getElementById("duck");

    let mirrored = false;
    let intervalId;
    duck.onclick = function(){
      console.log("duck clicked now");
    };

    const duckMovement = function(mouseX, mouseY){
        console.log("duck moused over");
        var elementLeft = duck.getBoundingClientRect().left;
        var elementRight = duck.getBoundingClientRect().right;
        if(mouseX <= elementLeft+63){
            if(mirrored)
                mirrored = false;
            duck.style.left = duck.offsetLeft + 10 + "px";
            console.log("mouse x position: " + mouseX);
            console.log("image x position: " + elementLeft);
        }else if(mouseX >= elementRight-63){
            if(!mirrored)
                mirrored = true;
            duck.style.left = duck.offsetLeft - 10 + "px";
            console.log("mouse x position: " + mouseX);
            console.log("image x position: " + elementRight);
        }

        if (mirrored){
            duck.style.transform = "scaleX(-1)"
        }else{
            duck.style.transform = "scaleX(1)"
        }
    };

    duck.onmouseenter = function(event){
        console.log("mouse entered");
       intervalId = setInterval(function(){duckMovement(event.clientX, event.clientY)}, 25);
    };
    duck.onmouseleave = function(){
        console.log("mouse leaved");
        clearInterval(intervalId);
    };
})();