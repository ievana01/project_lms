// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'
import { md2 } from 'vuetify/blueprints'
import { VCalendar } from 'vuetify/labs/VCalendar'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
   
    components: {
      VCalendar,
    }
  })
  app.vueApp.use(vuetify)
})
