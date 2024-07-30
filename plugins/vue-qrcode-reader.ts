// import { defineNuxtPlugin } from '#app';
// import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader';

// export default defineNuxtPlugin((nuxtApp) => {
//   nuxtApp.vueApp.component('QrcodeStream', QrcodeStream);
//   nuxtApp.vueApp.component('QrcodeDropZone', QrcodeDropZone);
//   nuxtApp.vueApp.component('QrcodeCapture', QrcodeCapture);
// });

// plugins/vue3-qrcode-reader.js
import { defineNuxtPlugin } from '#app'
import { QrcodeStream } from 'vue-qrcode-reader'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.component('QrcodeStream', QrcodeStream)
})
