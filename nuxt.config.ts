// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@nuxtjs/google-fonts',
    'nuxt-viewport',
    'vite-plugin-vuetify',
    '@pinia/nuxt',
    '@nuxt/ui'
  ],
  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**'],
  },
  imports: { dirs: ['./stores'] },
  viewport: {
    // viewport option
    breakpoints: {
      desktop: 1024,
      desktopMedium: 1280,
      desktopWide: 1600,

      mobile: 320,
      mobileMedium: 375,
      mobileWide: 425,

      tablet: 560,
    },
    defaultBreakpoints: {
      desktop: 'desktop',
      mobile: 'mobile',
      tablet: 'tablet',
    },

  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },

  },
  css: ['~/assets/css/global.css', '~/assets/css/md-small.css', '~/assets/css/md-medium.css', '~/assets/css/md-large.css',],
  runtimeConfig: {
    Id: process.env.APP_ID,
    Secret: process.env.APP_SECRET,
    Partner: process.env.PARTNER,

  }
})
