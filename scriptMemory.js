window.onload = timer();

var cardsTab = []; // Our array of cards.
var heigth = ["1", "D", "R", "V", "X"]; // The differents height of the cards.
var color = ["C", "P", "S", "T"]; // The differents color of the cards.
var listCardTurned = []; // Our list of turned cards.
var nbCardTurned = 0; // The number of cards returned, initialized to 0.
var nbPairsFound = 0; // Our number of matching cards.
var interval; // Our variable for the timer. 
var listCardsPaired = []; // Our list of paired cards.

// Timer variables.
var ms = 0;
var sec = 0;
var minutes = 0;
var hours = 0;

/**
 * Function that shuffles a given array.
 * @param {*} a : the array to shuffle.
 * @return : the array shuffled.
 */
function shuffle(a) {
	var j, x, i;
	for (i = a.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1));
		x = a[i];
		a[i] = a[j];
		a[j] = x;
	}
	return a;
}

/**
 * Function that creates the array of card, needed to play to the game. 
 */
function createBoard() {
    for (let i = 0; i < 5; i++) {
        for (j = 0; j < 4; j++) {
            var card = heigth[i] + color[j];
            cardsTab.push(card);
        }
    } shuffle(cardsTab);
}


/**
 * Function that is used on an onclick event : turn the card that is on backside to reveal it.
 * @param {*} id : the id of the turned card.
 */
function returnCard(id){
    var card = document.getElementById(id);
    if(!listCardsPaired.includes(id)){
        card.src = "cartespng/"+ cardsTab[id] + ".png";
        listCardTurned.push(id);
        nbCardTurned++;
        if (nbCardTurned == 2) {
            memory();
        }    
    } 
}

/**
 * Function that follows the rules of the memory game.
 */
function memory(){
    if (nbPairsFound == 9) {
        nbCardTurned = 0;
        var firstCard = listCardTurned[(listCardTurned.length - 2)];
        var firstColor = cardsTab[firstCard][1];
        var firstHeight = cardsTab[firstCard][0];
        var secondCard = listCardTurned[(listCardTurned.length - 1)];
        var secondColor = cardsTab[secondCard][1];
        var secondHeight = cardsTab[secondCard][0];
        
        if(firstColor == secondColor || firstHeight == secondHeight){
            alert("Félicitation, vous avez gagné ! \n Votre temps est de 0" + minutes + " : " + sec + ".");
            stopTimer();
        } else {
            alert("Vous avez malheureusement perdu...\n" + "Votre temps est de 0" + minutes + " : " + sec + ".\nAppuiyez sur F5 pour réesayer.");
            stopTimer();
        }
    }

    // Here, we catch the two last turned card (that was turned thanks to the returnCard function), 
    // we compare the color and the height and we manage.
    nbCardTurned = 0;
    var firstCard = listCardTurned[(listCardTurned.length - 2)];
    var firstColor = cardsTab[firstCard][1];
    var firstHeight = cardsTab[firstCard][0];
    var secondCard = listCardTurned[(listCardTurned.length - 1)];
    var secondColor = cardsTab[secondCard][1];
    var secondHeight = cardsTab[secondCard][0];

    if(!listCardsPaired.includes(firstCard) && !listCardsPaired.includes(secondCard) || firstCard != secondCard){
        if (firstCard == secondCard || firstColor != secondColor && firstHeight != secondHeight) {
            
            setTimeout(function() {
                listCardTurned.pop();
                listCardTurned.pop();

                if(!listCardsPaired.includes(firstCard) || !listCardsPaired.includes(secondCard)){
                    document.getElementById(firstCard).src = "cartespng/backside.png";
                }

                if(!listCardsPaired.includes(secondCard) || !listCardsPaired.includes(firstCard)) {
                    document.getElementById(secondCard).src = "cartespng/backside.png";
                }
            }, 500);
        } else {
            nbPairsFound++;
            listCardsPaired.push(firstCard);
            listCardsPaired.push(secondCard);
        }
    }
    
}

/**
 * Our timer function, that is launch on loading of the page. 
 */
function timer() {
   interval = setInterval(function(){
            ms += 1;
            if(ms >= 10){
                ms = 0; 
                sec++;
            }
            if(sec >= 60){
                sec = 0;
                minutes += 1;
            }
            if(minutes >= 60){
                minutes = 0;
            };
        }, 100);
    }

/**
 * This function stop the timer. 
 */
function stopTimer(){
    clearInterval(interval);
}

createBoard();