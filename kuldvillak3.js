const game = document.getElementById("game")
const scoreDisplay = document.getElementById("score")

const jeopardyCategories = [
    {
        genre: "Modern Family",
        questions: [
            {
                question: "How many kids does Phil have?",
                options: ["3","2"],
                correct: "3",
                difficulty: "easy"
            },
            {
                question: "What does Phil do for a living?",
                options: ["magician","realtor"],
                correct: "realtor",
                difficulty: "medium"
            },
            {
                question: "What is Claire and Mitchell's mom's name?",
                options: ["Dede","Milly"],
                correct: "Dede",
                difficulty: "hard"
            },
        ]
    },
    {
        genre: "The Office",
        questions: [
            {
                question: "What does Micheal host every year?",
                options: ["Dundie Awards","Best Worker"],
                correct: "Dundie Awards",
                difficulty: "easy"
            },
            {
                question: "Where did Jim and Pam get married?",
                options: ["Church","Niagara Falls"],
                correct: "Niagara Falls",
                difficulty: "medium"
            },
            {
                question: "What was Andy's name from the ages of 0-6?",
                options: ["Christoph Jr.","Walter Jr."],
                correct: "Walter Jr.",
                difficulty: "hard"
            },
        ]
    },
    {
        genre: "The Good Place",
        questions: [
            {
                question: "What is 1 thing Chidi can't do for the life of him?",
                options: ["lie","make decisions"],
                correct: "make decisions",
                difficulty: "easy"
            },
            {
                question: "Who is Eleanor's real soulmate?",
                options: ["Chidi","Jason"],
                correct: "Chidi",
                difficulty: "medium"
            },
            {
                question: "What did Eleanor write on the note that she put in Janet's mouth?",
                options: ["You're in hell","Find Chidi"],
                correct: "Find Chidi",
                difficulty: "hard"
            },
        ]
    },
    {
        genre: "Friends",
        questions: [
            {
                question: "This person hates thanksgiving",
                options: ["Chandler","Monica"],
                correct: "Chandler",
                difficulty: "easy"
            },
            {
                question: "Phoebe said her mother was reincarnated as this",
                options: ["cat","bird"],
                correct: "cat",
                difficulty: "medium"
            },
            {
                question: "What name does Joey want to give his kid?",
                options: ["Batman","The Hulk"],
                correct: "The Hulk",
                difficulty: "hard"
            },
        ]
    },
    {
        genre: "That 70's show",
        questions: [
            {
                question: "What does the gang do when they enter so called Circle?",
                options: ["fight","smoke pot"],
                correct: "smoke pot",
                difficulty: "easy"
            },
            {
                question: "When Midge left Bob and Donna where did she go?",
                options: ["New York","California"],
                correct: "California",
                difficulty: "medium"
            },
            {
                question: "What is Jackie's middle name?",
                options: ["Belia","Beulah"],
                correct: "Beulah",
                difficulty: "hard"
            },
        ]
    },
]

function addCategory(category) {
    const column = document.createElement('div')
    column.classList.add('genre-column')

    const genreTitle = document.createElement('div')
    genreTitle.classList.add('genre-title')
    genreTitle.innerHTML = category.genre

    column.appendChild(genreTitle)
    game.append(column)

    category.questions.forEach(question =>{
        const card = document.createElement('div')
        card.classList.add('card')
        column.append(card)

        if(question.difficulty === 'easy'){
            card.innerText = '25'
            card.setAttribute('data-value', 25)
        }
        if(question.difficulty === 'medium'){
            card.innerText = '50'
            card.setAttribute('data-value', 50)
        }
        if(question.difficulty === 'hard'){
            card.innerText = '100'
            card.setAttribute('data-value', 100)
        }

        card.setAttribute('data-question', question.question)
        card.setAttribute('data-answer-1', question.options[0])
        card.setAttribute('data-answer-2', question.options[1])
        card.setAttribute('data-correct', question.correct)
        
        // card.setAttribute('data-value', card.getInnerText)

        card.addEventListener('click',flipCard)
    })
}

jeopardyCategories.forEach(category => addCategory(category))

function flipCard(){
    this.innerText = ""
    this.style.fontSize = "15px"
    this.style.lineHeight = "30px"
    const textDisplay = document.createElement('div')
    textDisplay.classList.add('card-text')
    textDisplay.innerText = this.getAttribute('data-question')
    const firstButton = document.createElement('button')
    const secondButton = document.createElement('button')

    firstButton.classList.add('first-button')
    secondButton.classList.add('second-button')
    firstButton.innerText = this.getAttribute('data-answer-1')
    secondButton.innerText = this.getAttribute('data-answer-2')

    //mõlemad nupud kasutavad getResult funktsiooni kui nende peale klikata
    firstButton.addEventListener('click',getResult)
    secondButton.addEventListener('click',getResult)

    this.append(textDisplay, firstButton, secondButton)

    //vajutades mingi kaardi peale ei saa teisi avada samal ajal
    const allCards = Array.from(document.querySelectorAll('.card'))
    allCards.forEach(card => card.removeEventListener('click', flipCard))

}


function getResult(){
    const allCards = Array.from(document.querySelectorAll('.card'))
    allCards.forEach(card => card.addEventListener('click',flipCard))

    const cardOfButton = this.parentElement
    console.log('cardOfButton', cardOfButton)

    if(cardOfButton.getAttribute('data-correct') == this.innerText){
        let scoreValue = scoreDisplay.innerText.valueOf()
        let score
        score = +scoreValue + +cardOfButton.getAttribute('data-value')
        console.log(typeof(scoreValue))
        console.log(typeof(score))
        scoreDisplay.innerText = score
        cardOfButton.classList.add('correct-answer')
        setTimeout(() => {
            while(cardOfButton.firstChild){
                cardOfButton.removeChild(cardOfButton.lastChild)
            }
            cardOfButton.innerText = parseInt(cardOfButton.getAttribute('data-value'))
        }, 100)
    } else {
        cardOfButton.classList.add('wrong-answer')
        setTimeout(() => {
            while(cardOfButton.firstChild){
                cardOfButton.removeChild(cardOfButton.lastChild)
            }
            cardOfButton.innerText = 0
        }, 100)
    }
    cardOfButton.removeEventListener('click',flipCard)

    

    //annab inspectis kõik vastuste kohta käiva info nupule vajutades
    //console.log('cardOfButton', cardOfButton)

}