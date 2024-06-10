<template>

  <v-sheet style="background-color: var(--grey);" rounded class="ms-4 mr-4 pt-3 pb-1">
    <div class="pl-2 pr-2">
      <h1>Kode Kelas - Nama Kelas</h1>
      <h2>Jumat, 7 Mei 2024</h2>
      <p style="color: var(--blue);">Topik : Introduction</p>
    </div>
  </v-sheet>

  <div class="ms-4 mr-4 mt-4">
    <v-sheet style="background-color: var(--grey);" class="pt-2 pl-2 pr-2" rounded>
      <div class="pb-2">
        <URadioGroup color="primary" legend="Apakah waktu pembelajaran sesuai jadwal?"
          :options="[{ value: 'ya', label: 'Ya' }, { value: 'tidak', label: 'Tidak' },]" model-value="sms" />
      </div>
    </v-sheet>
  </div>
  <div class="ms-4 mr-4 mt-4">
    <v-sheet style="background-color: var(--grey);" class="pt-2 pl-2 pr-2" rounded>
      <div class="pb-2">
        <URadioGroup color="primary" legend="Apakah materi tersedia di platform?"
          :options="[{ value: 'ya', label: 'Ya' }, { value: 'tidak', label: 'Tidak' },]" model-value="sms" />
      </div>
    </v-sheet>
  </div>
  <div class="text-center mt-6">
    <v-btn class="button" prepend-icon="mdi-qrcode-scan" rounded="lg">scan qr</v-btn>
  </div>
  <div class="text-center mt-4">
    <v-btn class="button pa-2 mr-2 ml-2" rounded="lg">SIMPAN</v-btn>
    <v-btn class="button pa-2 mr-2 ml-2" rounded="lg">BATAL</v-btn>
  </div>

</template>

<script lang="ts" setup>

</script>

<style></style>