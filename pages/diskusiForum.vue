<template>
  <div class="ms-4">
    <h1 style="color: var(--purple)">DISKUSI FORUM</h1>
    <h2>Postingan dibuat oleh nama_dosen</h2>
  </div>

  <div class="ms-4 mr-4 mb-4">
    <v-sheet color="var(--grey)" rounded v-for="(topik, index) in topik" :key="index">
      <div class="ms-2 pt-2 pb-2 mt-2">
        <p style="color: blue">{{topik.nama_topik}} - {{topik.nama_kelas}}</p>
        <v-sheet class="bg-white mr-2" rounded>
          <div class="ms-2 mr-12 pt-2">
            <p>{{topik.isi}}</p>
          </div>
        </v-sheet>
      </div>
    </v-sheet>
  </div>
</template>

<script setup>
const topik = [
  {
    nama_topik: 'Topik 1', nama_kelas: 'Bahasa Indonesia', isi: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum minima dignissimos, impeditratione'
  },
  {
    nama_topik: 'Topik 2', nama_kelas: 'Bahasa Inggris', isi: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum minima dignissimos, impeditratione'
  },

]
</script>

<style></style>