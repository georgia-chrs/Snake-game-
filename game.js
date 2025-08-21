var changeRed=1;
var changeWhite=1;

"use strict";

let winSound=new Audio("win.mp3");
let startSound=new Audio("start.mp3");

let RedOrWhite=0;

var positions=[];
var snakePositions   =[13,38,46,73,81,87]
var snakeNewPositions=[2, 17,26,43,51,67]

var ladderPositions   =[3, 9,32,48,56,78]
var ladderNewPositions=[4,28,72,59,86,89]

var snakes_or_ladders_Positions   =[25,65,70]
var snakes_or_ladders_NewPositions=["5 or 45","44 or 74","49 or 90"]
var snakes_or_ladders_NewPositionsUp=[45,74,90]
var snakes_or_ladders_NewPositionsDown=[5,44,49 ]


function setPositions() {


	for (var i = 1; i <=90 ; i++) {
	 positions[i]=new Object();
	 positions[i].from=i;
	 
	  
	 if(snakePositions.indexOf(i)!=-1){
	   positions[i].to=snakeNewPositions[snakePositions.indexOf(i)];
	   positions[i].type="Snake";
	 }
	 else if(ladderPositions.indexOf(i)!=-1){
	   positions[i].to=ladderNewPositions[ladderPositions.indexOf(i)];
	   positions[i].type="Ladders";
	 }
	 else if(snakes_or_ladders_Positions.indexOf(i)!=-1){
	   positions[i].to=snakes_or_ladders_NewPositions[snakes_or_ladders_Positions.indexOf(i)];
	   positions[i].type="Snake or Ladders";
	 }
	 else if(i===16 || i===47 || i===68 || i===84){
		positions[i].to="Other Player position";
		positions[i].type="Sheep";   
	 }
	 else if(i===21 || i===40 || i===57 || i===75){
		positions[i].to="1 with "+(100-i)+"% possibility or 90 with "+i+" % possibility";
		positions[i].type="ALL IN";
	 }
	 else{
	   positions[i].to=i;
		positions[i].type="Normal";   
	   
	 }
	}
	return positions; 
}

var cells=setPositions();
for (var i = 1; i <=90 ; i++) {
    console.log("Cell: "+i+" type: "+cells[i].type+" From: "+cells[i].from+" To: "+cells[i].to)
}

function newGame() {
    // Reset player positions
    changeRed = 0;
    changeWhite = 0;
    startSound.play();
    
    // Clear the existing board
    var table = document.getElementById('mainTable');
    table.innerHTML = ""; // Clear the table contents

    // Initialize the board again
    initBoard(); // This will create a new board layout

    // Reset the player turn display
    let playerMessage = document.getElementById("Playes");
    playerMessage.textContent = "Let's start with RED";

    // Optionally reset the dice image to the first face
    changeDiceImage(1);
}

function WhoIsPlaying(RedOrWhite, newPosition){
	let player = document.getElementById("Playes");
    RedOrWhite = RedOrWhite + 1;
    if (newPosition === 6){
        RedOrWhite = RedOrWhite - 1;
    };

	if(RedOrWhite%2 == 1){
		player.textContent= "Played by RED";
	}else{
		player.textContent= "Played by WHITE";
	}
    console.log("Red or white value:", RedOrWhite);
    return RedOrWhite;
}

function hasPlayerWon(change, newPosition){
    let ch=change;
    if(change == 90){
        winSound.play();
        playerMessage.textContent = "RED WINS";
        document.getElementById(`position${lastPosRed}`).innerHTML = `<img src='images/${lastPosRed}.png' height=70 width=80>`;
        document.getElementById(`position${changeRed}`).innerHTML = `<img src='imagesRed/${changeRed}.png' height=70 width=80>`;
        return;        
    }else{
        ch=change-newPosition;
        
    }
    return ch;

    
}

