(function(){
    let toggles = document.querySelectorAll('input[name="checkbox"]');
    let flags = document.getElementsByClassName("flag");
    const toggleChangeEvent = function(toggle1, toggle2, toggle3, flag1, flag2, flag3){
        console.log("clicked " + toggle1.value);
        if(toggle1.checked){
            hideFlag(flag2, toggle2);
            hideFlag(flag3, toggle3);
        }
        flag1.hidden = !toggle1.checked;
    };

    const hideFlag = function(flag, toggle){
        flag.hidden = true;
        toggle.checked = false;
    };

    for(let i=0; i<toggles.length;i++){
        toggles[i].addEventListener("change",() => {
            toggleChangeEvent(toggles[i], toggles[(i+1)%3], toggles[(i+2)%3],flags[i], flags[(i+1)%3], flags[(i+2)%3]);
        });
        flags[i].addEventListener("click", function(){hideFlag(flags[i], toggles[i]);});
    }
})();
