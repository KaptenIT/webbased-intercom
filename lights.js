function change_color() {
    console.log("klickat på change color");
    elements = document.getElementsByClassName("bulb");

    for (var i=0; i< elements.length; i++) {
        elements[i].style.backgroundColor="blue";
    }
}