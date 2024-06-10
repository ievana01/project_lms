<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const state = reactive({
  namaTopik: '',
  deskripsi: '',
})

async function onSubmit(event: FormSubmitEvent<any>) {
  // Do something with data
  console.log(event.data)
}
</script>

<template>
  <h1 class="ms-2" style="color: var(--purple);">TAMBAH TOPIK BARU</h1>
  <UForm :state="state" class="ms-2 mr-2 space-y-4" @submit="onSubmit">
    <UFormGroup name="input" label="Nama Acara">
      <UInput v-model="state.namaTopik" />
    </UFormGroup>
    <UFormGroup name="textarea" label="Deskripsi">
      <UTextarea v-model="state.deskripsi" />
    </UFormGroup>

    <div class="text-center mt-16">
      <v-btn class="button pa-2 mr-2 ml-2" rounded="xl">KIRIM KE FORUM</v-btn>
      <v-btn class="button pa-2 mr-2 ml-2" rounded="xl">BATAL</v-btn>
    </div>
  </UForm>  
</template>

<style>

</style>