

const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
let missed = 0;

// Removes the start overlay when a player click the start button
document.addEventListener('click', (e) => {
    const buttonClick = e.target;
    const startOverlay = document.getElementById('overlay');
    if (buttonClick.className === 'btn__reset') {
        overlay.remove();
    } 
});

// Array with phrases
const phrases = [
    'Stand up and catch that ball',
    'Somebody help me',
    'No problem',
    'Look at that pumpkin',
    'Come on down',
    'What a big eater he is',
    'Shape up or ship out',
    'What a big dog'
];


// gets a random phrase from an array and stores the characters in a new array
function getRandomPhraseAsArray(arr){
    const randomNumber = Math.floor(Math.random() * arr.length);
    const randomPhrase = arr[randomNumber];
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