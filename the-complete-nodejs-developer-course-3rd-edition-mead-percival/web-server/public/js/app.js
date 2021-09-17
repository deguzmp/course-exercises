// console.log('Test app.js')

// fetch('https://puzzle.mead.io/puzzle').then((response) => {
//   response.json().then((data) => {
//     console.log(data)
//   })
// })

// const url = 'http://localhost:3000/weather?address=!'
// fetch(url).then((response) => {
//   response.json().then((data) => {
//     if(data.error){
//       return console.log(data)  
//     }
//     console.log(data.location,data.forecast)
//   })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = search.value

  const url = 'http://localhost:3000/weather?address='+location
  fetch(url).then((response) => {
    response.json().then((data) => {
      if(data.error){
        messageOne.textContent = 'Error'
        messageTwo.textContent = data.error
      } else {
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
      }
      
    })
  })
})

