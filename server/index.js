const {Nuxt, Builder} = require('nuxt')
const app = require('express')()
const port = process.env.PORT || 3000
const api = require('./api')
const {urlencoded,json} = require('body-parser')

app.use(urlencoded({ limit:'50mb', extended: false }))
app.use(json({limit: '50mb'}))
app.use('/api', api)


// Nuxt.js をオプションとともにインスタンス化する
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

const nuxt = new Nuxt(config)

// すべてのルートを Nuxt.js でレンダリングする
app.use(nuxt.render)

// ホットリローディングする開発モードのときのみビルドする
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}

// サーバーを Listen する
app.listen(port, '0.0.0.0')
console.log('Server listening on localhost:' + port)