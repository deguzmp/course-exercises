const chalk = require('chalk')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const log = console.log
const logError = chalk.bgAnsi256(250).red

const address = process.argv[2]

if (!address) {
  return log(logError(' ERROR '),'Please input address.')
}
//Not sure why deconstruction does not work for geocode
//geocode(address ,(error, {latitude,longitude,location}) => {
geocode(address ,(error, data) => {
  if (error) {
    return log(logError(' ERROR '), error)
  }
  //Not sure why deconstruction does not work for geocode
  const {
    latitude,longitude,location
  } = data
  forecast(longitude, latitude, (error, {temperature, precip}) => {
    if (error) {
      return log(logError(' ERROR '), error)
    }
    // const {
    //   temperature, precip
    // } = data
    log('Temperature in %s is at %d degrees with %d\% chance of rain.',location,temperature,precip)
  })
  
})
