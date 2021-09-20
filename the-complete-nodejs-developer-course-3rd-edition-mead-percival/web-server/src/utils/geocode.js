const request = require('request')

const geocode = ( address ,callback ) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZGVndXptcCIsImEiOiJja3RsM2w2dHMwbTZ5MnVvNnZqbmE0dWNxIn0.wJR2MvhstgtcqoRcuiB8Vw'
  request({ url, json:true }, ( error ,{ body } = {}) => {
    if ( error ){
      callback('Unable to connect to geocode service.',undefined)
    } else if( body.error ){
      callback('Unable to find geo location.',undefined)
    } else if( body.features.length === 0 ) {
      callback('Place not found. Try another search')
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode