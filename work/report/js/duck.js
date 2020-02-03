
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
            console.log("image x right position: " + elementRight);
        }else if(mouseX >= elementRight-63){
            if(!mirrored)
                mirrored = true;
            duck.style.left = duck.offsetLeft - 10 + "px";
            console.log("mouse x position: " + mouseX);
            console.log("image x left position: " + elementLeft);
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
    duck.addEventListener("change", (e) => {
        let left = e.getBoundingClientRect().left;
        let right = e.getBoundingClientRect().right;
        console.log("left: " + left);
        console.log("right: " + right);
        if(left<0)
            duck.style.left = "" + 0;
        if(right>screen.width)
            duck.style.right = "" + 0;
    });
})();