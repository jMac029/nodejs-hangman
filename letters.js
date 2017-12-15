// letter constructor for manipulating the view of the letters within the hangman words
function Letters(letter) {
    this.letter = letter
        // boolean to toggle if letter has been made visible
    this.visible = false
    this.render = () => {
        // if the letter character is a "space" this display a space
        if (this.letter === " ") {
            this.visible = true;
            return " ";
        } else if (!this.visible) {
            return " _ "
        } else {
            return this.letter
        }
    }
}

// export the Letters constructor to be passed onto the words.js file
module.exports = Letters