// plugins/sweetalert2.client.js
import Swal from 'sweetalert2'

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.provide('swal', Swal)
})
