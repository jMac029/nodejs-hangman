// require the Letters constructor from letters.js
const Letters = require("./letters.js");

function Words(word) {
    this.word = word;
    // empty array to store all the letters objects that make up the word
    this.letters = [];
    this.wordCompleted = false;

    // function to retrieve the letters that make up the selected word
    this.retrieveLetters = () => {
        for (var index in this.word) {
            let newCharacter = new Letters(this.word[i]);
            this.letters.push(newCharacter);
        }
    };

    this.checkLetter = (letterSelected) => {
        let toReturn = 0;
        // iterate through each letter to check to see if it is matches a letter within the word
        this.letters.forEach((letter) => {
            if (letter.letter === letterSelected) {
                letter.visible = true;
                toReturn++;
            }
        });
        return toReturn;
    };

    this.renderWord = () => {
        let display = "";
        this.letters.forEach((letter) => {
            let currentLetter = letter.render();
            display += currentLetter;
        });
        return display;
    };

    this.wordCompleted = () => {
        if (this.letters.every((letter) => {
                return letter.visible === true;
            })) {
            this.wordCompleted = true;
            return true;
        }
    };
}

module.exports = Words;