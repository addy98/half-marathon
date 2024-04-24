require('dotenv').config()

const express = require('express')
const cors = require('cors')
const Message = require('./models/message')

const app = express()

app.use(express.static('dist'))
app.use(express.json())
app.use(cors())

// Controllers
app.get('/api/messages', async (req, res) => {
    const messages = await Message.find({})
    res.json(messages)
})

app.post('/api/messages', async (req, res) =>{
    const body = req.body

    const message = new Message({
        name: body.name,
        message: body.message,
    })

    const savedMessage = await message.save()

    res.status(201).json(savedMessage)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})