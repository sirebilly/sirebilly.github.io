var diePrev = 0;
var win = 0;
var bid = -1;
var lose = false;

function resetScore() {
    high = [{"nick": "-", "score": "0"},
        {"nick": "-", "score": "0"},
        {"nick": "-", "score": "0"},
        {"nick": "-", "score": "0"},
        {"nick": "-", "score": "0"}];
    var items = JSON.stringify(high);
    localStorage.setItem("high", items);
    // $("#highScore").text(items);
    displayScores();
}

function displayScores() {
    $("#highfive").html("<h2>"+high[0].nick+": "+high[0].score+"</h2>"+
            "<h2>"+high[1].nick+": "+high[1].score+"</h2>"+
            "<h2>"+high[2].nick+": "+high[2].score+"</h2>"+
            "<h2>"+high[3].nick+": "+high[3].score+"</h2>"+
            "<h2>"+high[4].nick+": "+high[4].score+"</h2>");
}

function resetWin() {
    win = ["0"];
    localStorage.setItem("win", win);
    $("#win").text(win);
    displayWin();
}
function displayBestWin() {
    var bestWin = localStorage.getItem("bestWin");
    $("#bestWin").html("<h2>"+bestWin+"</h2>");
}
function displayWin() {
    $("#totWin").html("<h2>"+win+"</h2>");
}

function playerClickedHigher(){
    bid = 1;
    rollDice();
}
function playerClickedLower(){
    bid = 2;
    rollDice();
}


function rollDice() {
    const dice = [...document.querySelectorAll(".die-list")];
    var pummel = 0;
    var score = parseInt(pummel)
    dice.forEach(die => {
        toggleClasses(die);
        die.dataset.roll = getRandomNumber(1, 6);
        score = score + parseInt(die.dataset.roll);
    });
    if(bid == 1){
        if(score >= diePrev){
            win++;
        }else{ 
            lose = true;
            var bestWin = localStorage.getItem("bestWin");
            console.log(bestWin);
            if(win > bestWin){
                localStorage.setItem("bestWin", win);
            }
            var highs = JSON.parse(localStorage.getItem("high"));
            var nick = $("#nick").val();
            if(nick==""){
                nick="Player";
            }
            high.push({"nick": nick, "score": win});
            high.sort(function(o1,o2){return o2.score-o1.score});
            console.log(highs);
            high.pop();
            var items = JSON.stringify(high);
            localStorage.setItem("high", items);
            localStorage.setItem("win", win);
            displayBestWin();
        }
    }else if(bid == 2){
        if(score <= diePrev){
            win++
        }else{
            lose = true; 
            var bestWin = localStorage.getItem("bestWin");
            console.log(bestWin);
            if(win > bestWin){
                localStorage.setItem("bestWin", win);
            }
            var highs = JSON.parse(localStorage.getItem("high"));
            var nick = $("#nick").val();
            if(nick==""){
                nick="Player";
            }
            high.push({"nick": nick, "score": win});
            high.sort(function(o1,o2){return o2.score-o1.score});
            console.log(highs);
            high.pop();
            var items = JSON.stringify(high);
            localStorage.setItem("high", items);
            localStorage.setItem("win", win);
            displayBestWin();
        }
    }

    if(lose){
        win = 0;
        lose = false;
    }
    // setHighScore(score);
    diePrev = score;
    // var nick = $("#nick").val();
    // if(nick == ""){ nick = "Player"; }
    // high.push({"nick":nick, "score":score});
    // high.sort(function(o1,o2){return o2.score-o1.score}); 
    // high.pop(); 
    // var items = JSON.stringify(high);
    // localStorage.setItem("high", items);
    localStorage.setItem("win", win);

    //$("#highScore").text(items);
   
    displayScores();
    displayWin();
}

function setHighScore(score){
    var nick = $("#nick").val();
    if(nick == ""){ nick = "Player"; }
    high.push({"nick":nick, "score":score});
    high.sort(function(o1,o2){return o2.score-o1.score}); 
    high.pop(); 
    var items = JSON.stringify(high);
    localStorage.setItem("high", items);
    localStorage.setItem("win", win);
}

function toggleClasses(die) {
    die.classList.toggle("odd-roll");
    die.classList.toggle("even-roll");
}

function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.getElementById("roll-button").addEventListener("click", rollDice);
document.getElementById("resetHigh").addEventListener("click", resetScore);
document.getElementById("higher").addEventListener("click", playerClickedHigher);
document.getElementById("lower").addEventListener("click", playerClickedLower);


var high = [];
$(document).ready(function () {
    if (localStorage.getItem("high")) {
        high = JSON.parse(localStorage.getItem("high"));
        displayScores();
    } else {
        resetScore();
    }
});

var win = [];
$(document).ready(function () {
    if (localStorage.getItem("win")) {
        win = JSON.parse(localStorage.getItem("win"));
        displayWin();
    } else {
        resetWin();
    }

    if (!localStorage.getItem("bestWin")) {
        bestWin = 0;
        localStorage.setItem("bestWin", bestWin);
    } else {
        bestWin = JSON.parse(localStorage.getItem("bestWin"));
        localStorage.setItem("bestWin", bestWin);
    }
    displayBestWin();
});