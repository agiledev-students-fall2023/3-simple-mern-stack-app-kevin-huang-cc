require('dotenv').config({ silent: true }) // load environmental variables from a hidden file named .env
const express = require('express') // CommonJS import style!
const morgan = require('morgan') // middleware for nice logging of incoming HTTP requests
const cors = require('cors') // middleware for enabling CORS (Cross-Origin Resource Sharing) requests.
const mongoose = require('mongoose')


const app = express() // instantiate an Express object
app.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' })) // log all incoming requests, except when in unit test mode.  morgan has a few logging default styles - dev is a nice concise color-coded style
app.use(cors()) // allow cross-origin resource sharing

// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data

app.use('/static', express.static('public'))
// connect to database
mongoose
  .connect(`${process.env.DB_CONNECTION_STRING}`)
  .then(data => console.log(`Connected to MongoDB`))
  .catch(err => console.error(`Failed to connect to MongoDB: ${err}`))

// load the dataabase models we want to deal with
const { Message } = require('./models/Message')
const { User } = require('./models/User')
const { AboutUs } = require('./models/AboutUs')

// a route to handle fetching all messages
app.get('/messages', async (req, res) => {
  // load all messages from database
  try {
    const messages = await Message.find({})
    res.json({
      messages: messages,
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: 'failed to retrieve messages from the database',
    })
  }
})

// a route to handle fetching a single message by its id
app.get('/messages/:messageId', async (req, res) => {
  // load all messages from database
  try {
    const messages = await Message.find({ _id: req.params.messageId })
    res.json({
      messages: messages,
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: 'failed to retrieve messages from the database',
    })
  }
})
// a route to handle logging out users
app.post('/messages/save', async (req, res) => {
  // try to save the message to the database
  try {
    const message = await Message.create({
      name: req.body.name,
      message: req.body.message,
    })
    return res.json({
      message: message, // return the message we just saved
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    return res.status(400).json({
      error: err,
      status: 'failed to save the message to the database',
    })
  }
})

// a route to handle fetching about us data
app.get('/aboutus', async (req, res) => {
  try {
    const aboutUsMessage = await AboutUs.find({}); // Assuming there's only one entry for about us content
    res.json({
      message: "Hello! This is Kevin, a newbie in web developing",
      imageUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fimage&psig=AOvVaw1ZeXeePNAQLI42DptLboLA&ust=1695934644609000&source=images&cd=vfe&opi=89978449&ved=0CA0QjRxqFwoTCID0hILXy4EDFQAAAAAdAAAAABAE"
      })

  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: 'failed to retrieve about us content from the database',
    })
  }
})


app.post('/aboutus', async (req, res) => {
  /*
  try {
    const content = await AboutUs.create({
      text: req.body.text,
      imageUrl: req.body.imageUrl,
    })
    res.json(content)
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: 'failed to save about us content to the database',
    })
  }
  */
 res.json({
  message: "Hello! This is Kevin, a newbie in web developing",
  imageUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fimage&psig=AOvVaw1ZeXeePNAQLI42DptLboLA&ust=1695934644609000&source=images&cd=vfe&opi=89978449&ved=0CA0QjRxqFwoTCID0hILXy4EDFQAAAAAdAAAAABAE"
 })
})

// export the express app we created to make it available to other modules
module.exports = app // CommonJS export style!
