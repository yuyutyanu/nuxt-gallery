module.exports = {

  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt-gallery',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  // loading: '~/components/loading.vue',
  plugins: [
    {src: '~plugins/element-ui.js'}
  ],
  /*
  ** Build configuration
  */
  build: {
    vendor: [
      'axios',
      'faker',
      'jsonwebtoken'
    ],
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
