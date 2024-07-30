// plugins/vue3-qrcode-reader.js
import { defineNuxtPlugin } from '#app'
import { QrcodeStream } from 'vue-qrcode-reader'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.component('QrcodeStream', QrcodeStream)
})
