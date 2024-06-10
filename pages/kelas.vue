<template>
  <NavButton />
  <v-row class="align-center ms-2">
    <v-col cols="12" md="2" lg="2">
      <v-img src="public/img/bg.jpeg" style="height: 160px; width: 300px;"></v-img>
    </v-col>
    <v-col class="ms-4">
      <h5 class="pt-2">Bahasa Indonesia</h5>
      <p>kode kelas</p>
      <p>Sarah Laura S.Pd</p>
    </v-col>
  </v-row>

  <CardPertemuan :file="file" :pertemuan="pertemuan" />
</template>

<script setup>
import { useNuxtApp } from '#app'
import CardPertemuan from '~/components/CardPertemuan.vue'

const { $viewport } = useNuxtApp()

watch($viewport.breakpoint, (newBreakpoint, oldBreakpoint) => {
  console.log('Breakpoint updated:', oldBreakpoint, '->', newBreakpoint)
})

const file = [
  { icon: 'mdi-file-powerpoint', nama: 'Introduction', link: '', pertemuan: 1 },
  { icon: 'mdi-file-document', nama: 'Chapter 1', link: '', pertemuan: 1 },
  { icon: 'mdi-clipboard-text', nama: 'Tugas Pertemuan 1', link: '/tugas', pertemuan: 1 },
  { icon: 'mdi-check-circle-outline', nama: 'Presensi Pertemuan 1', link: '/presensi', pertemuan: 1 },
  { icon: 'mdi-file-document', nama: 'Setup Guide', link: '', pertemuan: 2 },
  { icon: 'mdi-checkbox-marked-outline', nama: 'Kuis Pertemuan 2', link: '/kuis', pertemuan: 2 },
  { icon: 'mdi-forum', nama: 'Forum Kelas', link: '/forum', pertemuan: 3 },
]

const pertemuan = [
  { id_pertemuan: 1, nama_pertemuan: 'Pertemuan Minggu ke-1' },
  { id_pertemuan: 2, nama_pertemuan: 'Pertemuan Minggu ke-2' },
  { id_pertemuan: 3, nama_pertemuan: 'Pertemuan Minggu ke-3' },
]
</script>

<style>
.foto {
  width: 365px;
  height: 80px;
  padding-left: 10px;
}

.file {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 16px;
}
</style>
