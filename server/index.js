const {Nuxt, Builder} = require('nuxt')
const app = require('express')()
require('dotenv').config()
const port = process.env.PORT || 3000
const host = process.env.HOST || '0.0.0.0'
const api = require('./api')
const {urlencoded, json} = require('body-parser')

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "localhost:3000")
  next()
})
app.set('port', port)
app.use(urlencoded({ limit: '50mb', extended: false }))
app.use(json({limit: '50mb'}))
app.use('/api', api)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)

// Listen the server
app.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console