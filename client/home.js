const fortuneBtn = document.getElementById('get-fortune')
const questionform = document.getElementById('question-form')
const questionText = document.getElementById('user-question')
const allCards = document.getElementById('show-all')
const output = document.getElementById('output')


function showCards(){
    axios.get(`/api/cards`)
    .then((result) => {

    })
}

function getFortune(e){
    e.preventDefault()

    axios.post(`/api/fortune`)
    .then((result) => {
        document.getElementById('past-img').src=`./cards/${result.data.spread[0].img}`
        document.getElementById('present-img').src=`./cards/${result.data.spread[1].img}`
        document.getElementById('future-img').src=`./cards/${result.data.spread[2].img}`

        output.textContent = result.data.text
    })
}

function askQuestion(e){
    e.preventDefault()

    let body = {
        userQuestion: questionText.value
    }

    axios.post(`/api/question`, body)
    .then((result) => {
        document.getElementById('past-img').src=`./cards/${result.data.spread[0].img}`
        document.getElementById('present-img').src=`./cards/${result.data.spread[1].img}`
        document.getElementById('future-img').src=`./cards/${result.data.spread[2].img}`

        output.textContent = result.data.text
    })
}


allCards.addEventListener('click', showCards)
fortuneBtn.addEventListener('click', getFortune)
questionform.addEventListener('submit', askQuestion)

