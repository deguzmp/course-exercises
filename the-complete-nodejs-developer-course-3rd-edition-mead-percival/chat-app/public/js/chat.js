const socket = io()
// const socket = require('socket.io-client')
const $messageForm = document.querySelector('#message-form')
const $chatBox = document.querySelector('#chat-box')
const $sendLocation = document.querySelector('#send-location')
const $sendMessage = document.querySelector('#send-message')
const $messages = document.querySelector('#messages')
const $locationMessage = document.querySelector('#location-message')

const $locationTemplate = document.querySelector('#location-template').innerHTML
const $messageTemplate = document.querySelector('#message-template').innerHTML

socket.on('message',(message) => {
  console.log(message)
  const html = Mustache.render($messageTemplate, { 
    message: message.text,
    createdAt: moment(message.createdAt).format('YYYY-MMM-DD HH:mm:ss')
  })
  $messages.insertAdjacentHTML('beforeend',html)
})

socket.on('locationMessage', (location) => {
  console.log(location)
  const html = Mustache.render($locationTemplate, { location })
  $messages.insertAdjacentHTML('beforeend',html)
})

$messageForm.addEventListener('submit', (e) => {
  e.preventDefault()
  socket.emit('sendMessage', $chatBox.value, () => {
    $chatBox.value = ''
    $chatBox.focus()
    console.log('message delivered')
  })
})

$sendLocation.addEventListener('click', () => {
  if(!navigator.geolocation){
    return alert('Geo Location not supported')
  }
  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit('sendLocation', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude 
    },() => {
      console.log('Location shared')
    })    
  })
})

