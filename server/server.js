const express = require('express')
const app = express()
app.use(express.json())

app.use(express.static(`${__dirname}/client`))

const {} = require('controller.js')








app.listen(4000, () => console.log('Up on 4000'))