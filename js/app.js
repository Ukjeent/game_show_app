
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


// Array with phrases
let phrases = [
    'Stand up and catch that ball',
    'Somebody help me',
    'No problem',
    'Look at that pumpkin',
    'Come on down',
    'What a big eater he is',
    'Shape up or ship out',
    'What a big dog'
];



// Used to remove overlay when the player click the start, continue or restart button. 
document.addEventListener('click', (e) => {
    const buttonClick = e.target;
    if (buttonClick.className === 'btn__reset' && buttonClick.textContent === 'Start Game') {
        overlay.style.display = 'none'; // Removes the overlay
        getNewArrayAndAppendToSite(); // Gets a new array
    } else if (buttonClick.className === 'btn__reset' && buttonClick.textContent === 'Continue Game') {
        overlay.style.display = 'none'; // Removes the overlay
        letterFound = ''; // Resets the string "letterFound"
        continuePlaying(); // Removes the completed phrase from the array and gets a new array so the player can continue playing. 
    } else if (buttonClick.className === 'btn__reset' && buttonClick.textContent === 'Restart Game') {
        overlay.style.display = 'none'; // Removes the overlay
        letterFound = ''; // Resets the string "letterFound"
        restartGame(); // Restarts the game. 
    }
});


// Get a random phrase from an array, then turns that phrase in to an array of character. 
function getRandomPhraseAsArray(arr){
    const randomNumber = Math.floor(Math.random() * arr.length); // Gets a random number. 
    arrayNumber = randomNumber; // Store the number in the varriable "arrayNumber". Used to remove the phrase from the array if the player want to keep playing. 
    let randomPhrase = arr[randomNumber]; // Takes the random number and gets a phrase from the array.
    randomPhrase = randomPhrase.toLowerCase();
    const charactersInPhrase = randomPhrase.split(''); // Splits the phrase into an array of characters. 
    return charactersInPhrase; // Returns the new array. 
}

// Creates li elements, adds the characters from the array to the li and appends the elemements to the site.
function addPhraseToDisplay(arr) {
    for (let i = 0; i < arr.length; i++) {
        let letter = arr[i];
        const letterLi = document.createElement('li'); // Create li elements. 
        letterLi.innerHTML += `${letter}`; // Add the characters to the li.
            if(letterLi.innerHTML !== " "){
                letterLi.className = 'letter'; // If li includes a character - add the class "letter"
            } else {
                letterLi.className = 'space'; // If li includes a space - add the class "space". (This was not mentioned in the instructions)
            }
        ulList.appendChild(letterLi); // appends the li elements to the ul. 
    }
}

// A function that calls the funtions to get a new array, create li elements and append to the DOM. 
function getNewArrayAndAppendToSite() {
    phraseArray = getRandomPhraseAsArray(phrases); // Calls the function to get a random phrase and stores the array with charaters in a variable.
    addPhraseToDisplay(phraseArray); // Calls the funtion that creates li elements and appends to the ul. 
}



// Checks if the input from the player matches one of the letters in the phrase. 
function checkLetter(inputValue) {
    let foundLetters;
    for (let i = 0; i < letters.length; i++) {
     const letter = letters[i];
     if (inputValue === letter.innerHTML){
         letter.className = 'letter show'; // Adds the class "show" to the li if the input matches the letter in the li. 
         foundLetters = inputValue;
     }
    }
    return foundLetters; // Returns the found letter. 
 }


// listens for a button click on the "keyboard" and disables the button. 
document.addEventListener('click', (e) => {
    const click = e.target;
    if (click.tagName === 'BUTTON' && click.parentNode.className === 'keyrow'){
        checkLetter(e.target.innerHTML);
        e.target.className = 'chosen';
        e.target.disabled = true;
            if (checkLetter(e.target.innerHTML)) {
                letterFound += checkLetter(e.target.innerHTML); // Adds the input letter to a variable
            } else {
                missed++; // Adds +1 to the variable missed
                const targetHeart = 5 - missed; 
                hearts[targetHeart].innerHTML = lostHeartString; // Removes the last heart from the site and replaces the heart with a empty heart
            }
}
checkWin(); // A function that checks the result. 
});


