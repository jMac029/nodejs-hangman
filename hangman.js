//require inquirer
var inquirer = require('inquirer');
//require is-alphanumeric to check character input
var isAlphaNumeric = require('is-alphanumeric');
//require objects/exports
var Word = require('./words.js');
var Model = require('./model.js');

//set the maxListener
require('events').EventEmitter.prototype._maxListeners = 100;


let hangman = {
    wordArray: model.wordArray,
    guessesRemaining: 10,
    //empty array to hold letters guessed by user.
    guessedLetters: [],
    //index to display graphic
    display: 0,
    currentWord: null,
    //asks user if they are ready to play
    startGame: () => {
        //var that = this;
        //clears guessedLetters before a new game starts.
        if (this.guessedLetters.length > 0) {
            this.guessedLetters = [];
        }

        inquirer.prompt([{
            name: "play",
            type: "confirm",
            message: "Are You Ready to play?"
        }]).then(function(answer) {
            if (answer.play) {
                this.newGame();
            } else {
                console.log("Fine, I don't feel like playing either, goodbye!");
            }
        })
    },
    //if they want to play starts new game.
    newGame: () => {
        if (this.guessesRemaining === 10) {
            console.log("I've got a bad feeling about this.");
            console.log('* * * * * * * * * * * * * * * * *');
            //generates random number based on the wordBank
            var randNumber = Math.floor(Math.random() * this.wordArray.length);
            this.currentWord = new Word(this.wordArray[randNumber]);
            this.currentWord.getLetters();
            //displays current word as blanks.
            console.log(this.currentWord.wordRender());
            this.keepPromptingUser();
        } else {
            this.resetGuessesRemaining();
            this.newGame();
        }
    },
    resetGuessesRemaining: () => {
        this.guessesRemaining = 10;
    },
    promptUser: () => {
        var that = this;
        //asks player for a character
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
        }]).then(function(letter) {
            //toUpperCase because words in word bank are all caps
            var letterReturned = (letter.chosenLetter).toUpperCase();
            //adds to the guessedLetters array if it isn't already there
            var guessedAlready = false;
            for (var i = 0; i < that.guessedLetters.length; i++) {
                if (letterReturned === that.guessedLetters[i]) {
                    guessedAlready = true;
                }
            }
            //if the letter wasn't guessed already run through entire function, else reprompt user
            if (guessedAlready === false) {
                that.guessedLetters.push(letterReturned);

                var found = that.currentWord.checkIfLetterFound(letterReturned);
                //if none were found tell user they were wrong
                if (found === 0) {
                    console.log('Nope! You guessed wrong.');
                    that.guessesRemaining--;
                    that.display++;
                    console.log('Guesses remaining: ' + that.guessesRemaining);
                    console.log(hangManDisplay[(that.display) - 1]);

                    console.log('\n*******************');
                    console.log(that.currentWord.wordRender());
                    console.log('\n*******************');

                    console.log("Letters guessed: " + that.guessedLetters);
                } else {
                    console.log('Yes! You guessed right!');
                    //checks to see if user won
                    if (that.currentWord.didWeFindTheWord() === true) {
                        console.log(that.currentWord.wordRender());
                        console.log('Congratulations! You won the game!!!');
                        // that.startGame();
                    } else {
                        // display the user how many guesses remaining
                        console.log('Guesses remaining: ' + that.guessesRemaining);
                        console.log(that.currentWord.wordRender());
                        console.log('\n*******************');
                        console.log("Letters guessed: " + that.guessedLetters);
                    }
                }
                if (that.guessesRemaining > 0 && that.currentWord.wordFound === false) {
                    that.promptUser();
                } else if (that.guessesRemaining === 0) {
                    console.log('Game over!');
                    console.log('The word you were guessing was: ' + that.currentWord.word);
                }
            } else {
                console.log("You've guessed that letter already. Try again.")
                that.promptUser();
            }
        });
    }
}

hangman.startGame();