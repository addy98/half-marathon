require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)

mongoose.connect(url)
.then(() => {
    console.log('connected to MongoDB')
})
.catch(error => {
    console.log('error connecting to MongoDB:', error.message)
})

// establish message schema
const messageSchema = new mongoose.Schema({
  name: String,
  message: String,
})

// transform returned documents with configurable options in setter of schema
messageSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// establish message model, assigning model name and model schema
module.exports = mongoose.model('Message', messageSchema)