function play(newPosition) {
    // Διατήρηση τελευταίων θέσεων
    var lastPosRed = changeRed || 1;
    var lastPosWhite = changeWhite || 1;
    
    RedOrWhite = WhoIsPlaying(RedOrWhite, newPosition);  // Καθορίζει ποιος παίζει
    // Ελέγχει αν παίζει ο κόκκινος
    if (RedOrWhite % 2 == 1) {
        //console.log("Red Plays");
        changeRed = lastPosRed + newPosition;

        for (let i = 0; i < snakePositions.length; i++) {
            console.log(snakePositions[i]);

            if (changeRed === snakePositions[i]){
                changeRed = snakeNewPositions[i];
                break;
            } else if (changeRed === ladderPositions[i]) {
                changeRed = ladderNewPositions[i];
                break;
            }/*else if( i < 3 && changeRed === snakes_or_ladders_Positions[i]){
                let rand=Math.floor(Math.random() * 3) + 1;
                console.log("OOOOOORRRRRR");
                if (rand >4){
                    changeRed = snakes_or_ladders_PositionsUp[i];
                }else{
                    changeRed = snakes_or_ladders_PositionsDown[i];
                }

            };*/
        };

        if (changeRed >= 90) {
            hasPlayerWon(changeRed);
            changeRed = 90;
            playerMessage.textContent = "RED WINS";
            document.getElementById(`position${lastPosRed}`).innerHTML = `<img src='images/${lastPosRed}.png' height=70 width=80>`;
            document.getElementById(`position${changeRed}`).innerHTML = `<img src='imagesRed/${changeRed}.png' height=70 width=80>`;
            return;
        };
        
        if (changeRed === changeWhite){
            document.getElementById(`position${lastPosRed}`).innerHTML = `<img src='images/${lastPosRed}.png' height=70 width=80>`;
            document.getElementById(`position${lastPosWhite}`).innerHTML = `<img src='images/${lastPosWhite}.png' height=70 width=80>`;
            document.getElementById(`position${changeWhite}`).innerHTML = `<img src='imagesBoth/${changeWhite}.png' height=70 width=80>`;
        }else{
            document.getElementById(`position${lastPosRed}`).innerHTML = `<img src='images/${lastPosRed}.png' height=70 width=80>`;
            document.getElementById(`position${changeRed}`).innerHTML = `<img src='imagesRed/${changeRed}.png' height=70 width=80>`;
            document.getElementById(`position${lastPosWhite}`).innerHTML = `<img src='imagesWhite/${lastPosWhite}.png' height=70 width=80>`;
        };

    } else {
        //console.log("White Plays");
        changeWhite = lastPosWhite + newPosition;

        for (let i = 0; i < snakePositions.length; i++) {

            if (changeWhite === snakePositions[i]){
                changeWhite = snakeNewPositions[i];
                break;
            } else if (changeWhite === ladderPositions[i]) {
                changeWhite = ladderNewPositions[i];
                break;
            };
        };

        if (changeWhite >= 90) {
            hasPlayerWon(changeWhite);
            changeWhite = 90;
            playerMessage.textContent = "WHITE WINS";
            document.getElementById(`position${lastPosWhite}`).innerHTML = `<img src='images/${lastPosWhite}.png' height=70 width=80>`;    
            document.getElementById(`position${changeWhite}`).innerHTML = `<img src='imagesWhite/${changeWhite}.png' height=70 width=80>`;
            return;
        };

        if (changeRed === changeWhite){
            document.getElementById(`position${lastPosRed}`).innerHTML = `<img src='images/${lastPosRed}.png' height=70 width=80>`;
            document.getElementById(`position${lastPosWhite}`).innerHTML = `<img src='images/${lastPosWhite}.png' height=70 width=80>`;
            document.getElementById(`position${changeWhite}`).innerHTML = `<img src='imagesBoth/${changeWhite}.png' height=70 width=80>`;
        }else{
            document.getElementById(`position${lastPosWhite}`).innerHTML = `<img src='images/${lastPosWhite}.png' height=70 width=80>`;
            document.getElementById(`position${changeWhite}`).innerHTML = `<img src='imagesWhite/${changeWhite}.png' height=70 width=80>`;
            document.getElementById(`position${lastPosRed}`).innerHTML = `<img src='imagesRed/${lastPosRed}.png' height=70 width=80>`;
        };
     }
     
    let playerMessage = document.getElementById("Playes");
    
}



const jsonData = '{"snakePositions": [13, 38, 46, 73, 81, 87], "snakeNewPositions": [2, 17, 26, 43, 51, 67]}';

try {
    const parsedData = JSON.parse(jsonData);
    console.log(parsedData.snakePositions); // Θα εμφανίσει [13, 38, 46, 73, 81, 87]
    console.log(parsedData.snakeNewPositions); // Θα εμφανίσει [2, 17, 26, 43, 51, 67]
} catch (error) {
    console.error("Σφάλμα κατά την ανάλυση του JSON:", error);
}
