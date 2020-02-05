
"use strict";

(function(){
    const duck = document.getElementById("duck");
    const showDuck = function(){
      duck.hidden = false;
    };
    duck.onclick = function(){
        console.log("duck clicked");
        let x = Math.random()*0.8*screen.width;
        let y = Math.random()*0.8*screen.height;
        duck.style.left = x+"px";
        duck.style.top = y+"px";
        duck.hidden = true;
        setTimeout(showDuck, Math.random()*6000);
    };
})();