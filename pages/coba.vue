<template>
  <div>
    <v-btn @click="showAlert">Tampilkan Alert</v-btn>
  </div>
</template>

<script setup>
const showAlert = () => {
  const { $swal } = useNuxtApp()
  $swal.fire({
    title: 'Berhasil!',
    text: 'Ini adalah contoh alert SweetAlert2',
    icon: 'success',
    confirmButtonText: 'OK'
  })
}
</script>
