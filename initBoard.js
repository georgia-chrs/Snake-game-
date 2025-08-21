

let diceSound=new Audio("dice.mp3");


function initBoard(){
	var table = document.getElementById('mainTable');
	var tr = document.createElement('tr');
	

	for (var i = 9; i >=1; i--) {
	  var tr = document.createElement('tr');
	  for (var j = 9; j >=0; j--) {
	  var td1 = document.createElement('td');
	  var num=i*10-j;
	  td1.innerHTML="<div id='position"+num+"'><img  src='images/"+num+".png'  height=70 width=80></div>";
	  
	  tr.appendChild(td1);
	  
	  }
	  table.appendChild(tr);
	}
	setPositions();
    document.getElementById(`position1`).innerHTML = `<img src='imagesBoth/1.png' height=70 width=80>`;
}



//dice

function rollDice() {
    let diceNumber=document.getElementById("diceNumber");
    let rand=Math.floor(Math.random() * 6) + 1;
    
    diceNumber.textContent = "dice is "+rand;

    return rand;  // Επιλέγει έναν τυχαίο αριθμό από 1 έως 6
}

function changeDiceImage(diceNum) {
     // Παίρνει έναν τυχαίο αριθμό από 1 έως 6
    document.getElementById("diceImg").src = "imagesDice/" + diceNum + ".png"; // Αλλάζει την εικόνα του ζαριού
}



function rollAndChange(){
	var diceNum = rollDice(); // Παίρνει έναν τυχαίο αριθμό από 1 έως 6
    diceSound.play();
    // Αλλαγή εικόνας ζαριού
    changeDiceImage(diceNum);

    // Αλλαγή θέσης στο πλέγμα
    play(diceNum);
}