// Checks if the number of characters found is the same as the numbers in the array and toggles a "congratulations" overlay
//Checks if number of misses is 5 and displays a "Lost game" overlay
function checkWin() {
    const show = document.getElementsByClassName('show');
    const letter = document.getElementsByClassName('letter');
       if (show.length >= 1 && show.length === letter.length && phrases.length >= 2){
            toggleFinalOverlay('win', 'Congratulations!', 'Continue Game'); // Toggles an overlay when a player got all the characters correct.
        } else if (show.length >= 1 && show.length === letter.length && phrases.length === 1) {
            toggleFinalOverlay('win', 'Congratulations, you completed the game!', 'Restart Game'); // Toggles an overlay when a player gets all phrases correct.
        } else if (missed >= 5) {
            toggleFinalOverlay('lose', "Sorry, wrong guess!", 'Restart Game'); // Toggles an overlay when a player has lost all five hearts. 
        }
}

// a function to toggle the win/loose overlat
function toggleFinalOverlay(overlayClass, titleText, btnText){
    const title = document.querySelector('.title');
    overlay.style.display = ''; // Adds the overlay to the site
    overlay.className = overlayClass; // Changes the class on the overlay
    title.textContent = titleText; // Adds a new text to the title
    resetBtn.textContent = btnText; // Adds a new text to the button
}


 // A function to continue the game and get a new array
 function continuePlaying(){
    missed = 0; // Resets the missed variable
    resetHearts(); // Resets the hearts
    resetButtons(); // Resets the buttons
    clearLetterShowClass(); // Removes the "show" class from the li elements
    removeOldPhraseFromUl(); // Removes the completed phrase from the ul
    removeStringFromPhrases(); // Removes the completed phrase from the array
    getNewArrayAndAppendToSite(); // Gets a new array, create li elements and appends to the ul. 
}

// Removes a string from the array. Used when a player completes a phrase. 
 function removeStringFromPhrases() { 
    removedPhrase = phrases.splice( arrayNumber, 1 ); // Get the random number from the "get phrase funtion" and removes the phrase from the array.
    removedPhrases.push(removedPhrase[0]); // Adds the removed phrase to a new variable. 
 }

// A function to restart the game
function restartGame(){
    missed = 0; // Resets the missed variable
    resetHearts(); // Resets the hearts
    resetButtons(); // Resets the buttons
    clearLetterShowClass(); // Removes the "show" class from the li elements
    removeOldPhraseFromUl(); // Removes the completed phrase from the ul
    addRemovedPhrasesToArray(); // If the player has completed any phrases before loosing all hearts this function adds the phrases back to the array to restart the game woth all phrases. 
    getNewArrayAndAppendToSite(); // Gets a new array, create li elements and appends to the ul. 
}

// Resets the lost hearts
function resetHearts() {
    for (let i = 0; i < hearts.length; i++){
        hearts[i].innerHTML = liveHeartString; // Changes the heart image back to the "full" heart
    }
}

// Resets the "keyboard" buttons
function resetButtons() {
    const buttonRows= qwerty.children;
    for (let i = 0; i < buttonRows.length; i++){
        let buttonRow = buttonRows[i];
        let buttons = buttonRow.children;
            for (let i = 0; i < buttons.length; i++) {
                let button = buttons[i];
                if (button.disabled) {
                    button.disabled = false; // Removes "disabled"
                    button.className = ''; // Removes the class "chosen"
                }
            }
    }
}

// Removes all the li elements from the site. 
function removeOldPhraseFromUl() {
    const li = ulList.children;
        while ( li.length > 0 ) {
            ulList.removeChild(li[0]);
        }
}

// Adds all the completed phrases back to the array of phrases when restarting the game.
function addRemovedPhrasesToArray() {
    if (phrases.length === 1) {
        while ( removedPhrases.length > 0 ) {
            phrases.push(removedPhrases[0]);  // Adds the phrases to the phrases array
            removedPhrases.splice(0, 1); // Removes the phrase from the removedPhrases array
        }
    }
}

// Removes the "show" classname from the li elements. 
function clearLetterShowClass() {
    for (let i = 0; i < letters.length; i++) {
        const letter = letters[i];
        if (letter.className === 'letter show'){
            letter.className = 'letter';
        }
       }
 }















