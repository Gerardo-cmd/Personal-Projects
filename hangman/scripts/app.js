// HTTP (Hypertext Transfer Protocol)
// Request - What do we want to do
// Response - What was actually done
const puzzleElement = document.querySelector('#puzzle')
const guessesElement = document.querySelector('#guesses')
let game1

window.addEventListener('keypress', (e) => {
    const guess = e.key
    game1.makeGuess(guess)
    render()
})

const render = () => {
    puzzleElement.innerHTML = ''
    guessesElement.textContent = game1.statusMessage

    game1.puzzle.split('').forEach((letter) => {
        const letterElement = document.createElement('span')
        letterElement.textContent = letter
        puzzleElement.appendChild(letterElement)
    })
}

const startGame = async () => {
    const puzzle = await getPuzzle('2')
    game1 = new Hangman(puzzle, 5)
    render()
}

document.querySelector('#reset').addEventListener('click', (e) => {
    startGame()
})

startGame()

// getPuzzle('2').then((puzzle) => {
//     console.log(puzzle)
// }).catch((err) => {
//     console.log(`Error: ${err}`)
// })

// getCurrentCountry().then((country) => {
//     console.log(country.name)
// }).catch((err) => {
//     console.log(error)
// })

