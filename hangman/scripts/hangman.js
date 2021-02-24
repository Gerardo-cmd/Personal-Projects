class Hangman {
    constructor (word, remainingGuesses) {
    this.word = word.toLowerCase().split('')
    this.remainingGuesses = remainingGuesses
    this.guessedLetters = []
    this.status = 'playing'
    }
    get statusMessage() {
        if (this.status === 'playing'){
            return `Gueses left: ${this.remainingGuesses}`
        }
        else if (this.status === 'failed') {
            return `Nice try! The word was "${this.word.join('')}"`
        }
        else {
            return `Great work! You gussed the word.`
        }
    }
    recalculateStatus() {
        if (this.remainingGuesses <= 0) {
            this.status = 'failed'
        }
        else if (!this.puzzle.includes('*')){
            this.status = 'finished'
        }
        else {
            this.status = 'playing'
        }
    }
    get puzzle() {
        let puzzle = ''
        this.word.forEach((letter) => {
            if (this.guessedLetters.includes(letter) || letter === ' ') {
                puzzle += letter
            }
            else {
                puzzle += '*'
            }
        })
        return puzzle
    }
    makeGuess(character) {
        const char = character.toLowerCase()

    if (this.status !== 'playing'){
        return
    }

    if (this.guessedLetters.includes(char)){
        return;
    }
    else{
        this.guessedLetters.push(char)
        if (!this.word.includes(char)){
            this.remainingGuesses -= 1
        }
    }
    this.recalculateStatus()
    console.log(this.status)
    }
}