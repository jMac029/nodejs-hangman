// require the Letters constructor from letters.js
var Character = require("./characters.js");

// Words constructor for handling the words in the hangman game
var Words = function(word) {
    var that = this;
    this.word = word;
    // empty array to store all the character objects that make up the word
    this.characters = [];
    this.wordFound = false;

    // function to retrieve the characters that make up the selected word
    this.retrieveCharacters = function() {
        for (var i = 0; i < that.word.length; i++) {
            var newCharacter = new Character(that.word[i]);
            //console.log(newCharacter)
            this.characters.push(newCharacter);
        }
    };

    this.isWordFound = () => {
        if (this.characters.every(function(char) {
                return char.visible === true;
            })) {
            this.wordFound = true;
            return true;
        }
    };

    this.checkCharacters = function(characterSelected) {
        var toReturn = 0;
        // iterate through each letter to check to see if it is matches a letter within the word
        this.characters.forEach(function(char) {
            if (char.character === characterSelected) {
                char.visible = true;
                toReturn++;
            }
        });
        return toReturn;
    };

    this.renderWord = function() {
        var display = "";
        that.characters.forEach(function(char) {
            var currentCharacter = char.characterRender();
            //console.log(currentCharacter)
            display += currentCharacter;
            //console.log(display)
        });
        return display;
    };
}

module.exports = Words;