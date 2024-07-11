function change_color() {
    console.log("klickat på change color");
    elements = document.getElementsByClassName("bulb");

    for (var i=0; i< elements.length; i++) {
        elements[i].style.backgroundColor="blue";
    }
}


var clicked = false;

function listen_to_channel() {
    
    elements = document.getElementById("listen");

    if(clicked == false){
    elements.style.backgroundColor="00FF00";
    console.log("försöker toggla")
    clicked = true;
    }
    else {
        elements.style.backgroundColor="#e7e7e7";
        clicked = false;
    }
     
}


