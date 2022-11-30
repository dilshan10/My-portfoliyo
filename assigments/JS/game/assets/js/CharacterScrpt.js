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
/////////////////////////////////////////////////////////////////////////////////
var runImgNum = 0;
let runningInterval=0;

// function for character run
function runningCharacter() {
    runImgNum++;

    if (runImgNum==10){
        runImgNum=1;
    }

    $('#character').attr('src', "../assets/cracter moments/png/Run__00" + runImgNum + ".png");
}

// start Run Animation
function startRunning(){
    clearInterval(idleInterval);
    runningInterval = setInterval(runningCharacter,100);
}
/////////////////////////////////////////////////////////////////////////////////////
var jumpImgNum=0;
let jumpingInterval=0;
var marginTop=100;

// function for character jump
function jumpCharacter(){
    jumpImgNum++;

    if (jumpImgNum <= 5){
        marginTop=marginTop-30;
        $('#character').css('marginTop',marginTop+"px");
    }

    if (jumpImgNum>=6){
        marginTop=marginTop+30;
        $('#character').css('marginTop',marginTop+"px");
    }

    if (jumpImgNum==10){
        jumpImgNum=0;
        clearInterval(jumpingInterval);
        jumpingInterval=0;
        runImgNum=0;
        startRunning();
    }
    $('#character').attr('src',"../assets/cracter moments/png/Jump__00"+jumpImgNum+".png");
}

// start jump Animation
function startJumping(){
    // stop breathing
    clearInterval(idleInterval);
    runImgNum=0;
    clearInterval(runningInterval);
    jumpingInterval = setInterval(jumpCharacter,100);
}
/////////////////////////////////////////////////////////////////////////////////////
// keyPress functions
$(document).on("keypress", function (e) {
    if (e.which==13){
        if (runningInterval==0){
            startRunning();
        }

        if (moveForwardInterval==0){
            moveForwardInterval = setInterval(moveForward,100);
        }
        if (barrierInterval==0){
            barrierInterval=setInterval(moveBarriers,100);
        }
    }

    if (e.which==32){
        if (jumpingInterval==0){
            startJumping();
        }

        if (moveForwardInterval==0){
            moveForwardInterval = setInterval(moveForward,100);
        }

        if (barrierInterval==0){
            barrierInterval=setInterval(moveBarriers,100);
        }
    }
});
////////////////////////////////////////////////////////////////////////
var backgroundPosX=0;
var moveForwardInterval=0;
function moveForward(){
    backgroundPosX=backgroundPosX-20;

    $('#background').css('backgroundPositionX',backgroundPosX+"px");
}
////////////////////////////////////////////////////////////////////////
var barrierInterval=0;
function moveBarriers(){
    for (let i = 0; i < 10; i++) {
        var barrier = document.getElementById("barrier"+i);
        var currentMargin = getComputedStyle(barrier).marginLeft;//get the margin of barrier
        var newMargin = parseInt(currentMargin)-25;// 25 karanna
        barrier.style.marginLeft=newMargin+"px";

        if (newMargin >= -80 && newMargin <=80){
            if (marginTop>350) {
                clearInterval(barrierInterval);

                clearInterval(runningInterval);
                runningInterval=-1;

                clearInterval(jumpingInterval);
                jumpingInterval=-1;

                clearInterval(moveForwardInterval);
                moveForwardInterval=-1;

                deadInterval = setInterval(deadCharacter,100);
            }
        }
    }
}