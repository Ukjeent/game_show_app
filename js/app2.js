// store the number from the phrase picker and remove that phrase from the array
// When all arrays are removed disable something like. You completed the game.

// if they didnt find the array, dont remove

const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const ulList = document.querySelector('#phrase ul');
let phraseArray;
const startOverlay = document.getElementById('overlay');
const resetBtn = document.querySelector('.btn__reset');
const hearts = document.getElementsByClassName('tries');
const letters = document.getElementsByClassName('letter');
const liveHeartString = '<img src="images/liveHeart.png" height="35px" width="30px"></img>';
const lostHeartString = '<img src="images/lostHeart.png" height="35px" width="30px"></img>';
let arrayNumber;
let removedPhrases = [];

let missed = 0;
// Store the letters found in a string.
let letterFound = '';


//
// Array with phrases
//

let phrases = [
    'test phrase',
    'test t',
    'test e',
    'test s'
    //'Stand up and catch that ball',
    //'Somebody help me',
    // 'No problem',
    // 'Look at that pumpkin',
    // 'Come on down',
    // 'What a big eater he is',
    // 'Shape up or ship out',
    // 'What a big dog'
];


//
// get phrase
//

// Removes the start overlay when a player click the start button
document.addEventListener('click', (e) => {
    const buttonClick = e.target;
    if (buttonClick.className === 'btn__reset' && buttonClick.textContent === 'Start Game') {
        overlay.style.display = 'none';
        getNewArrayAndAppendToSite()
    } else if (buttonClick.className === 'btn__reset' && buttonClick.textContent === 'Continue Game') {
        overlay.style.display = 'none';
        letterFound = '';
        continuePlaying()
    } else if (buttonClick.className === 'btn__reset' && buttonClick.textContent === 'Restart Game') {
        overlay.style.display = 'none';
        letterFound = '';
        restartGame()
    }
});


// gets a random phrase from an array and stores the characters in a new array
function getRandomPhraseAsArray(arr){
    const randomNumber = Math.floor(Math.random() * arr.length); // Gets a random number. 
    arrayNumber = randomNumber; // Store the number in the varriable "arrayNumber"
    let randomPhrase = arr[randomNumber]; // Takes the random number and gets a phrase from the array.
    randomPhrase = randomPhrase.toLowerCase();
    const charactersInPhrase = randomPhrase.split(''); // Splits the phrase in to an array of characters. 
    return charactersInPhrase;
}


function addPhraseToDisplay(arr) {
    for (let i = 0; i < arr.length; i++) {
        let letter = arr[i];
        const letterLi = document.createElement('li');
        letterLi.innerHTML = '&nbsp;';
            if (phraseArray[i].trim().length === 1){
                letterLi.className = 'letter'; // Adds the class "letter" to li elements with a letter.
            } else if (phraseArray[i].trim().length === 0)  {
                letterLi.className = 'space'; // Adds the class space to spaces. Not sure why the instructions didn't say anything about this.
            };
        ulList.appendChild(letterLi);
    }
}


function getNewArrayAndAppendToSite() {
    phraseArray = getRandomPhraseAsArray(phrases); // Calls the function to get a random phrase and stores the array with charaters in a variable.
    addPhraseToDisplay(phraseArray); // Calls the funtion that creates li elements and append to the site. 
}


// 
//
//

function checkLetter(inputValue) {
    let foundLetters;
    const liList = ulList.children;
    for (let i = 0; i < phraseArray.length; i++) {
     if (inputValue === phraseArray[i]){
        liList[i].innerHTML = phraseArray[i];
        liList[i].className = 'letter show';
         foundLetters = inputValue;
     }
    }
    return foundLetters;
 }



document.addEventListener('click', (e) => {
    const click = e.target;
    if (click.tagName === 'BUTTON' && click.parentNode.className === 'keyrow'){
        checkLetter(e.target.innerHTML);
        e.target.className = 'chosen';
        e.target.disabled = true;
            if (checkLetter(e.target.innerHTML)) {
                letterFound += checkLetter(e.target.innerHTML)
            } else {
                missed++;
                const targetHeart = 5 - missed;
                hearts[targetHeart].innerHTML = lostHeartString;
            }
}
checkWin()
});

function checkWin() {
    const show = document.getElementsByClassName('show');
    const letter = document.getElementsByClassName('letter');
       if (show.length >= 1 && show.length === letter.length && phrases.length >= 2){
            toggleFinalOverlay('win', 'Congratulations!', 'Continue Game');
        } else if (show.length >= 1 && show.length === letter.length && phrases.length === 1) {
            toggleFinalOverlay('win', 'Congratulations, you completed the game!', 'Restart Game')
        } else if (missed >= 5) {
            toggleFinalOverlay('lose', "Sorry, that's not the correct phrase!", 'Restart Game');
        }
}

function toggleFinalOverlay(overlayClass, titleText, btnText){
    const title = document.querySelector('.title');
    overlay.style.display = '';
    overlay.className = overlayClass;
    title.textContent = titleText;
    resetBtn.textContent = btnText;
}

//
// Restart game
//

 //
 //
 //

 // A function to continue the game and get a new array
 function continuePlaying(){
    missed = 0;
    resetHearts()
    resetButtons()
    clearLetterShowClass()
    removeOldPhraseFromUl()
    removeStringFromPhrases()
    getNewArrayAndAppendToSite()
}

 function removeStringFromPhrases() {
    removedPhrase = phrases.splice( arrayNumber, 1 );
    removedPhrases.push(removedPhrase[0]);
 }

// A function to restart the game
function restartGame(){
    missed = 0;
    resetHearts()
    resetButtons()
    clearLetterShowClass()
    removeOldPhraseFromUl()
    addRemovedPhrasesToArray()
    getNewArrayAndAppendToSite()
}

// Resets the hearts
function resetHearts() {
    for (let i = 0; i < hearts.length; i++){
        hearts[i].innerHTML = liveHeartString;
    }
}

// Resets the keyboard
    // Removes the class "chosen"
    // Removes "disabled"
function resetButtons() {
    const buttonRows= qwerty.children;
    for (let i = 0; i < buttonRows.length; i++){
        let buttonRow = buttonRows[i];
        let buttons = buttonRow.children;
            for (let i = 0; i < buttons.length; i++) {
                let button = buttons[i];
                if (button.disabled) {
                    button.disabled = false;
                    button.className = '';
                }
            }
    }
}

// Removes the li elements from the site when restarting the game or getting another phrase. 
function removeOldPhraseFromUl() {
    const li = ulList.children;
    while ( li.length > 0 ) {
        ulList.removeChild(li[0]);
}
}

// Used for adding the completed phrases back to the array when restarting the game.
function addRemovedPhrasesToArray() {
    if (phrases.length === 1) {
        while ( removedPhrases.length > 0 ) {
            console.log(removedPhrases[0]);
            phrases.push(removedPhrases[0]) 
            removedPhrases.splice(0, 1);
        }
    }
}

// Clears the "show" classname from the li. 
function clearLetterShowClass() {
    for (let i = 0; i < letters.length; i++) {
        const letter = letters[i];
        if (letter.className === 'letter show'){
            letter.className = 'letter';
        }
       }
 }















