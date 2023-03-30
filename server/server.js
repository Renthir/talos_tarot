const express = require('express')
const app = express()
require('dotenv').config()

const { getQuestionFortune, getGeneralFortune, getAllCards } = require('./controller.js')
const { SERVER_PORT } = process.env

app.use(express.json())


app.use(express.static(`client`))




app.post(`/api/fortune`, getGeneralFortune)

app.post(`/api/question`, getQuestionFortune)

app.get(`/api/cards`, getAllCards)







app.listen(SERVER_PORT, () => console.log(`Up on ${SERVER_PORT}`))