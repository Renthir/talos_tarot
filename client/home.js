const fortuneBtn = document.getElementById('get-fortune')
const questionform = document.getElementById('question-form')
const questionText = document.getElementById('user-question')
const allCards = document.getElementById('show-all')

let url = 'http://localhost:4000'


function showCards(){
    axios.get(`${url}/cards`)
    .then((result) => {

    })
}

function getFortune(e){
    e.preventDefault()

    axios.post(`${url}/fortune`)
    .then((result) => {

    })
}

function askQuestion(e){
    e.preventDefault()

    let body = {
        question: questionText.value
    }

    axios.post(`${url}/question`, body)
    .then((result) => {

    })
}


allCards.addEventListener('click', showCards)
fortuneBtn.addEventListener('click', getFortune)
questionform.addEventListener('submit', askQuestion)

