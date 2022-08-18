

const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const startOverlay = document.getElementById('overlay');
const resetBtn = document.querySelector('.btn__reset');
const hearts = document.getElementsByClassName('tries');
const liveHeartString = '<img src="images/liveHeart.png" height="35px" width="30px"></img>';
const lostHeartString = '<img src="images/lostHeart.png" height="35px" width="30px"></img>';

let missed = 0;
// Store the letters found in a string.
let letterFound = '';

// Removes the start overlay when a player click the start button
document.addEventListener('click', (e) => {
    const buttonClick = e.target;
    if (buttonClick.className === 'btn__reset') {
        overlay.style.display = 'none';
    } 
});

// Array with phrases
const phrases = [
    'test phrase'
    // 'Stand up and catch that ball',
    // 'Somebody help me',
    // 'No problem',
    // 'Look at that pumpkin',
    // 'Come on down',
    // 'What a big eater he is',
    // 'Shape up or ship out',
    // 'What a big dog'
];


// gets a random phrase from an array and stores the characters in a new array
function getRandomPhraseAsArray(arr){
    const randomNumber = Math.floor(Math.random() * arr.length);
    let randomPhrase = arr[randomNumber];
    randomPhrase = randomPhrase.toLowerCase();
    const charactersInPhrase = randomPhrase.split('');
    return charactersInPhrase;
}

// Takes the array of characters and creates li elements then appends them to the ul.
function addPhraseToDisplay(arr) {
    const ulList = document.querySelector('#phrase ul');
    for (let i = 0; i < arr.length; i++) {
        let letter = arr[i];
        const letterLi = document.createElement('li');
        letterLi.innerHTML += `${letter}`;
            if(letterLi.innerHTML !== " "){
                letterLi.className = 'letter'; // Adds the class "letter" to li elements with a letter.
            } else {
                letterLi.className = 'space'; // Adds the class space to spaces. Not sure why the instructions didn't say anything about this.
            };
        ulList.appendChild(letterLi);
    }
}

// Calls the function to get a random phrase and stores the array with charaters in a variable.
const phraseArray = getRandomPhraseAsArray(phrases);
// Calls the funtion that creates li elements and append to the site. 
addPhraseToDisplay(phraseArray);



function checkLetter(inputValue) {
    const letters = document.getElementsByClassName('letter');
    let foundLetters;
    for (let i = 0; i < letters.length; i++) {
     const letter = letters[i];
     if (inputValue === letter.innerHTML){
         letter.className = 'letter show';
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
       if (show.length === letter.length){
            toggleFinalOverlay('win', 'Congratulations!', 'Restart Game');
        } else if (missed >= 5) {
            toggleFinalOverlay('lose', 'Sorry!', 'Restart Game');
        }
}

function toggleFinalOverlay(overlayClass, titleText, btnText){
    const title = document.querySelector('.title');
    overlay.style.display = '';
    overlay.className = overlayClass;
    title.textContent = titleText;
    resetBtn.textContent = btnText;
    restartGame()
}

function restartGame(){
    const buttons = qwerty.firstElementChild.children;
    missed = 0;
    for (let i = 0; i < hearts.length; i++){
        hearts[i].innerHTML = liveHeartString;
    }
    for (let i = 0; i < buttons.length; i++)
        button = buttons[i];
        if (button.disabled) {
            button.disabled = '';
            button.className = '';
        }
}


















