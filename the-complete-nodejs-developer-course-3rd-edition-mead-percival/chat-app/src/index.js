// Modules
const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const {
  generateMessage, 
  generateLocationMessage } = require('./utils/messages')
const {
  addUser,
  getUser,
  getUsersInRoom,
  removeUser
} = require('./utils/users')
// Env vars
const port = process.env.PORT || 3000
// App vars
const publicDir = path.join(__dirname,'../public')
const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static(publicDir))

io.on('connection',(socket) => {
  console.log('New connection')

  socket.on('sendMessage',(msg, cb) => {
    const user = getUser(socket.id)
    io.to(user.room).emit('message', generateMessage(user.username, msg))
    cb()
  })
  
  socket.on('sendLocation',({ username, coords }, cb) => {
    const user = getUser(socket.id)
    io.emit('locationMessage', generateLocationMessage(user.username, coords))
    cb()
  })

  socket.on('join', (options, cb) => {
    const { error, user } = addUser({
      id: socket.id,
      ...options
    })
    if(error){
      return cb(error, undefined)
    }
    socket.join(user.room)

    socket.emit('message', generateMessage('Admin','Welcome!'))
    socket.broadcast.to(user.room).emit('message', generateMessage('Admin',`${user.username} has joined!`))
    io.to(user.room).emit('roomData',{
      room: user.room,
      users: getUsersInRoom(user.room)
    })
    cb(undefined,user)
  })

  socket.on('disconnect',() => {
    const user = removeUser(socket.id)
    if(user){
      io.to(user.room).emit('message',generateMessage('Admin',`${user.username} has left.`))
      io.to(user.room).emit('roomData',{
        room: user.room,
        users: getUsersInRoom(user.room)
      })
    }

  })
})

server.listen(port, () => {
  console.log(`Service is up at port ${port}`)
})