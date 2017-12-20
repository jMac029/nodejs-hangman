//require inquirer
const inquirer = require('inquirer');
//require is-alphanumeric to check character input
const isAlphaNumeric = require('is-alphanumeric');
//require objects/exports
var Word = require('./words.js');
var Model = require('./model.js');

//set the maxListener
//require('events').EventEmitter.prototype._maxListeners = 100;


var hangman = {
    wordArray: Model.data.wordArray,
    guessesRemaining: 10,
    //empty array to hold letters guessed by user.
    guessedCharacters: [],
    currentWord: null,
    //asks user if they are ready to play
    startGame: function() {
        var that = this;
        //clears guessedCharacters before a new game starts.
        if (this.guessedCharacters.length > 0) {
            this.guessedCharacters = [];
        }

        inquirer.prompt([{
            name: "play",
            type: "confirm",
            message: "Are You Ready to play?"
        }]).then(function(answer) {
            if (answer.play) {
                that.newGame();
            } else {
                console.log("Fine, I don't feel like playing either, goodbye!");
                process.exit()
            }
        })
    },
    //if they want to play starts new game.
    newGame: function() {
        if (this.guessesRemaining === 10) {
            console.log("\n")
            console.log("I've got a bad feeling about this...");
            console.log("\n")
            console.log('* * * * * * * * * * * * * * * * *');
            console.log("\n")
                //generates random number based on the wordArray
            var randNumber = Math.floor(Math.random() * this.wordArray.length);
            this.currentWord = new Word(this.wordArray[randNumber]);
            this.currentWord.retrieveCharacters();
            //displays current word as blanks.
            console.log(this.currentWord.renderWord());
            console.log("\n")
            this.promptUser();
        } else {
            this.resetGuessesRemaining();
            this.newGame();
        }
    },
    resetGuessesRemaining: function() {
        this.guessesRemaining = 10;
    },
    promptUser: function() {
        var that = this;
        //asks user for a character
        inquirer.prompt([{
            name: "chosenCharacter",
            type: "input",
            message: "Choose a letter or number:",
            validate: function(value) {
                if (isAlphaNumeric(value)) {
                    return true;
                } else {
                    return false;
                }
            }
        }]).then(function(char) {
            //toUpperCase because words in wordArray are all caps
            var characterSelected = char.chosenCharacter.toUpperCase();
            //adds to the guessedCharacters array if it isn't already there
            var guessedAlready = false;
            for (var i = 0; i < that.guessedCharacters.length; i++) {
                if (characterSelected === that.guessedCharacters[i]) {
                    guessedAlready = true;
                }
            }
            //if the character wasn't guessed already run through entire function, else reprompt user
            if (guessedAlready === false) {
                that.guessedCharacters.push(characterSelected);

                var found = that.currentWord.checkCharacters(characterSelected);
                //if none were found tell user they were wrong
                if (found === 0) {
                    console.log('You have guessed poorly.');
                    that.guessesRemaining--;
                    console.log('Guesses remaining: ' + that.guessesRemaining);
                    console.log("\n")
                    console.log('\n* * * * * * * * * * * * * * * * * * *');
                    console.log("\n")
                    console.log(that.currentWord.renderWord());
                    console.log("\n")
                    console.log('\n* * * * * * * * * * * * * * * * * * *');
                    console.log("\n")
                    console.log("Letters guessed: " + that.guessedCharacters);
                    console.log("\n")
                } else {
                    console.log('Yes! You guessed right!');
                    console.log("\n")
                        //checks to see if user completed the word
                    if (that.currentWord.isWordFound() === true) {
                        console.log(that.currentWord.renderWord());
                        console.log("\n")
                        console.log('The Force is Strong with You!');
                        console.log('You won the game!!!');
                        console.log("\n")
                        that.startGame();
                    } else {
                        // display the user how many guesses the user has remaining
                        console.log('Guesses remaining: ' + that.guessesRemaining);
                        console.log("\n")
                        console.log(that.currentWord.renderWord());
                        console.log("\n")
                        console.log('\n* * * * * * * * * * * * * * * * * * *');
                        console.log("\n")
                        console.log("Letters guessed: " + that.guessedCharacters);
                        console.log("\n")
                    }
                }
                if (that.guessesRemaining > 0 && that.currentWord.wordFound === false) {
                    that.promptUser();
                } else if (that.guessesRemaining === 0) {
                    console.log('Do or do not, there is no try.');
                    console.log('GAME OVER!');
                    console.log("\n")
                    console.log('The word you were guessing was: ' + that.currentWord.word);
                    that.startGame()
                }
            } else {
                console.log("\n")
                console.log("You've guessed that already. Try again.")
                console.log("\n")
                that.promptUser();
            }
        });
    }
}

hangman.startGame();