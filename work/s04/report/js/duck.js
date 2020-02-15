
"use strict";

(function(){
    let duck = document.createElement('div');
    duck.classList.add('duck');
    document.body.appendChild(duck);
    const showDuck = function(){
      duck.hidden = false;
    };
    const moveDuck = function(){
        console.log("duck clicked");
        let x = Math.random()*0.8*screen.width;
        let y = Math.random()*0.8*screen.height;
        duck.style.left = x+"px";
        duck.style.top = y+"px";
        duck.hidden = true;
        setTimeout(showDuck, Math.random()*6000);
    };
    duck.onclick = function(){
        moveDuck();
    };
    moveDuck();
})();