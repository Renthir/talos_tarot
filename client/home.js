const fortuneBtn = document.getElementById('get-fortune')
const questionform = document.getElementById('question-form')
const questionText = document.getElementById('user-question')
const allCards = document.getElementById('show-all')
const output = document.getElementById('output')
const artArea = document.getElementById('art-area')
const loaders = document.querySelectorAll('.loader')


function showCards(){
    axios.get(`/api/cards`)
    .then((result) => {
        let closeBtn = document.createElement('button')
        closeBtn.setAttribute('id', 'close-button')
        closeBtn.innerHTML = 'Clear'
        artArea.appendChild(closeBtn)
        closeBtn.addEventListener('click', clearArt)

        
        for (let i = 0; i < result.data.length; i++){
            let cardArt = document.createElement('div')
            cardArt.setAttribute('class', 'card-art')
            cardArt.innerHTML = `<img src="./cards/${result.data[i].img}" alt="${result.data[i].name}"></img>`
            artArea.appendChild(cardArt)
        }
    })
}

function clearArt(){
    artArea.innerHTML = ''
}

function getFortune(e){
    e.preventDefault()

    loaders.forEach(elem => {
        elem.classList.add('loader-on')
    })

    axios.post(`/api/fortune`)
    .then((result) => {
        loaders.forEach(elem => {
            elem.classList.remove('loader-on')
        })
        
        document.getElementById('past-img').src=`./cards/${result.data.spread[0].img}`
        document.getElementById('present-img').src=`./cards/${result.data.spread[1].img}`
        document.getElementById('future-img').src=`./cards/${result.data.spread[2].img}`

        output.textContent = result.data.text
    })
}

function askQuestion(e){
    e.preventDefault()

    loaders.forEach(elem => {
        elem.classList.add('loader-on')
    })

    let body = {
        userQuestion: questionText.value
    }

    axios.post(`/api/question`, body)
    .then((result) => {
        loaders.forEach(elem => {
            elem.classList.remove('loader-on')
        })
        
        document.getElementById('past-img').src=`./cards/${result.data.spread[0].img}`
        document.getElementById('present-img').src=`./cards/${result.data.spread[1].img}`
        document.getElementById('future-img').src=`./cards/${result.data.spread[2].img}`

        output.textContent = result.data.text
    })
}


allCards.addEventListener('click', showCards)
fortuneBtn.addEventListener('click', getFortune)
questionform.addEventListener('submit', askQuestion)

