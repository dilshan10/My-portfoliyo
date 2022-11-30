var idleImgNum = 0;
let idleInterval = 0;

// function for character idle
function idleCharacter() {
    idleImgNum++;

    if (idleImgNum == 10) {
        idleImgNum = 1;
    }

    $('#character').attr('src', "../assets/cracter moments/png/Idle__00" + idleImgNum + ".png");
}

// start Idle Animation
function startIdleAnimation() {
    idleInterval = setInterval(idleCharacter, 250);
}
////////////////////////////////////////////////////////////////////
var MarginLeft=1540;
function setBarriers(){

    for (let i = 0; i <= 10; i++) {
        var barrier=document.createElement("div");
        barrier.className="barrier";
        document.getElementById("background").appendChild(barrier);
        barrier.style.marginLeft = MarginLeft+"px";

        barrier.id="barrier"+i;

        MarginLeft=MarginLeft+1000;

        if (i<5){
            MarginLeft=MarginLeft+2000;
        }

        if (i>=5){
            MarginLeft=MarginLeft+1000;
        }
    }
}