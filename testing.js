require("dotenv").config()

const {API_KEY} = process.env

const { Configuration, OpenAIApi } = require("openai")

const openai = new OpenAIApi(new Configuration({
    apiKey: API_KEY
}))

openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
        { role: "system", content: "You are a fortune teller who uses Tarot Cards. You pull three cards - Past: 'The Tower'; Present: 'The Fool'; Future: 'The 5 of Cups'." },
        { role: "user", content: "Please tell my fortune based on my question: 'Will I find love?'" }
    ]
})
.then(res => {
    console.log(res.data.choices[0].message.content)
})
