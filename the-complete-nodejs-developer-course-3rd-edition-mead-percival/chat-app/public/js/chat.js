const socket = io()
// const socket = require('socket.io-client')
const $messageForm = document.querySelector('#message-form')
const $chatBox = document.querySelector('#chat-box')
const $sendLocation = document.querySelector('#send-location')
const $sendMessage = document.querySelector('#send-message')
const $messages = document.querySelector('#messages')
const $sidebar = document.querySelector('#sidebar')
const $locationMessage = document.querySelector('#location-message')

const $locationTemplate = document.querySelector('#location-template').innerHTML
const $messageTemplate = document.querySelector('#message-template').innerHTML
const $sidebarTemplate = document.querySelector('#sidebar-template').innerHTML

const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })
const autoscroll = () => {
  const $newMessage = $messages.lastElementChild
  
  const newMessageStyles = getComputedStyle($newMessage)
  const newMessageMargin = parseInt(newMessageStyles.marginBottom)
  const newMessageHeight = $newMessage.offsetHeight + newMessageMargin
  
  const visibleHeight = $messages.offsetHeight

  const containerHeight = $messages.scrollHeight

  const scrollOffset = $messages.scrollTop +visibleHeight

  if(containerHeight - newMessageHeight <= scrollOffset){
    $messages.scrollTop = $messages.scrollHeight
  }
}

socket.on('message',(message) => {
  console.log(message)
  const html = Mustache.render($messageTemplate, { 
    username: message.username,
    message: message.text,
    createdAt: moment(message.createdAt).format('YYYY-MMM-DD HH:mm:ss')
  })
  $messages.insertAdjacentHTML('beforeend',html)
  autoscroll()
})

socket.on('locationMessage', (location) => {
  console.log(location)
  const html = Mustache.render($locationTemplate, {
    username: location.username,
    location: location.url, 
    createdAt: moment(location.createdAt).format('YYYY-MMM-DD HH:mm:ss')
  })
  $messages.insertAdjacentHTML('beforeend',html)
  autoscroll()
})

socket.on('roomData',(data) => {
  console.log(data.room)
  console.log(data.users)
  const html = Mustache.render($sidebarTemplate, {
    room: data.room,
    users: data.users
  })
  sidebar.innerHTML = html
  // $sidebar.insertAdjacentHTML('',html)
})

$messageForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const text = $chatBox.value
  socket.emit('sendMessage', text, () => {
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

socket.emit('join',{ username,room },(error, data) =>{
  if(error){
    alert(error)
    location.href = '/'
  }
})