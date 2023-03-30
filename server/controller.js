require("dotenv").config()
let cardDeck = require((`${__dirname}/../archive/tarot-cards.json`))

const {API_KEY} = process.env

const { Configuration, OpenAIApi } = require("openai")

const openai = new OpenAIApi(new Configuration({
    apiKey: API_KEY
}))

function getTarotSpread () {
    let cardSpread = { 
        pastCard: '',
        presentCard: '',
        futureCard: '',
    }

    cardSpread.pastCard = cardDeck.cards[Math.floor(Math.random() * 78)]
    cardSpread.presentCard = cardDeck.cards[Math.floor(Math.random() * 78)]
    cardSpread.futureCard = cardDeck.cards[Math.floor(Math.random() * 78)]

    return cardSpread
}

// console.log(getTarotSpread())

module.exports = {
     
    getQuestionFortune: (req, res) => {
        let { userQuestion } = req.body
        let { pastCard, presentCard, futureCard } = getTarotSpread()

        openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: `You are a fortune teller who uses Tarot Cards. You pull three cards - Past: '${pastCard.name}'; Present: '${presentCard.name}'; Future: '${futureCard.name}'.` },
                { role: "user", content: `Please tell my fortune based on my question: '${userQuestion}'` }
            ]
        })
        .then(result => {
            //  console.log(result.data.choices[0].message.content)
            let fortune = {
                text: result.data.choices[0].message.content,
                spread: [pastCard, presentCard, futureCard]
            } 
            res.status(200).send(fortune)
        })
    },

    getGeneralFortune: (req, res) => {
        let { pastCard, presentCard, futureCard } = getTarotSpread()
        openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: `You are a fortune teller who uses Tarot Cards. You pull three cards - Past: '${pastCard.name}'; Present: '${presentCard.name}'; Future: '${futureCard.name}'.` },
                // { role: "user", content: `Please be brief: What is my fortune?` }
            ]
        })
        .then(result => {
            //  console.log(result.data.choices[0].message.content)
            let fortune = {
                text: result.data.choices[0].message.content,
                spread: [pastCard, presentCard, futureCard]
            } 
            res.status(200).send(fortune)
        })
    },

    getAllCards: (req, res) => {

    }
}
