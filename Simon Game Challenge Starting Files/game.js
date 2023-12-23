var gamePattern=[];
var userClickedpattern=[];
var buttonColours=["red", "blue", "green", "yellow" ];

$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedpattern.push(userChosenColour);
    playSound(userChosenColour)
    animatepress(userChosenColour);
    
});

function nextSequence(){
   userClickedpattern=[];
    level++;
    $("level-title").text("Level "+level);
    var randomnumber=Math.random();
    var randomnumber=Math.floor(randomnumber*4);
    var randomChosenColour=buttonColours[randomnumber];
    gamePattern.push(randomChosenColour);
    $( "#"+ randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(soundname){
    var a=new Audio("sounds/"+soundname+".mp3");
    a.play();
}

function animatepress(currentcolour){
    $("#"+currentcolour).addClass("pressed");

    setTimeout(function(){
        $("#" +currentcolour).removeClass("pressed");
    },100);
}
var started=false;
var level=0;
$(document).keypress(function(){
    if(!started){
     nextSequence();
     $("level-title").text("Level "+level);
     started=true;
   }
});

function checkanswer(currentlevel){
    if(gamepattern[currentlevel]===userClickedpattern[currentlevel]){
        console.log("success");
        if(gamePattern.length===userClickedpattern.length){
            setTimeout(function(){
                nextSequence();

            },1000);
        }
    }else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
        $("body").removeClass("game-over");
        },200)

        $("level-title").text("game over press any key to restart");
        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}







