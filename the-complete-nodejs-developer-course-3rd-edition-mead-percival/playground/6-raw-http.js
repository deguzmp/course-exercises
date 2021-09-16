const https = require('https')
const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/234asd.json?access_token=pk.eyJ1IjoiZGVndXptcCIsImEiOiJja3RsM2w2dHMwbTZ5MnVvNnZqbmE0dWNxIn0.wJR2MvhstgtcqoRcuiB8Vw'

const request = https.request(url, (response) => {
  let data = ''

  response.on('data',(chunk) => {
    data = data + chunk.toString()
    console.log(chunk)
  })

  response.on('end',() => {
    const dataJSON = JSON.parse(data)
    console.log(dataJSON)
  })

})

request.on('error', (error) => {
  console.log('An error', error)
})

request.end()