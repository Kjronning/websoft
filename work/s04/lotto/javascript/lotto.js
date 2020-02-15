(function(){
    let selectable_container = document.getElementById("container-selectable");
    let result_container = document.getElementById("container-result");

    function createSelectableNode() {
        let node = document.createElement("select");
        node.classList.add("selectable");
        let option;
        for (let i=1;i<=49;i++){
            option = document.createElement('option');
            option.value = i.toString();
            option.text = i.toString();
            node.appendChild(option);
        }
        return node;
    }

    for (let i=0;i<6;i++){
        selectable_container.appendChild(createSelectableNode());
    }



}());