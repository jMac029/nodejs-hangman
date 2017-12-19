// letter constructor for manipulating the view of the letters within the hangman words
function Characters(character) {
    this.character = character;
    // boolean to toggle if letter has been made visible
    this.visible = false;
    this.render = () => {
        // if the letter character is a "space" this display a space
        if (this.character === " ") {
            this.visible = true;
            return " ";
        } else if (this.character === "-") {
            this.visible = true;
            return "-";
        } else if (!this.visible) {
            return " _ ";
        } else {
            return this.character;
        }
    };
}

// export the Letters constructor to be passed onto the words.js file
module.exports = Characters;