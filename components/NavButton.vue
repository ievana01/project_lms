<template>
  <div>
    <v-row class="py-2">
      <v-col cols="auto" class="d-flex">
        <v-btn class="button pa-2 mr-2 ml-2" rounded="lg" to="/kelas">Kursus</v-btn>
        <v-btn class="button pa-2 mr-2 ml-2" rounded="lg" to="/peserta">Peserta</v-btn>
        <v-btn class="button pa-2 mr-2 ml-2" rounded="lg" to="/listpresensi">Presensi</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts" setup>
</script>

<style>
.button {
  font-size: 12px;
  color: var(--yellow) !important;
  background-color: var(--purple) !important;
  font-weight: 600;
}
</style>