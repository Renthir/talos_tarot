require("dotenv").config()
let cardDeck = require((`${__dirname}/../archive/tarot-cards.json`))

const {API_KEY} = process.env

const { Configuration, OpenAIApi } = require("openai")

const openai = new OpenAIApi(new Configuration({
    apiKey: API_KEY
}))

//randomizes a spread of cards and adds it to the spread object
function getTarotSpread () {
    let cardSpread = { 
        pastCard: '',
        presentCard: '',
        futureCard: '',
    }

    let unique1= false
    let unique2 = false

    cardSpread.pastCard = cardDeck.cards[Math.floor(Math.random() * 78)]
    //checks if cards match, gets a new cards until they are unique
    cardSpread.presentCard = cardDeck.cards[Math.floor(Math.random() * 78)]
    while (!unique1) {
        if (cardSpread.presentCard.name === cardSpread.pastCard.name) {
            cardSpread.presentCard = cardDeck.cards[Math.floor(Math.random() * 78)]
        } else {
            unique1 = true
        }
    }
    //checks if cards match, gets a new cards until they are unique
    cardSpread.futureCard = cardDeck.cards[Math.floor(Math.random() * 78)]
    while (!unique2) {
        if (cardSpread.futureCard.name === cardSpread.pastCard.name || cardSpread.futureCard.name === cardSpread.presentCard.name) {
        cardSpread.futureCard = cardDeck.cards[Math.floor(Math.random() * 78)]
        } else {
            unique2 = true
        }
    }

    return cardSpread
}

// console.log(getTarotSpread())

module.exports = {
     
    getQuestionFortune: (req, res) => {
        let { userQuestion } = req.body
        let { pastCard, presentCard, futureCard } = getTarotSpread()

        //calls openai and returns a buncha info, including an AI generated 'chat completion'
        openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: `You are a fortune teller who uses Tarot Cards. You pull three cards - Past: '${pastCard.name}'; Present: '${presentCard.name}'; Future: '${futureCard.name}'.` },
                { role: "user", content: `Please tell my fortune based on my question: '${userQuestion}'` }
            ]
        })
        .then(result => {
            //  console.log(result.data.choices[0].message.content)
            //Sends cards and message to client
            let fortune = {
                text: result.data.choices[0].message.content,
                spread: [pastCard, presentCard, futureCard]
            } 
            res.status(200).send(fortune)
        })
    },

    getGeneralFortune: (req, res) => {
        let { pastCard, presentCard, futureCard } = getTarotSpread()
        
        //calls openai and returns a buncha info, including an AI generated 'chat completion'
        openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: `You are a fortune teller who uses Tarot Cards. You pull three cards - Past: '${pastCard.name}'; Present: '${presentCard.name}'; Future: '${futureCard.name}'.` },
                // { role: "user", content: `Please ` }
            ]
        })
        .then(result => {
            //  console.log(result.data.choices[0].message.content)
            //Sends cards and message to client
            let fortune = {
                text: result.data.choices[0].message.content,
                spread: [pastCard, presentCard, futureCard]
            } 
            res.status(200).send(fortune)
        })
    },

    getAllCards: (req, res) => {
        res.status(200).send(cardDeck.cards)
    }
}
