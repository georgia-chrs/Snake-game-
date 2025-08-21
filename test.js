var changeRed=0;
var changeWhite=0;



var positions=[];
var snakePositions   =[13,38,46,73,81,87]
var snakeNewPositions=[2,17,26,43,51,67]

var ladderPositions   =[3,9,32,48,56,78]
var ladderNewPositions=[4,28,72,59,86,89]

var snakes_or_ladders_Positions   =[25,65,70]
var snakes_or_ladders_NewPositions=["5 or 45","44 or 74","49 or 90"]





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





function play(newPosition) {
    // Διατήρηση τελευταίων θέσεων
    var lastPosRed = changeRed || 0;
    var lastPosWhite = changeWhite || 0;
    var Both=0;
    
    
    
    WhoIsPlaing();  // Καθορίζει ποιος παίζει
    // Ελέγχει αν παίζει ο κόκκινος
    if (RedOrWhite % 2 == 1) {
        lastPosRed=(changeRed || 0);
        changeRed = (changeRed || 0) + newPosition;
    } else {
        lastPosWhite = (changeWhite || 0);
        changeWhite = (changeWhite || 0) + newPosition;
    }

    // Έλεγχος για νίκη
    let playerMessage = document.getElementById("Playes");
    if (changeRed >= 90) {
        changeRed = 90;
        playerMessage.textContent = "RED WINS";
        document.getElementById(`position${lastPosRed}`).innerHTML = `<img src='images/${lastPosRed}.png' height=70 width=80>`;
        document.getElementById(`position${changeRed}`).innerHTML = `<img src='imagesRed/${changeRed}.png' height=70 width=80>`;
        return;
    }
    if (changeWhite >= 90) {
        changeWhite = 90;
        playerMessage.textContent = "WHITE WINS";
        document.getElementById(`position${lastPosWhite}`).innerHTML = `<img src='images/${lastPosWhite}.png' height=70 width=80>`;    
        document.getElementById(`position${changeWhite}`).innerHTML = `<img src='imagesWhite/${changeWhite}.png' height=70 width=80>`;
        return;
    }

    // Αν κόκκινος και λευκός στην ίδια θέση
    if (changeRed === changeWhite) {
        Both=1;
        if(lastPosRed!=0 &&lastPosWhite!=0){
            document.getElementById(`position${lastPosRed}`).innerHTML = `<img src='images/${lastPosRed}.png' height=70 width=80>`;
            document.getElementById(`position${lastPosWhite}`).innerHTML = `<img src='images/${lastPosWhite}.png' height=70 width=80>`;
            document.getElementById(`position${changeRed}`).innerHTML = `<img src='imagesBoth/${changeRed}.png' height=70 width=80>`;
        }else if(lastPosRed !=0){
            document.getElementById(`position${lastPosRed}`).innerHTML = `<img src='images/${lastPosRed}.png' height=70 width=80>`;
            document.getElementById(`position${changeRed}`).innerHTML = `<img src='imagesBoth/${changeRed}.png' height=70 width=80>`;
        }else if(lastPosWhite !=0){
            document.getElementById(`position${lastPosWhite}`).innerHTML = `<img src='images/${lastPosWhite}.png' height=70 width=80>`;
            document.getElementById(`position${changeRed}`).innerHTML = `<img src='imagesBoth/${changeRed}.png' height=70 width=80>`;
        }else{
            document.getElementById(`position${changeRed}`).innerHTML = `<img src='imagesBoth/${changeRed}.png' height=70 width=80>`;
        }
   /////////////////////////////////
        document.getElementById(`position${changeRed}`).innerHTML = `<img src='imagesRed/${changeRed}.png' height=70 width=80>`;
    } else {
        // Αν παίζει ο κόκκινος
        if (RedOrWhite % 2 == 1) {
            if (lastPosRed !== 0) {
                if(Both===1){
                    document.getElementById(`position${lastPosRed}`).innerHTML = `<img src='imagesWhite/${lastPosRed}.png' height=70 width=80>`;
                    
                    console.log("1111111111111111");
                    console.log(Both);
                }else{
                    document.getElementById(`position${lastPosRed}`).innerHTML = `<img src='images/${lastPosRed}.png' height=70 width=80>`;
                    console.log("222222222222");
                    console.log(Both);
                }

                /////////////////////
                document.getElementById(`position${changeRed}`).innerHTML = `<img src='imagesRed/${changeRed}.png' height=70 width=80>`;

/////////////////////////



                for(var i=0; i<5;i++){
                    if (changeRed===snakePositions[i] ){
                        
                        changeRed=snakeNewPositions[i];
                        lastPosRed=changeRed;
                        
                        document.getElementById(`position${changeRed}`).innerHTML = `<img src='imagesRed/${changeRed}.png' height=70 width=80>`;
                        //break;
                    }else {
                        document.getElementById(`position${changeRed}`).innerHTML = `<img src='imagesRed/${changeRed}.png' height=70 width=80>`;
                    }
                } 





//////////////////////////////////
/**
				for(var i=0; i<5;i++){
					if (changeRed===snakePositions[i] ){
						changeRed=snakeNewPositions[i];
						
						document.getElementById(`position${changeRed}`).innerHTML = `<img src='imagesRed/${changeRed}.png' height=70 width=80>`;
						//break;
					}
				} */
				/**
				if (changeRed=== snakePositions.find(FindInSnake)){
					// Ελέγχει αν βρέθηκε το changeRed στον πίνακα πριν προσπαθήσει να ενημερώσει το στοιχείο
					
					 = snakePositions.indexOf(changeRed);					
					if (CurSnakePosition !== -1) {
						
					} else {
						console.log("Η τιμή του changeRed δεν βρέθηκε στον πίνακα snakePositions.");
					}

				}else{
					 
				    console.log("3333333333333");
				
					}

 */
///////////////////////////////////////



            }           
			//document.getElementById(`position${changeRed}`).innerHTML = `<img src='imagesRed/${changeRed}.png' height=70 width=80>`;

			console.log(Both);
           
        } else {
            // Αν παίζει ο λευκός
            if (lastPosWhite !== 0) {
                if (Both===1){
                    document.getElementById(`position${lastPosWhite}`).innerHTML = `<img src='imagesRed/${lastPosWhite}.png' height=70 width=80>`;
                    
                }else{
                    document.getElementById(`position${lastPosWhite}`).innerHTML = `<img src='images/${lastPosWhite}.png' height=70 width=80>`;

                }
            }
            document.getElementById(`position${changeWhite}`).innerHTML = `<img src='imagesWhite/${changeWhite}.png' height=70 width=80>`;
        }

        Both=0;
    }
	
	function FindInSnake(changeRed){
		for(var i=0;i<5 ; i++){
			if (changeRed == snakePositions[i]){
				return true;
			}

		}
		return false;
	}
}



