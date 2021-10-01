// Modules
const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const { generateMessage } = require('./utils/messages')

// Env vars
const port = process.env.PORT || 3000
// App vars
const publicDir = path.join(__dirname,'../public')
const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static(publicDir))

// const room1 = 'room1'
io.on('connection',(socket) => {
  console.log('New connection')
  socket.emit('message', generateMessage('Welcome!'))

  socket.broadcast.emit('message', generateMessage('A new user has joined'))

  socket.on('sendMessage',(msg, cb) => {
    io.emit('message', generateMessage(msg))
    cb()
  })
  socket.on('sendLocation',(coords, cb) => {
    io.emit('locationMessage',`https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
    cb()
  })

  socket.on('disconnect',() => {
    io.emit('message', generateMessage('A user has left.'))
  })
})

server.listen(port, () => {
  console.log(`Service is up at port ${port}`)
})