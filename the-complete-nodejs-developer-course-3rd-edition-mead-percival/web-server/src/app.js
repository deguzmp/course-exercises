const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Paths for express config
const publicDir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
//Static directory top serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
  res.render('index',{
    title: 'Weather',
    name: 'Phil'
  })
})

app.get('/about', (req, res) => {
  res.render('about',{
    title: 'About Me',
    name: 'Phil'
  })
})

app.get('/help', (req, res) => {
  res.render('help',{
    message: 'This all the help',
    title: 'Help',
    name: 'Phil'
  })
})

app.get('/products',(req,res) => {
  if(!req.query.search){
    return res.send({
      error:'You must provide a search term.'
    })
  }
  res.send({
    products: []
  })
})

app.get('/weather',(req,res) => {
  if(!req.query.address){
    return res.send({
      error:'You must provide an address.'
    })
  }
  geocode(req.query.address ,(error, {latitude,longitude,location} = {}) => {
    if (error) {
      return res.send({error: error})
    }
    //Not sure why deconstruction does not work for geocode
    // const {
    //   latitude,longitude,location
    // } = data
    forecast(longitude, latitude, (error, {temperature, precip} = {}) => {
      if (error) {
        return res.send({error: error})
      }
      return res.send({
        forecast:'It is currently '+ temperature+' degrees out. There is '+precip+'% chance of rain',
        temperature,
        latitude,
        longitude,
        precip,
        location
      })
    })
  })
})

app.get('/help/*',(req, res) => {
  res.render('404',{
    title: '404',
    message:'Help article not found',
    name: 'Phil'
  })
})

app.get('*',(req, res) => {
  res.render('404',{
    title: '404',
    message:'Page not found',
    name: 'Phil'
  })
})

app.listen(port, () => {
  console.log('Server is up at port %d',port)
})