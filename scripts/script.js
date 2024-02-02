const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");

let currentWord,
  wrongGuessCount = 0;
const maxGuesses = 6;

const getRandomWord = () => {
  // selecting a random word and hint from the wordlist
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  currentWord = word;
  console.log(word);
  document.querySelector(".hint-text b").innerHTML = hint;
  wordDisplay.innerHTML = word
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");
};

const initGame = (button, clickedLetter) => {
  // Checking if clickedLetter exists in the currentWord
  if (currentWord.includes(clickedLetter)) {
    // Showing all correct letters on the word display
    const letterElements = wordDisplay.querySelectorAll("li");

    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        // Use index to access the correct li element
        letterElements[index].innerHTML = letter;
        letterElements[index].classList.add("guessed");
      }
    });
  } else {
    wrongGuessCount++;
  }
  guessesText.innerHTML = `${wrongGuessCount}/ ${maxGuesses}`;
};

//creating keyboard buttons and adding event listeners
for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.innerHTML = String.fromCharCode(i);
  keyboardDiv.appendChild(button);
  button.addEventListener("click", (e) =>
    initGame(e.target, String.fromCharCode(i))
  );
}

getRandomWord();
