const tileDisplay = document.querySelector('.tile-container')
const keyboard = document.querySelector('.key-container')
const messageDisplay = document.querySelector('.message-container')

let wordle

const getWordle = () => {
    fetch('http://localhost:8000/word')
        .then(response => response.json())
        .then(json => {
            wordle = json.toUpperCase()
        })
        .catch(err => console.log(err))
}
getWordle()


const keys = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'ENTER',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    '«',
]
const guessRows = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
]
let currentRow = 0
let currentTile = 0
let isGameOver = false

guessRows.forEach((guessRow, guessRowIndex) => {
    const rowElement = document.createElement('div')
    rowElement.setAttribute('id', 'guessRow-' + guessRowIndex)
    guessRow.forEach((_guess, guessIndex) => {
        const tileElement = document.createElement('div')
        tileElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex)
        tileElement.classList.add('tile')
        rowElement.append(tileElement)
    })
    tileDisplay.append(rowElement)
})

keys.forEach(key => {
    const buttonElement = document.createElement('button')
    buttonElement.textContent = key
    buttonElement.setAttribute('id', key)
    buttonElement.addEventListener('click', () => handleClick(key))
    keyboard.append(buttonElement)
})

const handleClick = (letter) => {
    if (!isGameOver) {
        if (letter === '«') {
            deleteLetter()
            return
        }
        if (letter === 'ENTER') {
            let s = checkRow()
            /*if(s==true)
                    {
                        function syncDelay(milliseconds){
                            var start = new Date().getTime();
                            var end=0;
                            while( (end-start) < milliseconds){
                                end = new Date().getTime();
                            }
                           }
                           syncDelay(5000);
                        window.location.href="start.html"
                    }*/
            return
        }
        addLetter(letter)
    }
}

const addLetter = (letter) => {
    if (currentTile < 5 && currentRow < 6) {
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = letter
        guessRows[currentRow][currentTile] = letter
        tile.setAttribute('data', letter)
        currentTile++
    }
}

const deleteLetter = () => {
    if (currentTile > 0) {
        currentTile--
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = ''
        guessRows[currentRow][currentTile] = ''
        tile.setAttribute('data', '')
    }
}

const checkRow = () => {
    const guess = guessRows[currentRow].join('')
    if (currentTile > 4) {
        //fetch(`http://localhost:8000/check/?word=${guess}`)
            //.then(response => response.json())
            //.then(json => {
                //if (json == 'Entry word not found') {
                   // showMessage('word not in list')
                   // return
               // } else {
                    flipTile()
                    if (wordle == guess) {
                        console.log('GAME OVER')
                        if(currentRow==0)
                        {
                            alert('AMAZING! You cracked the word!')
                            document.getElementById("show").innerHTML="GRANDMASTER!"
                        }
                        if(currentRow==1)
                        {
                            alert('AMAZING! You cracked the word!')
                            document.getElementById("show").innerHTML="GRANDMASTER!"
                        }
                        if(currentRow==2)
                        {
                            alert('Good! You cracked the word!')
                            document.getElementById("show").innerHTML="MASTER!"
                        }
                        if(currentRow==3)
                        {
                            alert('Nice! You cracked the word!')
                            document.getElementById("show").innerHTML="INTERMEDIATE!"
                        }
                        if(currentRow==4)
                        {
                            alert('You cracked the word!')
                            document.getElementById("show").innerHTML="NOVICE!"
                        }
                        if(currentRow==5)
                        {
                            alert('You cracked the word!')
                            document.getElementsById("show").innerHTML="BEGINNER!"
                        }
                        isGameOver = true
                        return isGameOver;
                        
                    } else {
                        if (currentRow >= 5) {
                            isGameOver = true
                            alert('Game Over, better luck next time')
                            window.location.href = "start.html";
                            return isGameOver
                        }
                        if (currentRow < 5) {
                            currentRow++
                            currentTile = 0
                        }
                        return isGameOver
                    }
                }
            }
const showMessage = (message) => {
    const messageElement = document.createElement('p')
    messageElement.textContent = message
    messageDisplay.append(messageElement)
    setTimeout(() => messageDisplay.removeChild(messageElement), 2000)
}

const addColorToKey = (keyLetter, color) => {
    const key = document.getElementById(keyLetter)
    key.classList.add(color)
}

const flipTile = () => {
    const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes
    let checkWordle = wordle
    const guess = []

    rowTiles.forEach(tile => {
        guess.push({letter: tile.getAttribute('data'), color: 'grey-overlay'})
    })

    guess.forEach((guess, index) => {
        if (guess.letter == wordle[index]) {
            guess.color = 'green-overlay'
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })

    guess.forEach(guess => {
        if (checkWordle.includes(guess.letter)) {
            guess.color = 'yellow-overlay'
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })

    rowTiles.forEach((tile, index) => {
        setTimeout(() => {
            tile.classList.add('flip')
            tile.classList.add(guess[index].color)
            addColorToKey(guess[index].letter, guess[index].color)
        }, 500 * index)
    })
}


for(let i=0;i<5;i++)
{
    for(let j=0;j<5;j++)
    {
        let t = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        clearBox(t)
    }
}

function clearBox(elementID)
{
    document.getElementById(elementID).innerHTML = "";
}

