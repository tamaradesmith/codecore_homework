console.log("hi hudson");
const keyboard = document.querySelector(".keyboard");
const wordBoard = document.querySelector(".wordBoard");
const picture = document.querySelector(".picture")
const hangman = ["gallows.jpg", "gallows+head.jpg", "gallows+head+torso.jpg", "gallows+head+torso+leg.jpg", "gallows+head+torso+2leg.jpg", "gallows+head+torso+2leg+arm.jpg", "gallows+head+torso+2leg+2arm.jpg"];

const wordArray = ["aurora", "hudson", "codecore", "canada", "subdermatoglyphic", "handkerchief", "weird", "hardest", "spell", 'misspelled', "people", "techincal", "catalog", "account", "afternoon", "yesterday", "zebrafish"]
let word, picIndex, guessedLetter;

function setUp() {
  picIndex = 1
  guessedLetter = 0
  document.querySelectorAll(".key").forEach(child => {
    keyboard.removeChild(child);
  })
  document.querySelectorAll(".letter-box").forEach(child => {
    wordBoard.removeChild(child);
  })

  word = wordArray[Math.ceil(Math.random() * wordArray.length)].toUpperCase();

  for (let i = 65; i < 91; i++) {
    const key = document.createElement('div');
    key.className = 'key';
    const letter = String.fromCharCode(i);
    key.id = letter
    key.innerHTML = `${letter}`
    keyboard.appendChild(key)
  }
  for (let letter of word) {
    const letterBox = document.createElement('div');
    letterBox.className = "letter-box";
    letterBox.innerHTML = `<p class="letter">${letter}</p>`
    wordBoard.appendChild(letterBox);
  }
  picture.style.backgroundImage = `url(./images/${hangman[0]}`
}


setUp()


document.addEventListener('DOMContentLoaded', loadEvent => {
  const hiddenLetter = document.querySelectorAll(".letter")

  document.addEventListener('click', event => {
    const target = event.target;
    if (!target.matches(".key-clicked")) {
      if (target.matches(".key")) {
        const key = target.innerHTML
        target.classList.add("key-clicked");
        hiddenLetter.forEach(letter => {
          if (letter.innerText === key) {
            letter.classList.remove("letter")
            guessedLetter++
          }
        })
        if (!word.includes(key)) {
          picture.style.backgroundImage = `url(./images/${hangman[picIndex]}`;
          picIndex++;

          if (picIndex === hangman.length) {
            const lose = new Audio('sound/lose.wav');
            lose.play();
            alert("Sorry, Better luck next time");
            setTimeout(setUp(), 5000)

          }
        } else if (guessedLetter === word.length) {
          const victory = new Audio('sound/victory.wav');
          victory.play();
          alert("Congrastions, you Win!!");
          setTimeout(setUp(), 5000)
        }
      }
    }
  })
})
