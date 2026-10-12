let words = ["which", "there", "their", "about", "would", "these", "other", "words", "could", "write", "first", "water"];
let attempts = 0;
let result = document.getElementById("result");
let guess = document.getElementById("guess");
let message = document.getElementById("message");
let submitButton = document.getElementById("submit-text");
let index = Math.floor(Math.random() * words.length);
let word = words[index];
submitButton.addEventListener("click", function() {
    let answer = guess.value.toLowerCase();
    if (answer.length !== 5) {
        message.textContent = "Enter 5 letters";
        return;
    }
    let row = document.createElement("p");
    for (let i = 0; i < 5; i++) {
        let letter = answer[i];
        let cell = document.createElement("span");
        cell.textContent = letter + " ";
        if (letter === word[i]) {
            cell.style.color = "green";
        } else if (word.includes(letter)) {
            cell.style.color = "orange";
        } else {
            cell.style.color = "gray";
        }
        row.appendChild(cell);
    }
    board.appendChild(row);
    attempts++;
    if (answer === word) {
        message.textContent = "You Win!";
        submitButton.disabled = true;
    } else if (attempts === 6) {
        message.textContent = "You Lose! Word: " + word;
        button.disabled = true;
    } else {
        message.textContent = "Attempts left: " + (6 - attempts);
    }
    guess.value = "";
});