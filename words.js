// require the Letters constructor from letters.js
let Characters = require("./characters.js");

function Words(word) {
    this.word = word;
    // empty array to store all the letters objects that make up the word
    this.characters = [];
    this.wordCompleted = false;

    // function to retrieve the letters that make up the selected word
    this.retrieveLetters = () => {
        for (var index in this.word) {
            let newCharacter = new Characters(this.word[i]);
            this.characters.push(newCharacter);
        }
    };

    this.checkCharacter = (characterSelected) => {
        let toReturn = 0;
        // iterate through each letter to check to see if it is matches a letter within the word
        this.character.forEach((character) => {
            if (character.character === characterSelected) {
                character.visible = true;
                toReturn++;
            }
        });
        return toReturn;
    };

    this.renderWord = () => {
        let display = "";
        this.character.forEach((letter) => {
            let currentLetter = characters.render();
            display += currentCharacter;
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