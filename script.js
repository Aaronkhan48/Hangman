// HTML ID Elements
const wordEl = document.getElementById('word');
const links = document.getElementById('links');
const repeatWord = document.getElementById('repeatWord');
const winLose = document.getElementById('final-message');
const bodyParts = document.querySelectorAll('.figure-part');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popupEl = document.getElementById('popup-container');
const words = ['code', 'python', 'javascript', 'html', 'css']; //Array Holding the Words to guess.
let guess = words[Math.floor(Math.random() * words.length)];
const correctLetters = [];
const wrongLetters = [];

// Splits word into individual letters to then be used to check if the typed letter is equal to it.
function displayWord() {
  wordEl.innerHTML = guess
    .split('')
    .map(
      letter => `
        <span class="letter">
          ${correctLetters.includes(letter) ? letter : ''}
        </span>
      `
    )
    .join('');

  const innerWord = wordEl.innerText.replace(/\n/g, '');

  if (innerWord === guess) {//Win Sequence
    winLose.innerText = 'Congratulations!';
    popupEl.style.display = 'flex';
  }
}

function updateWrongLetters() {
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;

  bodyParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  if (wrongLetters.length === bodyParts.length) {//Lose sequence
    winLose.innerText = `You have lost. \n The word was ${guess}.`;

    popupEl.style.display = 'flex';
  }
}

function alreadyRepeated() {
    repeatWord.classList.add('show');

  setTimeout(() => {
    repeatWord.classList.remove('show');
  }, 1000);
}

function handleKeyDown(event) {
  const letter = event.key.toLowerCase();

  if (/^[a-z]$/.test(letter)) {
    if (guess.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        alreadyRepeated();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLetters();
      } else {
        alreadyRepeated();
      }
    }
  }
}

//Reset the Game after clicking button.
function resetGame() {
  correctLetters.splice(0);
  wrongLetters.splice(0);
  guess = words[Math.floor(Math.random() * words.length)];
  displayWord();
  updateWrongLetters();
  popupEl.style.display = 'none';
}

// Event listeners
window.addEventListener('keydown', handleKeyDown);
playAgainBtn.addEventListener('click', resetGame);

displayWord();