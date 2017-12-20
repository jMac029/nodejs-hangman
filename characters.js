// Character constructor for manipulating the view of the characters within the hangman words
var Character = function(char) {
    this.character = char;
    // boolean to toggle if character has been made visible
    this.visible = false;
    this.characterRender = function() {
        // if the letter character is a "space" this display a space
        if (this.character == " ") {
            this.visible = true;
            return " ";
            // if the letter character is a "-" this display a "-"
        } else if (this.character == "-") {
            this.visible = true;
            return "-";
        } else if (this.visible === false) {
            return " _ ";
        } else {
            return this.character;
        }
    };
}

// export the Character constructor to be passed onto the words.js file
module.exports = Character;