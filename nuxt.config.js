const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [{
      charset: 'utf-8'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    },
    {
      hid: 'description',
      name: 'description',
      content: pkg.description
    }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },

  /*
   ** Global CSS
   */
  css: [{
    src: '@aeternity/aepp-components-3/dist/aepp.components.css'
  },
  {
    src: '@aeternity/aepp-components-3/dist/aepp.fonts.css'
  },
  {
    src: 'styles/index.scss',
    lang: 'scss'
  }
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Router config
   */
  router: {
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'exact-active-link'
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */
  build: {
    babel: {
      presets: ['@nuxt/babel-preset-app'],
      plugins: [
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-transform-runtime',
        '@babel/plugin-proposal-export-default-from'
      ]
    },
    /*
     ** You can extend webpack config here
     */
    extend (config, ctx) {
      config.module.rules.push({
        test: /\.js$/,
        // exclude: /node_modules/,
        exclude: [/node_modules/],
        include: [/node_modules\/@aeternity/, /node_modules\/rlp/],
        loader: 'babel-loader'
      })
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
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
